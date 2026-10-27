// 리틀마인즈 쇼릴 — 22초 · 60fps · 120BPM (1박 = 30프레임, 1마디 = 120프레임)
//
//  0.0s  BOOT      CRT가 켜지고 학용품들이 궤도로 날아들며 로고 등장
//  2.0s  LIVE      실시간 온라인 수업 (14초, 한 화면에서 이어짐)
//                   타이머·객관식 퀴즈 → 개인 칠판 → 랜덤 선택·트로피 → 가상 실험 → AI 스피킹 → 정리
// 16.0s  SELECT    5세·7세·초3, 아이마다 맞춤
// 18.0s  PARENT    부모님 폰으로 오는 오늘의 리포트
// 20.0s  FINALE    로고 + 도입 문의
import { C, rgb, W, H } from './gfx.mjs';
import {
  clamp, lerp, prog, eOut, eIn, eIO, eBack, eBounce, rnd, hop,
  mascot, KIDS, kidHead, kidBust, adult, APPLE, HEART,
  starIcon, coin, sparkle, device, chip, panel,
  burst, confetti, rays, iris, blockWipe, starfield, checker, gradient,
  popText, typeText, pow, cursor, trophy, palm,
} from './art.mjs';
import {
  TONE, pencil, crayon, ruler, bookFront, abacus, flask,
  magnifier, globe, rocket, letterBlock, atom, cat,
} from './tools.mjs';

export const FPS = 60;
export const BEAT = 30;
export const BAR = 120;
export const FRAMES = 1320;
const BLACK = rgb('#0B0814');

// ─────────────────────────────────────────────
// 공통
// ─────────────────────────────────────────────
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
    chip(g, '실시간으로 함께하는 놀이 수업!', 240, Math.round(lerp(176, 140, p)), { scale: 2, bg: C.orange, pad: 10, padY: 5, sh: 4 });
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
// 1 · LIVE — 실시간 온라인 수업 (120–959)
//     칠판 + 화상 타일 + 도구 막대가 그대로 이어지고, 칠판 위 활동만 바뀐다.
//     집(온라인) 타일 셋 + '학원 3반'(오프라인 교실) 타일이 한 수업에.
//   t   0–120  타이머 + 객관식 퀴즈
//   t 120–240  개인 칠판 (손글씨) → 선생님 도장
//   t 240–360  랜덤 선택 → 트로피
//   t 360–480  가상 실험 (전기 회로)
//   t 480–720  AI 스피킹: 듣기 → 따라 읽기 → AI 채점
//   t 720–840  정리: 실시간 온라인 수업도 교실처럼
// ─────────────────────────────────────────────
const LIVE0 = 120;
const BOARD = [8, 26, 312, 196];
const [BX, BY, BW, BH] = BOARD;
const BCX = BX + BW / 2;
const T_TILE = [326, 26, 146, 66];
const TILES = [[326, 96, 72, 58], [400, 96, 72, 58], [326, 158, 72, 58], [400, 158, 72, 58]];
const STUDENTS = [
  { kid: KIDS.jiwoo, name: '지우', room: C.lemon, color: C.pinkH, join: 10 },
  { kid: KIDS.minjun, name: '민준', room: C.sky, color: C.blue, join: 16 },
  { kid: null, name: '학원 3반', room: C.mint, color: C.orange, join: 22 },
  { kid: KIDS.seoyeon, name: '서연', room: C.lav, color: C.green, join: 28 },
];
const LIVE_TOOLS = ['타이머', '객관식', '개인칠판', '랜덤', '트로피', '가상실험', 'AI 스피킹', '손들기'];
// [시작, 끝, 켜진 도구]
const TOOL_ON = [[14, 120, 0], [22, 120, 1], [124, 240, 2], [244, 318, 3], [318, 360, 4], [364, 480, 5], [484, 720, 6]];
const TOOL_PRESS = [[14, 0], [22, 1], [124, 2], [244, 3], [318, 4], [364, 5], [484, 6]];
const TEACHER_TALK = [[14, 44], [124, 142], [244, 258], [364, 380], [720, 770]];
const CHALK = rgb('#2E5E4E');
const CHALK2 = rgb('#3C7362');
const PRINT = rgb('#1D3557');
const PRINT2 = rgb('#2C4F7C');

// A. 퀴즈: 학생별 고른 보기(0~3)와 누른 시각
const QUIZ_NUMS = [6, 7, 8, 9];
const QUIZ_PICK = [1, 1, 1, 2];
const QUIZ_VOTE = [34, 42, 50, 58];
const QUIZ_T0 = 24;
const QUIZ_STEP = 12;
const QUIZ_REVEAL = QUIZ_T0 + QUIZ_STEP * 5;

// B. 개인 칠판
const WRITERS = [
  { word: 'CAT', at: 134, dur: 44 },
  { word: 'CAT', at: 138, dur: 34 },
  { word: 'CAT', at: 146, dur: 46 },
  { word: 'cat', at: 142, dur: 40 },
];
const MINI = [[BX + 12, BY + 54], [BX + 160, BY + 54], [BX + 12, BY + 108], [BX + 160, BY + 108]];
const STAMP_T = [196, 202, 208, 214];

// C. 랜덤 선택: 점점 느려지다 민준(1)에서 멈춤
const PICK_T0 = 248;
const PICK_GAPS = [3, 3, 3, 3, 3, 4, 4, 5, 6, 7, 9, 11];
const PICK_HOPS = PICK_GAPS.reduce((a, d) => [...a, a[a.length - 1] + d], [PICK_T0]);
const PICK_T = PICK_HOPS[PICK_HOPS.length - 1];
const pickIdx = (t) => {
  let h = 0;
  while (h + 1 < PICK_HOPS.length && t >= PICK_HOPS[h + 1]) h++;
  return (h + 1) % 4;
};
const TROPHY_T = 320;
const TROPHY_LAND = 348;

// D. 가상 실험
const LAB_GRAB = 384;
const LAB_SNAP = 400;
const LAB_OFF = 432;
const LAB_ON = 450;

// E. AI 스피킹
const SENT = ['I', 'like', 'cats.'];
const AI_WORDS = [500, 518, 536];
const KID_WORDS = [584, 604, 624];
const WORD_SCORE = [98, 96, 91];
const SPEAK_SCORE_T = 652;

