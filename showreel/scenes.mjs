// 리틀마인즈 쇼릴 — 22초 · 60fps · 120BPM (1박 = 30프레임, 1마디 = 120프레임)
//
//  0.0s  BOOT      CRT가 켜지고 학용품들이 궤도로 날아들며 로고 등장
//  2.0s  STAGE 1   ABC 숲: 자·책·연필 위를 달려 C·A·T 블록을 박치기 → 고양이!
//  6.0s  STAGE 2   숫자 산: 3 + 4 = ? 수식 다리에 '7'을 끌어다 끼우기
//  8.0s  STAGE 3   과학 실험실: 파랑 + 노랑 = 초록, 펑! 새싹이 자란다
// 10.0s  LIVE      클래스인 스타일 라이브 수업: 함께 쓰는 칠판·손들기·응답기·트로피 (집 + 학원 교실)
// 16.0s  SELECT    5세·7세·초3, 아이마다 맞춤
// 18.0s  PARENT    부모님 폰으로 오는 오늘의 리포트
// 20.0s  FINALE    로고 + 도입 문의
import { C, rgb, W, H } from './gfx.mjs';
import {
  clamp, lerp, prog, eOut, eIn, eIO, eBack, eBounce, rnd, hop,
  mascot, KIDS, kidHead, kidBust, kidBack, adult, APPLE, HEART, CROWN,
  hand, starIcon, coin, sparkle, cloud, tree, wifi, qblock, device, chip, panel,
  burst, confetti, rays, iris, mosaic, blockWipe, speedLines, starfield, checker, gradient,
  popText, typeText, pow, cursor, trophy, palm,
} from './art.mjs';
import {
  TONE, pencil, pencilUp, crayon, ruler, bookSide, bookFront, abacus, flask, dropper,
  magnifier, magnet, globe, rocket, letterBlock, atom, planet, tubeRack, microscope, cat,
} from './tools.mjs';

export const FPS = 60;
export const BEAT = 30;
export const BAR = 120;
export const FRAMES = 1320;
const BLACK = rgb('#0B0814');

// ─────────────────────────────────────────────
// 공통 HUD: 점수와 "지식 흡수" 경험치
// ─────────────────────────────────────────────
const SCORE_AT = [[246, 100], [276, 100], [306, 300], [392, 300], [410, 50], [422, 50], [434, 50], [542, 300]];
const EXP_AT = [[250, 0.14], [280, 0.14], [310, 0.2], [400, 0.22], [548, 0.3]];
const sumAt = (list, f, dur) => list.reduce((s, [at, v]) => s + v * clamp((f - at) / dur), 0);

function hud(g, f) {
  const score = Math.round(sumAt(SCORE_AT, f, 10));
  g.rect(9, 9, 74, 17, C.ink);
  g.box(6, 6, 74, 17, C.white, C.ink);
  starIcon(g, 16, 14, 5);
  g.text(String(score).padStart(5, '0'), 26, 9, { color: C.ink });
  const exp = clamp(sumAt(EXP_AT, f, 14));
  const bx = 360;
  g.rect(bx + 3, 9, 114, 17, C.ink);
  g.box(bx, 6, 114, 17, C.white, C.ink);
  g.text('EXP', bx + 5, 9, { font: 'b11', color: C.green });
  g.box(bx + 30, 10, 78, 9, C.paper, C.ink);
  const fw = Math.round(76 * exp);
  if (fw > 0) {
    g.rect(bx + 31, 11, fw, 7, C.green);
    g.rect(bx + 31, 11, fw, 2, C.greenL);
  }
  const lastExp = EXP_AT.find(([at]) => f >= at && f < at + 14);
  if (lastExp) g.dither(bx + 31, 11, 76, 7, C.white, 0.5);
}

// 스테이지 카드 (상단 중앙). t = 장면 시작 후 프레임
function stageCard(g, t, n, name, tone, t0 = 4, t1 = 80) {
  if (t < t0 || t > t1 + 14) return;
  const pin = eBack(prog(t, t0, t0 + 14));
  const pout = eIn(prog(t, t1, t1 + 12));
  const y = lerp(-60, 34, pin) - pout * 100;
  const w = g.measure(name, { scale: 2 }) + 30;
  const x = 240 - w / 2;
  g.rect(x + 4, y + 4, w, 34, C.ink);
  g.box(x, y, w, 34, tone, C.ink);
  g.box(x + 2, y + 2, w - 4, 30, null, C.white);
  g.rect(x + 3, y + 3, w - 6, 28, tone);
  popText(g, name, 240, y + 7, t - t0 - 4, { scale: 2, color: C.white, outline: C.ink, ow: 2, align: 'center', per: 2 });
  chip(g, `STAGE ${n}`, 240, y - 9, { bg: C.ink, fg: C.yellow, font: 'b11', pad: 5, padY: 2, sh: 0 });
}

// 상단 중앙 작은 스테이지 태그 (HUD 사이)
function stageTag(g, t, n, name, tone, t0 = 0) {
  if (t < t0) return;
  const p = eBack(prog(t, t0, t0 + 10));
  const y = Math.round(lerp(-24, 6, p));
  const w1 = g.measure(`STAGE ${n}`) + 10;
  const w2 = g.measure(name) + 12;
  const x = Math.round(240 - (w1 + w2) / 2);
  g.rect(x + 3, y + 3, w1 + w2, 17, C.ink);
  g.box(x, y, w1 + 1, 17, C.ink, C.ink);
  g.text(`STAGE ${n}`, x + 5, y + 3, { color: C.yellow });
  g.box(x + w1, y, w2, 17, tone, C.ink);
  g.text(name, x + w1 + 6, y + 3, { color: C.white, outline: C.ink, ow: 1 });
}

// 하단 자막
function caption(g, t, str, t0, t1 = 999, o = {}) {
  const { bg = C.ink, fg = C.white, y = 240, x = 240 } = o;
  if (t < t0 || t > t1 + 10) return;
  const pin = eBack(prog(t, t0, t0 + 12));
  const pout = eIn(prog(t, t1, t1 + 10));
  const yy = lerp(290, y, pin) + pout * 60;
  chip(g, str, x, yy, { bg, fg, pad: 8, padY: 4 });
}

function shake(g, t, t0, dur = 8, amp = 3) {
  const p = (t - t0) / dur;
  if (p < 0 || p > 1) return;
  const a = amp * (1 - p);
  g.translate(Math.round((rnd(t, 11) - 0.5) * 2 * a), Math.round((rnd(t, 12) - 0.5) * 2 * a));
}

// 점에서 점으로 반짝이가 빨려 들어감 ("흡수")
function absorb(g, t, x0, y0, x1, y1, o = {}) {
  const { n = 5, dur = 18, seed = 1, c = C.yellow } = o;
  for (let i = 0; i < n; i++) {
    const p = (t - i * 2) / dur;
    if (p <= 0 || p >= 1) continue;
    const e = eIn(p);
    const side = (rnd(i, seed) - 0.5) * 60;
    const x = lerp(x0, x1, e) + Math.sin(p * Math.PI) * side;
    const y = lerp(y0, y1, e) - Math.sin(p * Math.PI) * 26;
    sparkle(g, Math.round(x), Math.round(y), 0.9 - p * 0.4, i % 2 ? C.white : c);
  }
}

// ─────────────────────────────────────────────
// 로고
// ─────────────────────────────────────────────
const LOGO = 'LITTLE MINDS';
function logo(g, cx, y, s, each = null) {
  const base = { scale: s, sp: 1, align: 'center' };
  const shape = each ? (i, ch) => { const a = each(i, ch); return a ? { ...a, color: undefined } : a; } : null;
  for (let d = s * 2; d >= 1; d -= 1) {
    g.text(LOGO, cx, y + d, { ...base, each: shape, color: d > s ? C.ink : C.orangeD, outline: C.ink, ow: s - 1 });
  }
  g.text(LOGO, cx, y, { ...base, each, color: C.yellow, fill2: C.orange, outline: C.ink, ow: s - 1 });
}
function logoCharX(g, s, idx) {
  const total = g.measure(LOGO, { scale: s, sp: 1 });
  const pre = g.measure(LOGO.slice(0, idx), { scale: s, sp: 1 }) + (idx > 0 ? s : 0);
  const cw = g.measure(LOGO[idx], { scale: s });
  return 240 - total / 2 + pre + cw / 2;
}

// ─────────────────────────────────────────────
// 0 · BOOT (0–119)
// ─────────────────────────────────────────────
const BOOT_TOOLS = [
  (g, x, y) => pencil(g, x - 24, y - 5, 48, 10),
  (g, x, y) => bookFront(g, x - 13, y - 16, 27, 32, TONE.blue, 'A'),
  (g, x, y, t) => abacus(g, x - 19, y - 14, 38, 28, [2 + Math.sin(t * 0.08) * 1.5, 4, 1]),
  (g, x, y, t) => flask(g, x, y + 16, 28, 34, { level: 0.6, liquid: C.green, f: t, bubbles: 4 }),
  (g, x, y) => magnifier(g, x - 4, y - 4, 10),
  (g, x, y, t) => globe(g, x, y - 5, 12, t),
  (g, x, y) => letterBlock(g, x - 11, y - 8, 21, 'A', TONE.red),
  (g, x, y) => ruler(g, x - 28, y - 6, 56, 12, { nums: false }),
  (g, x, y, t) => rocket(g, x, y - 18, t),
  (g, x, y, t) => atom(g, x, y, 13, t),
  (g, x, y) => crayon(g, x - 4, y + 16, 34, 9, TONE.purple),
  (g, x, y) => letterBlock(g, x - 11, y - 8, 21, '7', TONE.yellow, { fg: C.white }),
];

