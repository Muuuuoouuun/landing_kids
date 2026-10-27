// 캐릭터·소품·이펙트. 전부 프레임 번호만으로 결정되는 순수 함수라
// 같은 프레임은 언제 그려도 같은 픽셀이 나온다.
import { C } from './gfx.mjs';

// ───── 수학 & 이징 ─────
export const clamp = (v, a = 0, b = 1) => (v < a ? a : v > b ? b : v);
export const lerp = (a, b, t) => a + (b - a) * t;
export const prog = (f, a, b) => clamp((f - a) / (b - a));
export const eOut = (t) => 1 - (1 - t) ** 3;
export const eIn = (t) => t * t * t;
export const eIO = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
export const eBack = (t) => 1 + 2.70158 * (t - 1) ** 3 + 1.70158 * (t - 1) ** 2;
export const eBounce = (t) => {
  const n = 7.5625;
  const d = 2.75;
  if (t < 1 / d) return n * t * t;
  if (t < 2 / d) return n * (t -= 1.5 / d) * t + 0.75;
  if (t < 2.5 / d) return n * (t -= 2.25 / d) * t + 0.9375;
  return n * (t -= 2.625 / d) * t + 0.984375;
};
export const eElastic = (t) =>
  t <= 0 ? 0 : t >= 1 ? 1 : 2 ** (-10 * t) * Math.sin((t * 10 - 0.75) * ((2 * Math.PI) / 3)) + 1;
export const rnd = (i, s = 0) => {
  const x = Math.sin(i * 127.1 + s * 311.7 + 0.123) * 43758.5453;
  return x - Math.floor(x);
};
// 0→1 구간에서 위로 튀었다 내려오는 포물선
export const hop = (t) => (t <= 0 || t >= 1 ? 0 : 4 * t * (1 - t));