function liveToolIcon(g, i, cx, cy, t) {
  switch (i) {
    case 0:
      g.circle(cx, cy + 1, 7, C.ink);
      g.circle(cx, cy + 1, 6, C.white);
      g.rect(cx, cy - 3, 1, 4, C.ink);
      g.rect(cx, cy + 1, 3, 1, C.red);
      g.rect(cx - 2, cy - 8, 5, 2, C.ink);
      break;
    case 1:
      g.box(cx - 9, cy - 5, 9, 11, C.blue, C.ink);
      g.box(cx, cy - 5, 9, 11, C.orange, C.ink);
      g.text('1', cx - 4, cy - 3, { font: 'r7', color: C.white, align: 'center' });
      g.text('2', cx + 5, cy - 3, { font: 'r7', color: C.white, align: 'center' });
      break;
    case 2:
      g.box(cx - 9, cy - 6, 18, 12, C.white, C.ink, 1, 1);
      g.line(cx - 6, cy + 2, cx - 2, cy - 2, C.blue, 1);
      g.line(cx - 2, cy - 2, cx + 2, cy + 1, C.blue, 1);
      g.line(cx + 2, cy + 1, cx + 6, cy - 3, C.blue, 1);
      break;
    case 3:
      g.box(cx - 6, cy - 6, 12, 12, C.white, C.ink, 1, 2);
      for (const [dx, dy] of [[-3, -3], [0, 0], [3, 3], [3, -3], [-3, 3]]) g.rect(cx + dx - 1, cy + dy - 1, 2, 2, C.red);
      break;
    case 4:
      trophy(g, cx, cy - 7, 0.75);
      break;
    case 5:
      flask(g, cx, cy + 7, 14, 15, { level: 0.55, liquid: C.green, f: t, bubbles: 1 });
      break;
    case 6:
      g.box(cx - 3, cy - 8, 7, 11, C.gray, C.ink, 1, 3);
      g.rect(cx - 1, cy - 6, 1, 6, C.white);
      g.oval(cx, cy - 1, 6, 5, C.ink, { from: 0, to: Math.PI });
      g.rect(cx, cy + 4, 1, 3, C.ink);
      g.rect(cx - 3, cy + 7, 7, 1, C.ink);
      break;
    default:
      palm(g, cx, cy - 7, 0.8);
  }
}

// 화상 타일. s = 학생(null 이면 선생님)
function videoTile(g, rect, s, t, o = {}) {
  const [x, y, w, h] = rect;
  const { speak = false, mood = null, badge = null, trophies = 0, active = false, idx = 0, writing = false, rec = false } = o;
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
      if (i === 1 && Math.floor((t + 20) / 40) % 2) {
        g.line(kx + 5, y + h - 22, kx + 8, y + h - 34 - jump, C.ink, 3);
        g.rect(kx + 7, y + h - 37 - jump, 3, 3, C.skin);
      }
      kidBust(g, kx, y + h - 24 - jump, 6, k, { mood: mood || 'smile', f: t });
      g.box(kx - 9, y + h - 12, 18, 6, C.brown, C.ink);
      if (writing && i !== 1) pencil(g, kx - 2, y + h - 15 + (Math.floor(t / 4) % 2), 10, 3);
    });
  } else {
    // 집: 창문 + 선반
    g.box(x + 4, y + 5, 16, 13, C.skyM, C.ink);
    g.rect(x + 11, y + 5, 1, 13, C.ink);
    g.rect(x + w - 22, y + 14, 18, 2, C.brown);
    g.rect(x + w - 20, y + 9, 4, 5, C.red);
    g.rect(x + w - 15, y + 8, 4, 6, C.blue);
    const m = mood || (speak && Math.floor(t / 5) % 2 ? 'open' : 'smile');
    kidBust(g, x + w / 2, y + h * 0.58 + bob + (writing ? 2 : 0), r, s.kid, { mood: m, f: t });
    if (writing) pencil(g, x + w / 2 + 4 + (Math.floor(t / 3) % 3), y + h - 16, 18, 4);
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
  if (rec) {
    g.box(x + w - 27, y + 2, 25, 11, C.red, C.ink);
    if (Math.floor(t / 10) % 2 === 0) g.circle(x + w - 22, y + 7, 2, C.white);
    g.text('REC', x + w - 18, y + 3, { font: 'r7', color: C.white });
  } else if (trophies > 0) {
    g.box(x + w - 24, y + 2, 22, 12, C.white, C.ink, 1, 2);
    trophy(g, x + w - 18, y + 3, 0.45);
    g.text(`${trophies}`, x + w - 8, y + 3, { font: 'r9', color: C.ink, align: 'center' });
  }
}

function tileOpts(i, t) {
  const o = { idx: i, mood: null, badge: null, trophies: 0, active: false, writing: false, rec: false, speak: false };
  if (t >= 30 && t < 120) {
    const ch = QUIZ_PICK[i];
    o.badge = [String(QUIZ_NUMS[ch]), t >= QUIZ_REVEAL ? (ch === 1 ? C.green : C.red) : C.purple, QUIZ_VOTE[i]];
    if (t >= QUIZ_REVEAL) o.mood = 'happy';
  }
  const wr = WRITERS[i];
  if (t >= wr.at && t < wr.at + wr.dur) o.writing = true;
  if (t >= STAMP_T[i] && t < 240) o.mood = 'happy';
  if (t >= PICK_T0 && t < PICK_T + 12) o.active = pickIdx(t) === i;
  if (i === 1 && t >= PICK_T && t < 360) {
    o.active = true;
    o.mood = 'happy';
  }
  if (i === 1 && t >= TROPHY_LAND) o.trophies = 1;
  if (i === 3 && t >= 372 && t < LAB_SNAP + 4) o.active = true;
  if (i === 1 && t >= 420 && t < LAB_ON + 6) o.active = true;
  if (t >= LAB_SNAP + 4 && t < 480) o.mood = 'happy';
  if (i === 0 && t >= 566 && t < 650) {
    o.rec = true;
    o.active = true;
    o.speak = KID_WORDS.some((w) => t >= w && t < w + 16);
  }
  if (t >= SPEAK_SCORE_T) o.mood = 'happy';
  return o;
}

function boardTab(g, t, label, bg, t0, fg = C.white) {
  const p = eBack(prog(t, t0, t0 + 10));
  if (p <= 0) return;
  chip(g, label, BX + 10 - Math.round((1 - p) * 120), BY + 8, { bg, fg, align: 'left', sh: 2, pad: 6, padY: 2 });
}

// 칠판 지우개가 쓱 지나감 (활동 전환)
function eraser(g, t, t0) {
  const p = prog(t, t0, t0 + 12);
  if (p <= 0 || p >= 1) return;
  const ex = lerp(BX - 10, BX + BW + 10, eIO(p));
  const ey = BY + 40 + Math.sin(p * Math.PI * 3) * 50 + 50;
  for (let i = 0; i < 8; i++) {
    const d = (i * 7 + t) % 24;
    g.rect(ex - 14 - d, ey + ((i * 13) % 30) - 15, 2, 2, C.white);
  }
  g.rect(ex - 8 + 3, ey - 16 + 3, 18, 32, C.ink);
  g.box(ex - 8, ey - 16, 18, 32, C.pinkH, C.ink, 1, 2);
  g.rect(ex - 7, ey + 6, 16, 9, C.gray);
  g.rect(ex - 7, ey - 15, 3, 20, C.pink);
}

function pie(g, cx, cy, r, frac, c) {
  if (frac <= 0) return;
  const n = Math.max(2, Math.ceil(40 * frac));
  const a0 = -Math.PI / 2;
  for (let i = 0; i < n; i++) {
    const a = a0 + (i / n) * frac * Math.PI * 2;
    const b = a0 + ((i + 1) / n) * frac * Math.PI * 2;
    g.tri(cx, cy, cx + Math.cos(a) * r, cy + Math.sin(a) * r, cx + Math.cos(b) * r, cy + Math.sin(b) * r, c);
  }
}