function sBoot(g, t) {
  gradient(g, 0, 0, W, H, C.night, C.night2, 5);
  starfield(g, t, { n: 90 });

  // 학용품 궤도
  const n = BOOT_TOOLS.length;
  BOOT_TOOLS.forEach((draw, i) => {
    const a = (i / n) * Math.PI * 2 + t * 0.006 - Math.PI / 2;
    const ox = 240 + Math.cos(a) * 214;
    const oy = 124 + Math.sin(a) * 104;
    const p = eBack(prog(t, 6 + i * 2, 30 + i * 2));
    if (p <= 0) return;
    const fx = 240 + Math.cos(a) * 520;
    const fy = 124 + Math.sin(a) * 360;
    const bob = Math.sin(t * 0.09 + i * 1.3) * 3;
    draw(g, Math.round(lerp(fx, ox, p)), Math.round(lerp(fy, oy, p) + bob), t);
  });

  // 로고: 한 글자씩 떨어져 통통 튐 + 반짝 스윕
  const ly = 64;
  const landT = 84;
  const dip = t >= landT && t < landT + 8 ? Math.round(3 * Math.sin(((t - landT) / 8) * Math.PI)) : 0;
  let k = 0;
  const order = [...LOGO].map((ch) => (ch === ' ' ? -1 : k++));
  logo(g, 240, ly + dip, 4, (i) => {
    const j = order[i];
    if (j < 0) return null;
    const s = 22 + j * 3;
    const p = (t - s) / 16;
    if (p < 0) return { hide: true };
    const flash = t >= 64 + j * 1.5 && t < 68 + j * 1.5;
    return { dy: -(1 - eBounce(clamp(p))) * 120, color: flash ? C.white : undefined };
  });
  // 착지 먼지
  for (let j = 0; j < 11; j++) {
    const tt = t - (22 + j * 3 + 6);
    if (tt < 0 || tt > 10) continue;
    const idx = [...LOGO].findIndex((_, i) => order[i] === j);
    const cx = logoCharX(g, 4, idx);
    for (const s of [-1, 1]) g.rect(cx + s * (10 + tt * 1.5), ly + 50 - tt * 0.3, 2, 2, C.gray);
  }

  // 마스코트가 아래에서 점프해 로고 위 'M'에 착지
  const mx = Math.round(logoCharX(g, 4, 7));
  const jp = prog(t, 66, landT);
  if (t >= 66) {
    let y;
    let sq = 1;
    let face = 'wow';
    let arms = 'up';
    if (t < landT) {
      y = lerp(320, ly, eOut(jp)) - hop(jp) * 30;
      sq = 1.15;
    } else {
      y = ly + dip;
      const lp = prog(t, landT, landT + 10);
      sq = 1 - 0.3 * Math.sin(lp * Math.PI) * (1 - lp);
      face = t < landT + 12 ? 'happy' : Math.floor(t / 40) % 3 === 2 && t % 40 < 5 ? 'blink' : 'happy';
      arms = t < landT + 20 ? 'up' : 'wave';
    }
    mascot(g, mx, y, { r: 12, sq, face, arms, f: t });
    if (t >= landT && t < landT + 14) {
      const rr = (t - landT) * 2.2;
      g.oval(mx, ly + 1, rr + 6, rr * 0.3 + 2, C.white);
    }
  }

  // 서브 카피
  if (t >= 86) {
    const p = eBack(prog(t, 86, 98));
    chip(g, '놀면서 배우는 픽셀 모험!', 240, Math.round(lerp(176, 140, p)), { scale: 2, bg: C.orange, pad: 10, padY: 5, sh: 4 });
  }
  if (t >= 96) {
    typeText(g, '알파벳 · 수학 · 과학이 놀이처럼 쏙쏙', 240, 184, t - 96, { per: 1, color: C.gold, outline: C.ink, ow: 1, align: 'center' });
  }

  // CRT 전원 켜짐
  if (t < 24) {
    const hw = eOut(prog(t, 1, 10)) * 241;
    const hh = Math.max(1, eOut(prog(t, 10, 22)) * 136);
    g.rect(0, 0, W, 135 - hh, BLACK);
    g.rect(0, 135 + hh, W, H, BLACK);
    g.rect(0, 0, 240 - hw, H, BLACK);
    g.rect(240 + hw, 0, W, H, BLACK);
    if (t < 22) g.dither(240 - hw, 135 - hh, hw * 2, hh * 2, C.white, 1 - prog(t, 10, 22) * 0.9);
    if (t < 2) g.rect(239, 134, 2, 2, C.white);
  }
  // 아이리스 아웃 (마스코트 얼굴로)
  if (t >= 102) iris(g, mx, ly - 16, 560 * (1 - eIn(prog(t, 102, 119))), C.ink);
}

// ─────────────────────────────────────────────
// 1 · STAGE 1 — ABC 숲 (120–359)
// ─────────────────────────────────────────────
const S1_SEGS = [
  [90, 196, 222, 222, 0], [196, 222, 222, 208, 12], [222, 240, 208, 208, 0], [240, 262, 208, 194, 12],
  [262, 282, 194, 194, 0], [282, 352, 194, 210, 34], [352, 450, 210, 210, 0], [450, 478, 210, 222, 10],
  [478, 2000, 222, 222, 0],
];
const S1_BLOCKS = [['C', 560, TONE.red, 120], ['A', 620, TONE.blue, 150], ['T', 680, TONE.green, 180]];
const S1_BLOCK_Y = 134;
const S1_SLOTS = [212, 240, 268];

function s1Mascot(t) {
  let wx;
  if (t < 105) wx = 90 + 4.6 * t;
  else if (t < 128) wx = 573;
  else if (t < 148) wx = lerp(573, 633, eIO(prog(t, 128, 148)));
  else if (t < 158) wx = 633;
  else if (t < 178) wx = lerp(633, 693, eIO(prog(t, 158, 178)));
  else wx = 693;
  wx = Math.min(wx, t < 105 ? 573 : wx);
  let y = 222;
  let air = false;
  for (const [x0, x1, y0, y1, arc] of S1_SEGS) {
    if (wx <= x1) {
      const p = clamp((wx - x0) / (x1 - x0));
      y = lerp(y0, y1, p) - arc * hop(p);
      air = arc > 0 && p > 0 && p < 1;
      break;
    }
  }
  // 블록 박치기 점프 (정점 = 블록 바닥)
  for (const [, , , hit] of S1_BLOCKS) {
    const p = prog(t, hit - 10, hit + 10);
    if (p > 0 && p < 1) {
      y -= 40 * hop(p);
      air = true;
    }
  }
  return { wx, y, air, run: t < 105 || (t > 128 && t < 148) || (t > 158 && t < 178) };
}

function sAbc(g, t, f) {
  const m = s1Mascot(t);
  const cam = Math.round(clamp(m.wx - 160, 0, 393));

  // 하늘 + 떠다니는 알파벳
  gradient(g, 0, 0, W, 230, C.skyM, C.sky, 5);
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let i = 0; i < 9; i++) {
    const x = ((i * 97 - cam * 0.15 + t * 0.2) % 560) - 40;
    const y = 60 + rnd(i, 21) * 70 + Math.sin(t * 0.05 + i) * 4;
    g.save();
    g.dith = 0.55;
    g.text(letters[(i * 7) % 26], x, y, { scale: 3, color: C.white });
    g.restore();
  }
  cloud(g, 70 - cam * 0.1 + t * 0.15, 46, 0.9);
  cloud(g, 330 - cam * 0.1 + t * 0.15, 30, 0.7);

  // 먼 숲: 세워진 연필 나무들
  g.save();
  g.translate(-Math.round(cam * 0.35), 0);
  const pt = [TONE.green, TONE.yellow, TONE.blue, TONE.pink, TONE.purple, TONE.orange];
  for (let i = 0; i < 12; i++) {
    const x = i * 58 + 10;
    const h = 70 + rnd(i, 31) * 40;
    pencilUp(g, x, 226, h, 14, pt[i % pt.length]);
  }
  g.restore();
  g.save();
  g.translate(-Math.round(cam * 0.6), 0);
  for (let i = 0; i < 9; i++) tree(g, 30 + i * 96, 226, 0.9 + rnd(i, 41) * 0.3);
  g.restore();

  // 지면(자) · 책 계단 · 연필 다리 · 크레파스 울타리
  g.save();
  g.translate(-cam, 0);
  g.rect(cam - 10, 232, 500, 40, C.green);
  for (let i = 0; i < 40; i++) g.rect(cam - 10 + ((i * 37 + 11) % 500), 240 + (i % 4) * 7, 2, 1, C.greenD);
  for (let i = 0; i < 16; i++) {
    const fx = (i * 61 + 23) % 1100;
    g.rect(fx, 236 + (i % 3) * 9, 3, 3, i % 2 ? C.white : C.yellow);
  }
  // 물웅덩이
  g.rect(300, 232, 152, 40, C.blue);
  for (let i = 0; i < 6; i++) g.rect(306 + i * 24 + Math.round(Math.sin(t * 0.1 + i) * 3), 244 + (i % 2) * 8, 8, 1, C.skyM);
  g.rect(300, 232, 152, 1, C.ink);
  ruler(g, -20, 222, 320, 12, { from: -20 });
  ruler(g, 452, 222, 700, 12, { from: 452 });
  bookSide(g, 192, 208, 108, 14, TONE.red);
  bookSide(g, 238, 194, 62, 14, TONE.blue);
  pencil(g, 286, 210, 180, 12, TONE.yellow);
  for (let i = 0; i < 6; i++) crayon(g, 20 + i * 16, 223, 26 + (i % 2) * 6, 9, pt[i]);
  for (let i = 0; i < 5; i++) crayon(g, 740 + i * 16, 223, 26 + (i % 2) * 6, 9, pt[(i + 2) % 6]);

  // 글자 블록
  for (const [ch, bx, tone, hit] of S1_BLOCKS) {
    const bt = t - hit;
    const bump = bt >= 0 && bt < 10 ? Math.round(7 * hop(bt / 10)) : 0;
    const done = bt >= 0;
    letterBlock(g, bx, S1_BLOCK_Y - bump, 26, done ? '' : ch, done ? [C.brownL, C.brown, C.gold] : tone);
    if (!done) {
      const glint = (t + bx) % 50 < 4;
      if (glint) sparkle(g, bx + 22, S1_BLOCK_Y + 4, 0.6);
    }
    burst(g, bt, bx + 13, S1_BLOCK_Y - 4, { n: 14, seed: bx, speed: 2.4, life: 26, grav: 0.18 });
  }

  // 고양이: T 블록에서 튀어나와 착지
  if (t >= 186) {
    const ct = t - 186;
    const p = prog(ct, 0, 24);
    const cx = lerp(693, 735, p);
    const cy = p < 1 ? lerp(S1_BLOCK_Y, 222, p) - hop(p) * 46 : 222;
    const jump = ct > 30 ? Math.round(10 * hop(((ct - 30) % 20) / 20)) : 0;
    cat(g, cx, cy, t, { jump, flip: true });
    if (ct > 26 && ct < 60) {
      g.text('냐옹!', cx + 4, cy - 44 - jump, { color: C.ink, outline: C.white, ow: 1, align: 'center' });
    }
  }

  // 마스코트
  const sq = m.air ? 1.12 : 1;
  const face = t >= 186 ? 'happy' : m.air ? 'wow' : 'smile';
  mascot(g, Math.round(m.wx), Math.round(m.y), {
    r: 11, sq, face, arms: m.air || t >= 186 ? 'up' : 'down', f: t, run: m.run && !m.air,
  });
  // 달리는 먼지
  if (m.run && !m.air) {
    for (let i = 0; i < 3; i++) {
      const pt2 = (t + i * 4) % 12;
      g.rect(m.wx - 12 - pt2 * 1.2, m.y - 2 - pt2 * 0.3, 2, 2, C.white);
    }
  }
  g.restore();

  // 상단 문제 배너 (화면 고정)
  if (t >= 92) {
    const p = eBack(prog(t, 92, 106));
    const by = Math.round(lerp(-80, 32, p));
    const ok = t >= 196;
    panel(g, 140, by, 200, 60, { bg: ok ? C.lemon : C.white });
    // 고양이 얼굴 아이콘
    cat(g, 164, by + 36, 0, { flip: false });
    g.text('고양이는 영어로?', 252, by + 8, { align: 'center', color: C.ink });
    S1_SLOTS.forEach((sx, i) => {
      const [ch, bx, tone, hit] = S1_BLOCKS[i];
      const arrive = hit + 14;
      const filled = t >= arrive;
      const pop = filled ? eBack(prog(t, arrive, arrive + 8)) : 0;
      g.box(sx - 11, by + 27, 22, 24, filled ? tone[0] : C.paper, C.ink);
      if (!filled) g.text('?', sx + 1, by + 30, { scale: 2, color: C.gray, align: 'center' });
      else g.text(ch, sx + 1, by + 30 - Math.round((1 - pop) * 6), { scale: 2, color: C.white, outline: C.ink, ow: 1, align: 'center' });
    });
    if (ok) {
      const pp = eBack(prog(t, 196, 206));
      g.save();
      g.translate(0, Math.round((1 - pp) * -20));
      chip(g, '딩동댕!', 330, by - 8, { bg: C.green, scale: 1, sh: 3 });
      g.restore();
      for (let i = 0; i < 3; i++) sparkle(g, 200 + i * 40, by + 20 + Math.sin(t * 0.3 + i) * 3, 0.5 + 0.4 * Math.sin(t * 0.4 + i * 2));
    }
  }
  // 글자가 블록에서 슬롯으로 날아감 + 마스코트로 흡수
  for (const [ch, bx, tone, hit] of S1_BLOCKS) {
    const lt = t - hit;
    const sx = S1_SLOTS[S1_BLOCKS.findIndex((b) => b[0] === ch)];
    if (lt >= 0 && lt < 14) {
      const p = eIO(lt / 14);
      const x = lerp(bx + 13 - cam, sx, p);
      const y = lerp(S1_BLOCK_Y - 10, 60, p) - hop(p) * 40;
      g.text(ch, x, y, { scale: 3, color: C.white, outline: C.ink, ow: 2, fill2: tone[0], align: 'center' });
    }
    absorb(g, lt - 4, bx + 13 - cam, S1_BLOCK_Y, m.wx - cam, m.y - 30, { seed: bx, c: tone[2] });
  }

  // 터치 손가락
  const taps = [[108, 0], [138, 1], [168, 2]];
  if (t >= 88 && t < 200) {
    const pts = S1_BLOCKS.map(([, bx]) => [bx + 14 - 393, S1_BLOCK_Y + 30]);
    let hx;
    let hy;
    if (t < 104) {
      const p = eOut(prog(t, 88, 104));
      hx = lerp(500, pts[0][0], p);
      hy = lerp(300, pts[0][1], p);
    } else if (t < 134) {
      const p = eIO(prog(t, 116, 134));
      hx = lerp(pts[0][0], pts[1][0], p);
      hy = lerp(pts[0][1], pts[1][1], p) - hop(p) * 10;
    } else if (t < 164) {
      const p = eIO(prog(t, 146, 164));
      hx = lerp(pts[1][0], pts[2][0], p);
      hy = lerp(pts[1][1], pts[2][1], p) - hop(p) * 10;
    } else {
      const p = eIn(prog(t, 176, 198));
      hx = lerp(pts[2][0], 520, p);
      hy = lerp(pts[2][1], 320, p);
    }
    let press = 0;
    for (const [tt, i] of taps) {
      const d = t - tt;
      if (d >= 0 && d < 6) press = 1;
      if (d >= 0 && d < 16) {
        g.ring(pts[i][0], pts[i][1] - 2, 3 + d * 1.6, d < 8 ? C.white : C.yellow, 2);
      }
    }
    hand(g, hx, hy, press * 2);
    for (const [tt, i] of taps) pow(g, t - tt, pts[i][0] + 30, pts[i][1] - 16, 'TAP!', { dur: 18 });
  }

  caption(g, t, '터치하면 반응하는 인터랙티브 수업', 28, 222);
  stageCard(g, t, 1, 'ABC 숲', C.green, 6, 78);
  stageTag(g, t, 1, 'ABC 숲', C.green, 90);
  hud(g, f);
  if (t < 16) iris(g, 90, 200, 560 * eOut(prog(t, 0, 16)), C.ink);
  blockWipe(g, prog(t, 226, 240), C.orange);
}