// ───── 마스코트 "미니": 새싹 달린 주황 젤리 ─────
// x,y = 발 아래 중앙. sq<1 이면 납작, >1 이면 길쭉
export function mascot(g, x, y, o = {}) {
  const {
    r = 10, sq = 1, face = 'smile', arms = 'down', f = 0, run = false, flip = false,
    glow = false, flower = false,
  } = o;
  const ry = r * sq;
  const rx = r * (1 + (1 - sq) * 0.9);
  const step = run ? Math.floor(f / 5) % 2 : 0;
  const bob = run ? (step ? -1 : 0) : 0;
  const cx = x;
  const cy = y - ry - 2 + bob;
  const dir = flip ? -1 : 1;
  const k = r / 10;

  if (glow) {
    g.dither(cx - rx - 8, cy - ry - 12, rx * 2 + 16, ry * 2 + 20, C.white, 0.35);
  }
  // 발
  const fy0 = y - 2 + (run && step ? -2 : 0);
  const fy1 = y - 2 + (run && !step ? -2 : 0);
  for (const [fx, fy] of [[cx - rx * 0.45, fy0], [cx + rx * 0.45, fy1]]) {
    g.ellipse(fx, fy, 3.2 * k + 0.5, 2.2 * k + 0.4, C.ink);
    g.ellipse(fx, fy - 0.3, 2.4 * k, 1.4 * k, C.orangeD);
  }
  // 팔 (몸 뒤)
  const armY = arms === 'up' ? cy - ry * 0.75 : arms === 'wave' ? cy - ry * (0.55 + 0.25 * Math.sin(f * 0.5)) : cy + ry * 0.25;
  for (const s of [-1, 1]) {
    const ax = cx + s * (rx + (arms === 'down' ? 0.5 : 0));
    g.ellipse(ax, armY, 2.6 * k + 0.5, 2.6 * k + 0.5, C.ink);
    g.ellipse(ax, armY, 1.8 * k, 1.8 * k, C.orange);
  }
  // 새싹
  const sway = Math.round(Math.sin(f * 0.18) * 1.2 * k);
  const top = cy - ry;
  g.rect(cx - 1, top - 5 * k, 2 + (k > 1.2 ? 1 : 0), 5 * k + 1, C.ink);
  g.rect(cx - 0.5, top - 5 * k + 1, 1 + (k > 1.2 ? 1 : 0), 5 * k, C.greenD);
  for (const s of [-1, 1]) {
    const lx = cx + s * 3.2 * k + sway;
    const ly = top - 6 * k + (s > 0 ? -1 : 0);
    g.ellipse(lx, ly, 3.6 * k + 0.5, 2.4 * k + 0.5, C.ink);
    g.ellipse(lx, ly, 2.8 * k, 1.6 * k, C.green);
    g.rect(lx - s * 1.2 * k - 0.5, ly - 1, 1.5 * k, 1, C.greenL);
  }
  if (flower) {
    const fx = cx + sway;
    const fy = top - 9 * k;
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2 + f * 0.05;
      g.circle(fx + Math.cos(a) * 2.6 * k, fy + Math.sin(a) * 2.6 * k, 2 * k + 0.6, C.ink);
    }
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2 + f * 0.05;
      g.circle(fx + Math.cos(a) * 2.6 * k, fy + Math.sin(a) * 2.6 * k, 1.5 * k, C.pinkH);
    }
    g.circle(fx, fy, 1.6 * k, C.yellow);
  }
  // 몸통 (외곽선 → 그림자 → 본색 → 하이라이트)
  g.ellipse(cx, cy, rx + 1, ry + 1, C.ink);
  g.ellipse(cx, cy, rx, ry, C.orangeD);
  g.ellipse(cx - 0.7, cy - 1, rx - 1.2, ry - 1.4, C.orange);
  g.ellipse(cx - rx * 0.42, cy - ry * 0.5, rx * 0.26, ry * 0.18, C.orangeL);
  g.rect(cx - rx * 0.55, cy - ry * 0.62, Math.max(1, k), Math.max(1, k), C.white);
  // 배
  g.ellipse(cx, cy + ry * 0.42, rx * 0.5, ry * 0.36, C.gold);
  // 얼굴
  const ex = rx * 0.36;
  const ey = cy - ry * 0.12;
  const ew = Math.max(2, Math.round(2 * k));
  const eh = Math.max(2, Math.round(3 * k));
  for (const s of [-1, 1]) {
    const px = Math.round(cx + s * ex + dir * 0.6 - ew / 2);
    if (face === 'happy') {
      // ^ ^
      g.rect(px, ey, 1, 1, C.ink);
      g.rect(px + 1, ey - 1, Math.max(1, ew - 1), 1, C.ink);
      g.rect(px + ew, ey, 1, 1, C.ink);
    } else if (face === 'blink') {
      g.rect(px, ey + 1, ew, 1, C.ink);
    } else {
      const big = face === 'wow' ? 1 : 0;
      g.rect(px - big, Math.round(ey - eh / 2) - big, ew + big, eh + big * 2, C.ink);
      g.rect(px - big, Math.round(ey - eh / 2) - big, Math.max(1, Math.round(k)), Math.max(1, Math.round(k)), C.white);
    }
    g.rect(Math.round(cx + s * rx * 0.66 - k), Math.round(cy + ry * 0.12), Math.max(2, 2 * k), Math.max(1, k), C.pinkH);
  }
  const my = Math.round(cy + ry * 0.2);
  if (face === 'smile' || face === 'blink') {
    g.rect(cx - k, my, 1, 1, C.ink);
    g.rect(cx - k + 1, my + 1, Math.max(1, 2 * k - 1), 1, C.ink);
    g.rect(cx + k, my, 1, 1, C.ink);
  } else {
    const mw = face === 'wow' ? 2.2 * k : 2.8 * k;
    g.ellipse(cx, my + k, mw + 0.6, 1.8 * k + 0.6, C.ink);
    g.ellipse(cx, my + k + 0.3, mw - 0.5, 1.2 * k, C.red);
  }
}