// ── 손글씨 획 (0..1 상자 기준)
const arcPts = (cx, cy, rx, ry, a0, a1, n = 14) =>
  Array.from({ length: n + 1 }, (_, k) => {
    const a = Math.PI * (a0 + ((a1 - a0) * k) / n);
    return [cx + Math.cos(a) * rx, cy - Math.sin(a) * ry];
  });
const STROKES = {
  C: [arcPts(0.48, 0.5, 0.42, 0.5, 0.28, 1.72)],
  A: [[[0, 1], [0.42, 0], [0.84, 1]], [[0.18, 0.62], [0.66, 0.62]]],
  T: [[[0, 0.02], [0.86, 0]], [[0.43, 0], [0.45, 1]]],
  c: [arcPts(0.4, 0.68, 0.32, 0.32, 0.3, 1.7)],
  a: [arcPts(0.36, 0.7, 0.28, 0.3, 0.1, 2.1), [[0.66, 0.38], [0.66, 1]]],
  t: [[[0.32, 0.08], [0.32, 0.9], [0.5, 1]], [[0.08, 0.38], [0.58, 0.38]]],
};
// 반환: 펜 끝 위치
function handwrite(g, word, x, y, h, p, color, seed) {
  const segs = [];
  [...word].forEach((ch, li) => {
    const ox = x + li * h * 0.86;
    for (const stroke of STROKES[ch]) {
      const pts = stroke.map(([u, v], k) => [
        ox + u * h * 0.72 + (rnd(li * 31 + k, seed) - 0.5) * 2,
        y + v * h + (rnd(li * 17 + k, seed + 3) - 0.5) * 2,
      ]);
      for (let k = 1; k < pts.length; k++) segs.push([pts[k - 1], pts[k], Math.hypot(pts[k][0] - pts[k - 1][0], pts[k][1] - pts[k - 1][1])]);
    }
  });
  const total = segs.reduce((s, q) => s + q[2], 0);
  let left = total * clamp(p);
  let tip = null;
  for (const [a, b, L] of segs) {
    if (left <= 0) break;
    const k = Math.min(1, left / L);
    const e = [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k];
    g.line(a[0], a[1], e[0], e[1], color, 2);
    tip = e;
    left -= L;
  }
  return tip;
}

function stamp(g, cx, cy, t) {
  if (t < 0) return;
  const k = t < 6 ? 1 + (1 - t / 6) * 0.8 : 1;
  const w = Math.round(48 * k);
  const h = Math.round(18 * k);
  g.box(cx - w / 2, cy - h / 2, w, h, null, C.red, 2);
  g.box(cx - w / 2 + 3, cy - h / 2 + 3, w - 6, h - 6, null, C.red, 1);
  if (t >= 6) g.text('참잘했어요', cx, cy - 4, { font: 'r7', color: C.red, align: 'center' });
  if (t >= 6 && t < 16) g.ring(cx, cy, 20 + (t - 6) * 2, C.red, 1);
}

// ── 활동 A: 타이머 + 객관식
function actQuiz(g, t) {
  if (t < 8 || t >= 120) return;
  boardTab(g, t, '타이머 퀴즈', C.orange, 8);
  typeText(g, 'Q. 사과는 모두 몇 개일까요?', BX + 12, BY + 30, t - 12, { per: 1, color: C.white });
  for (let i = 0; i < 7; i++) {
    const p = eBack(prog(t, 16 + i * 2, 24 + i * 2));
    if (p <= 0) continue;
    g.sprite(APPLE, BX + 14 + i * 20 + (i >= 3 ? 18 : 0), BY + 48 + Math.round((1 - p) * 8), { sx: 2, sy: 2 });
  }
  if (t >= 22) g.text('+', BX + 78, BY + 50, { scale: 2, color: C.white, outline: C.ink, ow: 1 });
  // 원형 타이머
  const tx = BX + BW - 34;
  const ty = BY + 36;
  const frac = clamp(1 - (t - QUIZ_T0) / (QUIZ_STEP * 5));
  const left = Math.max(0, Math.ceil(frac * 5));
  if (t < QUIZ_REVEAL + 4) {
    g.circle(tx, ty, 21, C.ink);
    g.circle(tx, ty, 20, C.ink2);
    pie(g, tx, ty, 19, frac, frac < 0.4 ? C.red : C.orange);
    g.circle(tx, ty, 12, C.ink);
    g.circle(tx, ty, 11, C.white);
    const beat = t >= QUIZ_T0 && (t - QUIZ_T0) % QUIZ_STEP < 3;
    g.text(String(left), tx + 1, ty - 10 - (beat ? 1 : 0), { scale: 2, color: left <= 2 ? C.red : C.ink, align: 'center' });
  } else {
    const p = eBack(prog(t, QUIZ_REVEAL + 4, QUIZ_REVEAL + 14));
    g.save();
    g.translate(0, Math.round((1 - p) * -10));
    chip(g, '참여 4/4', tx, ty - 18, { bg: C.blue, sh: 2, pad: 5, padY: 2 });
    chip(g, '정답률 75%', tx - 8, ty + 2, { bg: C.green, sh: 2, pad: 5, padY: 2 });
    g.restore();
  }
  // 보기 카드
  const reveal = t >= QUIZ_REVEAL;
  QUIZ_NUMS.forEach((num, i) => {
    const cx = BX + 12 + i * 74;
    const cy = BY + 80;
    const p = eBack(prog(t, 26 + i * 3, 36 + i * 3));
    if (p <= 0) return;
    const yy = cy + Math.round((1 - p) * 12);
    const ok = reveal && i === 1;
    g.rect(cx + 3, yy + 3, 66, 50, C.ink);
    g.box(cx, yy, 66, 50, ok ? C.mint : C.paper, ok ? C.green : C.ink, ok ? 2 : 1, 2);
    g.text('①②③④'[i], cx + 5, yy + 4, { color: [C.blue, C.orange, C.purple, C.pinkH][i] });
    g.text(String(num), cx + 34, yy + 8, { scale: 3, color: C.ink, align: 'center' });
    // 투표한 아이들 점
    let k = 0;
    STUDENTS.forEach((s, si) => {
      if (QUIZ_PICK[si] !== i || t < QUIZ_VOTE[si]) return;
      const vp = eBack(prog(t, QUIZ_VOTE[si], QUIZ_VOTE[si] + 6));
      g.circle(cx + 9 + k * 10, yy + 44, 3.5 * vp + 1, C.ink);
      g.circle(cx + 9 + k * 10, yy + 44, 3.5 * vp, s.color);
      if (t - QUIZ_VOTE[si] < 10) g.ring(cx + 33, yy + 25, 6 + (t - QUIZ_VOTE[si]) * 2.5, s.color, 1);
      k++;
    });
    if (reveal && i === 2) {
      g.line(cx + 46, yy + 36, cx + 56, yy + 46, C.red, 2);
      g.line(cx + 56, yy + 36, cx + 46, yy + 46, C.red, 2);
    }
    if (reveal) {
      const pct = [0, 75, 25, 0][i];
      const bp = eOut(prog(t, QUIZ_REVEAL, QUIZ_REVEAL + 14));
      g.box(cx, BY + 136, 66, 8, C.ink2, C.ink);
      const fw = Math.round(64 * (pct / 100) * bp);
      if (fw > 0) g.rect(cx + 1, BY + 137, fw, 6, i === 1 ? C.green : C.red);
      g.text(`${pct}%`, cx + 33, BY + 147, { font: 'r9', color: C.white, align: 'center' });
    }
  });
  pow(g, t - QUIZ_REVEAL - 2, BX + 214, BY + 58, '정답!', { bg: C.green, fg: C.white, dur: 22 });
}

