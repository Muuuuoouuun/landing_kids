// 쇼릴 렌더러: 프레임을 소프트웨어로 그려 ffmpeg 로 바로 흘려보낸다.
//   node showreel/render.mjs                    → public/showreel/classin-showreel.mp4 (+ .webm, poster.png)
//   node showreel/render.mjs --stills 0,300,900 → 지정 프레임 PNG
//   node showreel/render.mjs --sheet 30         → 30프레임 간격 컨택트 시트 PNG
//   --out <dir>  스틸/시트 저장 위치 (기본 showreel/out)
import { spawn } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { deflateSync } from 'node:zlib';
import { Gfx, DW, DH } from './gfx.mjs';
import { FPS, FRAMES, renderFrame } from './scenes.mjs';
import { renderAudio, SAMPLE_RATE } from './audio.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const fonts = JSON.parse(readFileSync(join(here, 'fonts.json'), 'utf8'));
const args = process.argv.slice(2);
const opt = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : null;
};
const OUT_W = 1920;
const OUT_H = 1080;
// 576x324 → 1080p 는 정수배가 아니라서: 최근접 4배 확대 후 면적 평균으로 축소 (깜빡임 없는 선명한 픽셀)
const UPSCALE_VF = `scale=${DW * 4}:${DH * 4}:flags=neighbor,scale=${OUT_W}:${OUT_H}:flags=area`;
const outDir = opt('--out') || join(here, 'out');

function frame(f) {
  const g = new Gfx(fonts);
  renderFrame(g, f);
  return g.bytes;
}