// ───── 아이들 ─────
export const KIDS = {
  jiwoo: { name: '지우', hair: C.hair, style: 'buns', shirt: C.pinkH },
  minjun: { name: '민준', hair: C.hair, style: 'cap', cap: C.blue, shirt: C.yellow },
  seoyeon: { name: '서연', hair: C.hairB, style: 'long', shirt: C.green },
  doha: { name: '도하', hair: C.hair, style: 'short', shirt: C.purple },
};

// x,y = 머리 중심
export function kidHead(g, x, y, r, kid, o = {}) {
  const { mood = 'smile', f = 0 } = o;
  const k = r / 8;
  if (kid.style === 'buns') {
    for (const s of [-1, 1]) {
      g.circle(x + s * r * 0.82, y - r * 0.72, r * 0.42 + 1, C.ink);
      g.circle(x + s * r * 0.82, y - r * 0.72, r * 0.42, kid.hair);
    }
  }
  if (kid.style === 'long') {
    // 어깨까지 내려오는 옆머리 (턱 아래는 비워 둠)
    for (const s of [-1, 1]) {
      const sx = x + s * r * 0.78;
      g.box(sx - r * 0.32 - 1, y - r * 0.2, r * 0.64 + 2, r * 1.35, kid.hair, C.ink, 1, Math.max(1, Math.round(r * 0.25)));
    }
  }
  g.circle(x, y, r + 1, C.ink);
  g.circle(x, y, r, kid.hair);
  if (kid.style !== 'long') {
    for (const s of [-1, 1]) {
      g.circle(x + s * r * 0.92, y + r * 0.22, r * 0.2 + 1, C.ink);
      g.circle(x + s * r * 0.92, y + r * 0.22, r * 0.2, C.skinS);
    }
  }
  g.ellipse(x, y + r * 0.24, r * 0.8, r * 0.7, C.skin);
  // 앞머리
  if (kid.style === 'short' || kid.style === 'cap') {
    g.rect(x - r * 0.8, y - r * 0.5, r * 1.6, r * 0.32, kid.hair);
    for (let i = 0; i < 4; i++) g.rect(x - r * 0.7 + i * r * 0.42, y - r * 0.2, r * 0.22, r * 0.14, kid.hair);
  } else {
    g.ellipse(x - r * 0.32, y - r * 0.36, r * 0.6, r * 0.3, kid.hair);
    g.ellipse(x + r * 0.42, y - r * 0.42, r * 0.45, r * 0.2, kid.hair);
  }
  // 눈·볼·입
  const ew = Math.max(1, Math.round(k * 1.2));
  const eh = Math.max(2, Math.round(k * 2));
  for (const s of [-1, 1]) {
    const ex = Math.round(x + s * r * 0.34 - ew / 2);
    const ey = Math.round(y + r * 0.12);
    if (mood === 'blink' || mood === 'happy') {
      g.rect(ex - (mood === 'happy' ? 0 : 0), ey + 1, ew + 1, 1, C.ink);
      if (mood === 'happy') g.rect(ex + Math.floor(ew / 2), ey, 1, 1, C.ink);
    } else {
      g.rect(ex, ey, ew, eh, C.ink);
      if (r >= 12) g.rect(ex, ey, 1, 1, C.white);
    }
    g.rect(Math.round(x + s * r * 0.56 - k * 0.6), Math.round(y + r * 0.46), Math.max(2, Math.round(k * 1.4)), Math.max(1, Math.round(k * 0.6)), C.pink);
  }
  const my = Math.round(y + r * 0.56);
  if (mood === 'open' || mood === 'happy') {
    const mw = Math.max(2, Math.round(k * 1.6));
    const mh = Math.max(2, Math.round(k * 1.5));
    g.save();
    g.clip(x - mw - 2, my - 1, mw * 2 + 4, mh + 3);
    g.ellipse(x, my - 1, mw + 1, mh + 1, C.ink);
    g.ellipse(x, my - 1, mw, mh, C.red);
    g.restore();
    g.rect(x - mw, my - 1, mw * 2 + 1, 1, C.ink);
    if (k >= 1.5) g.rect(x - mw + 1, my, mw * 2 - 1, 1, C.white);
  } else {
    g.rect(x - k, my, 1, 1, C.ink);
    g.rect(x - k + 1, my + 1, Math.max(1, 2 * k - 1), 1, C.ink);
    g.rect(x + k, my, 1, 1, C.ink);
  }
  if (kid.style === 'cap') {
    g.save();
    g.clip(x - r - 4, y - r - 4, r * 2 + 8, r * 0.9 + 4);
    g.ellipse(x, y - r * 0.1, r * 1.05 + 1, r * 0.95 + 1, C.ink);
    g.ellipse(x, y - r * 0.1, r * 1.05, r * 0.95, kid.cap);
    g.restore();
    g.rect(x - r * 1.05, y - r * 0.25, r * 2.1, 1, C.ink);
    g.box(x - r * 0.1, y - r * 0.32, r * 1.5, Math.max(3, r * 0.28), kid.cap, C.ink);
    g.rect(x - r * 0.35, y - r * 0.85, r * 0.3, r * 0.3, C.white);
  }
  if (kid.style === 'buns') {
    g.rect(x + r * 0.45, y - r * 0.82, r * 0.35, r * 0.25, C.pinkH);
  }
}

