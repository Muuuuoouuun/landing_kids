// 아주 작은 픽셀 래스터라이저. 캔버스 없이 Uint32 버퍼에 직접 그린다.
// 같은 코드가 Node(영상 렌더)와 브라우저(미리보기) 양쪽에서 돈다.

export const W = 480;
export const H = 270;

// 0xAABBGGRR (리틀 엔디언에서 메모리상 RGBA)
export function rgb(hex) {
  const n = parseInt(hex.replace('#', ''), 16);
  return (0xff000000 | ((n & 0xff) << 16) | (n & 0xff00) | ((n >> 16) & 0xff)) >>> 0;
}

// 브랜드(globals.css) 팔레트 + 픽셀 게임용 확장색
export const C = {
  ink: rgb('#2D231A'),
  ink2: rgb('#4A3B2E'),
  night: rgb('#1B1530'),
  night2: rgb('#2A2350'),
  cream: rgb('#FDFBF7'),
  paper: rgb('#F6EEDF'),
  white: rgb('#FFFFFF'),
  orange: rgb('#FF5A1F'),
  orangeD: rgb('#C7400F'),
  orangeL: rgb('#FF8A4C'),
  gold: rgb('#F2CC8F'),
  yellow: rgb('#FFD23F'),
  yellowD: rgb('#E0A100'),
  brown: rgb('#9E7453'),
  brownD: rgb('#6B4A32'),
  brownL: rgb('#C49A74'),
  pink: rgb('#FFC0CB'),
  pinkH: rgb('#FF6F9C'),
  red: rgb('#E8423F'),
  sky: rgb('#E1EFF4'),
  skyM: rgb('#A9D8EE'),
  blue: rgb('#5AA9E6'),
  blueD: rgb('#2F6DB5'),
  navy: rgb('#1E2A4A'),
  mint: rgb('#B4E4D3'),
  green: rgb('#5BBF6A'),
  greenD: rgb('#2F7D4A'),
  greenL: rgb('#9BE07A'),
  lav: rgb('#E8D5F5'),
  purple: rgb('#8E6CC9'),
  purpleD: rgb('#5B3F99'),
  lemon: rgb('#FFF9C4'),
  skin: rgb('#FFD7B5'),
  skinS: rgb('#EDAE86'),
  gray: rgb('#B9B1A6'),
  grayD: rgb('#6E655B'),
  hair: rgb('#3B2A20'),
  hairB: rgb('#8A5A36'),
  hairY: rgb('#E3B35B'),
  glass: rgb('#CFEFFF'),
};

// 스프라이트 문자열용 글자 → 색
export const SP = {
  k: C.ink, w: C.white, c: C.cream, o: C.orange, O: C.orangeD, l: C.orangeL,
  y: C.yellow, Y: C.yellowD, g: C.green, G: C.greenD, e: C.greenL, b: C.brown,
  B: C.brownD, p: C.pink, P: C.pinkH, r: C.red, s: C.skin, S: C.skinS,
  u: C.blue, U: C.blueD, n: C.navy, a: C.gray, A: C.grayD, h: C.hair,
  v: C.lav, V: C.purple, m: C.mint, q: C.sky, t: C.gold,
};

const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);
export const bayer = (x, y) => BAYER[((y & 3) << 2) | (x & 3)];

export class Gfx {
  constructor(fonts, w = W, h = H) {
    this.w = w;
    this.h = h;
    this.bytes = new Uint8ClampedArray(w * h * 4);
    this.buf = new Uint32Array(this.bytes.buffer);
    this.fonts = fonts;
    this.glyphCache = new Map();
    this.stack = [];
    this.reset();
  }

  reset() {
    this.ox = 0;
    this.oy = 0;
    this.cx0 = 0;
    this.cy0 = 0;
    this.cx1 = this.w;
    this.cy1 = this.h;
    this.dith = 1; // 1 미만이면 모든 그리기를 디더 투명도로
    this.stack.length = 0;
  }

  save() {
    this.stack.push([this.ox, this.oy, this.cx0, this.cy0, this.cx1, this.cy1, this.dith]);
  }

  restore() {
    [this.ox, this.oy, this.cx0, this.cy0, this.cx1, this.cy1, this.dith] = this.stack.pop();
  }