// ─────────────────────────────────────────────
// 2 · STAGE 2 — 숫자 산 (360–479)
// ─────────────────────────────────────────────
function sMath(g, t, f) {
  gradient(g, 0, 0, W, 200, C.lemon, C.gold, 4);
  // 떠다니는 수학 기호
  const sym = ['+', '-', '×', '÷', '=', '1', '2', '3', '%', '9'];
  for (let i = 0; i < 10; i++) {
    const x = ((i * 53 + t * 0.4) % 520) - 20;
    const y = 104 + rnd(i, 51) * 60 + Math.sin(t * 0.06 + i) * 4;
    g.save();
    g.dith = 0.5;
    g.text(sym[i], x, y, { scale: 2, color: C.white });
    g.restore();
  }
  // 숫자 산맥
  const mts = [[60, 200, 90], [150, 200, 120], [260, 200, 80], [360, 200, 130], [450, 200, 95]];
  for (const [mx, by, h] of mts) {
    g.tri(mx - h * 0.9 - 2, by, mx + h * 0.9 + 2, by, mx, by - h - 2, C.ink);
    g.tri(mx - h * 0.9, by, mx + h * 0.9, by, mx, by - h, C.mint);
    g.tri(mx, by, mx + h * 0.9, by, mx, by - h, C.green);
    g.tri(mx - h * 0.25, by - h * 0.72, mx + h * 0.25, by - h * 0.72, mx, by - h, C.white);
  }
  // 강
  g.rect(0, 200, W, 70, C.blue);
  for (let i = 0; i < 10; i++) g.rect(((i * 61 + t * 0.8) % 520) - 20, 236 + (i % 3) * 10, 10, 1, C.skyM);
  // 절벽
  for (const [x0, x1] of [[-4, 170], [310, 484]]) {
    g.box(x0, 200, x1 - x0, 80, C.brown, C.ink);
    g.rect(x0 + 1, 201, x1 - x0 - 2, 6, C.green);
    g.rect(x0 + 1, 207, x1 - x0 - 2, 1, C.greenD);
    for (let y = 220; y < 270; y += 14) g.rect(x0 + 4, y, x1 - x0 - 8, 1, C.brownD);
  }
  // 주판 (3을 세고 4를 셈)
  abacus(g, 24, 140, 70, 52, [3 * eOut(prog(t, 10, 22)), 4 * eOut(prog(t, 20, 34)), 0]);
  // 연필 깃발 (도착점)
  pencilUp(g, 420, 201, 70, 10, TONE.blue);
  const wave = Math.sin(t * 0.3) * 3;
  g.tri(431, 140, 431, 160, 462 + wave, 150, C.ink);
  g.tri(432, 142, 432, 158, 459 + wave, 150, C.red);

  // 수식 다리
  const tiles = ['3', '+', '4', '='];
  const tt = [TONE.yellow, TONE.blue, TONE.yellow, TONE.blue];
  const snap = 30;
  tiles.forEach((lab, i) => {
    const glow = t >= snap + 2 + i * 3 && t < snap + 8 + i * 3;
    qblock(g, 170 + i * 28, 200, 28, lab, { tone: glow ? TONE.green : tt[i] });
  });
  // 빈칸
  if (t < snap) {
    const blink = Math.floor(t / 8) % 2;
    for (let i = 0; i < 28; i += 4) {
      g.rect(282 + i, 200, 2, 1, blink ? C.white : C.ink);
      g.rect(282 + i, 227, 2, 1, blink ? C.white : C.ink);
      g.rect(282, 200 + i, 1, 2, blink ? C.white : C.ink);
      g.rect(309, 200 + i, 1, 2, blink ? C.white : C.ink);
    }
    g.text('?', 296, 206, { scale: 2, color: blink ? C.white : C.ink, align: 'center' });
  }
  // 사과 힌트
  const ap = [[3, 184], [4, 240]];
  ap.forEach(([cnt, cx], k) => {
    for (let i = 0; i < cnt; i++) {
      const x = cx - (cnt * 10) / 2 + i * 10;
      const pop = eBack(prog(t, 6 + k * 8 + i * 2, 14 + k * 8 + i * 2));
      if (pop <= 0) continue;
      g.sprite(APPLE, x, 186 - (i % 2) * 8 - pop * 2 + Math.round(Math.sin(t * 0.15 + i) * 1));
    }
  });

  // 문제 패널 + 보기
  panel(g, 150, 30, 180, 66);
  g.text('다리를 완성하자!', 240, 37, { align: 'center', color: C.ink });
  const choices = [['6', 200], ['7', 240], ['8', 280]];
  choices.forEach(([lab, cx]) => {
    if (lab === '7' && t >= 10) {
      g.box(cx - 12, 58, 24, 24, C.paper, C.gray);
      return;
    }
    qblock(g, cx - 12, 58, 24, lab, { tone: TONE.yellow });
  });

  // 드래그: 7 → 빈칸
  let tx;
  let ty;
  if (t < 10) {
    tx = 228;
    ty = 58;
  } else if (t < snap) {
    const p = eIO(prog(t, 10, snap - 2));
    tx = lerp(228, 282, p);
    ty = lerp(58, 196, p) - hop(p) * 30;
  } else {
    const p = prog(t, snap, snap + 10);
    tx = 282;
    ty = 200 - Math.round(4 * hop(p));
  }
  const s7 = t < snap ? 24 + (t >= 10 ? 4 : 0) : 28;
  qblock(g, tx + (28 - s7) / 2, ty, s7, '7', { tone: t >= snap && t < snap + 12 ? TONE.green : TONE.yellow, glow: t >= snap && t < snap + 4 });
  if (t < snap + 6) {
    const hp = t < 6 ? eOut(prog(t, 0, 6)) : 1;
    const press = t >= 8 && t < snap ? 2 : 0;
    hand(g, lerp(330, tx + 16, hp), lerp(140, ty + 18, hp), press);
  }
  pow(g, t - 9, 362, 70, 'DRAG!', { bg: C.pinkH, fg: C.white, dur: 20 });
  pow(g, t - snap, 344, 182, '쏙!', { scale: 2, dur: 22 });
  if (t >= snap) {
    burst(g, t - snap, 296, 210, { n: 22, seed: 7, speed: 2.8, life: 28, star: true });
    if (t < snap + 16) g.ring(296, 214, (t - snap) * 3, C.white, 2);
    const pp = eBack(prog(t, snap + 2, snap + 12));
    if (t < 104) {
      g.save();
      g.translate(0, Math.round((1 - pp) * 16));
      chip(g, '정답! 3 + 4 = 7', 240, 112, { bg: C.green, scale: 2, sh: 4 });
      g.restore();
    }
  }

  // 마스코트: 걱정 → 다리를 건너 달림
  const coinsX = [200, 240, 280];
  let mx = 130;
  if (t >= 38) mx = lerp(130, 380, eIO(prog(t, 38, 84)));
  const run = t >= 38 && t < 84;
  const jy = t >= 86 ? Math.round(12 * hop(((t - 86) % 22) / 22)) : 0;
  coinsX.forEach((cx, i) => {
    const got = mx >= cx - 6;
    if (!got) coin(g, cx, 170 + Math.sin(t * 0.2 + i) * 2, t + i * 5);
    else {
      const gt = t - (38 + ((cx - 130) / 250) * 46);
      if (gt < 14) {
        g.text('+50', cx, 160 - gt * 1.5, { color: C.yellow, outline: C.ink, ow: 1, align: 'center' });
      }
    }
  });
  mascot(g, Math.round(mx), 200 - jy, {
    r: 11, face: t < snap ? 'wow' : 'happy', arms: t < snap ? 'down' : 'up', f: t, run,
  });
  if (t < snap) {
    const b = Math.round(Math.sin(t * 0.3) * 2);
    g.text('?', 130, 158 + b, { scale: 2, color: C.white, outline: C.ink, ow: 2, align: 'center' });
  }
  absorb(g, t - snap - 4, 296, 210, mx, 176, { seed: 5, c: C.yellow });

  caption(g, t, '끌어서 맞추는 수학 퍼즐', 12, 104);
  stageTag(g, t, 2, '숫자 산', C.blue, 0);
  hud(g, f);
  blockWipe(g, 1 - prog(t, 0, 12), C.orange, 24, true);
  blockWipe(g, prog(t, 108, 120), C.purple);
}