// 어깨까지 (초상화용). x,y = 머리 중심
export function kidBust(g, x, y, r, kid, o = {}) {
  const w = r * 2.3;
  g.box(x - w / 2, y + r * 0.78, w, r * 1.5, kid.shirt, C.ink, 1, Math.round(r * 0.5));
  g.rect(x - r * 0.3, y + r * 0.85, r * 0.6, r * 0.3, C.skin);
  kidHead(g, x, y, r, kid, o);
}

// 어른 (엄마·선생님). x,y = 발 아래 중앙
export function adult(g, x, y, o = {}) {
  const { hair = C.hair, top = C.mint, style = 'mom', point = 0, f = 0, mood = 'smile' } = o;
  const r = 7;
  const hy = y - 44;
  // 다리
  g.box(x - 6, y - 14, 5, 14, C.navy, C.ink);
  g.box(x + 1, y - 14, 5, 14, C.navy, C.ink);
  // 몸
  g.box(x - 9, hy + 7, 18, 25, top, C.ink, 1, 3);
  if (style === 'mom') g.box(x - 6, hy + 15, 12, 17, C.cream, C.ink, 1, 1);
  // 팔
  const ax = x + 9;
  const ay = hy + 12;
  const tx = ax + 10 * point;
  const ty = ay + 10 - 18 * point;
  g.line(ax, ay, tx, ty, C.ink, 4);
  g.line(ax, ay, tx, ty, top, 2);
  g.circle(tx, ty, 2.5, C.ink);
  g.circle(tx, ty, 1.6, C.skin);
  g.line(x - 9, ay, x - 11, ay + 12, C.ink, 4);
  g.line(x - 9, ay, x - 11, ay + 12, top, 2);
  // 머리
  if (style === 'mom') {
    for (const s of [-1, 1]) {
      g.rect(x + (s < 0 ? -r - 2 : r - 3), hy - 2, 5, r + 8, C.ink);
      g.rect(x + (s < 0 ? -r - 1 : r - 2), hy - 1, 3, r + 6, hair);
    }
  }
  g.circle(x, hy, r + 1, C.ink);
  g.circle(x, hy, r, hair);
  g.ellipse(x, hy + 2, r * 0.8, r * 0.7, C.skin);
  g.rect(x - r * 0.8, hy - 4, r * 1.6, 2, hair);
  if (style === 'teacher') {
    for (const s of [-1, 1]) {
      g.box(x + s * 3 - 2, hy, 5, 4, C.glass, C.ink);
    }
    g.rect(x - 1, hy + 1, 2, 1, C.ink);
  } else {
    const blink = Math.floor(f / 50) % 4 === 3 && f % 50 < 4;
    for (const s of [-1, 1]) g.rect(x + s * 3 - (s > 0 ? 0 : 1), hy + 1, 1 + (mood === 'happy' ? 1 : 0), blink || mood === 'happy' ? 1 : 2, C.ink);
  }
  g.rect(x - 1, hy + 5, 3, 1, C.ink);
  g.rect(x - 5, hy + 4, 2, 1, C.pink);
  g.rect(x + 4, hy + 4, 2, 1, C.pink);
}

