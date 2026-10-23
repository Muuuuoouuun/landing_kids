// 8비트 칩튠 사운드트랙 + 화면 싱크 효과음 (샘플 없이 전부 합성)
// 120BPM · C장조 · 11마디 = 22초. 효과음은 scenes.mjs 의 SFX 큐(프레임)에 맞춰 찍힌다.
import { FPS, FRAMES, SFX } from './scenes.mjs';

export const SAMPLE_RATE = 48000;
const SR = SAMPLE_RATE;
const N = Math.round((FRAMES / FPS) * SR);
const STEP = 60 / 120 / 4; // 16분음표(초)
const BAR = STEP * 16;

const mtof = (m) => 440 * 2 ** ((m - 69) / 12);

function polyblep(t, dt) {
  if (t < dt) {
    t /= dt;
    return t + t - t * t - 1;
  }
  if (t > 1 - dt) {
    t = (t - 1) / dt;
    return t * t + t + t + 1;
  }
  return 0;
}

class Mixer {
  constructor() {
    this.L = new Float32Array(N);
    this.R = new Float32Array(N);
    this.seed = 0x1234;
  }

  // 범용 보이스. freq: 숫자 또는 (경과초) => Hz
  voice(start, dur, freq, o = {}) {
    const {
      wave = 'pulse', duty = 0.5, vol = 0.1, a = 0.004, d = 0.08, s = 0.6, r = 0.06,
      pan = 0, vib = 0, vibRate = 6, vibDelay = 0.12, lp = 0, bus = null, noiseRate = 12000,
    } = o;
    const i0 = Math.max(0, Math.round(start * SR));
    const i1 = Math.min(N, Math.round((start + dur + r) * SR));
    const gl = Math.cos(((pan + 1) * Math.PI) / 4);
    const gr = Math.sin(((pan + 1) * Math.PI) / 4);
    const L = bus ? bus.L : this.L;
    const R = bus ? bus.R : this.R;
    const ff = typeof freq === 'function' ? freq : () => freq;
    let ph = 0;
    let nAcc = 0;
    let nVal = 0;
    let lpS = 0;
    const lpA = lp ? 1 - Math.exp((-2 * Math.PI * lp) / SR) : 1;
    for (let i = i0; i < i1; i++) {
      const t = (i - i0) / SR;
      let env;
      if (t < a) env = t / a;
      else if (t < a + d) env = 1 - (1 - s) * ((t - a) / d);
      else env = s;
      if (t > dur) env *= Math.max(0, 1 - (t - dur) / r);
      let f = ff(t);
      if (vib && t > vibDelay) f *= 1 + vib * Math.sin(2 * Math.PI * vibRate * (t - vibDelay));
      const dt = f / SR;
      let x;
      if (wave === 'pulse') {
        x = (ph < duty ? 1 : -1) + polyblep(ph, dt) - polyblep((ph - duty + 1) % 1, dt) - (2 * duty - 1);
      } else if (wave === 'tri') {
        x = Math.round((1 - 4 * Math.abs(ph - 0.5)) * 7.5) / 7.5;
      } else if (wave === 'sine') {
        x = Math.sin(2 * Math.PI * ph);
      } else {
        nAcc += noiseRate / SR;
        if (nAcc >= 1) {
          nAcc -= Math.floor(nAcc);
          const bit = (this.seed ^ (this.seed >> 1)) & 1;
          this.seed = (this.seed >> 1) | (bit << 14);
          nVal = this.seed & 1 ? 1 : -1;
        }
        x = nVal;
      }
      ph += dt;
      ph -= Math.floor(ph);
      lpS += lpA * (x - lpS);
      const y = lpS * env * vol;
      L[i] += y * gl;
      R[i] += y * gr;
    }
  }
}