// ─────────────────────────────────────────────
// 3 · STAGE 3 — 과학 실험실 (480–599)
// ─────────────────────────────────────────────
function sScience(g, t, f) {
  const popT = 60;
  shake(g, t, popT, 10, 3);
  // 벽 + 타일
  g.rect(0, 0, W, 200, C.lav);
  for (let x = 0; x < W; x += 24) g.rect(x, 0, 1, 200, C.white);
  for (let y = 0; y < 200; y += 24) g.rect(0, y, W, 1, C.white);
  g.rect(0, 160, W, 40, C.purple);
  g.rect(0, 160, W, 2, C.ink);
  // 원자 포스터
  panel(g, 22, 64, 76, 76, { bg: C.navy, sh: 3 });
  starfield(g, t, { n: 10, w: 70, h: 70, seed: 8 });
  atom(g, 60, 102, 24, t);
  g.text('ATOM', 60, 126, { font: 'r7', color: C.white, align: 'center' });
  // 행성 모빌
  g.rect(140, 0, 1, 36, C.ink);
  planet(g, 141, 46, 9, TONE.orange, C.yellow);
  g.rect(310, 0, 1, 26, C.ink);
  planet(g, 311, 34, 7, TONE.blue, C.white);
  // 선반
  g.box(330, 104, 140, 6, C.brown, C.ink);
  microscope(g, 352, 104);
  tubeRack(g, 378, 98, t);
  magnet(g, 440, 80, 1);
  globe(g, 395, 140, 11, t);
  bookFront(g, 340, 128, 20, 28, TONE.green);
  bookFront(g, 424, 130, 20, 26, TONE.red);
  g.box(330, 158, 140, 6, C.brown, C.ink);

  // 실험대
  g.rect(0, 196, W, 74, C.brownL);
  g.rect(0, 196, W, 6, C.brown);
  g.rect(0, 196, W, 1, C.ink);
  g.rect(0, 202, W, 1, C.ink);
  for (let x = 20; x < W; x += 60) g.rect(x, 203, 1, 67, C.brown);

  // 플라스크 색 변화
  const toBlue = prog(t, 26, 32);
  const toGreen = prog(t, 50, 58);
  let liquid = C.glass;
  let liquid2 = null;
  let mix = 0;
  if (t >= 26 && t < 50) {
    liquid = toBlue >= 1 ? C.blue : C.glass;
    liquid2 = C.blue;
    mix = toBlue;
  } else if (t >= 50) {
    liquid = toGreen >= 1 ? C.green : C.blue;
    liquid2 = C.green;
    mix = toGreen;
  }
  const bubbles = t < 26 ? 1 : t < popT ? 3 + Math.floor(prog(t, 50, popT) * 8) : 6;
  const wob = t >= 52 && t < popT ? Math.round(Math.sin(t * 2.2) * 1.5) : 0;
  // 자라나는 새싹 (펑 이후) — 플라스크 뒤
  if (t >= popT) {
    const gp = eOut(prog(t, popT, popT + 24));
    const top = lerp(118, 52, gp);
    g.rect(239, top, 4, 118 - top, C.ink);
    g.rect(240, top, 2, 118 - top, C.green);
    const leaves = [[0.3, -1], [0.55, 1], [0.8, -1]];
    leaves.forEach(([at, s], i) => {
      const lp = eBack(prog(t, popT + 6 + i * 4, popT + 16 + i * 4));
      if (lp <= 0) return;
      const ly = lerp(118, top, at);
      g.ellipse(240 + s * 9 * lp, ly, 9 * lp + 1, 4 * lp + 1, C.ink);
      g.ellipse(240 + s * 9 * lp, ly, 9 * lp, 4 * lp, C.green);
      g.rect(240 + s * 6 * lp, ly - 1, 4 * lp, 1, C.greenL);
    });
    const fp = eBack(prog(t, popT + 20, popT + 32));
    if (fp > 0) {
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2 + t * 0.03;
        g.circle(241 + Math.cos(a) * 6 * fp, top + Math.sin(a) * 6 * fp, 4.5 * fp + 1, C.ink);
      }
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2 + t * 0.03;
        g.circle(241 + Math.cos(a) * 6 * fp, top + Math.sin(a) * 6 * fp, 4.5 * fp, i % 2 ? C.pinkH : C.pink);
      }
      g.circle(241, top, 3.5 * fp, C.yellow);
    }
  }
  flask(g, 240 + wob, 196, 70, 82, { level: 0.55, liquid, liquid2, mix, f: t, bubbles });

  // 스포이트 (손이 잡고 와서 꾹)
  const drops = [[C.blue, -1, 4, 14, 26], [C.yellow, 1, 30, 40, 50]];
  for (const [col, side, tin, tap, land] of drops) {
    const enter = eOut(prog(t, tin, tin + 10));
    const leave = eIn(prog(t, tap + 10, tap + 20));
    if (enter <= 0 || leave >= 1) continue;
    const dx = 240 + side * (1 - enter) * 200 + side * leave * 200;
    const dy = 34;
    const squeeze = t >= tap && t < tap + 6 ? 1 : 0;
    dropper(g, dx, dy, col, { squeeze, fill: t >= tap ? 0.3 : 0.7 });
    hand(g, dx + 4, dy + 4, squeeze * 2);
    pow(g, t - tap, dx + 46, dy + 18, 'TAP!', { dur: 16 });
    if (t >= tap && t < land) {
      const p = prog(t, tap, land);
      const yy = lerp(dy + 42, 160, eIn(p));
      g.ellipse(240, yy, 2.5, 3.5, C.ink);
      g.ellipse(240, yy, 1.5, 2.5, col);
    }
  }
  for (const [col, , , , land] of drops) {
    const st = t - land;
    if (st >= 0 && st < 10) {
      for (const s of [-1, 1]) g.rect(240 + s * (3 + st * 1.4), 160 - hop(st / 10) * 8, 2, 2, col);
    }
  }
  // 펑!
  if (t >= popT) {
    const pt = t - popT;
    for (let i = 0; i < 7; i++) {
      const a = (i / 7) * Math.PI * 2;
      const r = 6 + pt * 1.6;
      const life = 1 - pt / 26;
      if (life <= 0) break;
      g.save();
      g.dith = life;
      g.circle(240 + Math.cos(a) * r, 110 + Math.sin(a) * r * 0.6 - pt * 0.5, 9 * life + 3, C.white);
      g.restore();
    }
    burst(g, pt, 240, 112, { n: 26, seed: 13, speed: 3.4, life: 36, star: true, colors: [C.green, C.yellow, C.white, C.pinkH] });
    if (pt < 3) g.cover(C.white, 0.6);
    if (pt < 26) {
      const p = eBack(prog(pt, 0, 10));
      g.text('펑!', 304, 66 - p * 6, { scale: 3, color: C.yellow, fill2: C.orange, outline: C.ink, ow: 2, shadow: C.ink, sdx: 3, sdy: 3, align: 'center' });
    }
  }

  // 문제 배너
  panel(g, 14, 32, 210, 40);
  const res = t >= popT + 2;
  const eq = res ? '파랑 + 노랑 =' : '파랑 + 노랑 = ?';
  g.text(eq, 24, 41, {
    scale: 2,
    each: (i) => ({ color: i < 2 ? C.blueD : i >= 5 && i < 7 ? C.yellowD : C.ink }),
  });
  if (res) {
    const p = eBack(prog(t, popT + 2, popT + 12));
    chip(g, '초록!', 196, Math.round(lerp(10, 37, p)), { bg: C.green, scale: 2, pad: 5, padY: 3, sh: 3 });
  }

  // 마스코트
  const happy = t >= popT;
  mascot(g, 128, 196 - (happy ? Math.round(14 * hop(((t - popT) % 24) / 24)) : 0), {
    r: 11, face: happy ? 'happy' : t >= 26 ? 'wow' : 'smile', arms: happy ? 'up' : 'down', f: t,
  });
  absorb(g, t - popT - 6, 240, 100, 128, 166, { seed: 9, c: C.green, n: 6 });

  caption(g, t, '직접 실험하며 깨치는 과학', 10, 100);
  stageTag(g, t, 3, '과학 실험실', C.purple, 0);
  hud(g, f);
  blockWipe(g, 1 - prog(t, 0, 12), C.purple, 24, true);
  if (t >= 104) mosaic(g, 1 + prog(t, 104, 120) * 15);
  if (t >= 112) g.cover(C.blue, prog(t, 112, 120));
}

// ─────────────────────────────────────────────
// 4 · LIVE — 클래스인 스타일 온라인 라이브 수업 (600–959)
//     칠판 + 화상 타일 + 도구 막대. 집(온라인)과 학원 교실(오프라인)이 한 수업에
// ─────────────────────────────────────────────
const BOARD = [8, 26, 312, 196];
const T_TILE = [326, 26, 146, 66];
const TILES = [[326, 96, 72, 58], [400, 96, 72, 58], [326, 158, 72, 58], [400, 158, 72, 58]];
const STUDENTS = [
  { kid: KIDS.jiwoo, name: '지우', room: C.lemon, color: C.pinkH, join: 8 },
  { kid: KIDS.minjun, name: '민준', room: C.sky, color: C.blue, join: 14 },
  { kid: null, name: '학원 3반', room: C.mint, color: C.orange, join: 20 },
  { kid: KIDS.seoyeon, name: '서연', room: C.lav, color: C.green, join: 26 },
];
const TOOLS = ['펜', '지우개', '손들기', '응답기', '트로피', '타이머', '주사위', '무대'];
// 도구 막대에서 눌리는 순간: [t, 도구 번호]
const TOOL_PRESS = [[30, 0], [88, 2], [100, 7], [150, 3], [210, 4], [152, 5]];
const CHALK = rgb('#2E5E4E');
const CHALK2 = rgb('#3C7362');

// 매칭 활동: [단어, 커서 주인(학생 번호), 시작 위치, 그림 칸]
const CARDS_LIVE = [['APPLE', 0, [214, 146], 0], ['SUN', 1, [34, 150], 1], ['CAT', 3, [124, 158], 2]];
const PICS_X = [62, 162, 262];
const SNAP_T = [62, 68, 74];