export const APPLE = [
  '.....kek.',
  '....kGk..',
  '.kkkkGkk.',
  'krrwrrrrk',
  'krwrrrrrk',
  'krrrrrrrk',
  'krrrrrrrk',
  '.krrrrrk.',
  '..kkkkk..',
];
export const HEART = [
  '.kkk.kkk.',
  'kPPPkPPPk',
  'kPwPPPPPk',
  'kPPPPPPPk',
  '.kPPPPPk.',
  '..kPPPk..',
  '...kPk...',
  '....k....',
];
export function starIcon(g, x, y, r, o = {}) {
  const { c = C.yellow, rot = 0, line = C.ink } = o;
  g.star(x, y, r + 1.6, line, rot, 5, 0.5);
  g.star(x, y, r, c, rot, 5, 0.48);
  if (r >= 4) g.rect(x - r * 0.3, y - r * 0.35, Math.max(1, r * 0.2), Math.max(1, r * 0.2), C.white);
}

export function coin(g, x, y, f, r = 7) {
  const w = Math.abs(Math.cos(f * 0.35)) * r;
  g.ellipse(x, y, w + 1, r + 1, C.ink);
  if (w > 1) {
    g.ellipse(x, y, w, r, C.yellowD);
    g.ellipse(x - 0.5, y - 0.5, w * 0.8, r * 0.82, C.yellow);
    g.rect(x - 0.5, y - r * 0.45, 1, r * 0.9, C.yellowD);
  }
}

export function sparkle(g, x, y, s, c = C.white) {
  if (s <= 0) return;
  const L = Math.round(s * 4);
  g.rect(x - L, y, L * 2 + 1, 1, c);
  g.rect(x, y - L, 1, L * 2 + 1, c);
  if (s > 0.6) g.rect(x - 1, y - 1, 3, 3, c);
}

// 탭/폰 기기 프레임 → 화면 영역 [x,y,w,h] 반환
export function device(g, x, y, w, h, o = {}) {
  const { body = C.ink2, bezel = 5, shadow = 4, round = 6 } = o;
  if (shadow) g.rbox(x + shadow, y + shadow, w, h, C.ink, round);
  g.box(x, y, w, h, body, C.ink, 1, round);
  g.rect(x + 2, y + 2, w - 4, 1, C.grayD);
  return [x + bezel, y + bezel + 2, w - bezel * 2, h - bezel * 2 - 4];
}

// 글자 칩 (브랜드 랜딩의 네오브루탈 버튼처럼 외곽선+하드섀도)
export function chip(g, str, x, y, o = {}) {
  const { bg = C.themeD, fg = C.white, tol = null, scale = 1, font = 'b11', pad = 6, padY = 4, sh = 3, align = 'center', line = C.ink, icon = null } = o;
  const tw = g.measure(str, { font, scale });
  const iw = icon ? icon.w + 4 : 0;
  const w = tw + iw + pad * 2;
  const h = g.cap(font) * scale + padY * 2 + 1;
  const bx = Math.round(align === 'center' ? x - w / 2 : align === 'right' ? x - w : x);
  if (sh) g.rect(bx + sh, y + sh, w, h, C.ink);
  g.box(bx, y, w, h, bg, line);
  if (icon) icon.draw(bx + pad, y + padY);
  g.text(str, bx + pad + iw, y + padY + 1, { font, scale, color: fg, outline: tol, ow: 1 });
  return [bx, y, w, h];
}