// ── 활동 B: 개인 칠판
function actBoards(g, t) {
  if (t < 126 || t >= 240) return;
  boardTab(g, t, '개인 칠판', C.blue, 126);
  if (t >= 128) g.text('모두의 칠판 실시간 보기', BX + BW - 10, BY + 12, { font: 'r9', color: C.yellow, align: 'right' });
  cat(g, BX + 26, BY + 50, t);
  typeText(g, '그림을 보고 영어로 써 보세요!', BX + 46, BY + 32, t - 128, { per: 1, color: C.white });
  STUDENTS.forEach((s, i) => {
    const [x, y] = MINI[i];
    const p = eBack(prog(t, 130 + i * 3, 140 + i * 3));
    if (p <= 0) return;
    const yy = y + Math.round((1 - p) * 12);
    g.rect(x + 3, yy + 3, 140, 50, C.ink);
    g.box(x, yy, 140, 50, C.white, C.ink, 1, 2);
    chip(g, `${s.name}의 칠판`, x + 3, yy + 3, { font: 'r9', bg: s.color, align: 'left', sh: 0, pad: 3, padY: 1 });
    const wr = WRITERS[i];
    const wp = prog(t, wr.at, wr.at + wr.dur);
    const tip = handwrite(g, wr.word, x + 14, yy + 16, 26, wp, s.color === C.orange ? C.orangeD : s.color, i + 1);
    if (wp > 0 && wp < 1 && tip) {
      pencil(g, tip[0], tip[1] - 14, 20, 5, TONE.yellow);
    }
    if (i === 0 && t >= wr.at + wr.dur) {
      g.sprite(HEART, x + 92, yy + 24);
    }
    stamp(g, x + 110, yy + 32, t - STAMP_T[i]);
  });
}

// ── 활동 C: 랜덤 선택 → 트로피
function actPick(g, t) {
  if (t < 246 || t >= 360) return;
  if (t < TROPHY_T) {
    boardTab(g, t, '랜덤 선택', C.blue, 246);
    popText(g, '누가 발표할까요?', BCX, BY + 32, t - 248, { scale: 2, color: C.white, outline: C.ink, ow: 2, align: 'center', per: 1 });
    const cur = t >= PICK_T0 ? pickIdx(t) : -1;
    const landed = t >= PICK_T;
    STUDENTS.forEach((s, i) => {
      const cx = BX + 14 + i * 74;
      const cy = BY + 66;
      const p = eBack(prog(t, 248 + i * 2, 258 + i * 2));
      if (p <= 0) return;
      const on = cur === i;
      const win = landed && i === 1;
      const jump = win ? Math.round(6 * hop(((t - PICK_T) % 20) / 20)) : 0;
      const yy = cy + Math.round((1 - p) * 12) - jump;
      g.rect(cx + 3, yy + 3, 64, 74, C.ink);
      g.box(cx, yy, 64, 74, on ? C.lemon : C.paper, C.ink, 1, 2);
      g.save();
      g.clip(cx + 1, yy + 1, 62, 55);
      if (s.kid) kidBust(g, cx + 32, yy + 28, 14, s.kid, { mood: win ? 'happy' : 'smile', f: t });
      else [KIDS.doha, KIDS.jiwoo, KIDS.minjun].forEach((k, j) => kidBust(g, cx + 12 + j * 20, yy + 36, 7, k, { mood: 'smile', f: t }));
      g.restore();
      g.rect(cx + 1, yy + 56, 62, 1, C.ink);
      g.text(s.name, cx + 32, yy + 60, { font: 'r9', color: C.ink, align: 'center' });
      if (on && !(landed && Math.floor((t - PICK_T) / 3) % 2 && t < PICK_T + 12)) {
        g.box(cx - 3, yy - 3, 70, 80, null, C.yellow, 3);
        g.box(cx - 4, yy - 4, 72, 82, null, C.ink, 1);
      }
    });
    if (landed) {
      pow(g, t - PICK_T - 2, BX + 160, BY + 72, '민준 당첨!', { bg: C.yellow, dur: 26 });
      confetti(g, t - PICK_T, { n: 30, seed: 41, x0: BX, w: BW, h: BY + BH, y0: BY });
    }
  } else {
    boardTab(g, t, '트로피', C.yellow, TROPHY_T, C.ink);
    const tt = t - TROPHY_T;
    g.save();
    g.clip(BX + 5, BY + 5, BW - 10, BH - 10);
    rays(g, BCX, BY + 96, t, { n: 12, c1: C.yellow, c2: CHALK2, speed: 0.03, R: 200 });
    g.restore();
    const flyP = prog(t, TROPHY_LAND - 14, TROPHY_LAND);
    if (flyP <= 0) {
      const sc = Math.max(1, Math.round(eBack(prog(tt, 0, 10)) * 3));
      trophy(g, BCX, BY + 56 - (sc - 1) * 6, sc);
    }
    if (tt > 6) popText(g, '민준, 최고!', BCX, BY + 128, tt - 6, { scale: 2, color: C.white, outline: C.ink, ow: 2, align: 'center' });
  }
}

// ── 활동 D: 가상 실험 (전기 회로)
const W_RED = [[BX + 52, BY + 84], [BX + 52, BY + 46], [BX + 140, BY + 46], [BX + 140, BY + 82], [BX + 148, BY + 82]];
const W_BLUE = [[BX + 164, BY + 82], [BX + 172, BY + 82], [BX + 172, BY + 46], [BX + 238, BY + 46], [BX + 238, BY + 126]];
const W_GREEN = [[BX + 262, BY + 126], [BX + 282, BY + 126], [BX + 282, BY + 152], [BX + 52, BY + 152], [BX + 52, BY + 136]];
const LAB_DANGLE = [BX + 92, BY + 138];

function wire(g, pts, c) {
  for (let k = 1; k < pts.length; k++) g.line(pts[k - 1][0], pts[k - 1][1], pts[k][0], pts[k][1], C.ink, 5);
  for (let k = 1; k < pts.length; k++) g.line(pts[k - 1][0], pts[k - 1][1], pts[k][0], pts[k][1], c, 3);
}

