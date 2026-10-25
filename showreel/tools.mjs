// 픽셀 수업 도구들: 연필·크레파스·자·책·주판·플라스크·스포이트·돋보기·자석·지구본·로켓·알파벳 블록·원자·행성
import { C, rgb } from './gfx.mjs';
import { clamp, rnd } from './art.mjs';

export const TONE = {
  red: [C.red, rgb('#A9302E'), C.pink],
  blue: [C.blue, C.blueD, C.skyM],
  green: [C.green, C.greenD, C.greenL],
  yellow: [C.yellow, C.yellowD, C.lemon],
  purple: [C.purple, C.purpleD, C.lav],
  orange: [C.orange, C.orangeD, C.orangeL],
  pink: [C.pinkH, rgb('#C8457A'), C.pink],
};

// 가로 연필 (오른쪽이 심). x,y = 왼쪽 위
export function pencil(g, x, y, len, th, tone = TONE.yellow) {
  const [base, dark, lite] = tone;
  const e = Math.round(len * 0.1);
  const b = Math.max(3, Math.round(len * 0.06));
  const cone = Math.round(Math.min(len * 0.2, th * 1.6));
  const xc = x + len - cone;
  const mid = y + th / 2;
  g.rect(x - 1, y - 1, xc - x + 2, th + 2, C.ink);
  g.tri(xc, y - 1.5, xc, y + th + 1.5, x + len + 1.5, mid, C.ink);
  g.rbox(x, y, e + 2, th, C.pinkH, 2);
  g.rect(x + 2, y + 1, e - 1, 1, C.pink);
  g.rect(x + e, y, b, th, C.gray);
  for (let i = 1; i < b; i += 2) g.rect(x + e + i, y, 1, th, C.grayD);
  g.rect(x + e + b, y, xc - x - e - b, th, base);
  g.rect(x + e + b, y, xc - x - e - b, Math.max(1, Math.round(th / 3)), lite);
  g.rect(x + e + b, y + th - Math.max(1, Math.round(th / 3)), xc - x - e - b, Math.max(1, Math.round(th / 3)), dark);
  g.tri(xc, y, xc, y + th, x + len, mid, C.skin);
  g.tri(xc, y + th * 0.55, xc, y + th, x + len, mid, C.skinS);
  const tx = xc + cone * 0.62;
  const hh = (th / 2) * 0.38;
  g.tri(tx, mid - hh, tx, mid + hh, x + len, mid, C.ink);
}

// 세운 연필 (심이 위). x,y = 왼쪽 아래
export function pencilUp(g, x, y, len, th, tone = TONE.yellow) {
  const [base, dark, lite] = tone;
  const e = Math.round(len * 0.1);
  const b = Math.max(3, Math.round(len * 0.06));
  const cone = Math.round(Math.min(len * 0.2, th * 1.6));
  const yc = y - len + cone;
  const mid = x + th / 2;
  g.rect(x - 1, yc - 1, th + 2, y - yc + 2, C.ink);
  g.tri(x - 1.5, yc, x + th + 1.5, yc, mid, y - len - 1.5, C.ink);
  g.rbox(x, y - e - 2, th, e + 2, C.pinkH, 2);
  g.rect(x, y - e - b, th, b, C.gray);
  for (let i = 1; i < b; i += 2) g.rect(x, y - e - b + i, th, 1, C.grayD);
  g.rect(x, yc, th, y - e - b - yc, base);
  g.rect(x, yc, Math.max(1, Math.round(th / 3)), y - e - b - yc, lite);
  g.rect(x + th - Math.max(1, Math.round(th / 3)), yc, Math.max(1, Math.round(th / 3)), y - e - b - yc, dark);
  g.tri(x, yc, x + th, yc, mid, y - len, C.skin);
  g.tri(x + th * 0.55, yc, x + th, yc, mid, y - len, C.skinS);
  const ty = yc - cone * 0.62;
  const hw = (th / 2) * 0.38;
  g.tri(mid - hw, ty, mid + hw, ty, mid, y - len, base === C.yellow ? C.ink : dark);
}