// 패널 (흰 카드 + 하드섀도)
export function panel(g, x, y, w, h, o = {}) {
  const { bg = C.white, sh = 4, line = C.ink, r = 0 } = o;
  if (sh) g.rbox(x + sh, y + sh, w, h, C.ink, r);
  g.box(x, y, w, h, bg, line, 1, r);
}

// ───── 이펙트 ─────
// 한 점에서 터지는 파티클. t = 터진 뒤 프레임
export function burst(g, t, x, y, o = {}) {
  const { n = 18, seed = 1, speed = 3, grav = 0.12, life = 34, colors = [C.yellow, C.white, C.orange, C.pinkH], size = 3, star = false } = o;
  if (t < 0 || t > life) return;
  for (let i = 0; i < n; i++) {
    const a = rnd(i, seed) * Math.PI * 2;
    const v = speed * (0.45 + rnd(i, seed + 7) * 0.8);
    const px = x + Math.cos(a) * v * t;
    const py = y + Math.sin(a) * v * t + 0.5 * grav * t * t;
    const k = 1 - t / life;
    const s = Math.max(1, Math.round(size * k + 0.4));
    const c = colors[i % colors.length];
    if (star && i % 3 === 0) sparkle(g, Math.round(px), Math.round(py), k * 0.9, c);
    else g.rect(px - s / 2, py - s / 2, s, s, c);
  }
}

// 꽃가루 (위에서 흩날리며 떨어짐)
export function confetti(g, f, o = {}) {
  const { n = 60, seed = 3, y0 = -10, colors = [C.yellow, C.pinkH, C.blue, C.green, C.white, C.orange], speed = 1.3, from = 0, x0 = 0, w = 480, h = 270 } = o;
  const t = f - from;
  if (t < 0) return;
  for (let i = 0; i < n; i++) {
    const start = rnd(i, seed) * 40;
    const tt = t - start;
    if (tt < 0) continue;
    const vy = speed * (0.6 + rnd(i, seed + 1) * 0.8);
    const px = x0 + rnd(i, seed + 2) * w + Math.sin(tt * 0.08 + i) * 6;
    const py = y0 + tt * vy;
    if (py > h + 4) continue;
    const flipP = Math.floor((tt + i * 3) / 6) % 2;
    g.rect(px, py, flipP ? 3 : 1, flipP ? 1 : 3, colors[i % colors.length]);
  }
}

// 방사형 광선 배경
export function rays(g, cx, cy, f, o = {}) {
  const { n = 14, c1 = C.yellow, c2 = C.lemon, speed = 0.01, R = 420 } = o;
  g.circle(cx, cy, R, c2);
  const rot = f * speed;
  for (let i = 0; i < n; i++) {
    const a0 = rot + (i / n) * Math.PI * 2;
    const a1 = a0 + Math.PI / n;
    g.tri(cx, cy, cx + Math.cos(a0) * R, cy + Math.sin(a0) * R, cx + Math.cos(a1) * R, cy + Math.sin(a1) * R, c1);
  }
}

// 아이리스(원형) 전환: 원 밖을 c로 채움
export function iris(g, cx, cy, R, c = C.ink) {
  g.irisOut(cx, cy, R, c);
}