function toolIcon(g, i, cx, cy, on) {
  const ink = on ? C.ink : C.white;
  switch (i) {
    case 0: pencil(g, cx - 9, cy - 3, 18, 6); break;
    case 1: g.box(cx - 7, cy - 4, 14, 8, C.pinkH, C.ink, 1, 1); g.rect(cx - 6, cy, 12, 3, C.white); break;
    case 2: palm(g, cx, cy - 7, 0.8); break;
    case 3:
      g.box(cx - 8, cy - 5, 8, 10, C.blue, C.ink);
      g.box(cx, cy - 5, 8, 10, C.orange, C.ink);
      g.text('A', cx - 4, cy - 3, { font: 'r7', color: C.white, align: 'center' });
      g.text('B', cx + 4, cy - 3, { font: 'r7', color: C.white, align: 'center' });
      break;
    case 4: trophy(g, cx, cy - 7, 0.75); break;
    case 5:
      g.circle(cx, cy, 7, C.ink);
      g.circle(cx, cy, 6, C.white);
      g.rect(cx, cy - 4, 1, 4, C.ink);
      g.rect(cx, cy, 3, 1, C.red);
      g.rect(cx - 1, cy - 9, 3, 2, ink);
      break;
    case 6:
      g.box(cx - 6, cy - 6, 12, 12, C.white, C.ink, 1, 2);
      for (const [dx, dy] of [[-3, -3], [0, 0], [3, 3], [3, -3], [-3, 3]]) g.rect(cx + dx - 1, cy + dy - 1, 2, 2, C.red);
      break;
    default:
      g.tri(cx - 8, cy + 6, cx + 8, cy + 6, cx, cy - 7, C.ink);
      g.tri(cx - 6, cy + 5, cx + 6, cy + 5, cx, cy - 4, C.yellow);
      g.rect(cx - 1, cy - 1, 2, 4, C.ink);
  }
}

// 화상 타일. s = 학생(null 이면 선생님)
function videoTile(g, rect, s, t, o = {}) {
  const [x, y, w, h] = rect;
  const { speak = false, mood = null, hand = 0, badge = null, trophies = 0, active = false, idx = 0 } = o;
  const r = Math.max(8, Math.round(h * 0.21));
  g.save();
  g.clip(x + 1, y + 1, w - 2, h - 2);
  g.rect(x, y, w, h, s ? s.room : C.mint);
  const bob = Math.round(Math.sin(t * 0.11 + idx * 1.7) * 1);
  if (!s) {
    // 선생님: 교실 벽 + 작은 칠판 + 헤드셋
    g.box(x + 6, y + 8, 34, 22, CHALK, C.brown, 2);
    g.text('ABC', x + 23, y + 13, { font: 'r9', color: C.white, align: 'center' });
    g.rect(x, y + h - 10, w, 10, C.gold);
    const ax = x + w / 2 + 14;
    adult(g, ax, y + h / 2 + 46 + bob, { hair: C.hair, top: C.orange, style: 'teacher', point: speak ? 0.5 + 0.5 * Math.sin(t * 0.3) : 0.2, f: t });
    const hy = y + h / 2 + 2 + bob;
    g.oval(ax, hy, 9, 9, C.ink, { from: Math.PI * 1.05, to: Math.PI * 1.95, t: 2 });
    g.box(ax - 10, hy - 2, 3, 5, C.ink2, C.ink);
    g.line(ax - 8, hy + 3, ax - 3, hy + 6, C.ink, 1);
    if (speak && Math.floor(t / 5) % 2) g.box(ax - 1, hy + 4, 3, 2, C.red, C.ink);
  } else if (!s.kid) {
    // 학원 교실: 앞을 보는 아이 셋 + 책상
    g.box(x + w / 2 - 18, y + 5, 36, 14, CHALK, C.brown, 1);
    g.rect(x, y + h - 14, w, 14, C.gold);
    [KIDS.doha, KIDS.jiwoo, KIDS.minjun].forEach((k, i) => {
      const kx = x + 14 + i * 22;
      const jump = mood === 'happy' ? Math.round(3 * hop(((t + i * 10) % 30) / 30)) : 0;
      const up = i === 1 && (hand > 0 || Math.floor((t + 20) / 40) % 2);
      if (up) {
        g.line(kx + 5, y + h - 22, kx + 8, y + h - 34 - jump, C.ink, 3);
        g.rect(kx + 7, y + h - 37 - jump, 3, 3, C.skin);
      }
      kidBust(g, kx, y + h - 24 - jump, 6, k, { mood: mood || 'smile', f: t });
      g.box(kx - 9, y + h - 12, 18, 6, C.brown, C.ink);
    });
  } else {
    // 집: 창문 + 선반
    g.box(x + 4, y + 5, 16, 13, C.skyM, C.ink);
    g.rect(x + 11, y + 5, 1, 13, C.ink);
    g.rect(x + w - 22, y + 14, 18, 2, C.brown);
    g.rect(x + w - 20, y + 9, 4, 5, C.red);
    g.rect(x + w - 15, y + 8, 4, 6, C.blue);
    const m = mood || (speak && Math.floor(t / 5) % 2 ? 'open' : 'smile');
    kidBust(g, x + w / 2, y + h * 0.58 + bob, r, s.kid, { mood: m, f: t });
    if (hand > 0) {
      const hp = eBack(clamp(hand));
      palm(g, x + w / 2 + r * 1.2, y + h * 0.5 - hp * r * 1.1, Math.max(0.6, r / 13), C.skin);
    }
  }
  g.restore();
  g.box(x, y, w, h, null, active ? C.yellow : C.ink, active ? 2 : 1);
  if (active) g.box(x - 1, y - 1, w + 2, h + 2, null, C.ink, 1);
  // 이름표 + 장소 + 마이크
  const label = s ? s.name : '선생님';
  const lw = g.measure(label, { font: 'r9' }) + 6;
  g.rect(x + 1, y + h - 12, lw, 11, C.ink);
  g.text(label, x + 4, y + h - 10, { font: 'r9', color: C.white });
  const place = !s ? '' : s.kid ? '집' : '학원';
  if (place) {
    const pw = g.measure(place, { font: 'r7' }) + 6;
    g.box(x + 2, y + 2, pw, 10, s.kid ? C.blue : C.orange, C.ink);
    g.text(place, x + 5, y + 3, { font: 'r7', color: C.white });
  }
  const mx = x + w - 12;
  const my = y + h - 4;
  for (let i = 0; i < 3; i++) {
    const lv = speak ? 2 + Math.round((Math.sin(t * 0.9 + i * 2.1 + idx) * 0.5 + 0.5) * (3 + i)) : 1;
    g.rect(mx + i * 3, my - lv, 2, lv, speak ? C.green : C.gray);
  }
  if (badge) {
    const [lab, col, bt] = badge;
    const p = eBack(prog(t, bt, bt + 8));
    if (p > 0) {
      g.box(x + w / 2 - 7, y + 2 - Math.round((1 - p) * 6), 14, 13, col, C.ink);
      g.text(lab, x + w / 2, y + 4 - Math.round((1 - p) * 6), { color: C.white, align: 'center', font: 'b11' });
    }
  }
  if (trophies > 0) {
    g.box(x + w - 24, y + 2, 22, 12, C.white, C.ink, 1, 2);
    trophy(g, x + w - 18, y + 3, 0.45);
    g.text(`${trophies}`, x + w - 8, y + 3, { font: 'r9', color: C.ink, align: 'center' });
  }
}