// 의존성 없는 PNG 인코더 (RGBA, 정수배 확대)
function png(rgba, w, h, k = 1) {
  const W2 = w * k;
  const H2 = h * k;
  const raw = Buffer.alloc((W2 * 4 + 1) * H2);
  for (let y = 0; y < H2; y++) {
    const o = y * (W2 * 4 + 1);
    raw[o] = 0;
    const sy = Math.floor(y / k);
    for (let x = 0; x < W2; x++) {
      const s = (sy * w + Math.floor(x / k)) * 4;
      raw.set(rgba.subarray(s, s + 4), o + 1 + x * 4);
    }
  }
  const crcTable = new Int32Array(256).map((_, n) => {
    let c = n;
    for (let i = 0; i < 8; i++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    return c;
  });
  const crc = (buf) => {
    let c = -1;
    for (const b of buf) c = crcTable[(c ^ b) & 0xff] ^ (c >>> 8);
    return (c ^ -1) >>> 0;
  };
  const chunk = (type, data) => {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length);
    const td = Buffer.concat([Buffer.from(type), data]);
    const c = Buffer.alloc(4);
    c.writeUInt32BE(crc(td));
    return Buffer.concat([len, td, c]);
  };
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(W2, 0);
  ihdr.writeUInt32BE(H2, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

function wav(samples, rate) {
  const n = samples.length;
  const b = Buffer.alloc(44 + n * 2);
  b.write('RIFF', 0);
  b.writeUInt32LE(36 + n * 2, 4);
  b.write('WAVEfmt ', 8);
  b.writeUInt32LE(16, 16);
  b.writeUInt16LE(1, 20);
  b.writeUInt16LE(2, 22);
  b.writeUInt32LE(rate, 24);
  b.writeUInt32LE(rate * 4, 28);
  b.writeUInt16LE(4, 32);
  b.writeUInt16LE(16, 34);
  b.write('data', 36);
  b.writeUInt32LE(n * 2, 40);
  for (let i = 0; i < n; i++) b.writeInt16LE(Math.round(Math.max(-1, Math.min(1, samples[i])) * 32767), 44 + i * 2);
  return b;
}

async function stills(list) {
  mkdirSync(outDir, { recursive: true });
  for (const f of list) {
    const p = join(outDir, `f${String(f).padStart(4, '0')}.png`);
    writeFileSync(p, png(frame(f), DW, DH, 2));
    console.log(p);
  }
}

function sheet(step) {
  mkdirSync(outDir, { recursive: true });
  const list = [];
  for (let f = 0; f < FRAMES; f += step) list.push(f);
  const cols = 6;
  const tw = DW / 2;
  const th = DH / 2;
  const rows = Math.ceil(list.length / cols);
  const SW = cols * (tw + 2);
  const SH = rows * (th + 2);
  const out = new Uint8ClampedArray(SW * SH * 4).fill(255);
  list.forEach((f, i) => {
    const px = frame(f);
    const ox = (i % cols) * (tw + 2);
    const oy = Math.floor(i / cols) * (th + 2);
    for (let y = 0; y < th; y++) {
      for (let x = 0; x < tw; x++) {
        const s = (y * 2 * DW + x * 2) * 4;
        out.set(px.subarray(s, s + 4), ((oy + y) * SW + ox + x) * 4);
      }
    }
  });
  const p = join(outDir, `sheet-${step}.png`);
  writeFileSync(p, png(out, SW, SH));
  console.log(p, `(${list.length} frames)`);
}

async function video() {
  const dest = join(root, 'public', 'showreel');
  mkdirSync(dest, { recursive: true });
  mkdirSync(outDir, { recursive: true });
  const wavPath = join(outDir, 'soundtrack.wav');
  console.time('audio');
  writeFileSync(wavPath, wav(renderAudio(), SAMPLE_RATE));
  console.timeEnd('audio');

  // 한 번 그린 프레임으로 MP4(H.264, 사파리·모바일) + WebM(VP9, H.264 없는 브라우저) 동시 인코딩
  const mp4 = join(dest, 'classin-showreel.mp4');
  const webm = join(dest, 'classin-showreel.webm');
  const color = ['-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-color_range', 'tv'];
  const ff = spawn('ffmpeg', [
    '-y', '-loglevel', 'error',
    '-f', 'rawvideo', '-pix_fmt', 'rgba', '-s', `${DW}x${DH}`, '-r', String(FPS), '-i', '-',
    '-i', wavPath,
    '-filter_complex', `[0:v]${UPSCALE_VF},scale=out_color_matrix=bt709:out_range=tv,format=yuv420p,split[a][b]`,
    '-map', '[a]', '-map', '1:a',
    '-c:v', 'libx264', '-preset', 'slow', '-tune', 'animation', '-crf', '19',
    '-profile:v', 'high', '-r', String(FPS), '-g', String(FPS), ...color,
    '-c:a', 'aac', '-b:a', '192k', '-ar', String(SAMPLE_RATE),
    '-movflags', '+faststart', '-shortest', mp4,
    '-map', '[b]', '-map', '1:a',
    '-c:v', 'libvpx-vp9', '-crf', '30', '-b:v', '0', '-deadline', 'good', '-cpu-used', '4', '-row-mt', '1',
    '-r', String(FPS), '-g', String(FPS), ...color,
    '-c:a', 'libopus', '-b:a', '160k', '-shortest', webm,
  ], { stdio: ['pipe', 'inherit', 'inherit'] });

  console.time('frames');
  for (let f = 0; f < FRAMES; f++) {
    const ok = ff.stdin.write(Buffer.from(frame(f)));
    if (!ok) await new Promise((r) => ff.stdin.once('drain', r));
  }
  ff.stdin.end();
  await new Promise((res, rej) => ff.on('close', (c) => (c === 0 ? res() : rej(new Error(`ffmpeg ${c}`)))));
  console.timeEnd('frames');

  // 포스터: 마지막 프레임을 영상과 같은 확대 과정으로
  const poster = spawn('ffmpeg', [
    '-y', '-loglevel', 'error', '-f', 'rawvideo', '-pix_fmt', 'rgba', '-s', `${DW}x${DH}`, '-i', '-',
    '-vf', UPSCALE_VF, '-frames:v', '1', join(dest, 'poster.png'),
  ], { stdio: ['pipe', 'inherit', 'inherit'] });
  poster.stdin.end(Buffer.from(frame(FRAMES - 1)));
  await new Promise((res, rej) => poster.on('close', (c) => (c === 0 ? res() : rej(new Error(`ffmpeg ${c}`)))));
  console.log(mp4);
  console.log(webm);
}

if (args.includes('--stills')) await stills(opt('--stills').split(',').map(Number));
else if (args.includes('--sheet')) sheet(Number(opt('--sheet') || 30));
else await video();