// 대각선 블록 와이프. t:0→1 덮고, 반대로 1→0 걷어냄
export function blockWipe(g, t, c = C.ink, cell = 24, reverse = false) {
  if (t <= 0) return;
  const { w, h } = g;
  const cols = Math.ceil(w / cell);
  const rows = Math.ceil(h / cell);
  const maxD = cols + rows;
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const d = (reverse ? maxD - (i + j) : i + j) / maxD;
      const s = clamp(t * 1.8 - d * 0.8) * cell;
      if (s <= 0) continue;
      const cxp = i * cell + cell / 2;
      const cyp = j * cell + cell / 2;
      g.rect(cxp - s / 2 - g.ox, cyp - s / 2 - g.oy, Math.ceil(s), Math.ceil(s), c);
    }
  }
}

// 반짝이는 별 배경
export function starfield(g, f, o = {}) {
  const { n = 70, seed = 5, w = 480, h = 270, drift = 0.05, cols = [C.yellow, C.pink, C.white], dim = C.gray } = o;
  for (let i = 0; i < n; i++) {
    const x = (rnd(i, seed) * w + f * drift * (1 + (i % 3))) % w;
    const y = rnd(i, seed + 1) * h;
    const tw = Math.sin(f * 0.12 + i * 1.7);
    const c = i % 7 === 0 ? cols[0] : i % 5 === 0 ? cols[1] : cols[2];
    if (i % 9 === 0 && tw > 0.2) sparkle(g, Math.round(x), Math.round(y), 0.5 + tw * 0.4, c);
    else if (tw > -0.6) g.rect(x, y, 1, 1, tw > 0.5 ? c : dim);
  }
}

// 체크무늬 스크롤 배경
export function checker(g, f, c1, c2, cell = 20, vx = 0.5, vy = 0.5) {
  const { w, h } = g;
  const sx = (f * vx) % (cell * 2);
  const sy = (f * vy) % (cell * 2);
  g.rect(0, 0, w, h, c1);
  for (let y = -cell * 2; y < h + cell; y += cell) {
    for (let x = -cell * 2; x < w + cell; x += cell) {
      const ix = Math.round((x + sx) / cell);
      const iy = Math.round((y + sy) / cell);
      if (((ix + iy) & 1) === 0) g.rect(x + sx, y + sy, cell, cell, c2);
    }
  }
}

// 위아래 그라데이션(디더 밴드)
export function gradient(g, x, y, w, h, c1, c2, bands = 6) {
  g.rect(x, y, w, h, c1);
  for (let i = 1; i <= bands; i++) {
    const yy = y + (h * i) / (bands + 1);
    g.dither(x, yy, w, h / (bands + 1) + 1, c2, i / bands);
  }
  g.rect(x, y + (h * bands) / (bands + 1), w, h / (bands + 1) + 1, c2);
}

// 글자가 하나씩 튀어 오르는 타이틀. t = 시작 후 프레임
export function popText(g, str, x, y, t, o = {}) {
  const { per = 2, dur = 12, rise = 18, ...rest } = o;
  return g.text(str, x, y, {
    ...rest,
    each: (i) => {
      const p = (t - i * per) / dur;
      if (p <= 0) return { hide: true };
      return { dy: (1 - eBack(clamp(p))) * rise };
    },
  });
}

// 타자기 효과
export function typeText(g, str, x, y, t, o = {}) {
  const { per = 2, ...rest } = o;
  const n = Math.floor(t / per);
  return g.text(str, x, y, { ...rest, each: (i) => (i >= n ? { hide: true } : null) });
}