// 크레파스 (끝이 위). x,y = 왼쪽 아래
export function crayon(g, x, y, h, w, tone = TONE.red) {
  const [base, dark, lite] = tone;
  const tip = Math.round(w * 1.1);
  g.rect(x - 1, y - h + tip - 1, w + 2, h - tip + 2, C.ink);
  g.quad(x - 1, y - h + tip, x + w + 1, y - h + tip, x + w * 0.75 + 1, y - h - 1, x + w * 0.25 - 1, y - h - 1, C.ink);
  g.rect(x, y - h + tip, w, h - tip, base);
  g.quad(x, y - h + tip, x + w, y - h + tip, x + w * 0.75, y - h, x + w * 0.25, y - h, base);
  g.rect(x, y - h + tip, 1, h - tip, lite);
  // 종이 포장
  const py = y - h + tip + Math.round((h - tip) * 0.25);
  const ph = Math.round((h - tip) * 0.55);
  g.rect(x, py, w, ph, dark);
  g.rect(x, py + 2, w, 1, lite);
  g.rect(x, py + ph - 3, w, 1, lite);
}

// 나무 자. x,y = 왼쪽 위
export function ruler(g, x, y, w, h, o = {}) {
  const { from = 0, nums = true } = o;
  g.box(x, y, w, h, C.gold, C.ink);
  g.rect(x + 1, y + h - 3, w - 2, 2, C.brownL);
  for (let i = 0; i < w - 2; i++) {
    const n = Math.round(from + i);
    if (n % 5 !== 0) continue;
    const L = n % 50 === 0 ? 6 : n % 25 === 0 ? 4 : 2;
    g.rect(x + 1 + i, y + 1, 1, L, C.brownD);
    if (nums && n % 50 === 0 && i > 3 && i < w - 8) {
      g.text(String((n / 50) % 10), x + 3 + i, y + h - 9, { font: 'r7', color: C.brownD });
    }
  }
}

// 옆으로 누운 책 (계단용). x,y = 왼쪽 위
export function bookSide(g, x, y, w, h, tone = TONE.blue) {
  const [base, dark] = tone;
  g.box(x, y, w, h, base, C.ink, 1, 1);
  g.rect(x + 5, y + 2, w - 6, h - 4, C.cream);
  for (let yy = y + 3; yy < y + h - 2; yy += 2) g.rect(x + 5, yy, w - 6, 1, C.paper);
  g.rect(x + 1, y + 1, 4, h - 2, dark);
  g.rect(x + 2, y + Math.floor(h / 2) - 1, 2, 2, C.yellow);
}

// 앞표지 책. x,y = 왼쪽 위
export function bookFront(g, x, y, w, h, tone = TONE.red, label = '') {
  const [base, dark, lite] = tone;
  g.rect(x + 3, y + 3, w, h, C.ink);
  g.box(x, y, w, h, C.cream, C.ink);
  g.box(x, y, w - 3, h, base, C.ink);
  g.rect(x + 1, y + 1, 2, h - 2, dark);
  g.box(x + 6, y + 5, w - 13, 7, lite, C.ink);
  if (label) g.text(label, x + (w - 3) / 2 + 1, y + h - 13, { font: 'b11', color: C.white, outline: C.ink, ow: 1, align: 'center' });
  g.rect(x + w - 8, y + h, 3, 5, C.red);
  g.rect(x + w - 8, y + h + 5, 1, 1, C.red);
  g.rect(x + w - 6, y + h + 5, 1, 1, C.red);
}

// 주판. counts[i] = i번째 줄에서 왼쪽으로 옮긴 알 수(실수 허용 → 미끄러짐)
export function abacus(g, x, y, w, h, counts = [0, 0, 0, 0]) {
  g.rect(x + 3, y + 3, w, h, C.ink);
  g.box(x, y, w, h, C.brown, C.ink, 1, 2);
  g.box(x + 4, y + 4, w - 8, h - 8, C.lemon, C.ink);
  const rows = counts.length;
  const colors = [C.red, C.yellow, C.blue, C.green, C.purple];
  const br = 2.6;
  const n = 6;
  for (let r = 0; r < rows; r++) {
    const ry = y + 4 + ((h - 8) * (r + 0.5)) / rows;
    g.rect(x + 4, ry, w - 8, 1, C.brownD);
    const left = x + 4 + br + 1;
    const right = x + w - 4 - br - 1;
    for (let i = 0; i < n; i++) {
      const moved = clamp(counts[r] - i);
      const lx = left + i * (br * 2 + 0.5);
      const rx = right - (n - 1 - i) * (br * 2 + 0.5);
      const bx = rx + (lx - rx) * moved;
      g.circle(bx, ry, br + 1, C.ink);
      g.circle(bx, ry, br, colors[r % colors.length]);
      g.rect(bx - 1, ry - 2, 1, 1, C.white);
    }
  }
}