  translate(dx, dy) {
    this.ox += Math.round(dx);
    this.oy += Math.round(dy);
  }

  // 현재 변환 기준 사각형과 교집합으로 클립
  clip(x, y, w, h) {
    const x0 = Math.round(x) + this.ox;
    const y0 = Math.round(y) + this.oy;
    this.cx0 = Math.max(this.cx0, x0);
    this.cy0 = Math.max(this.cy0, y0);
    this.cx1 = Math.min(this.cx1, x0 + Math.round(w));
    this.cy1 = Math.min(this.cy1, y0 + Math.round(h));
  }

  clear(c) {
    this.buf.fill(c);
  }

  // 화면 좌표 기준 원시 사각형 (클립/디더 적용)
  _span(x0, y0, x1, y1, c) {
    if (x0 < this.cx0) x0 = this.cx0;
    if (y0 < this.cy0) y0 = this.cy0;
    if (x1 > this.cx1) x1 = this.cx1;
    if (y1 > this.cy1) y1 = this.cy1;
    if (x0 >= x1 || y0 >= y1) return;
    const { buf, w } = this;
    if (this.dith >= 1) {
      for (let y = y0; y < y1; y++) buf.fill(c, y * w + x0, y * w + x1);
    } else {
      const d = this.dith;
      for (let y = y0; y < y1; y++) {
        const row = y * w;
        for (let x = x0; x < x1; x++) if (bayer(x, y) < d) buf[row + x] = c;
      }
    }
  }

  pset(x, y, c) {
    x = Math.round(x) + this.ox;
    y = Math.round(y) + this.oy;
    this._span(x, y, x + 1, y + 1, c);
  }

  rect(x, y, w, h, c) {
    const x0 = Math.round(x) + this.ox;
    const y0 = Math.round(y) + this.oy;
    this._span(x0, y0, x0 + Math.round(w), y0 + Math.round(h), c);
  }

  // 외곽선 박스. r>0 이면 픽셀식 둥근 모서리
  box(x, y, w, h, fill, line = C.ink, t = 1, r = 0) {
    x = Math.round(x);
    y = Math.round(y);
    w = Math.round(w);
    h = Math.round(h);
    if (r > 0) {
      this.rbox(x, y, w, h, line, r);
      if (fill != null) this.rbox(x + t, y + t, w - 2 * t, h - 2 * t, fill, Math.max(0, r - t));
      return;
    }
    if (line != null) this.rect(x, y, w, h, line);
    if (fill != null) this.rect(x + t, y + t, w - 2 * t, h - 2 * t, fill);
  }

  // 모서리를 계단식으로 깎은 채움 박스
  rbox(x, y, w, h, c, r = 2) {
    if (r <= 0) return this.rect(x, y, w, h, c);
    r = Math.min(r, Math.floor(w / 2), Math.floor(h / 2));
    for (let i = 0; i < r; i++) {
      const cut = r - Math.round(Math.sqrt(r * r - (r - i - 0.5) ** 2));
      this.rect(x + cut, y + i, w - 2 * cut, 1, c);
      this.rect(x + cut, y + h - 1 - i, w - 2 * cut, 1, c);
    }
    this.rect(x, y + r, w, h - 2 * r, c);
  }

  ellipse(cx, cy, rx, ry, c) {
    if (rx <= 0 || ry <= 0) return;
    const iy = Math.ceil(ry);
    for (let dy = -iy; dy <= iy; dy++) {
      const t = 1 - (dy / ry) ** 2;
      if (t < 0) continue;
      const hw = rx * Math.sqrt(t);
      const x0 = Math.round(cx - hw);
      const x1 = Math.round(cx + hw);
      if (x1 > x0) this.rect(x0, Math.round(cy + dy), x1 - x0, 1, c);
    }
  }

  circle(cx, cy, r, c) {
    this.ellipse(cx, cy, r, r, c);
  }