function sLive(g, t) {
  // 앱 배경 + 상단 바
  g.rect(0, 0, W, H, C.night);
  for (let y = 22; y < H; y += 8) for (let x = (y / 8) % 2 ? 4 : 0; x < W; x += 8) g.pset(x, y, C.night2);
  g.rect(0, 0, W, 20, C.ink);
  g.box(4, 3, 40, 14, C.red, C.ink);
  if (Math.floor(t / 20) % 2 === 0) g.circle(11, 10, 2.5, C.white);
  g.text('LIVE', 16, 5, { color: C.white });
  g.text('리틀마인즈 라이브 · 영어 놀이반', 52, 5, { color: C.white });
  const sec = 754 + Math.floor(t / 60);
  g.text(`${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}`, 474, 5, { color: C.gold, align: 'right' });
  for (let i = 0; i < 4; i++) g.rect(370 + i * 3, 14 - i * 2 - 2, 2, i * 2 + 3, C.green);
  g.text(`${1 + STUDENTS.filter((s) => t >= s.join).length + (t >= 20 ? 2 : 0)}명 접속`, 386, 5, { color: C.white });

  // 칠판
  const [bx, by, bw, bh] = BOARD;
  g.box(bx, by, bw, bh, CHALK, C.ink, 1);
  g.box(bx + 1, by + 1, bw - 2, bh - 2, null, C.brown, 4);
  g.box(bx + 4, by + 4, bw - 8, bh - 8, CHALK, C.brownD, 1);
  for (let i = 0; i < 18; i++) g.pset(bx + 10 + rnd(i, 101) * (bw - 20), by + 10 + rnd(i, 102) * (bh - 20), CHALK2);
  const ix = bx + 6;

  // ── A. 함께 쓰는 칠판: 그림-단어 짝짓기 (여러 아이 커서)
  const dim = t >= 88 && t < 270 ? 0.55 : 0;
  if (t >= 6) {
    typeText(g, '그림과 단어를 짝지어요!', 164, by + 10, t - 6, { per: 1, color: C.white, align: 'center' });
    const pics = [
      (cx, cy) => g.sprite(APPLE, cx, cy, { sx: 2, sy: 2, ax: 0.5, ay: 0.5 }),
      (cx, cy) => {
        for (let k = 0; k < 8; k++) {
          const a = (k / 8) * Math.PI * 2 + t * 0.03;
          g.line(cx + Math.cos(a) * 10, cy + Math.sin(a) * 10, cx + Math.cos(a) * 15, cy + Math.sin(a) * 15, C.yellow, 2);
        }
        g.circle(cx, cy, 9, C.ink);
        g.circle(cx, cy, 8, C.yellow);
        g.rect(cx - 3, cy - 1, 1, 2, C.ink);
        g.rect(cx + 2, cy - 1, 1, 2, C.ink);
      },
      (cx, cy) => cat(g, cx - 4, cy + 12, t),
    ];
    PICS_X.forEach((px, i) => {
      const p = eBack(prog(t, 10 + i * 4, 20 + i * 4));
      if (p <= 0) return;
      const fy = by + 26 + Math.round((1 - p) * 10);
      g.box(px - 26, fy, 52, 40, C.cream, C.ink, 1, 2);
      pics[i](px, fy + 20);
      // 칸 (분필 점선)
      for (let k = 0; k < 52; k += 4) {
        g.rect(px - 26 + k, by + 72, 2, 1, C.white);
        g.rect(px - 26 + k, by + 89, 2, 1, C.white);
      }
      g.rect(px - 26, by + 72, 1, 18, C.white);
      g.rect(px + 25, by + 72, 1, 18, C.white);
    });
    for (const [word, who, [sx0, sy0], slot] of CARDS_LIVE) {
      const s = STUDENTS[who];
      const snap = SNAP_T[slot];
      const grab = 44 + slot * 2;
      const tx = PICS_X[slot] - 24;
      const ty = by + 73;
      let cx;
      let cy;
      if (t < grab) [cx, cy] = [ix + sx0, by + sy0 - 26];
      else {
        const p = eIO(prog(t, grab, snap));
        cx = lerp(ix + sx0, tx, p);
        cy = lerp(by + sy0 - 26, ty, p) - hop(p) * 18;
      }
      const done = t >= snap;
      const appear = eBack(prog(t, 18 + slot * 3, 28 + slot * 3));
      if (appear <= 0) continue;
      if (!done && t >= grab) g.rect(cx + 3, cy + 3, 48, 16, C.ink);
      g.box(cx, cy - (t >= grab && !done ? 2 : 0) + Math.round((1 - appear) * 8), 48, 16, done ? C.lemon : C.white, done ? C.green : C.ink, done && t < snap + 10 ? 2 : 1);
      g.text(word, cx + 24, cy + 3 - (t >= grab && !done ? 2 : 0) + Math.round((1 - appear) * 8), { color: C.ink, align: 'center' });
      if (done) {
        g.line(cx + 40, cy - 6, cx + 44, cy - 2, C.green, 2);
        g.line(cx + 44, cy - 2, cx + 52, cy - 12, C.green, 2);
        burst(g, t - snap, cx + 24, cy + 8, { n: 14, seed: slot + 30, speed: 2.2, life: 22, star: true });
      }
      // 커서: 자기 타일에서 날아와 카드를 끌고 감
      if (t >= 24 && t < 88) {
        const [tx0, ty0] = TILES[who];
        let px;
        let py;
        if (t < grab) {
          const p = eOut(prog(t, 24 + slot * 3, grab));
          px = lerp(tx0 + 30, cx + 24, p);
          py = lerp(ty0 + 20, cy + 8, p);
        } else if (!done) [px, py] = [cx + 24, cy + 8];
        else [px, py] = [cx + 30 + Math.sin(t * 0.2 + slot) * 3, cy + 12 + Math.cos(t * 0.2 + slot) * 2];
        cursor(g, px, py, s.color, s.name, t >= grab && !done);
      }
    }
    if (dim) g.dither(bx + 5, by + 5, bw - 10, bh - 10, C.ink, dim);
  }
  // 칠판 구석 마스코트
  if (t >= 12) {
    const j = Math.round(8 * hop((t % 30) / 30));
    mascot(g, bx + bw - 22, by + bh - 8 - j, { r: 8, f: t, face: 'happy', arms: t % 60 < 30 ? 'up' : 'wave' });
  }

  // ── B. 손들기 → 무대로 올려 발표
  const STAGE = [70, 44, 188, 140];
  let staged = null;
  if (t >= 100 && t < 152) {
    const pin = eIO(prog(t, 100, 112));
    const pout = eIO(prog(t, 140, 152));
    const k = pin * (1 - pout);
    staged = TILES[0].map((v, i) => lerp(v, STAGE[i], k));
  }
  // ── C. 응답기
  const quizOpen = t >= 150 && t < 214;
  // ── D. 트로피
  const trophyT = 212;

  // 타일들
  const joinP = (j) => eBack(prog(t, j, j + 10));
  const tp = joinP(2);
  if (tp > 0) {
    const [x, y, w, h] = T_TILE;
    videoTile(g, [x + Math.round((1 - tp) * 160), y, w, h], null, t, { speak: (t > 20 && t < 88) || (t > 150 && t < 186) || (t > 200 && t < 240), active: t < 88 && t > 20 });
  }
  STUDENTS.forEach((s, i) => {
    const p = joinP(s.join);
    if (p <= 0) return;
    const [x, y, w, h] = TILES[i];
    const rect = [x + Math.round((1 - p) * 160), y, w, h];
    const ans = quizOpen || (t >= 214 && t < 270) ? ['B', t >= 184 ? C.green : C.purple, 160 + i * 6] : null;
    const got = t >= trophyT + 28 + i * 4 ? 1 : 0;
    const happy = t >= 184 || (t >= 62 && t < 88);
    const o = {
      idx: i, speak: i === 0 && t >= 112 && t < 146, mood: happy ? 'happy' : null,
      hand: i === 0 ? prog(t, 88, 96) * (t < 112 ? 1 : 0) : 0, badge: ans, trophies: got,
      active: i === 0 && t >= 88 && t < 152,
    };
    if (i === 0 && staged) {
      g.box(x, y, w, h, C.ink2, C.ink);
      g.text('무대 위', x + w / 2, y + h / 2 - 5, { font: 'r9', color: C.gray, align: 'center' });
      return;
    }
    videoTile(g, rect, s, t, o);
    if (t - s.join >= 0 && t - s.join < 14) g.ring(x + w / 2, y + h / 2, (t - s.join) * 4, C.white, 1);
  });
  if (t >= 88 && t < 112) {
    const [x, y] = TILES[0];
    for (let k = 0; k < 2; k++) g.ring(x + 52, y + 18, 6 + (((t - 88) * 1.2 + k * 8) % 16), C.yellow, 1);
    pow(g, t - 90, x - 18, y + 20, '손 번쩍!', { bg: C.yellow });
  }
  if (staged) {
    videoTile(g, staged.map(Math.round), STUDENTS[0], t, { idx: 0, speak: t >= 112 && t < 146, active: true, hand: t < 112 ? 1 : 0 });
    if (t >= 112) {
      const [x, y, w] = STAGE;
      chip(g, 'ON STAGE ★', x + w / 2, y - 10, { bg: C.orange, sh: 2, pad: 5, padY: 2 });
      const bp = eBack(prog(t, 114, 124));
      if (bp > 0 && t < 146) {
        const sx = x + w - 104;
        const sy = y + 8;
        g.save();
        g.translate(0, Math.round((1 - bp) * 8));
        g.rect(sx + 3, sy + 3, 96, 26, C.ink);
        g.box(sx, sy, 96, 26, C.white, C.ink, 1, 4);
        g.tri(sx + 6, sy + 25, sx + 16, sy + 25, sx + 2, sy + 36, C.ink);
        g.tri(sx + 7, sy + 24, sx + 14, sy + 24, sx + 4, sy + 32, C.white);
        typeText(g, "It's a CAT!", sx + 48, sy + 8, t - 118, { per: 2, color: C.ink, align: 'center' });
        g.restore();
      }
    }
  }
  // 무대 반응: 다른 타일에서 하트·별이 퐁퐁
  if (t >= 118 && t < 150) {
    [1, 2, 3].forEach((i) => {
      const [x, y, w] = TILES[i];
      for (let k = 0; k < 2; k++) {
        const ph = (t - 118 + k * 9 + i * 5) % 22;
        if (k % 2) g.sprite(HEART, x + w / 2 - 4 + (i % 2 ? 6 : -6), y + 30 - ph * 1.4);
        else starIcon(g, x + w / 2 + (i % 2 ? -10 : 10), y + 28 - ph * 1.3, 3);
      }
    });
  }

  if (quizOpen) {
    const pin = eBack(prog(t, 150, 162));
    const pout = eIn(prog(t, 204, 214));
    const s = pin * (1 - pout);
    if (s > 0.05) {
      const pw = 252 * s;
      const ph = 132 * s;
      const px = Math.round(164 - pw / 2);
      const py = Math.round(by + 14 + 66 - ph / 2);
      g.rect(px + 5, py + 5, pw, ph, C.ink);
      g.box(px, py, pw, ph, C.white, C.ink, 1, 3);
      if (s > 0.95) {
        g.rect(px + 1, py + 1, pw - 2, 16, C.orange);
        g.rect(px + 1, py + 17, pw - 2, 1, C.ink);
        g.text('응답기', px + 6, py + 3, { color: C.white });
        const left = Math.max(0, 5 - Math.floor((t - 152) / 6));
        g.text(t < 184 ? `${left}초` : '마감!', px + pw - 6, py + 3, { color: C.white, align: 'right' });
        g.text('Q. APPLE은 어떤 그림일까요?', px + pw / 2, py + 24, { color: C.ink, align: 'center' });
        const opts = ['A', 'B', 'C', 'D'];
        const icons = [
          (cx, cy) => { g.circle(cx, cy, 7, C.ink); g.circle(cx, cy, 6, C.yellow); },
          (cx, cy) => g.sprite(APPLE, cx, cy, { ax: 0.5, ay: 0.5, sx: 1.5, sy: 1.5 }),
          (cx, cy) => cat(g, cx - 3, cy + 8, t),
          (cx, cy) => starIcon(g, cx, cy, 6),
        ];
        const votes = STUDENTS.filter((_, i) => t >= 160 + i * 6).length;
        opts.forEach((o, i) => {
          const ox = px + 18 + i * 56;
          const oy = py + 40;
          const correct = i === 1;
          const reveal = t >= 184;
          g.box(ox, oy, 48, 44, reveal && correct ? C.mint : C.paper, reveal && correct ? C.green : C.ink, reveal && correct ? 2 : 1, 2);
          g.box(ox + 2, oy + 2, 12, 12, [C.blue, C.orange, C.purple, C.pinkH][i], C.ink);
          g.text(o, ox + 8, oy + 3, { font: 'r9', color: C.white, align: 'center' });
          icons[i](ox + 28, oy + 25);
          // 투표 점 + 결과 막대
          if (correct) {
            for (let v = 0; v < votes; v++) g.circle(ox + 8 + v * 11, oy + 52, 4, [C.pinkH, C.blue, C.orange, C.green][v]);
          }
          if (reveal) {
            const bp = eOut(prog(t, 184, 196));
            g.box(ox + 2, oy + 60, 44, 8, C.paper, C.ink);
            const fw = correct ? Math.round(42 * bp) : 0;
            if (fw > 0) g.rect(ox + 3, oy + 61, fw, 6, C.green);
            g.text(correct ? '100%' : '0%', ox + 24, oy + 71, { font: 'r9', color: correct ? C.greenD : C.grayD, align: 'center' });
          }
        });
        if (t >= 160 && t < 184) {
          for (let i = 0; i < 4; i++) {
            const ct = t - (160 + i * 6);
            if (ct >= 0 && ct < 10) g.ring(px + 18 + 56 + 24, py + 40 + 22, 4 + ct * 2.5, STUDENTS[i].color, 1);
          }
        }
      }
    }
    pow(g, t - 186, 270, by + 40, '딩동댕!', { bg: C.green, fg: C.white, dur: 20 });
  }

  // 트로피: 칠판 가운데 큰 트로피 → 각 타일로 날아감
  if (t >= trophyT && t < 270) {
    const tt = t - trophyT;
    g.save();
    g.clip(bx + 5, by + 5, bw - 10, bh - 10);
    if (tt < 58) rays(g, 164, by + 90, t, { n: 12, c1: C.yellow, c2: CHALK2, speed: 0.03, R: 200 });
    g.restore();
    const p = eBack(prog(tt, 0, 12));
    if (tt < 58) {
      const sc = Math.max(1, Math.round(p * 3));
      trophy(g, 164, by + 52 - (sc - 1) * 6, sc);
      if (tt > 8) popText(g, '참 잘했어요!', 164, by + 120, tt - 8, { scale: 2, color: C.white, outline: C.ink, ow: 2, align: 'center' });
    }
    STUDENTS.forEach((s, i) => {
      const at = trophyT + 14 + i * 4;
      const fp = prog(t, at, at + 14);
      const [x, y, w] = TILES[i];
      if (fp > 0 && fp < 1) {
        const e = eIO(fp);
        trophy(g, lerp(164, x + w - 18, e), lerp(by + 60, y + 3, e) - hop(fp) * 40, 1);
      }
      const lt = t - (at + 14);
      if (lt >= 0 && lt < 24) {
        g.text('+1', x + w - 22, y + 4 - lt * 0.8, { color: C.yellow, outline: C.ink, ow: 1 });
        burst(g, lt, x + w / 2, y + 30, { n: 10, seed: i + 50, speed: 1.6, life: 20 });
      }
    });
    pow(g, t - (trophyT + 2), 92, by + 40, '최고!', { bg: C.orange, fg: C.white, dur: 26 });
  }

  // ── E. 마무리: 반응 폭발 + 헤드라인
  if (t >= 270) {
    const tt = t - 270;
    // 모든 타일에서 반응이 퐁퐁
    STUDENTS.forEach((s, i) => {
      const [x, y, w] = TILES[i];
      for (let k = 0; k < 3; k++) {
        const ph = (tt + k * 8 + i * 4) % 26;
        const rx = x + 12 + ((k * 23 + i * 7) % (w - 20));
        if (k === 0) g.sprite(HEART, rx, y + 40 - ph * 1.6);
        else if (k === 1) starIcon(g, rx, y + 40 - ph * 1.5, 3);
        else g.text('♪', rx, y + 36 - ph * 1.5, { color: C.yellow, outline: C.ink, ow: 1 });
      }
    });
    g.dither(bx + 5, by + 5, bw - 10, bh - 10, C.ink, 0.75);
    popText(g, '온라인도 교실처럼', 164, by + 30, tt, { scale: 2, color: C.white, outline: C.ink, ow: 2, shadow: C.ink, sdx: 2, sdy: 2, align: 'center', per: 2 });
    if (tt >= 14) {
      const p = eBack(prog(tt, 14, 26));
      g.save();
      g.translate(0, Math.round((1 - p) * 20));
      chip(g, '생생하고 재밌게!', 164, by + 62, { bg: C.orange, scale: 3, sh: 4, pad: 5, padY: 4 });
      g.restore();
    }
    if (tt >= 30) typeText(g, '집에서도 학원에서도, 실시간으로 함께', 164, by + 124, tt - 30, { per: 1, color: C.yellow, outline: C.ink, ow: 1, align: 'center' });
    if (tt >= 40) {
      const p = eBack(prog(tt, 40, 50));
      g.save();
      g.translate(0, Math.round((1 - p) * 16));
      chip(g, '온라인', 120, by + 146, { bg: C.blue, sh: 3 });
      g.text('+', 164, by + 149, { scale: 2, color: C.white, outline: C.ink, ow: 1, align: 'center' });
      chip(g, '오프라인', 212, by + 146, { bg: C.orange, sh: 3 });
      g.restore();
    }
  }

  // 자막 (칠판 하단)
  const cap = { y: by + bh - 30, x: 150 };
  caption(g, t, '여럿이 함께 쓰는 실시간 칠판', 14, 82, cap);
  caption(g, t, '손들고, 무대에 올라 발표!', 92, 140, cap);
  caption(g, t, '응답기로 모두 동시에 참여', 156, 204, cap);
  caption(g, t, '트로피로 바로바로 칭찬', 218, 262, cap);

  // 도구 막대
  g.rect(0, 224, W, 46, C.night);
  g.box(8, 227, 464, 38, C.ink2, C.ink, 1, 3);
  TOOLS.forEach((name, i) => {
    const cx = 37 + i * 58;
    const press = TOOL_PRESS.filter(([at, k]) => k === i && t >= at && t < at + 16);
    let on = press.length > 0;
    let lift = on ? Math.round(3 * hop(clamp((t - press[0][0]) / 12))) : 0;
    if (t >= 270) {
      const beat = Math.floor((t - 270) / 7.5) % 8;
      if (beat === i) {
        on = true;
        lift = 2;
      }
    }
    g.box(cx - 24, 230 - lift, 48, 32, on ? C.yellow : C.ink, on ? C.white : C.ink2, 1, 3);
    toolIcon(g, i, cx, 241 - lift, on);
    g.text(name, cx, 252 - lift, { font: 'r7', color: on ? C.ink : C.gray, align: 'center' });
    if (press.length) {
      const pt = t - press[0][0];
      if (pt < 10) g.ring(cx, 246, 6 + pt * 2.5, C.yellow, 1);
    }
  });

  // 들어올 때 모자이크, 나갈 때 와이프
  if (t < 14) mosaic(g, 16 - prog(t, 0, 14) * 15);
  if (t < 8) g.cover(C.blue, 1 - prog(t, 0, 8));
  blockWipe(g, prog(t, 346, 360), C.navy);
}