// 삼각 플라스크. cx = 중앙, by = 바닥
export function flask(g, cx, by, w, h, o = {}) {
  const { level = 0.5, liquid = C.skyM, f = 0, bubbles = 0, liquid2 = null, mix = 0 } = o;
  const nw = Math.round(w * 0.34);
  const neckH = Math.round(h * 0.32);
  const top = by - h;
  const neckB = top + neckH;
  const half = (yy) => (yy < neckB ? nw / 2 : nw / 2 + ((w / 2 - nw / 2) * (yy - neckB)) / (by - neckB));
  const liqTop = by - (by - neckB) * level;
  for (let yy = top; yy < by; yy++) {
    const hw = half(yy);
    g.rect(cx - hw - 1, yy, hw * 2 + 2, 1, C.ink);
  }
  g.rect(cx - w / 2, by, w, 1, C.ink);
  g.rect(cx - nw / 2 - 3, top - 2, nw + 6, 4, C.ink);
  for (let yy = top + 1; yy < by; yy++) {
    const hw = half(yy) - 1;
    const wave = Math.sin(f * 0.25 + yy) > 0.5 ? 1 : 0;
    let c = C.glass;
    if (yy > liqTop + (yy - liqTop < 2 ? wave : 0)) c = liquid;
    g.rect(cx - hw, yy, hw * 2, 1, c);
    if (c === liquid && liquid2 != null && mix > 0) {
      g.dither(cx - hw, yy, hw * 2, 1, liquid2, mix);
    }
  }
  g.rect(cx - nw / 2 - 2, top - 1, nw + 4, 2, C.white);
  // 유리 반사광
  for (let yy = neckB + 4; yy < by - 6; yy++) g.rect(cx - half(yy) + 3, yy, 1, 1, C.white);
  g.rect(cx - nw / 2 + 2, top + 3, 1, neckH - 4, C.white);
  // 눈금
  for (let i = 1; i <= 3; i++) {
    const yy = Math.round(by - ((by - neckB) * i) / 4);
    g.rect(cx + half(yy) - 6, yy, 4, 1, C.ink2);
  }
  // 거품
  for (let i = 0; i < bubbles; i++) {
    const life = 40;
    const ph = (f + rnd(i, 4) * life) % life;
    const bx = cx + (rnd(i, 5) - 0.5) * (w * 0.5);
    const yy = by - 3 - ph * 1.4;
    if (yy < liqTop - 2 && ph > 0) continue;
    const r = 1 + (i % 3 === 0 ? 1 : 0);
    g.ring(bx, Math.max(liqTop, yy), r, C.white);
  }
}

// 스포이트 (위 고무, 아래 유리). cx, y = 고무 위쪽
export function dropper(g, cx, y, color, o = {}) {
  const { squeeze = 0, fill = 0.6 } = o;
  const bw = 7 - squeeze * 2;
  g.ellipse(cx, y + 6, bw + 1, 7, C.ink);
  g.ellipse(cx, y + 6, bw, 6, C.orangeD);
  g.ellipse(cx - 2, y + 4, bw * 0.4, 2, C.orangeL);
  g.box(cx - 5, y + 11, 10, 3, C.gray, C.ink);
  g.box(cx - 3, y + 13, 6, 22, C.glass, C.ink);
  g.rect(cx - 2, y + 14 + 20 * (1 - fill), 4, 20 * fill, color);
  g.tri(cx - 3, y + 34, cx + 3, y + 34, cx, y + 41, C.ink);
  g.tri(cx - 2, y + 34, cx + 2, y + 34, cx, y + 39, color);
  g.rect(cx - 2, y + 15, 1, 8, C.white);
}