function actLab(g, t) {
  if (t < 366 || t >= 480) return;
  boardTab(g, t, '가상 실험 · 전기 회로', C.purple, 366);
  const closed = t >= LAB_SNAP;
  const on = closed && !(t >= LAB_OFF && t < LAB_ON);
  // 전선
  wire(g, W_RED, C.red);
  wire(g, W_BLUE, C.blue);
  let end;
  if (t < LAB_GRAB) end = LAB_DANGLE;
  else {
    const p = eIO(prog(t, LAB_GRAB, LAB_SNAP));
    end = [lerp(LAB_DANGLE[0], W_GREEN[4][0], p), lerp(LAB_DANGLE[1], W_GREEN[4][1], p) - hop(p) * 14];
  }
  if (closed) wire(g, W_GREEN, C.green);
  else wire(g, [...W_GREEN.slice(0, 3), [BX + 120, BY + 152], end], C.green);
  g.box(end[0] - 4, end[1] - 3, 8, 6, C.gray, C.ink);
  // 전자 흐름
  if (on) {
    const loop = [...W_RED, ...W_BLUE, [BX + 262, BY + 126], ...W_GREEN];
    let acc = 0;
    const phase = (t * 1.6) % 12;
    for (let k = 1; k < loop.length; k++) {
      const [a, b] = [loop[k - 1], loop[k]];
      const L = Math.hypot(b[0] - a[0], b[1] - a[1]);
      for (let d = (((phase - acc) % 12) + 12) % 12; d < L; d += 12) {
        const q = d / L;
        g.rect(a[0] + (b[0] - a[0]) * q - 1, a[1] + (b[1] - a[1]) * q - 1, 3, 3, C.yellow);
      }
      acc += L;
    }
  }
  // 건전지
  g.box(BX + 47, BY + 82, 10, 5, C.gray, C.ink);
  g.box(BX + 41, BY + 86, 22, 48, C.orange, C.ink);
  g.rect(BX + 42, BY + 120, 20, 13, C.ink2);
  g.rect(BX + 43, BY + 87, 2, 32, C.orangeL);
  g.text('+', BX + 52, BY + 90, { color: C.white, align: 'center' });
  g.text('-', BX + 52, BY + 120, { color: C.white, align: 'center' });
  g.text('1.5V', BX + 66, BY + 104, { font: 'r7', color: C.white });
  // 전구 (얼굴 있는)
  const bx = BX + 156;
  const by = BY + 64;
  if (on) {
    g.save();
    g.dith = 0.3;
    g.circle(bx, by, 34, C.yellow);
    g.restore();
    for (let k = 0; k < 10; k++) {
      const a = (k / 10) * Math.PI * 2 + t * 0.04;
      g.line(bx + Math.cos(a) * 18, by + Math.sin(a) * 18, bx + Math.cos(a) * 25, by + Math.sin(a) * 25, C.yellow, 2);
    }
  }
  g.circle(bx, by, 15, C.ink);
  g.circle(bx, by, 14, on ? C.yellow : C.glass);
  if (on) g.circle(bx - 2, by - 2, 8, C.lemon);
  else {
    g.line(bx - 5, by + 4, bx - 2, by - 3, C.grayD, 1);
    g.line(bx - 2, by - 3, bx + 2, by + 3, C.grayD, 1);
    g.line(bx + 2, by + 3, bx + 5, by - 3, C.grayD, 1);
  }
  for (const s of [-1, 1]) {
    if (on) {
      g.rect(bx + s * 5 - 1, by - 3, 1, 1, C.ink);
      g.rect(bx + s * 5 - 2, by - 2, 1, 1, C.ink);
      g.rect(bx + s * 5, by - 2, 1, 1, C.ink);
    } else g.rect(bx + s * 5 - 1, by - 3, 2, 2, C.ink);
  }
  if (on) {
    g.rect(bx - 3, by + 4, 7, 1, C.ink);
    g.rect(bx - 2, by + 5, 5, 2, C.red);
  } else g.rect(bx - 2, by + 5, 5, 1, C.ink);
  g.box(bx - 8, by + 13, 16, 10, C.gray, C.ink);
  for (let k = 0; k < 3; k++) g.rect(bx - 7, by + 15 + k * 3, 14, 1, C.grayD);
  // 스위치
  const sx = BX + 250;
  const sy = BY + 126;
  g.box(sx - 16, sy, 32, 8, C.brownL, C.ink);
  const ang = lerp(0, -0.7, (t >= LAB_OFF && t < LAB_ON) ? eOut(prog(t, LAB_OFF, LAB_OFF + 4)) : t >= LAB_ON ? 1 - eOut(prog(t, LAB_ON, LAB_ON + 4)) : 0);
  g.line(sx - 12, sy, sx - 12 + Math.cos(ang) * 24, sy + Math.sin(ang) * 24, C.ink, 4);
  g.line(sx - 12, sy, sx - 12 + Math.cos(ang) * 24, sy + Math.sin(ang) * 24, C.gray, 2);
  g.circle(sx - 12, sy, 3, C.ink);
  g.circle(sx + 12, sy, 2, C.ink);
  // 전류계
  g.box(BX + 250, BY + 58, 54, 44, C.white, C.ink, 1, 2);
  g.text('전류', BX + 256, BY + 61, { font: 'r7', color: C.ink });
  g.oval(BX + 277, BY + 90, 16, 16, C.ink, { from: Math.PI, to: Math.PI * 2 });
  const na = Math.PI * (1.15 + (on ? 0.6 : 0) + (on ? Math.sin(t * 0.5) * 0.03 : 0));
  g.line(BX + 277, BY + 90, BX + 277 + Math.cos(na) * 14, BY + 90 + Math.sin(na) * 14, C.red, 1);
  g.text(on ? 'ON' : 'OFF', BX + 277, BY + 92, { font: 'r7', color: on ? C.greenD : C.grayD, align: 'center' });
  // 커서: 서연이 전선 끝을 끌고, 민준이 스위치를 껐다 켬
  if (t >= 372 && t < LAB_SNAP + 14) {
    const [tx0, ty0] = TILES[3];
    let px;
    let py;
    if (t < LAB_GRAB) {
      const p = eOut(prog(t, 372, LAB_GRAB));
      px = lerp(tx0 + 30, LAB_DANGLE[0], p);
      py = lerp(ty0 + 20, LAB_DANGLE[1], p);
    } else [px, py] = end;
    cursor(g, px, py, C.green, '서연', t >= LAB_GRAB && t < LAB_SNAP);
  }
  if (t >= 418 && t < LAB_ON + 14) {
    const [tx0, ty0] = TILES[1];
    const p = eOut(prog(t, 418, LAB_OFF - 2));
    const px = lerp(tx0 + 30, sx + 4, p);
    const py = lerp(ty0 + 20, sy - 6, p);
    const press = (t >= LAB_OFF && t < LAB_OFF + 4) || (t >= LAB_ON && t < LAB_ON + 4);
    cursor(g, px, py, C.blue, '민준', press);
    for (const at of [LAB_OFF, LAB_ON]) if (t - at >= 0 && t - at < 10) g.ring(sx, sy - 4, 4 + (t - at) * 2, C.white, 1);
  }
  pow(g, t - LAB_SNAP, BX + 30, BY + 150, '딸깍!', { dur: 20 });
  pow(g, t - LAB_SNAP - 6, bx + 46, by - 18, '반짝!', { bg: C.yellow, dur: 24 });
  if (t >= LAB_ON + 6) {
    const p = eBack(prog(t, LAB_ON + 6, LAB_ON + 16));
    g.save();
    g.translate(0, Math.round((1 - p) * 10));
    chip(g, '전구가 켜졌어요!', bx, BY + 104, { bg: C.green, sh: 2, pad: 5, padY: 2 });
    g.restore();
  }
}