// ───── 드럼 ─────
function kick(m, t, v = 1) {
  m.voice(t, 0.16, (x) => 40 + 130 * Math.exp(-x * 30), { wave: 'sine', vol: 0.55 * v, a: 0.001, d: 0.16, s: 0, r: 0.02 });
  m.voice(t, 0.012, 0, { wave: 'noise', vol: 0.12 * v, a: 0.0005, d: 0.012, s: 0, r: 0.005, noiseRate: 20000 });
}
function snare(m, t, v = 1) {
  m.voice(t, 0.12, 8000, { wave: 'noise', vol: 0.22 * v, a: 0.001, d: 0.12, s: 0, r: 0.03, noiseRate: 9000, lp: 7000, pan: -0.1 });
  m.voice(t, 0.07, (x) => 190 - x * 300, { wave: 'tri', vol: 0.22 * v, a: 0.001, d: 0.07, s: 0, r: 0.02 });
}
function hat(m, t, v = 1, open = false) {
  m.voice(t, open ? 0.14 : 0.03, 0, { wave: 'noise', vol: 0.055 * v, a: 0.0005, d: open ? 0.14 : 0.03, s: 0, r: 0.02, noiseRate: 30000, pan: 0.35 });
}
function crash(m, t, v = 1) {
  m.voice(t, 1.1, 0, { wave: 'noise', vol: 0.11 * v, a: 0.002, d: 1.1, s: 0, r: 0.2, noiseRate: 22000, lp: 9000, pan: 0.2 });
}