export function magnifier(g, cx, cy, r) {
  g.line(cx + r * 0.7, cy + r * 0.7, cx + r * 1.7, cy + r * 1.7, C.ink, 6);
  g.line(cx + r * 0.75, cy + r * 0.75, cx + r * 1.65, cy + r * 1.65, C.brown, 3);
  g.circle(cx, cy, r + 2, C.ink);
  g.circle(cx, cy, r + 1, C.gray);
  g.circle(cx, cy, r - 1, C.ink);
  g.circle(cx, cy, r - 2, C.glass);
  g.oval(cx, cy, r - 4, r - 4, C.white, { from: Math.PI * 1.05, to: Math.PI * 1.45, t: 2 });
}

// 말굽자석 (입이 아래). cx = 중앙, y = 위
export function magnet(g, cx, y, s = 1) {
  const R = 9 * s;
  const T = 5 * s;
  const cy = y + R;
  g.save();
  g.clip(cx - R - 2, y - 2, R * 2 + 4, R + 2);
  g.ring(cx, cy, R + 1, C.ink, T + 2);
  g.ring(cx, cy, R, C.red, T);
  g.restore();
  for (const sx of [-1, 1]) {
    const lx = sx < 0 ? cx - R - 1 : cx + R - T;
    g.rect(lx, cy, T + 2, 10 * s + 1, C.ink);
    g.rect(lx + 1, cy, T, 6 * s, C.red);
    g.rect(lx + 1, cy + 6 * s, T, 4 * s, C.gray);
  }
}

// 돌아가는 지구본. cx,cy = 구 중심
export function globe(g, cx, cy, r, f) {
  g.oval(cx, cy, r + 4, r + 4, C.ink, { from: Math.PI * 0.6, to: Math.PI * 2.0, t: 3 });
  g.oval(cx, cy, r + 4, r + 4, C.brownL, { from: Math.PI * 0.62, to: Math.PI * 1.98, t: 1 });
  g.box(cx - 2, cy + r + 3, 4, 5, C.brown, C.ink);
  g.box(cx - 10, cy + r + 7, 20, 4, C.brown, C.ink, 1, 1);
  g.circle(cx, cy, r + 1, C.ink);
  const R = Math.ceil(r);
  for (let dy = -R; dy <= R; dy++) {
    for (let dx = -R; dx <= R; dx++) {
      const d2 = dx * dx + dy * dy;
      if (d2 > r * r) continue;
      const lon = Math.asin(clamp(dx / Math.sqrt(Math.max(1, r * r - dy * dy)), -1, 1)) + f * 0.03;
      const lat = dy / r;
      const n = Math.sin(lon * 2.0 + 0.3) * Math.cos(lat * 3.1) + Math.sin(lon * 3.3 + lat * 2.2) * 0.6;
      let c = n > 0.45 ? C.green : C.blue;
      if (d2 > (r - 2) * (r - 2) && dx > 0) c = n > 0.45 ? C.greenD : C.blueD;
      g.pset(cx + dx, cy + dy, c);
    }
  }
  g.rect(cx - r * 0.45, cy - r * 0.55, 2, 2, C.white);
}

// 로켓 (위로). cx = 중앙, y = 코끝
export function rocket(g, cx, y, f, s = 1) {
  const w = 12 * s;
  const h = 26 * s;
  // 불꽃
  const fl = 6 + (Math.floor(f / 3) % 2) * 3;
  g.tri(cx - 4 * s, y + h, cx + 4 * s, y + h, cx, y + h + fl * s + 3, C.ink);
  g.tri(cx - 3 * s, y + h, cx + 3 * s, y + h, cx, y + h + fl * s, C.orange);
  g.tri(cx - 1.5 * s, y + h, cx + 1.5 * s, y + h, cx, y + h + fl * s * 0.6, C.yellow);
  // 날개
  for (const sx of [-1, 1]) {
    g.tri(cx + sx * w * 0.4, y + h * 0.55, cx + sx * w * 0.95, y + h + 1, cx + sx * w * 0.35, y + h + 1, C.ink);
    g.tri(cx + sx * w * 0.42, y + h * 0.62, cx + sx * w * 0.8, y + h - 0.5, cx + sx * w * 0.4, y + h - 0.5, C.red);
  }
  g.ellipse(cx, y + h * 0.55, w / 2 + 1, h * 0.5 + 1, C.ink);
  g.ellipse(cx, y + h * 0.55, w / 2, h * 0.5, C.white);
  g.ellipse(cx + 1, y + h * 0.6, w / 2 - 2, h * 0.42, C.cream);
  g.save();
  g.clip(cx - w, y - 2, w * 2, h * 0.32);
  g.ellipse(cx, y + h * 0.55, w / 2, h * 0.5, C.red);
  g.restore();
  g.circle(cx, y + h * 0.48, 3 * s + 1, C.ink);
  g.circle(cx, y + h * 0.48, 3 * s, C.blue);
  g.rect(cx - 1, y + h * 0.48 - 2, 1, 1, C.white);
}