// ─────────────────────────────────────────────
// 5 · PLAYER SELECT — 아이마다 맞춤 (960–1079)
// ─────────────────────────────────────────────
const CARDS = [
  { kid: KIDS.jiwoo, age: '5세', tag: 'ABC 놀이', bg: C.pink, icon: (g, x, y) => letterBlock(g, x, y, 14, 'A', TONE.red, { scale: 1 }) },
  { kid: KIDS.minjun, age: '7세', tag: '숫자 놀이', bg: C.mint, icon: (g, x, y) => letterBlock(g, x, y, 14, '1', TONE.yellow, { scale: 1 }) },
  { kid: KIDS.seoyeon, age: '초3', tag: '과학 탐험', bg: C.sky, icon: (g, x, y, t) => flask(g, x + 8, y + 16, 16, 20, { level: 0.6, liquid: C.green, f: t, bubbles: 2 }) },
];

function sSelect(g, t) {
  checker(g, t, C.navy, C.night2, 22, 0.6, 0.4);
  // 헤더
  const hp = eBack(prog(t, 2, 14));
  g.text('PLAYER SELECT', 240, Math.round(lerp(-30, 12, hp)), { scale: 2, color: C.yellow, fill2: C.orange, outline: C.ink, ow: 2, shadow: C.ink, sdx: 3, sdy: 3, align: 'center' });
  if (t >= 10) typeText(g, '우리 아이에게 딱 맞는 모험을 골라요', 240, 42, t - 10, { per: 1, color: C.white, outline: C.ink, ow: 1, align: 'center' });

  const sel = [[18, 0], [42, 1], [66, 2]];
  let cur = -1;
  for (const [at, i] of sel) if (t >= at) cur = i;
  const all = t >= 88;
  CARDS.forEach((c, i) => {
    const cx = 116 + i * 124;
    const p = eBack(prog(t, 4 + i * 4, 18 + i * 4));
    const y = Math.round(lerp(300, 64, p));
    const on = all || cur === i;
    const jump = on ? Math.round(6 * hop(((t - (all ? 88 : sel[i][0])) % 30) / 30)) : 0;
    panel(g, cx - 52, y, 104, 128, { bg: c.bg, sh: on ? 6 : 4 });
    if (on) g.dither(cx - 51, y + 1, 102, 126, C.white, 0.25);
    g.box(cx - 50, y + 2, 100, 82, null, C.white);
    g.rect(cx - 49, y + 3, 98, 80, c.bg);
    g.dither(cx - 49, y + 3, 98, 80, C.white, on ? 0.5 : 0.2);
    kidBust(g, cx, y + 44 - jump, 19, c.kid, { mood: on ? 'happy' : 'smile', f: t });
    g.rect(cx - 50, y + 84, 100, 1, C.ink);
    g.text(c.tag, cx, y + 96, { align: 'center', color: C.ink });
    g.text(c.kid.name, cx, y + 112, { font: 'r9', align: 'center', color: C.grayD });
    chip(g, c.age, cx - 52, y - 8, { bg: C.orange, align: 'left', sh: 2, pad: 4, padY: 2 });
    c.icon(g, cx + 30, y + 8, t);
    if (on) {
      for (let k = 0; k < 3; k++) sparkle(g, cx - 40 + ((k * 37 + t) % 80), y + 12 + ((k * 23) % 50), 0.4 + 0.4 * Math.sin(t * 0.3 + k));
    }
  });
  // 커서 (노란 꺾쇠)
  if (cur >= 0) {
    const from = cur > 0 ? 116 + (cur - 1) * 124 : 116;
    const at = sel[cur][0];
    const p = eOut(prog(t, at, at + 8));
    let cx = lerp(from, 116 + cur * 124, p);
    let hw = 58;
    if (all) {
      const ap = eBack(prog(t, 88, 100));
      cx = lerp(cx, 240, ap);
      hw = lerp(58, 182, ap);
    }
    const blink = Math.floor(t / 6) % 2 ? 0 : 1;
    const y0 = 58 - blink;
    const y1 = 198 + blink;
    const L = 10;
    for (const [x, y, dx, dy] of [[cx - hw - blink, y0, 1, 1], [cx + hw + blink, y0, -1, 1], [cx - hw - blink, y1, 1, -1], [cx + hw + blink, y1, -1, -1]]) {
      g.rect(Math.min(x, x + dx * L), y - (dy < 0 ? 3 : 0), L, 4, C.ink);
      g.rect(x - (dx < 0 ? 3 : 0), Math.min(y, y + dy * L), 4, L, C.ink);
      g.rect(Math.min(x, x + dx * L) + (dx > 0 ? 0 : 1), y - (dy < 0 ? 2 : 0) + (dy > 0 ? 1 : 0), L - 1, 2, C.yellow);
      g.rect(x - (dx < 0 ? 2 : 0) + (dx > 0 ? 1 : 0), Math.min(y, y + dy * L) + (dy > 0 ? 0 : 1), 2, L - 1, C.yellow);
    }
  }
  if (all) {
    const p = eBack(prog(t, 92, 102));
    g.save();
    g.translate(0, Math.round((1 - p) * 20));
    chip(g, '나이·수준별 맞춤 커리큘럼', 240, 214, { bg: C.yellow, fg: C.ink, scale: 2, sh: 4 });
    g.restore();
  }
  blockWipe(g, 1 - prog(t, 0, 12), C.navy, 24, true);
  if (t >= 112) g.cover(C.paper, prog(t, 112, 120));
}