// ── 활동 E: AI 스피킹 (쉐도잉·따라 읽기)
function actSpeak(g, t) {
  if (t < 486 || t >= 720) return;
  boardTab(g, t, 'AI 스피킹', C.pinkH, 486);
  const step = t < 562 ? 0 : t < SPEAK_SCORE_T ? 1 : 2;
  const pills = ['① 듣기', '② 따라 읽기', '③ AI 채점'];
  const pw = pills.map((lab) => g.measure(lab, { font: 'r9' }) + 8);
  let px = BX + BW - 10 - pw.reduce((a, b) => a + b + 10, -10);
  pills.forEach((lab, i) => {
    const on = step === i;
    if (i > 0) g.text('→', px - 5, BY + 11, { font: 'r9', color: C.gray, align: 'center' });
    g.box(px, BY + 9, pw[i], 13, on ? C.yellow : C.ink2, C.ink, 1, 2);
    g.text(lab, px + 4, BY + 11, { font: 'r9', color: on ? C.ink : C.gray });
    px += pw[i] + 10;
  });
  // AI 튜터 미니 (헤드셋)
  const aiTalk = step === 0 && AI_WORDS.some((w) => t >= w && t < w + 16);
  const mxp = BX + 40;
  const myp = BY + 96;
  if (t >= 488) {
    const p = eBack(prog(t, 488, 498));
    mascot(g, mxp, myp + Math.round((1 - p) * 20), { r: 13, f: t, face: aiTalk && Math.floor(t / 4) % 2 ? 'wow' : step === 2 ? 'happy' : 'smile', arms: step === 2 ? 'up' : 'down' });
    g.oval(mxp, myp - 22, 14, 13, C.ink, { from: Math.PI * 1.05, to: Math.PI * 1.95, t: 2 });
    g.box(mxp - 16, myp - 22, 4, 7, C.ink2, C.ink);
    g.line(mxp - 13, myp - 15, mxp - 6, myp - 11, C.ink, 1);
    chip(g, 'AI 미니', mxp, myp + 4, { font: 'r9', bg: C.purple, sh: 2, pad: 4, padY: 1 });
    if (aiTalk) for (let k = 0; k < 3; k++) g.oval(mxp + 12, myp - 14, 6 + k * 5 + (t % 8) * 0.5, 6 + k * 5 + (t % 8) * 0.5, C.white, { from: -0.7, to: 0.7 });
  }
  // 문장 카드
  const cx0 = BX + 78;
  const cy0 = BY + 30;
  const cw = 226;
  if (t >= 490) {
    const p = eBack(prog(t, 490, 502));
    const yy = cy0 + Math.round((1 - p) * 10);
    g.rect(cx0 + 3, yy + 3, cw, 64, C.ink);
    g.box(cx0, yy, cw, 64, C.white, C.ink, 1, 3);
    const sentence = SENT.join(' ');
    const sw = g.measure(sentence, { scale: 2 });
    let x = cx0 + cw / 2 - sw / 2;
    SENT.forEach((wd, i) => {
      const ww = g.measure(wd, { scale: 2 });
      const said = t >= AI_WORDS[i];
      const now = step === 0 && t >= AI_WORDS[i] && t < AI_WORDS[i] + 16;
      const got = step >= 1 && t >= KID_WORDS[i];
      if (now) g.rect(x - 2, yy + 8, ww + 4, 26, C.yellow);
      if (got) g.rect(x - 2, yy + 8, ww + 4, 26, C.mint);
      const col = got ? C.greenD : said || step > 0 ? C.ink : C.gray;
      const pop = got ? Math.round(2 * hop(prog(t, KID_WORDS[i], KID_WORDS[i] + 8))) : 0;
      g.text(wd, x, yy + 10 - pop, { scale: 2, color: col });
      if (step === 2) {
        const sp = eBack(prog(t, SPEAK_SCORE_T + 20 + i * 4, SPEAK_SCORE_T + 28 + i * 4));
        if (sp > 0) chip(g, String(WORD_SCORE[i]), x + ww / 2, yy + 40 + Math.round((1 - sp) * 6), { font: 'r9', bg: C.green, sh: 0, pad: 3, padY: 1 });
      }
      x += ww + g.measure(' ', { scale: 2 });
    });
    if (step < 2) g.text('나는 고양이를 좋아해요.', cx0 + cw / 2, yy + 44, { font: 'r9', color: C.grayD, align: 'center' });
  }
  // 파형 / 점수 패널
  const px0 = BX + 78;
  const py0 = BY + 100;
  if (t >= 494) {
    g.box(px0, py0, cw, 46, C.ink2, C.ink, 1, 3);
    if (step < 2) {
      const talk = step === 0 ? aiTalk : KID_WORDS.some((w) => t >= w && t < w + 16);
      const col = step === 0 ? C.blue : C.pinkH;
      chip(g, step === 0 ? 'AI' : '지우', px0 + 4, py0 + 4, { font: 'r9', bg: col, align: 'left', sh: 0, pad: 3, padY: 1 });
      for (let k = 0; k < 44; k++) {
        const amp = talk ? (0.3 + 0.7 * Math.abs(Math.sin(k * 0.7 + t * 0.6) * Math.cos(k * 0.23 - t * 0.3))) * 16 : 1 + (rnd(k, Math.floor(t / 6)) * 1.5);
        const hh = Math.max(1, Math.round(amp));
        g.rect(px0 + 36 + k * 4, py0 + 23 - hh, 2, hh * 2, talk ? col : C.grayD);
      }
    } else {
      const sp = prog(t, SPEAK_SCORE_T, SPEAK_SCORE_T + 24);
      const score = Math.round(95 * eOut(sp));
      g.text('발음 점수', px0 + 8, py0 + 6, { font: 'r9', color: C.gray });
      g.text(String(score), px0 + 12, py0 + 17, { scale: 2, color: C.yellow, outline: C.ink, ow: 1 });
      g.text('점', px0 + 48, py0 + 25, { color: C.white });
      for (let k = 0; k < 3; k++) {
        const stp = eBack(prog(t, SPEAK_SCORE_T + 26 + k * 6, SPEAK_SCORE_T + 34 + k * 6));
        if (stp > 0) starIcon(g, px0 + 88 + k * 20, py0 + 23, 4 + stp * 3, { rot: (1 - stp) * 2 });
      }
      g.text('Perfect!', px0 + cw - 10, py0 + 17, { color: C.white, align: 'right' });
    }
  }
  // 녹음 버튼
  if (step === 1) {
    const pulse = Math.sin(t * 0.3) * 1.5;
    g.ring(mxp, BY + 140, 15 + pulse + ((t * 0.5) % 6), C.red, 1);
    g.circle(mxp, BY + 140, 13, C.ink);
    g.circle(mxp, BY + 140, 12, C.red);
    g.box(mxp - 2, BY + 133, 5, 9, C.white, C.ink, 1, 2);
    g.oval(mxp, BY + 140, 5, 4, C.white, { from: 0, to: Math.PI });
    g.rect(mxp, BY + 144, 1, 3, C.white);
    const p = eBack(prog(t, 566, 576));
    g.save();
    g.translate(0, Math.round((1 - p) * 8));
    chip(g, '따라 말해요!', px0 + cw / 2, py0 - 12, { font: 'r9', bg: C.red, sh: 2, pad: 4, padY: 1 });
    g.restore();
  }
  pow(g, t - SPEAK_SCORE_T - 30, BX + 42, BY + 140, '최고예요!', { bg: C.yellow, dur: 30 });
}