// 3D 장난감 글자 블록. x,y = 앞면 왼쪽 위
export function letterBlock(g, x, y, s, ch, tone = TONE.red, o = {}) {
  const { fg = C.white, scale = 2 } = o;
  const [base, dark, lite] = tone;
  const d = Math.round(s * 0.28);
  x = Math.round(x);
  y = Math.round(y);
  g.quad(x - 1, y, x + d - 1, y - d - 1, x + s + d + 1, y - d - 1, x + s + 1, y, C.ink);
  g.quad(x + s, y - 1, x + s + d + 1, y - d - 1, x + s + d + 1, y + s - d, x + s, y + s + 1, C.ink);
  g.quad(x + 1, y, x + d, y - d, x + s + d, y - d, x + s, y, lite);
  g.quad(x + s, y, x + s + d, y - d, x + s + d, y + s - d - 1, x + s, y + s, dark);
  g.box(x, y, s + 1, s + 1, base, C.ink);
  g.box(x + 3, y + 3, s - 5, s - 5, null, lite);
  g.rect(x + 4, y + 4, s - 7, s - 7, base);
  if (ch) g.text(ch, x + s / 2 + 1, y + s / 2 - g.cap('b11') * scale / 2, { scale, color: fg, outline: C.ink, ow: Math.max(1, scale - 1), align: 'center' });
}

export function atom(g, cx, cy, r, f) {
  for (let k = 0; k < 3; k++) {
    const rot = (k * Math.PI) / 3;
    g.oval(cx, cy, r, r * 0.36, C.ink, { rot, t: 2 });
    g.oval(cx, cy, r, r * 0.36, C.blue, { rot, t: 1 });
  }
  for (let k = 0; k < 3; k++) {
    const rot = (k * Math.PI) / 3;
    const a = f * 0.12 + k * 2.1;
    const ex = Math.cos(a) * r;
    const ey = Math.sin(a) * r * 0.36;
    const px = cx + ex * Math.cos(rot) - ey * Math.sin(rot);
    const py = cy + ex * Math.sin(rot) + ey * Math.cos(rot);
    g.circle(px, py, 2.4, C.ink);
    g.circle(px, py, 1.5, C.yellow);
  }
  g.circle(cx, cy, 4, C.ink);
  g.circle(cx, cy, 3, C.red);
  g.rect(cx - 1, cy - 2, 1, 1, C.white);
}

export function planet(g, cx, cy, r, tone = TONE.purple, ring = C.gold) {
  const [base, dark, lite] = tone;
  g.oval(cx, cy, r * 1.8, r * 0.45, C.ink, { t: 3, from: Math.PI, to: Math.PI * 2, rot: -0.25 });
  g.oval(cx, cy, r * 1.8, r * 0.45, ring, { t: 1, from: Math.PI, to: Math.PI * 2, rot: -0.25 });
  g.circle(cx, cy, r + 1, C.ink);
  g.circle(cx, cy, r, base);
  g.save();
  g.clip(cx - r, cy - r, r * 2 + 1, r * 2 + 1);
  g.dither(cx - r, cy + r * 0.2, r * 2 + 1, r * 0.25, dark, 0.5);
  g.dither(cx - r, cy - r * 0.45, r * 2 + 1, r * 0.2, lite, 0.5);
  g.restore();
  g.circle(cx - r * 0.35, cy - r * 0.4, r * 0.18, lite);
  g.oval(cx, cy, r * 1.8, r * 0.45, C.ink, { t: 3, from: 0, to: Math.PI, rot: -0.25 });
  g.oval(cx, cy, r * 1.8, r * 0.45, ring, { t: 1, from: 0, to: Math.PI, rot: -0.25 });
}