  ring(cx, cy, r, c, t = 1) {
    const ro = r + 0.5;
    const ri = r - t + 0.5;
    const R = Math.ceil(ro);
    for (let dy = -R; dy <= R; dy++) {
      for (let dx = -R; dx <= R; dx++) {
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d <= ro && d > ri) this.pset(cx + dx, cy + dy, c);
      }
    }
  }

  line(x0, y0, x1, y1, c, t = 1) {
    x0 = Math.round(x0);
    y0 = Math.round(y0);
    x1 = Math.round(x1);
    y1 = Math.round(y1);
    const dx = Math.abs(x1 - x0);
    const dy = -Math.abs(y1 - y0);
    const sx = x0 < x1 ? 1 : -1;
    const sy = y0 < y1 ? 1 : -1;
    let err = dx + dy;
    const o = Math.floor(t / 2);
    for (;;) {
      this.rect(x0 - o, y0 - o, t, t, c);
      if (x0 === x1 && y0 === y1) break;
      const e2 = 2 * err;
      if (e2 >= dy) { err += dy; x0 += sx; }
      if (e2 <= dx) { err += dx; y0 += sy; }
    }
  }

  tri(ax, ay, bx, by, cx, cy, c) {
    const pts = [[ax, ay], [bx, by], [cx, cy]].sort((p, q) => p[1] - q[1]);
    const [[x0, y0], [x1, y1], [x2, y2]] = pts;
    const ys = Math.round(y0);
    const ye = Math.round(y2);
    for (let y = ys; y <= ye; y++) {
      const yy = y + 0.5;
      const k = (a, b) => (b - a < 1e-6 ? 0 : Math.min(1, Math.max(0, (yy - a) / (b - a))));
      const xa = x0 + (x2 - x0) * k(y0, y2);
      const xb = yy < y1 ? x0 + (x1 - x0) * k(y0, y1) : x1 + (x2 - x1) * k(y1, y2);
      const l = Math.round(Math.min(xa, xb));
      const r = Math.round(Math.max(xa, xb));
      if (r > l) this.rect(l, y, r - l, 1, c);
    }
  }

  quad(ax, ay, bx, by, cx, cy, dx, dy, c) {
    this.tri(ax, ay, bx, by, cx, cy, c);
    this.tri(ax, ay, cx, cy, dx, dy, c);
  }

  // 타원 테두리 (rot 라디안 회전, from~to 각도 구간만)
  oval(cx, cy, rx, ry, c, { rot = 0, t = 1, from = 0, to = Math.PI * 2 } = {}) {
    const n = Math.max(24, Math.ceil((rx + ry) * 3));
    const cr = Math.cos(rot);
    const sr = Math.sin(rot);
    for (let i = 0; i <= n; i++) {
      const a = from + ((to - from) * i) / n;
      const ex = Math.cos(a) * rx;
      const ey = Math.sin(a) * ry;
      this.rect(cx + ex * cr - ey * sr - (t >> 1), cy + ex * sr + ey * cr - (t >> 1), t, t, c);
    }
  }

  // 별 (n 꼭짓점)
  star(cx, cy, r, c, rot = 0, n = 5, inner = 0.45) {
    const pts = [];
    for (let i = 0; i < n * 2; i++) {
      const a = rot - Math.PI / 2 + (i * Math.PI) / n;
      const rr = i % 2 ? r * inner : r;
      pts.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]);
    }
    for (let i = 0; i < n * 2; i++) {
      const p = pts[i];
      const q = pts[(i + 1) % (n * 2)];
      this.tri(cx, cy, p[0], p[1], q[0], q[1], c);
    }
  }

  // 레벨(0..1)만큼 Bayer 디더로 채움 — 픽셀식 반투명
  dither(x, y, w, h, c, level) {
    if (level <= 0) return;
    const prev = this.dith;
    this.dith = Math.min(prev, level);
    this.rect(x, y, w, h, c);
    this.dith = prev;
  }

  // rows: 문자열 배열. sx/sy 는 실수 스케일(스쿼시&스트레치용)
  sprite(rows, x, y, { sx = 1, sy = 1, flip = false, pal = null, ax = 0, ay = 0 } = {}) {
    const sh = rows.length;
    const sw = rows[0].length;
    const dw = Math.max(1, Math.round(sw * Math.abs(sx)));
    const dh = Math.max(1, Math.round(sh * Math.abs(sy)));
    const x0 = Math.round(x - ax * dw);
    const y0 = Math.round(y - ay * dh);
    for (let j = 0; j < dh; j++) {
      const v = Math.min(sh - 1, Math.floor(((j + 0.5) * sh) / dh));
      const row = rows[v];
      let run = -1;
      let runC = 0;
      for (let i = 0; i <= dw; i++) {
        let col = 0;
        if (i < dw) {
          let u = Math.min(sw - 1, Math.floor(((i + 0.5) * sw) / dw));
          if (flip) u = sw - 1 - u;
          const ch = row[u];
          if (ch !== '.') col = (pal && pal[ch]) || SP[ch] || 0;
        }
        if (col !== runC) {
          if (runC) this.rect(x0 + run, y0 + j, i - run, 1, runC);
          run = i;
          runC = col;
        }
      }
    }
    return [x0, y0, dw, dh];
  }

  // ───── 텍스트 (BDF 비트맵) ─────
  glyph(font, ch) {
    const key = font + ch;
    let g = this.glyphCache.get(key);
    if (g) return g;
    const f = this.fonts[font];
    const raw = f.glyphs[ch] || f.glyphs['?'];
    const [dw, w, h, xo, yo, rowStr] = raw;
    const rows = rowStr ? rowStr.split(',') : [];
    const px = [];
    for (let j = 0; j < rows.length; j++) {
      const bits = rows[j].length * 4;
      const val = parseInt(rows[j], 16);
      for (let i = 0; i < w; i++) {
        if ((val / 2 ** (bits - 1 - i)) & 1) px.push(i + xo, j - (h + yo));
      }
    }
    g = { dw, px };
    this.glyphCache.set(key, g);
    return g;
  }

  cap(font) {
    const f = this.fonts[font];
    if (f._cap == null) {
      const g = f.glyphs['가'] || f.glyphs.H;
      f._cap = g[2] + g[4];
    }
    return f._cap;
  }

  measure(str, { font = 'b11', scale = 1, sp = 0 } = {}) {
    let w = 0;
    for (const ch of str) w += (this.glyph(font, ch).dw + sp) * scale;
    return w - sp * scale;
  }

  // 반환: 그린 폭. each(i,ch) → {dx,dy,hide} 로 글자별 애니메이션
  text(str, x, y, o = {}) {
    const {
      font = 'b11', scale: s = 1, color = C.ink, fill2 = null, outline = null,
      ow = s, shadow = null, sdx = s, sdy = s, align = 'left', sp = 0, each = null,
    } = o;
    const width = this.measure(str, { font, scale: s, sp });
    let bx = Math.round(x - (align === 'center' ? width / 2 : align === 'right' ? width : 0));
    const base = Math.round(y) + this.cap(font) * s;
    const capPx = this.cap(font);
    const chars = [...str];
    const placed = [];
    let pen = bx;
    chars.forEach((ch, i) => {
      const g = this.glyph(font, ch);
      const a = each ? each(i, ch) || {} : {};
      if (!a.hide) placed.push([g, pen + Math.round(a.dx || 0), base + Math.round(a.dy || 0), a.color]);
      pen += (g.dw + sp) * s;
    });
    const pass = (dx, dy, grow, colFn) => {
      for (const [g, gx, gy, cc] of placed) {
        const { px } = g;
        for (let k = 0; k < px.length; k += 2) {
          const c = colFn(px[k + 1], cc);
          this.rect(gx + px[k] * s + dx - grow, gy + px[k + 1] * s + dy - grow, s + 2 * grow, s + 2 * grow, c);
        }
      }
    };
    if (shadow != null) pass(sdx, sdy, outline != null ? ow : 0, () => shadow);
    if (outline != null) pass(0, 0, ow, () => outline);
    pass(0, 0, 0, (py, cc) => cc || (fill2 != null && py > -capPx / 2 ? fill2 : color));
    return width;
  }

  // 화면 전체를 디더 패턴으로 덮기(전환용)
  cover(c, level) {
    if (level <= 0) return;
    const { buf, w, h } = this;
    if (level >= 1) return buf.fill(c);
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) if (bayer(x, y) < level) buf[y * w + x] = c;
    }
  }
}