// ── 정리
const RECAP = [['타이머', C.orange], ['객관식 퀴즈', C.blue], ['개인 칠판', C.green], ['랜덤 선택', C.purple], ['트로피', C.yellowD], ['가상 실험', C.pinkH], ['AI 스피킹', C.red]];
function actRecap(g, t) {
  if (t < 724) return;
  const tt = t - 724;
  popText(g, '실시간 온라인 수업도', BCX, BY + 16, tt, { scale: 2, color: C.white, outline: C.ink, ow: 2, shadow: C.ink, sdx: 2, sdy: 2, align: 'center', per: 2 });
  if (tt >= 14) {
    const p = eBack(prog(tt, 14, 26));
    g.save();
    g.translate(0, Math.round((1 - p) * 20));
    chip(g, '교실처럼 생생하게!', BCX, BY + 46, { bg: C.orange, scale: 2, sh: 4, pad: 8, padY: 4 });
    g.restore();
  }
  RECAP.forEach(([lab, col], i) => {
    const at = 30 + i * 6;
    const p = eBack(prog(tt, at, at + 10));
    if (p <= 0) return;
    const row = i < 4 ? 0 : 1;
    const n = row === 0 ? 4 : 3;
    const k = row === 0 ? i : i - 4;
    const ws = RECAP.slice(row === 0 ? 0 : 4, row === 0 ? 4 : 7).map(([l]) => g.measure(l) + 12);
    const total = ws.reduce((a, b) => a + b, 0) + (n - 1) * 6;
    const x = BCX - total / 2 + ws.slice(0, k).reduce((a, b) => a + b + 6, 0);
    chip(g, lab, x, BY + 92 + row * 24 + Math.round((1 - p) * 10), { bg: col, align: 'left', sh: 2, pad: 6, padY: 3 });
  });
  if (tt >= 76) typeText(g, '집에서도 학원에서도, 실시간으로 함께', BCX, BY + 148, tt - 76, { per: 1, color: C.yellow, outline: C.ink, ow: 1, align: 'center' });
}

function sLive(g, t) {
  // 앱 배경 + 상단 바
  g.rect(0, 0, W, H, C.night);
  for (let y = 22; y < H; y += 8) for (let x = (y / 8) % 2 ? 4 : 0; x < W; x += 8) g.pset(x, y, C.night2);
  g.rect(0, 0, W, 20, C.ink);
  g.box(4, 3, 40, 14, C.red, C.ink);
  if (Math.floor(t / 20) % 2 === 0) g.circle(11, 10, 2.5, C.white);
  g.text('LIVE', 16, 5, { color: C.white });
  g.text('리틀마인즈 라이브 · 7세 놀이반', 52, 5, { color: C.white });
  const sec = 754 + Math.floor(t / 60);
  g.text(`${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}`, 474, 5, { color: C.gold, align: 'right' });
  for (let i = 0; i < 4; i++) g.rect(370 + i * 3, 14 - i * 2 - 2, 2, i * 2 + 3, C.green);
  g.text(`${1 + STUDENTS.filter((s) => t >= s.join).length + (t >= 22 ? 2 : 0)}명 접속`, 386, 5, { color: C.white });

  // 칠판 (가상 실험 땐 설계도 모눈)
  g.box(BX, BY, BW, BH, CHALK, C.ink, 1);
  g.box(BX + 1, BY + 1, BW - 2, BH - 2, null, C.brown, 4);
  g.box(BX + 4, BY + 4, BW - 8, BH - 8, CHALK, C.brownD, 1);
  for (let i = 0; i < 18; i++) g.pset(BX + 10 + rnd(i, 101) * (BW - 20), BY + 10 + rnd(i, 102) * (BH - 20), CHALK2);
  const lab = clamp(Math.min(prog(t, 360, 368), 1 - prog(t, 478, 486)));
  if (lab > 0) {
    g.save();
    g.clip(BX + 5, BY + 5, BW - 10, BH - 10);
    g.dither(BX + 5, BY + 5, BW - 10, BH - 10, PRINT, lab);
    if (lab >= 1) {
      for (let x = BX + 5; x < BX + BW - 5; x += 10) g.rect(x, BY + 5, 1, BH - 10, PRINT2);
      for (let y = BY + 5; y < BY + BH - 5; y += 10) g.rect(BX + 5, y, BW - 10, 1, PRINT2);
    }
    g.restore();
  }

  actQuiz(g, t);
  actBoards(g, t);
  actPick(g, t);
  actLab(g, t);
  actSpeak(g, t);
  if (t >= 720) g.dither(BX + 5, BY + 5, BW - 10, BH - 10, C.ink, 0.35);
  actRecap(g, t);
  for (const at of [120, 240, 360, 480, 720]) eraser(g, t, at);
  if (t < 240) {
    const j = Math.round(6 * hop((t % 30) / 30));
    if (t >= 14) mascot(g, BX + BW - 18, BY + BH - 8 - j, { r: 7, f: t, face: 'happy', arms: t % 60 < 30 ? 'up' : 'wave' });
  }

  // 타일들
  const joinP = (j) => eBack(prog(t, j, j + 10));
  const tp = joinP(4);
  if (tp > 0) {
    const [x, y, w, h] = T_TILE;
    const talk = TEACHER_TALK.some(([a, b]) => t >= a && t < b);
    videoTile(g, [x + Math.round((1 - tp) * 160), y, w, h], null, t, { speak: talk, active: talk });
  }
  STUDENTS.forEach((s, i) => {
    const p = joinP(s.join);
    if (p <= 0) return;
    const [x, y, w, h] = TILES[i];
    videoTile(g, [x + Math.round((1 - p) * 160), y, w, h], s, t, tileOpts(i, t));
    if (t - s.join >= 0 && t - s.join < 14) g.ring(x + w / 2, y + h / 2, (t - s.join) * 4, C.white, 1);
  });

  // 타일 위로 날아가는 것들
  if (t >= TROPHY_LAND - 14 && t < TROPHY_LAND) {
    const e = eIO(prog(t, TROPHY_LAND - 14, TROPHY_LAND));
    const [x, y, w] = TILES[1];
    trophy(g, lerp(BCX, x + w - 18, e), lerp(BY + 56, y + 3, e) - hop(e) * 40, lerp(3, 1, e));
  }
  if (t >= TROPHY_LAND && t < TROPHY_LAND + 24) {
    const [x, y, w] = TILES[1];
    const lt = t - TROPHY_LAND;
    g.text('+1', x + w - 22, y + 4 - lt * 0.8, { color: C.yellow, outline: C.ink, ow: 1 });
    burst(g, lt, x + w / 2, y + 30, { n: 12, seed: 61, speed: 1.8, life: 22 });
  }
  if (t >= SPEAK_SCORE_T + 30) {
    const [x, y, w] = TILES[0];
    for (let k = 0; k < 6; k++) {
      const p = prog(t, SPEAK_SCORE_T + 30 + k * 3, SPEAK_SCORE_T + 48 + k * 3);
      if (p > 0 && p < 1) sparkle(g, Math.round(lerp(BX + 120 + k * 10, x + w / 2, eIn(p))), Math.round(lerp(BY + 120, y + 26, eIn(p)) - hop(p) * 20), 0.8, k % 2 ? C.yellow : C.white);
    }
  }
  if (t >= 720) {
    STUDENTS.forEach((s, i) => {
      const [x, y, w] = TILES[i];
      for (let k = 0; k < 3; k++) {
        const ph = (t - 720 + k * 8 + i * 4) % 26;
        const rx = x + 12 + ((k * 23 + i * 7) % (w - 20));
        if (k === 0) g.sprite(HEART, rx, y + 40 - ph * 1.6);
        else if (k === 1) starIcon(g, rx, y + 40 - ph * 1.5, 3);
        else g.text('♪', rx, y + 36 - ph * 1.5, { color: C.yellow, outline: C.ink, ow: 1 });
      }
    });
  }

  // 자막 (칠판 하단)
  const cap = { y: BY + BH - 30, x: BCX };
  caption(g, t, '타이머 · 객관식 퀴즈로 모두 동시에 참여', 16, 110, cap);
  caption(g, t, '아이마다 개인 칠판, 손글씨를 실시간으로', 132, 230, cap);
  caption(g, t, '랜덤 선택은 두근두근, 칭찬은 트로피로', 252, 350, cap);
  caption(g, t, '위험 없이 마음껏, 가상 실험', 370, 470, cap);
  caption(g, t, '듣고 → 따라 읽고 → AI가 바로 채점', 494, 710, cap);

  // 도구 막대
  g.rect(0, 224, W, 46, C.night);
  g.box(8, 227, 464, 38, C.ink2, C.ink, 1, 3);
  LIVE_TOOLS.forEach((name, i) => {
    const cx = 37 + i * 58;
    let on = TOOL_ON.some(([a, b, k]) => k === i && t >= a && t < b);
    const press = TOOL_PRESS.find(([at, k]) => k === i && t >= at && t < at + 16);
    let lift = press ? Math.round(3 * hop(clamp((t - press[0]) / 12))) : 0;
    if (t >= 720) {
      on = Math.floor((t - 720) / 7.5) % 8 === i;
      lift = on ? 2 : 0;
    }
    g.box(cx - 24, 230 - lift, 48, 32, on ? C.yellow : C.ink, on ? C.white : C.ink2, 1, 3);
    liveToolIcon(g, i, cx, 241 - lift, t);
    g.text(name, cx, 252 - lift, { font: 'r7', color: on ? C.ink : C.gray, align: 'center' });
    if (press && t - press[0] < 10) g.ring(cx, 246, 6 + (t - press[0]) * 2.5, C.yellow, 1);
  });

  // 들어올 때 아이리스, 나갈 때 와이프
  if (t < 16) iris(g, BCX, 124, 560 * eOut(prog(t, 0, 16)), C.ink);
  blockWipe(g, prog(t, 826, 840), C.navy);
}