// 시험관 꽂이
export function tubeRack(g, x, y, f = 0) {
  const cols = [C.pinkH, C.green, C.blue];
  cols.forEach((c, i) => {
    const tx = x + 4 + i * 10;
    g.box(tx, y - 18, 7, 22, C.glass, C.ink, 1, 2);
    const lv = 7 + Math.round(Math.sin(f * 0.1 + i) * 1);
    g.rbox(tx + 1, y + 3 - lv, 5, lv, c, 2);
    g.rect(tx + 1, y - 16, 1, 6, C.white);
  });
  g.box(x, y - 6, 36, 4, C.brownL, C.ink);
  g.box(x, y + 2, 36, 5, C.brown, C.ink);
}

export function microscope(g, x, y) {
  // x,y = 바닥 중앙
  g.box(x - 12, y - 5, 24, 5, C.grayD, C.ink, 1, 1);
  g.box(x + 3, y - 30, 5, 26, C.gray, C.ink);
  g.box(x - 8, y - 16, 14, 3, C.grayD, C.ink);
  g.line(x + 4, y - 30, x - 4, y - 40, C.ink, 7);
  g.line(x + 4, y - 30, x - 4, y - 40, C.white, 3);
  g.box(x - 8, y - 46, 7, 6, C.ink2, C.ink);
  g.box(x - 3, y - 26, 4, 6, C.ink2, C.ink);
}

// 고양이 (CAT 보상). x,y = 발 아래 중앙
export function cat(g, x, y, f, o = {}) {
  const { jump = 0, flip = false } = o;
  const d = flip ? -1 : 1;
  y -= jump;
  const step = Math.floor(f / 5) % 2;
  // 꼬리
  for (let i = 0; i < 8; i++) {
    const tx = x - d * (8 + i * 0.8);
    const ty = y - 7 - i * 1.3 + Math.sin(f * 0.2 + i * 0.5) * (i * 0.3);
    g.rect(tx - 1.5, ty - 1.5, 4, 4, C.ink);
  }
  for (let i = 0; i < 8; i++) {
    const tx = x - d * (8 + i * 0.8);
    const ty = y - 7 - i * 1.3 + Math.sin(f * 0.2 + i * 0.5) * (i * 0.3);
    g.rect(tx - 0.5, ty - 0.5, 2, 2, i > 5 ? C.white : C.orangeL);
  }
  // 다리
  for (const [lx, up] of [[-5, step], [-2, 1 - step], [3, step], [6, 1 - step]]) {
    g.box(x + d * lx - 1, y - 4 - up, 3, 4 + up, C.white, C.ink);
  }
  g.ellipse(x, y - 7, 9.5, 5.5, C.ink);
  g.ellipse(x, y - 7, 8.5, 4.5, C.orangeL);
  g.ellipse(x - d * 1, y - 5, 5, 2.2, C.white);
  for (let i = -1; i <= 1; i++) g.rect(x + i * 3 - d, y - 11, 1, 3, C.orange);
  // 머리
  const hx = x + d * 8;
  const hy = y - 14;
  for (const s of [-1, 1]) {
    g.tri(hx + s * 6 + (s > 0 ? 1 : -1), hy - 2, hx + s * 1, hy - 5, hx + s * 5, hy - 11, C.ink);
    g.tri(hx + s * 5, hy - 3, hx + s * 2, hy - 5, hx + s * 4.5, hy - 9, C.orangeL);
  }
  g.circle(hx, hy, 7, C.ink);
  g.circle(hx, hy, 6, C.orangeL);
  g.ellipse(hx, hy + 2.5, 4, 2.5, C.white);
  for (const s of [-1, 1]) {
    g.rect(hx + s * 2.5 - (s > 0 ? 0 : 1), hy - 1, 2, 2, C.ink);
    g.rect(hx + s * 5, hy + 2, 3 * s, 1, C.ink);
  }
  g.rect(hx - 0.5, hy + 1, 2, 1, C.pinkH);
}