// ───── 곡 ─────
const CH = {
  C: { arp: [60, 64, 67, 72], root: 48 },
  G: { arp: [59, 62, 67, 71], root: 43 },
  Am: { arp: [57, 60, 64, 69], root: 45 },
  F: { arp: [57, 60, 65, 69], root: 41 },
  Em: { arp: [55, 59, 64, 67], root: 40 },
};
// 마디별 [앞 2박, 뒤 2박]
const PROG = [
  null, ['C', 'G'], ['Am', 'F'], ['C', 'G'], ['Am', 'F'], ['F', 'G'], ['Em', 'Am'], ['F', 'G'], ['C', 'Am'], ['F', 'G'], ['C', 'C'],
];
const n = (name) => {
  const m = /^([A-G])(#?)(\d)$/.exec(name);
  return { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }[m[1]] + (m[2] ? 1 : 0) + (Number(m[3]) + 1) * 12;
};
// [16분 위치, 음, 길이]
const LEAD = {
  1: [[0, 'E5', 2], [2, 'G5', 2], [4, 'C6', 3], [7, 'B5', 1], [8, 'G5', 2], [10, 'D5', 2], [12, 'G5', 4]],
  2: [[0, 'A5', 2], [2, 'G5', 2], [4, 'E5', 3], [7, 'C5', 1], [8, 'F5', 2], [10, 'A5', 2], [12, 'C6', 2], [14, 'A5', 2]],
  3: [[0, 'E5', 2], [2, 'G5', 2], [4, 'C6', 2], [6, 'E6', 2], [8, 'D6', 3], [11, 'B5', 1], [12, 'G5', 4]],
  4: [[0, 'C6', 2], [2, 'B5', 2], [4, 'A5', 2], [6, 'E5', 2], [8, 'F5', 2], [10, 'G5', 2], [12, 'A5', 2], [14, 'C6', 2]],
  5: [[0, 'A5', 3], [3, 'C6', 1], [4, 'A5', 2], [6, 'F5', 2], [8, 'G5', 3], [11, 'B5', 1], [12, 'D6', 4]],
  6: [[0, 'B5', 3], [3, 'G5', 1], [4, 'E5', 2], [6, 'G5', 2], [8, 'A5', 3], [11, 'C6', 1], [12, 'E6', 4]],
  7: [[0, 'F6', 2], [2, 'E6', 2], [4, 'C6', 2], [6, 'A5', 2], [8, 'B5', 2], [10, 'C6', 2], [12, 'D6', 4]],
  8: [[0, 'G5', 1], [2, 'G5', 1], [4, 'E6', 2], [6, 'C6', 2], [8, 'A5', 1], [10, 'A5', 1], [12, 'E6', 2], [14, 'C6', 2]],
  9: [[0, 'C6', 6], [6, 'A5', 2], [8, 'B5', 4], [12, 'D6', 2], [14, 'B5', 1], [15, 'G5', 1]],
  10: [[0, 'G5', 1], [1, 'C6', 1], [2, 'E6', 1], [3, 'G6', 9], [14, 'C6', 2]],
};

function music(m, lead) {
  // 인트로: 점점 커지는 아르페지오 + 끝박 스네어 필
  const intro = [60, 64, 67, 74];
  for (let st = 4; st < 16; st++) {
    m.voice(st * STEP, STEP * 0.9, mtof(intro[st % 4] + (st >= 12 ? 12 : 0)), { duty: 0.125, vol: 0.02 + st * 0.003, d: 0.06, s: 0.4, pan: -0.3 });
  }
  for (let st = 12; st < 16; st++) snare(m, st * STEP, 0.35 + (st - 12) * 0.2);
  kick(m, 12 * STEP, 0.6);

  for (let bar = 1; bar <= 10; bar++) {
    const t0 = bar * BAR;
    const [c1, c2] = PROG[bar];
    const last = bar === 10;
    // 아르페지오 (12.5% 펄스)
    for (let st = 0; st < 16; st++) {
      if (last && st >= 12) break;
      const ch = CH[st < 8 ? c1 : c2];
      const busy = bar >= 3 && bar !== 9;
      const note = ch.arp[(st + (busy ? Math.floor(st / 4) : 0)) % 4] + (bar === 7 || bar === 10 ? 12 : 0);
      m.voice(t0 + st * STEP, STEP * 0.7, mtof(note), { duty: 0.125, vol: bar === 9 && st < 8 ? 0.035 : 0.045, d: 0.05, s: 0.35, r: 0.03, pan: -0.35 });
    }
    // 베이스 (삼각파 8분)
    const bassPat = [0, 12, 7, 12];
    for (let e = 0; e < 8; e++) {
      if (last && e >= 6) break;
      const ch = CH[e < 4 ? c1 : c2];
      if (bar === 9 && e < 4 && e % 2) continue;
      m.voice(t0 + e * STEP * 2, STEP * 1.6, mtof(ch.root + bassPat[e % 4]), { wave: 'tri', vol: 0.26, a: 0.003, d: 0.05, s: 0.8, r: 0.03 });
    }
    // 리드 (25% 펄스 + 비브라토, 딜레이 버스)
    for (const [st, name, len] of LEAD[bar]) {
      const dur = len * STEP * (len > 2 ? 0.95 : 0.85);
      m.voice(t0 + st * STEP, dur, mtof(n(name)), { duty: 0.25, vol: 0.12, a: 0.004, d: 0.1, s: 0.7, r: 0.05, vib: 0.006, bus: lead });
      if (bar === 10 && st === 3) {
        m.voice(t0 + st * STEP, dur, mtof(n(name)) / 2, { duty: 0.5, vol: 0.06, d: 0.2, s: 0.6, r: 0.2 });
      }
    }
    // 드럼
    const busy = bar === 3 || bar === 4 || bar === 7;
    const K = bar === 9 ? [0, 8] : busy ? [0, 6, 8, 11] : [0, 6, 8];
    const S = bar === 9 ? [] : [4, 12];
    for (const st of K) kick(m, t0 + st * STEP);
    for (const st of S) if (!(bar === 4 && st === 12)) snare(m, t0 + st * STEP);
    for (let st = 0; st < 16; st++) {
      if (bar === 9) break;
      if (bar === 4 && st >= 12) break;
      if (last && st >= 12) break;
      if (busy || st % 2 === 0) hat(m, t0 + st * STEP, st % 4 === 2 ? 1 : 0.6, st === 14 && !busy);
    }
    if (bar === 4) for (let st = 12; st < 16; st++) snare(m, t0 + st * STEP, 0.5 + (st - 12) * 0.15);
    if (bar === 9) {
      for (let st = 8; st < 16; st++) snare(m, t0 + st * STEP, 0.3 + (st - 8) * 0.08);
      for (let k = 0; k < 4; k++) snare(m, t0 + (14 + k * 0.5) * STEP, 0.7);
      hat(m, t0, 0.8, true);
      hat(m, t0 + 4 * STEP, 0.8, true);
    }
    if ([1, 5, 7, 10].includes(bar)) crash(m, t0, bar === 10 ? 1.3 : 1);
  }
  // 마지막 한 방 (21.75초)
  const end = 10 * BAR + 14 * STEP;
  kick(m, end, 1.1);
  crash(m, end, 1.2);
  for (const note of [48, 60, 64, 67, 72]) {
    m.voice(end, 0.25, mtof(note), { wave: note < 50 ? 'tri' : 'pulse', duty: 0.25, vol: note < 50 ? 0.3 : 0.05, d: 0.15, s: 0.4, r: 0.1 });
  }
}

// ───── 효과음 ─────
const PENTA = [72, 74, 76, 79, 81, 84, 86, 88, 91, 93, 96];
const sweep = (f0, f1, dur, curve = 1) => (x) => f0 + (f1 - f0) * Math.min(1, x / dur) ** curve;

function sfx(m, name, t, arg = 0) {
  const v = (o) => ({ vol: 0.12, ...o });
  switch (name) {
    case 'power':
      m.voice(t, 0.36, sweep(50, 1100, 0.36, 2), v({ wave: 'sine', vol: 0.18, d: 0.36, s: 0.5 }));
      m.voice(t + 0.3, 0.05, 0, v({ wave: 'noise', vol: 0.08, d: 0.05, s: 0 }));
      break;
    case 'blip':
      m.voice(t, 0.05, mtof(PENTA[arg % PENTA.length]), v({ duty: 0.5, vol: 0.07, d: 0.05, s: 0.3, r: 0.02, pan: -0.6 + arg * 0.12 }));
      break;
    case 'jump':
    case 'hop':
      m.voice(t, name === 'hop' ? 0.07 : 0.14, sweep(name === 'hop' ? 420 : 300, name === 'hop' ? 760 : 980, name === 'hop' ? 0.07 : 0.14), v({ duty: 0.25, vol: name === 'hop' ? 0.06 : 0.08, d: 0.14, s: 0.5 }));
      break;
    case 'land':
      m.voice(t, 0.12, sweep(140, 45, 0.12), v({ wave: 'sine', vol: 0.3, d: 0.12, s: 0 }));
      m.voice(t, 0.04, 0, v({ wave: 'noise', vol: 0.06, d: 0.04, s: 0, noiseRate: 6000 }));
      break;
    case 'chime':
    case 'fanfare':
    case 'confirm': {
      const notes = name === 'confirm' ? [84, 91, 96] : name === 'fanfare' ? [72, 76, 79, 84] : [84, 88, 91, 96];
      notes.forEach((nn, i) => m.voice(t + i * 0.05, i === notes.length - 1 ? 0.28 : 0.05, mtof(nn), v({ duty: 0.5, vol: 0.07, d: 0.2, s: 0.4, r: 0.12, pan: 0.2 })));
      break;
    }
    case 'iris':
      m.voice(t, 0.28, sweep(1000, 160, 0.28), v({ duty: 0.5, vol: 0.06, d: 0.28, s: 0.6 }));
      break;
    case 'irisOpen':
      m.voice(t, 0.2, sweep(180, 900, 0.2), v({ duty: 0.5, vol: 0.05, d: 0.2, s: 0.6 }));
      break;
    case 'stage':
      m.voice(t, 0.06, mtof(79), v({ duty: 0.5, vol: 0.06, d: 0.05, s: 0.4 }));
      m.voice(t + 0.08, 0.14, mtof(84), v({ duty: 0.5, vol: 0.06, d: 0.1, s: 0.5, r: 0.08 }));
      break;
    case 'tap':
    case 'select':
      m.voice(t, 0.025, name === 'tap' ? 1600 : mtof(81), v({ duty: 0.5, vol: name === 'tap' ? 0.05 : 0.07, d: 0.03, s: 0.2, r: 0.01 }));
      m.voice(t, 0.01, 0, v({ wave: 'noise', vol: 0.05, d: 0.01, s: 0 }));
      break;
    case 'bonk':
      m.voice(t, 0.08, sweep(260, 130, 0.08), v({ duty: 0.5, vol: 0.11, d: 0.08, s: 0.3 }));
      m.voice(t, 0.03, 0, v({ wave: 'noise', vol: 0.08, d: 0.03, s: 0, noiseRate: 5000 }));
      break;
    case 'letter':
    case 'coin':
      m.voice(t, 0.05, mtof(83 + arg * 2), v({ duty: 0.5, vol: 0.07, d: 0.05, s: 0.6, r: 0.005, pan: 0.15 }));
      m.voice(t + 0.05, 0.22, mtof(88 + arg * 2), v({ duty: 0.5, vol: 0.07, a: 0.001, d: 0.22, s: 0, r: 0.05, pan: 0.15 }));
      break;
    case 'meow':
      m.voice(t, 0.26, (x) => 620 + 420 * Math.sin(Math.min(1, x / 0.26) * Math.PI) - x * 300, v({ duty: 0.25, vol: 0.06, d: 0.26, s: 0.7, vib: 0.03, vibRate: 14, vibDelay: 0 }));
      break;
    case 'wipe':
    case 'whoosh':
      m.voice(t, 0.22, 0, v({ wave: 'noise', vol: 0.07, a: 0.12, d: 0.1, s: 0, noiseRate: 14000, lp: 3000, pan: -0.4 }));
      m.voice(t + 0.08, 0.14, 0, v({ wave: 'noise', vol: 0.05, a: 0.06, d: 0.08, s: 0, noiseRate: 20000, lp: 6000, pan: 0.4 }));
      break;
    case 'grab':
      m.voice(t, 0.06, sweep(500, 820, 0.06), v({ duty: 0.25, vol: 0.06, d: 0.06, s: 0.5 }));
      break;
    case 'snap':
      m.voice(t, 0.05, sweep(200, 80, 0.05), v({ wave: 'sine', vol: 0.3, d: 0.05, s: 0 }));
      m.voice(t, 0.3, mtof(88), v({ wave: 'tri', vol: 0.12, d: 0.3, s: 0, r: 0.05 }));
      break;
    case 'drop':
      m.voice(t, 0.1, sweep(380, 1100, 0.1, 0.6), v({ wave: 'sine', vol: 0.14, d: 0.1, s: 0.3 }));
      break;
    case 'bubble':
      for (let i = 0; i < 7; i++) m.voice(t + i * 0.05 + (i % 2) * 0.012, 0.035, sweep(300 + i * 60, 800 + i * 90, 0.035), v({ wave: 'sine', vol: 0.06, d: 0.035, s: 0.3, pan: (i % 3) * 0.3 - 0.3 }));
      break;
    case 'pop':
      m.voice(t, 0.4, 0, v({ wave: 'noise', vol: 0.2, a: 0.001, d: 0.4, s: 0, noiseRate: 8000, lp: 5000 }));
      m.voice(t, 0.2, sweep(160, 40, 0.2), v({ wave: 'sine', vol: 0.4, d: 0.2, s: 0 }));
      break;
    case 'grow':
      [72, 76, 79, 84, 88, 91, 96].forEach((nn, i) => m.voice(t + i * 0.055, 0.05, mtof(nn), v({ duty: 0.125, vol: 0.06, d: 0.05, s: 0.5, pan: 0.3 })));
      break;
    case 'mosaic':
      for (let i = 0; i < 8; i++) m.voice(t + i * 0.03, 0.025, mtof(96 - i * 3), v({ duty: 0.5, vol: 0.04, d: 0.03, s: 0.3 }));
      break;
    case 'open':
      m.voice(t, 0.05, mtof(88), v({ duty: 0.5, vol: 0.06, d: 0.05, s: 0.3 }));
      m.voice(t + 0.06, 0.1, mtof(93), v({ duty: 0.5, vol: 0.06, d: 0.1, s: 0.3, r: 0.05 }));
      break;
    case 'star':
      m.voice(t, 0.06, mtof(100), v({ wave: 'tri', vol: 0.07, d: 0.06, s: 0.2, pan: 0.4 }));
      m.voice(t + 0.06, 0.1, mtof(107), v({ wave: 'tri', vol: 0.05, d: 0.1, s: 0, r: 0.05, pan: 0.4 }));
      break;
    case 'ding':
      m.voice(t, 0.6, mtof(88), v({ wave: 'sine', vol: 0.12, a: 0.001, d: 0.6, s: 0, r: 0.1 }));
      m.voice(t, 0.3, mtof(88) * 2.76, v({ wave: 'sine', vol: 0.03, a: 0.001, d: 0.3, s: 0 }));
      break;
    case 'ping':
      m.voice(t, 0.12, mtof(PENTA[arg % PENTA.length] + 12), v({ wave: 'tri', vol: 0.08, a: 0.001, d: 0.12, s: 0, r: 0.05, pan: -0.6 + (arg % 5) * 0.3 }));
      break;
    case 'notify':
      m.voice(t, 0.22, mtof(88), v({ wave: 'sine', vol: 0.16, a: 0.002, d: 0.22, s: 0.3, r: 0.08 }));
      m.voice(t + 0.22, 0.4, mtof(84), v({ wave: 'sine', vol: 0.16, a: 0.002, d: 0.4, s: 0.2, r: 0.15 }));
      break;
    case 'rise':
      [79, 84, 88].forEach((nn, i) => m.voice(t + i * 0.07, 0.06, mtof(nn), v({ duty: 0.125, vol: 0.05, d: 0.06, s: 0.4 })));
      break;
    case 'riser':
      m.voice(t - 0.45, 0.5, 0, v({ wave: 'noise', vol: 0.08, a: 0.48, d: 0.02, s: 0, noiseRate: 16000 }));
      m.voice(t - 0.45, 0.5, sweep(200, 1400, 0.5, 2), v({ duty: 0.5, vol: 0.03, a: 0.4, d: 0.1, s: 0 }));
      break;
    case 'slam':
      m.voice(t, 0.6, sweep(95, 32, 0.6), v({ wave: 'sine', vol: 0.5, a: 0.001, d: 0.6, s: 0 }));
      m.voice(t, 0.5, 0, v({ wave: 'noise', vol: 0.12, a: 0.001, d: 0.5, s: 0, noiseRate: 6000, lp: 3000 }));
      break;
    case 'firework':
      m.voice(t - 0.18, 0.16, sweep(500, 1600, 0.16), v({ wave: 'sine', vol: 0.03, d: 0.16, s: 0.6 }));
      m.voice(t, 0.3, 0, v({ wave: 'noise', vol: 0.09, a: 0.001, d: 0.3, s: 0, noiseRate: 7000, pan: (t * 7) % 1.2 - 0.6 }));
      for (let i = 0; i < 5; i++) m.voice(t + 0.08 + i * 0.045, 0.012, 0, v({ wave: 'noise', vol: 0.05, d: 0.012, s: 0, noiseRate: 24000, pan: 0.5 - i * 0.25 }));
      break;
    default:
      break;
  }
}

export function renderAudio() {
  const m = new Mixer();
  const lead = { L: new Float32Array(N), R: new Float32Array(N) };
  music(m, lead);
  // 리드 딜레이 (점8분, 좌우 핑퐁)
  const dl = Math.round(STEP * 3 * SR);
  for (let i = 0; i < N; i++) {
    const x = lead.L[i];
    m.L[i] += x * 0.95;
    m.R[i] += x * 0.95;
    if (i >= dl) {
      m.L[i] += lead.L[i - dl] * 0.22;
      if (i >= dl * 2) m.R[i] += lead.L[i - dl * 2] * 0.14;
    }
  }
  for (const [frame, name, arg] of SFX) sfx(m, name, frame / FPS, arg);

  // 마스터: 고역 다듬기(로우패스) + DC 제거 → 소프트 클립 → 피크 정규화 → 끝 페이드
  const out = new Float32Array(N * 2);
  let peak = 0;
  const k = Math.tanh(1.3);
  const lpA = 1 - Math.exp((-2 * Math.PI * 11000) / SR);
  const hpA = Math.exp((-2 * Math.PI * 25) / SR);
  const st = [0, 0, 0, 0, 0, 0];
  for (let i = 0; i < N; i++) {
    st[0] += lpA * (m.L[i] - st[0]);
    st[1] += lpA * (m.R[i] - st[1]);
    const hl = hpA * (st[2] + st[0] - st[4]);
    const hr = hpA * (st[3] + st[1] - st[5]);
    st[2] = hl;
    st[3] = hr;
    st[4] = st[0];
    st[5] = st[1];
    const l = Math.tanh(hl * 1.3) / k;
    const r = Math.tanh(hr * 1.3) / k;
    out[i * 2] = l;
    out[i * 2 + 1] = r;
    peak = Math.max(peak, Math.abs(l), Math.abs(r));
  }
  const gain = 0.89 / (peak || 1);
  const fade = Math.round(0.08 * SR);
  for (let i = 0; i < N; i++) {
    const f = i > N - fade ? (N - i) / fade : 1;
    out[i * 2] *= gain * f;
    out[i * 2 + 1] *= gain * f;
  }
  return out;
}
