// BDF(갈무리 픽셀 폰트) → 쇼릴에 쓰이는 글자만 추린 fonts.json
// 사용: npm run showreel:font  (scenes.mjs 의 텍스트를 바꾼 뒤 한 번 실행)
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const dist = join(here, '..', 'node_modules', 'galmuri', 'dist');

const FONTS = {
  b11: 'Galmuri11-Bold.bdf',
  r11: 'Galmuri11.bdf',
  r9: 'Galmuri9.bdf',
  r7: 'Galmuri7.bdf',
};

// showreel/*.mjs 에 등장하는 모든 글자 + 출력 가능한 ASCII
const used = new Set();
for (let c = 32; c < 127; c++) used.add(c);
for (const f of readdirSync(here).filter((n) => n.endsWith('.mjs'))) {
  for (const ch of readFileSync(join(here, f), 'utf8')) {
    const cp = ch.codePointAt(0);
    if (cp > 127) used.add(cp);
  }
}

function parseBdf(src) {
  const lines = src.split('\n');
  const font = { ascent: 0, descent: 0, glyphs: {} };
  let cur = null;
  let inBitmap = false;
  for (const raw of lines) {
    const line = raw.trim();
    if (line.startsWith('FONT_ASCENT ')) font.ascent = +line.split(' ')[1];
    else if (line.startsWith('FONT_DESCENT ')) font.descent = +line.split(' ')[1];
    else if (line.startsWith('STARTCHAR')) cur = { rows: [] };
    else if (cur && line.startsWith('ENCODING ')) cur.cp = +line.split(' ')[1];
    else if (cur && line.startsWith('DWIDTH ')) cur.dw = +line.split(' ')[1];
    else if (cur && line.startsWith('BBX ')) cur.bbx = line.split(' ').slice(1).map(Number);
    else if (line === 'BITMAP') inBitmap = true;
    else if (line === 'ENDCHAR') {
      if (cur && used.has(cur.cp)) {
        const [w, h, xo, yo] = cur.bbx;
        font.glyphs[String.fromCodePoint(cur.cp)] = [cur.dw, w, h, xo, yo, cur.rows.join(',')];
      }
      cur = null;
      inBitmap = false;
    } else if (inBitmap && cur) cur.rows.push(line);
  }
  return font;
}

const out = {};
for (const [key, file] of Object.entries(FONTS)) {
  out[key] = parseBdf(readFileSync(join(dist, file), 'utf8'));
  const missing = [...used].filter((cp) => !out[key].glyphs[String.fromCodePoint(cp)]);
  if (missing.length && key === 'b11') {
    console.warn(`[${key}] 글리프 없음:`, missing.map((c) => String.fromCodePoint(c)).join(''));
  }
}
writeFileSync(join(here, 'fonts.json'), JSON.stringify(out));
console.log(`fonts.json: ${used.size} chars × ${Object.keys(FONTS).length} fonts`);