// 라이브 장면 효과음 큐 (전역 프레임)
const L = (t) => LIVE0 + t;
const LIVE_SFX = [
  [L(0), 'irisOpen'], ...[4, 10, 16, 22, 28].map((j, i) => [L(j), 'join', i]),
  [L(14), 'tap'], [L(26), 'open'],
  ...[0, 1, 2, 3, 4].map((k) => [L(QUIZ_T0 + k * QUIZ_STEP), 'tick', k]),
  ...QUIZ_VOTE.map((v) => [L(v), 'tap']),
  [L(QUIZ_REVEAL), 'buzzer'], [L(QUIZ_REVEAL + 2), 'fanfare'],
  [L(120), 'erase'], [L(124), 'tap'],
  ...WRITERS.map((w, i) => [L(w.at), 'scribble', i]),
  ...STAMP_T.map((s) => [L(s), 'stamp']),
  [L(240), 'erase'], [L(244), 'tap'],
  ...PICK_HOPS.map((h, i) => [L(h), 'select', i]),
  [L(PICK_T + 2), 'fanfare'], [L(TROPHY_T - 2), 'tap'], [L(TROPHY_T), 'trophy'], [L(TROPHY_LAND), 'coin', 0],
  [L(360), 'erase'], [L(364), 'tap'], [L(LAB_GRAB), 'grab'], [L(LAB_SNAP), 'snap'], [L(LAB_SNAP + 2), 'zap'], [L(LAB_SNAP + 6), 'ding'],
  [L(LAB_OFF), 'tap'], [L(LAB_ON), 'tap'], [L(LAB_ON + 2), 'zap'],
  [L(480), 'erase'], [L(484), 'tap'],
  ...AI_WORDS.map((w, i) => [L(w), 'voice', i]),
  [L(566), 'rec'],
  ...KID_WORDS.map((w, i) => [L(w), 'voice', 10 + i]),
  [L(SPEAK_SCORE_T), 'rise'], [L(SPEAK_SCORE_T + 24), 'fanfare'],
  ...[0, 1, 2].map((k) => [L(SPEAK_SCORE_T + 26 + k * 6), 'star']),
  [L(720), 'erase'], [L(726), 'confirm'],
  ...RECAP.map((_, i) => [L(754 + i * 6), 'ping', i]),
  [L(826), 'wipe'],
];

// ─────────────────────────────────────────────
// 5 · PLAYER SELECT — 아이마다 맞춤 (960–1079)
// ─────────────────────────────────────────────
const CARDS = [
  { kid: KIDS.jiwoo, age: '5세', tag: '영어 따라읽기', bg: C.pink, icon: (g, x, y) => letterBlock(g, x, y, 14, 'A', TONE.red, { scale: 1 }) },
  { kid: KIDS.minjun, age: '7세', tag: '타이머 퀴즈', bg: C.mint, icon: (g, x, y) => letterBlock(g, x, y, 14, '1', TONE.yellow, { scale: 1 }) },
  { kid: KIDS.seoyeon, age: '초3', tag: '가상 실험', bg: C.sky, icon: (g, x, y, t) => flask(g, x + 8, y + 16, 16, 20, { level: 0.6, liquid: C.green, f: t, bubbles: 2 }) },
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
  const tags = [['스피킹', C.red], ['퀴즈', C.yellowD], ['실험', C.green]];
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
    g.text('서연이의 라이브', sx + 32, cy + 6, { font: 'r9', color: C.grayD });
    g.text('수업 완료!', sx + 32, cy + 18, { color: C.ink });
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
    const rows = [['스피킹', TONE.red, 0.95], ['퀴즈', TONE.yellow, 0.8], ['실험', TONE.green, 0.96]];
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
  [120, 960, sLive],
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
  ...LIVE_SFX,
  [966, 'whoosh'], [978, 'select'], [1002, 'select'], [1026, 'select'], [1048, 'confirm'],
  [1080, 'whoosh'], [1106, 'notify'], [1120, 'star'], [1123, 'star'], [1126, 'star'], [1129, 'star'], [1132, 'star'],
  [1136, 'rise'], [1176, 'ding'],
  [1194, 'riser'],
  [1206, 'slam'], [1202, 'firework'], [1212, 'firework'], [1226, 'firework'], [1240, 'firework'], [1258, 'firework'], [1280, 'firework'], [1296, 'firework'],
];