// ─────────────────────────────────────────────
// 6 · PARENT — 부모는 안심 (1080–1199)
// ─────────────────────────────────────────────
function sParent(g, t) {
  g.rect(0, 0, W, H, C.paper);
  for (let y = -20; y < H + 20; y += 24) {
    for (let x = 0; x < W + 24; x += 24) {
      const ox = (Math.floor(y / 24) % 2) * 12;
      g.circle(x + ox, y + ((t * 0.3) % 24), 2, C.pink);
    }
  }
  // 하트 떠오름
  for (let i = 0; i < 8; i++) {
    const life = 90;
    const ph = (t + rnd(i, 81) * life) % life;
    const x = 20 + rnd(i, 82) * 260 + Math.sin(ph * 0.08 + i) * 6;
    const y = 280 - ph * 3;
    g.save();
    g.dith = 0.85;
    g.sprite(HEART, x, y);
    g.restore();
  }

  // 왼쪽 카피
  popText(g, '아이는 신나고', 26, 66, t - 8, { scale: 2, color: C.ink, per: 2 });
  if (t >= 24) {
    const p = eBack(prog(t, 24, 36));
    g.save();
    g.translate(Math.round((1 - p) * -260), 0);
    chip(g, '부모는 안심!', 26, 98, { bg: C.orange, scale: 3, align: 'left', sh: 5, pad: 8, padY: 5 });
    g.restore();
  }
  if (t >= 44) typeText(g, '오늘 무엇을 배웠는지 바로 알림으로', 28, 160, t - 44, { per: 1, color: C.brownD });
  const tags = [['알파벳', C.red], ['수학', C.yellowD], ['과학', C.green]];
  tags.forEach(([s, c], i) => {
    const p = eBack(prog(t, 60 + i * 5, 70 + i * 5));
    if (p <= 0) return;
    chip(g, `☑ ${s}`, 28 + i * 74, Math.round(lerp(200, 182, p)), { bg: c, align: 'left', sh: 3 });
  });
  // 마스코트 (하트 들고)
  mascot(g, 78, 252 - Math.round(8 * hop((t % 30) / 30)), { r: 10, f: t, face: 'happy', arms: 'up' });
  g.sprite(HEART, 72, 218 - Math.round(8 * hop((t % 30) / 30)));

  // 폰
  const pp = eBack(prog(t, 0, 16));
  const py = Math.round(lerp(290, 18, pp));
  const [sx, sy, sw, sh] = device(g, 306, py, 136, 240, { bezel: 6, shadow: 5, round: 10 });
  g.rect(sx, sy, sw, sh, C.cream);
  g.save();
  g.clip(sx, sy, sw, sh);
  g.text('9:41', sx + 4, sy + 3, { font: 'r7', color: C.ink });
  g.box(sx + sw - 16, sy + 3, 11, 6, C.green, C.ink);
  g.rect(sx, sy + 13, sw, 20, C.orange);
  g.rect(sx, sy + 33, sw, 1, C.ink);
  mascot(g, sx + 12, sy + 31, { r: 5, f: t, face: 'smile' });
  g.text('리틀마인즈', sx + 24, sy + 17, { color: C.white, outline: C.ink, ow: 1 });

  // 알림 카드
  if (t >= 26) {
    const p = eBack(prog(t, 26, 38));
    const cy = Math.round(lerp(sy - 50, sy + 40, p));
    g.rect(sx + 7, cy + 3, sw - 10, 46, C.ink);
    g.box(sx + 4, cy, sw - 10, 46, C.white, C.ink, 1, 3);
    kidHead(g, sx + 18, cy + 15, 8, KIDS.seoyeon, { mood: 'happy' });
    g.text('서연이의 오늘', sx + 32, cy + 6, { font: 'r9', color: C.grayD });
    g.text('모험 완료!', sx + 32, cy + 18, { color: C.ink });
    for (let i = 0; i < 5; i++) {
      const sp = eBack(prog(t, 40 + i * 3, 48 + i * 3));
      if (sp > 0) starIcon(g, sx + 18 + i * 20, cy + 37 - sp * 2, 4 + sp);
    }
    if (t < 46 && Math.floor(t / 3) % 2) g.box(sx + 4, cy, sw - 10, 46, null, C.orange, 2, 3);
  }
  // 오늘의 리포트
  if (t >= 52) {
    const ry = sy + 96;
    g.text('오늘의 리포트', sx + 6, ry, { color: C.ink });
    const rows = [['알파벳', TONE.red, 0.92], ['수학', TONE.yellow, 0.8], ['과학', TONE.green, 0.96]];
    rows.forEach(([lab, tone, v], i) => {
      const y = ry + 18 + i * 24;
      const p = eOut(prog(t, 56 + i * 6, 86 + i * 6));
      g.text(lab, sx + 6, y + 1, { font: 'r9', color: C.grayD });
      g.box(sx + 44, y, sw - 52, 11, C.paper, C.ink);
      const fw = Math.round((sw - 54) * v * p);
      if (fw > 0) {
        g.rect(sx + 45, y + 1, fw, 9, tone[0]);
        g.rect(sx + 45, y + 1, fw, 2, tone[2]);
      }
      if (p >= 1) sparkle(g, sx + 45 + fw, y + 5, 0.4 + 0.3 * Math.sin(t * 0.4 + i));
    });
    if (t >= 96) {
      const p = eBack(prog(t, 96, 106));
      g.save();
      g.translate(0, Math.round((1 - p) * 30));
      chip(g, '선생님 코멘트 도착!', sx + sw / 2, sy + sh - 30, { bg: C.blue, sh: 2, pad: 4, padY: 3 });
      g.restore();
    }
  }
  g.restore();
  if (t >= 30 && t < 50) {
    const k = t - 30;
    for (let i = 0; i < 3; i++) g.oval(442 + 6, py + 40, 8 + i * 5 + k * 0.6, 8 + i * 5 + k * 0.6, C.orange, { from: -0.6, to: 0.6 });
  }
  if (t < 6) g.cover(C.paper, 1 - prog(t, 0, 6));
  if (t >= 114) g.cover(C.white, prog(t, 114, 120));
}

// ─────────────────────────────────────────────
// 7 · FINALE (1200–1319)
// ─────────────────────────────────────────────
const RAIN = ['A', 'B', 'C', '1', '2', '3', '+', '×', '★', 'a', '7', '='];

function sFinale(g, t) {
  shake(g, t, 6, 10, 4);
  rays(g, 240, 70, t, { n: 16, c1: C.orange, c2: C.orangeL, speed: 0.008 });
  // 공부 요소 비
  for (let i = 0; i < 26; i++) {
    const sp = 0.8 + rnd(i, 91) * 0.9;
    const y = ((rnd(i, 92) * 300 + t * sp * 1.6) % 320) - 30;
    const x = rnd(i, 93) * 480 + Math.sin(t * 0.05 + i) * 8;
    if (i % 5 === 0) pencil(g, x, y, 30, 7, [TONE.yellow, TONE.blue, TONE.green][i % 3]);
    else if (i % 7 === 0) starIcon(g, x, y, 4);
    else g.text(RAIN[i % RAIN.length], x, y, { scale: 2, color: i % 2 ? C.yellow : C.white, outline: C.ink, ow: 1 });
  }
  // 불꽃놀이
  const fw = [[2, 110, 70, C.yellow], [12, 370, 60, C.white], [26, 70, 130, C.pinkH], [40, 410, 130, C.yellow], [58, 240, 30, C.white], [80, 140, 40, C.lemon], [96, 340, 40, C.pink]];
  for (const [at, x, y, c] of fw) {
    burst(g, t - at, x, y, { n: 28, seed: at + 1, speed: 2.4, grav: 0.05, life: 36, colors: [c, C.white, C.yellow], star: true });
    if (t - at >= 0 && t - at < 3) g.circle(x, y, 6, C.white);
  }

  // 로고 쾅
  const steps = [7, 6, 5, 4];
  const s = t < 6 ? steps[Math.min(3, Math.floor(t / 1.5))] : 4;
  const ly = t < 6 ? 20 - (s - 4) * 6 : 20;
  logo(g, 240, ly, s);
  if (t >= 6 && t < 9) g.cover(C.white, 0.5);
  if (t >= 6 && t < 30) {
    const k = t - 6;
    g.oval(240, ly + 48, 150 + k * 6, 14 + k, C.white, { t: 2 });
  }

  if (t >= 12) {
    const p = eBack(prog(t, 12, 24));
    chip(g, '놀면서 배우는 인터랙티브 수업', 240, Math.round(lerp(130, 86, p)), { bg: C.ink, fg: C.white, scale: 2, sh: 0, pad: 10 });
  }
  if (t >= 22) typeText(g, '유·초등 학원의 온라인 라이브도, 오프라인 교실도 생생하게', 240, 126, t - 22, { per: 1, color: C.white, outline: C.ink, ow: 1, align: 'center' });
  if (t >= 34) {
    const p = eBack(prog(t, 34, 46));
    const blink = Math.floor(t / 15) % 2;
    g.save();
    g.translate(0, Math.round((1 - p) * 30));
    chip(g, `${blink ? '▶' : '▷'} 무료 체험 수업 신청`, 240, 146, { bg: C.yellow, fg: C.ink, scale: 2, sh: 5, pad: 12, padY: 5 });
    g.restore();
  }

  // 바닥 + 친구들
  g.rect(0, 246, W, 24, C.green);
  g.rect(0, 246, W, 2, C.ink);
  g.rect(0, 250, W, 2, C.greenL);
  for (let i = 0; i < 24; i++) g.rect((i * 41 + 7) % 480, 255 + (i % 3) * 5, 3, 2, i % 2 ? C.yellow : C.white);
  const friends = [[120, KIDS.jiwoo, 0], [176, KIDS.minjun, 15], [304, KIDS.seoyeon, 15], [360, KIDS.doha, 0]];
  for (const [x, kid, off] of friends) {
    const j = Math.round(8 * hop(((t + off) % 30) / 30));
    kidBust(g, x, 226 - j, 12, kid, { mood: 'happy', f: t });
  }
  const mj = Math.round(12 * hop((t % 30) / 30));
  mascot(g, 240, 246 - mj, { r: 12, f: t, face: 'happy', arms: 'up', flower: true, sq: mj === 0 ? 0.85 : 1.08 });
  confetti(g, t, { n: 70, from: 6, speed: 1.4 });
}

// ─────────────────────────────────────────────
const SCENES = [
  [0, 120, sBoot],
  [120, 360, sAbc],
  [360, 480, sMath],
  [480, 600, sScience],
  [600, 960, sLive],
  [960, 1080, sSelect],
  [1080, 1200, sParent],
  [1200, 1320, sFinale],
];

export function renderFrame(g, f) {
  g.reset();
  for (const [a, b, fn] of SCENES) {
    if (f >= a && f < b) {
      fn(g, f - a, f);
      return;
    }
  }
}

// 오디오 싱크용 효과음 큐: [프레임, 이름, 인자]
export const SFX = [
  [1, 'power'],
  ...Array.from({ length: 11 }, (_, j) => [22 + j * 3 + 6, 'blip', j]),
  [66, 'jump'], [84, 'land'], [86, 'chime'],
  [102, 'iris'],
  [120 + 0, 'irisOpen'], [120 + 10, 'stage'],
  [120 + 108, 'tap'], [120 + 110, 'jump'], [240, 'bonk'], [246, 'letter', 0],
  [120 + 138, 'tap'], [120 + 140, 'jump'], [270, 'bonk'], [276, 'letter', 1],
  [120 + 168, 'tap'], [120 + 170, 'jump'], [300, 'bonk'], [306, 'letter', 2],
  [316, 'fanfare'], [326, 'meow'],
  [348, 'wipe'],
  [360, 'stage'], [370, 'grab'], [390, 'snap'], [392, 'fanfare'],
  [410, 'coin'], [422, 'coin'], [434, 'coin'], [468, 'wipe'],
  [480, 'stage'], [494, 'tap'], [506, 'drop'], [520, 'tap'], [530, 'drop'], [532, 'bubble'], [540, 'pop'], [544, 'grow'],
  [584, 'mosaic'],
  // LIVE (600–959)
  [600, 'whoosh'], [602, 'join', 0], [608, 'join', 1], [614, 'join', 2], [620, 'join', 3], [626, 'join', 4],
  [630, 'tap'], [646, 'grab'], [662, 'letter', 0], [668, 'letter', 1], [674, 'letter', 2],
  [688, 'raise'], [700, 'tap'], [702, 'whoosh'], [718, 'chime'],
  [750, 'open'], [760, 'tap'], [766, 'tap'], [772, 'tap'], [778, 'tap'], [784, 'fanfare'],
  [810, 'tap'], [812, 'trophy'], [840, 'coin', 0], [844, 'coin', 1], [848, 'coin', 2], [852, 'coin', 3],
  [870, 'confirm'], ...Array.from({ length: 9 }, (_, i) => [878 + i * 7.5, 'ping', i]),
  [946, 'wipe'],
  [966, 'whoosh'], [978, 'select'], [1002, 'select'], [1026, 'select'], [1048, 'confirm'],
  [1080, 'whoosh'], [1106, 'notify'], [1120, 'star'], [1123, 'star'], [1126, 'star'], [1129, 'star'], [1132, 'star'],
  [1136, 'rise'], [1176, 'ding'],
  [1194, 'riser'],
  [1206, 'slam'], [1202, 'firework'], [1212, 'firework'], [1226, 'firework'], [1240, 'firework'], [1258, 'firework'], [1280, 'firework'], [1296, 'firework'],
];