// 만화식 터짐 말풍선 ("TAP!", "쏙!"). t = 터진 뒤 프레임
export function pow(g, t, x, y, str, o = {}) {
  const { dur = 24, bg = C.yellow, fg = C.ink, scale = 1, n = 9, rot = 0.3 } = o;
  if (t < 0 || t > dur) return;
  const s = eBack(clamp(t / 7)) * (1 - clamp((t - dur + 5) / 5));
  if (s <= 0.05) return;
  const cap = g.cap('b11') * scale;
  const rx = (g.measure(str, { scale }) / 2 + 9) * s;
  const ry = (cap / 2 + 9) * s;
  const fan = (grow, c) => {
    for (let i = 0; i < n * 2; i++) {
      const a0 = rot + (i / (n * 2)) * Math.PI * 2;
      const a1 = rot + ((i + 1) / (n * 2)) * Math.PI * 2;
      const r0 = i % 2 ? 0.7 : 1.08;
      const r1 = (i + 1) % 2 ? 0.7 : 1.08;
      g.tri(x, y, x + Math.cos(a0) * (rx * r0 + grow), y + Math.sin(a0) * (ry * r0 + grow), x + Math.cos(a1) * (rx * r1 + grow), y + Math.sin(a1) * (ry * r1 + grow), c);
    }
  };
  fan(3, C.ink);
  fan(0, bg);
  if (s > 0.7) g.text(str, x + 1, y - cap / 2, { scale, color: fg, outline: fg === C.white ? C.ink : C.white, ow: 1, align: 'center' });
}

// 마우스 커서 (색 = 사용자). x,y = 화살 끝
export const CURSOR = [
  'k.......',
  'kk......',
  'kwk.....',
  'kwwk....',
  'kwwwk...',
  'kwwwwk..',
  'kwwwwwk.',
  'kwwwwwwk',
  'kwwwkkkk',
  'kwwk....',
  'kwk.....',
  'kk......',
];
export function cursor(g, x, y, color, name = '', press = false) {
  g.sprite(CURSOR, x, y + (press ? 1 : 0), { pal: { w: color } });
  if (name) {
    const w = g.measure(name, { font: 'r9' }) + 6;
    g.box(x + 8, y + 11, w, 12, color, C.ink);
    g.text(name, x + 11, y + 13, { font: 'r9', color: C.white });
  }
}

// 트로피. cx = 중앙, y = 위
export function trophy(g, cx, y, s = 1) {
  const w = 14 * s;
  const h = 12 * s;
  for (const sx of [-1, 1]) g.ring(cx + sx * w * 0.62, y + h * 0.35, 3 * s, C.ink, Math.max(2, 2 * s));
  for (const sx of [-1, 1]) g.ring(cx + sx * w * 0.62, y + h * 0.35, 3 * s - 0.5, C.yellowD, Math.max(1, s));
  g.ellipse(cx, y + h * 0.35, w / 2 + 1, h * 0.75 + 1, C.ink);
  g.ellipse(cx, y + h * 0.35, w / 2, h * 0.75, C.yellow);
  g.rect(cx - w / 2 - 1, y - 1, w + 2, h * 0.35 + 1, C.ink);
  g.rect(cx - w / 2, y, w, h * 0.35, C.yellow);
  g.rect(cx - w / 2 + 1, y + 1, w - 2, Math.max(1, s), C.lemon);
  g.rect(cx - w * 0.3, y + h * 0.15, Math.max(1, s), h * 0.6, C.lemon);
  g.box(cx - 2 * s, y + h * 0.95, 4 * s, 4 * s, C.yellowD, C.ink);
  g.box(cx - 6 * s, y + h * 0.95 + 4 * s, 12 * s, 4 * s, C.brown, C.ink);
  starIcon(g, cx + 0.5, y + h * 0.42, 2.2 * s, { c: C.white });
}

// 손바닥 (손들기)
export function palm(g, cx, y, s = 1, c = C.skin) {
  const fw = 3 * s;
  for (let i = 0; i < 4; i++) g.box(cx - 7 * s + i * (fw + 0.5 * s), y + (i === 0 || i === 3 ? 2 * s : 0), fw + 1, 8 * s, c, C.ink, 1, 1);
  g.box(cx - 7 * s, y + 6 * s, 14 * s, 9 * s, c, C.ink, 1, Math.round(2 * s));
  g.box(cx + 5 * s, y + 7 * s, 4 * s, 6 * s, c, C.ink, 1, 1);
  g.rect(cx - 6 * s, y + 7 * s, 12 * s - 1, 6 * s, c);
}
