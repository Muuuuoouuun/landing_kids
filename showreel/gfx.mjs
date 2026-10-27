// 아주 작은 픽셀 래스터라이저. 캔버스 없이 Uint32 버퍼에 직접 그린다.
// 같은 코드가 Node(영상 렌더)와 브라우저(미리보기) 양쪽에서 돈다.
//
// 장면은 설계 좌표(W×H = 480×270)로 그리고, 실제 픽셀은 S배(576×324)로 찍는다.
// 원·선·삼각형·디더는 실제 픽셀 해상도로 더 촘촘해지고, 폰트·스프라이트는
// 정수 픽셀 크기를 유지해 더 고운 픽셀이 된다. 테두리는 실제 픽셀 두께로 고정.

export const W = 480;
export const H = 270;
export const S = 1.2;
export const DW = Math.round(W * S);
export const DH = Math.round(H * S);

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
  // 클래스인 테마: 파스텔 연두
  themeL: rgb('#EAF8DC'),
  theme: rgb('#C6EBA4'),
  themeM: rgb('#9ED77A'),
  themeD: rgb('#5FAE45'),
  themeDD: rgb('#2F6B2E'),
  themeX: rgb('#22472A'),
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
  constructor(fonts, s = S) {
    this.w = W;
    this.h = H;
    this.s = s;
    this.dw = Math.round(W * s);
    this.dh = Math.round(H * s);
    this.bytes = new Uint8ClampedArray(this.dw * this.dh * 4);
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
    this.cx1 = this.dw;
    this.cy1 = this.dh;
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

  // 설계 좌표 → 실제 픽셀
  X(x) {
    return Math.round((x + this.ox) * this.s);
  }

  Y(y) {
    return Math.round((y + this.oy) * this.s);
  }

  // 설계 길이 → 실제 픽셀 두께 (최소 1)
  T(t) {
    return Math.max(1, Math.round(t * this.s));
  }

  // 현재 변환 기준 사각형과 교집합으로 클립
  clip(x, y, w, h) {
    this.cx0 = Math.max(this.cx0, this.X(x));
    this.cy0 = Math.max(this.cy0, this.Y(y));
    this.cx1 = Math.min(this.cx1, this.X(x + w));
    this.cy1 = Math.min(this.cy1, this.Y(y + h));
  }

  clear(c) {
    this.buf.fill(c);
  }

  // 실제 픽셀 사각형 (클립/디더 적용)
  _span(x0, y0, x1, y1, c) {
    if (x0 < this.cx0) x0 = this.cx0;
    if (y0 < this.cy0) y0 = this.cy0;
    if (x1 > this.cx1) x1 = this.cx1;
    if (y1 > this.cy1) y1 = this.cy1;
    if (x0 >= x1 || y0 >= y1) return;
    const { buf } = this;
    const w = this.dw;
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
    const px = this.X(x);
    const py = this.Y(y);
    this._span(px, py, px + 1, py + 1, c);
  }

  // 1 이하 두께는 늘 실제 1픽셀, 그 이상은 이웃과 이어지게 끝점 기준
  rect(x, y, w, h, c) {
    if (w <= 0 || h <= 0) return;
    const x0 = this.X(x);
    const y0 = this.Y(y);
    const x1 = w <= 1 ? x0 + 1 : Math.max(x0 + 1, this.X(x + w));
    const y1 = h <= 1 ? y0 + 1 : Math.max(y0 + 1, this.Y(y + h));
    this._span(x0, y0, x1, y1, c);
  }

  // 외곽선 박스. t = 테두리(설계 단위, 실제 픽셀로 고정), r>0 이면 계단식 둥근 모서리
  box(x, y, w, h, fill, line = C.ink, t = 1, r = 0) {
    const x0 = this.X(x);
    const y0 = this.Y(y);
    const x1 = Math.max(x0 + 2, this.X(x + w));
    const y1 = Math.max(y0 + 2, this.Y(y + h));
    const T = this.T(t);
    if (fill == null) {
      this._span(x0, y0, x1, y0 + T, line);
      this._span(x0, y1 - T, x1, y1, line);
      this._span(x0, y0 + T, x0 + T, y1 - T, line);
      this._span(x1 - T, y0 + T, x1, y1 - T, line);
      return;
    }
    const R = Math.round(r * this.s);
    if (line != null) this._rspan(x0, y0, x1, y1, line, R);
    this._rspan(x0 + T, y0 + T, x1 - T, y1 - T, fill, Math.max(0, R - T));
  }

  // 모서리를 계단식으로 깎은 채움 (실제 픽셀)
  _rspan(x0, y0, x1, y1, c, R) {
    const w = x1 - x0;
    const h = y1 - y0;
    if (w <= 0 || h <= 0) return;
    R = Math.min(R, Math.floor(w / 2), Math.floor(h / 2));
    if (R <= 0) return this._span(x0, y0, x1, y1, c);
    for (let i = 0; i < R; i++) {
      const cut = R - Math.round(Math.sqrt(R * R - (R - i - 0.5) ** 2));
      this._span(x0 + cut, y0 + i, x1 - cut, y0 + i + 1, c);
      this._span(x0 + cut, y1 - 1 - i, x1 - cut, y1 - i, c);
    }
    this._span(x0, y0 + R, x1, y1 - R, c);
  }

  rbox(x, y, w, h, c, r = 2) {
    const x0 = this.X(x);
    const y0 = this.Y(y);
    this._rspan(x0, y0, Math.max(x0 + 1, this.X(x + w)), Math.max(y0 + 1, this.Y(y + h)), c, Math.round(r * this.s));
  }

  ellipse(cx, cy, rx, ry, c) {
    if (rx <= 0 || ry <= 0) return;
    const s = this.s;
    const dcx = (cx + this.ox) * s;
    const dcy = (cy + this.oy) * s;
    const drx = rx * s;
    const dry = ry * s;
    const y0 = Math.round(dcy - dry);
    const y1 = Math.round(dcy + dry);
    for (let y = y0; y <= y1; y++) {
      const t = 1 - ((y + 0.5 - dcy) / dry) ** 2;
      if (t < 0) continue;
      const hw = drx * Math.sqrt(t);
      const a = Math.round(dcx - hw);
      const b = Math.round(dcx + hw);
      if (b > a) this._span(a, y, b, y + 1, c);
    }
  }

  circle(cx, cy, r, c) {
    this.ellipse(cx, cy, r, r, c);
  }

  ring(cx, cy, r, c, t = 1) {
    const s = this.s;
    const dcx = (cx + this.ox) * s;
    const dcy = (cy + this.oy) * s;
    const ro = r * s + 0.5;
    const ri = ro - this.T(t);
    const y0 = Math.floor(dcy - ro);
    const y1 = Math.ceil(dcy + ro);
    for (let y = y0; y <= y1; y++) {
      for (let x = Math.floor(dcx - ro); x <= Math.ceil(dcx + ro); x++) {
        const d = Math.hypot(x + 0.5 - dcx, y + 0.5 - dcy);
        if (d <= ro && d > ri) this._span(x, y, x + 1, y + 1, c);
      }
    }
  }

  line(x0, y0, x1, y1, c, t = 1) {
    x0 = this.X(x0);
    y0 = this.Y(y0);
    x1 = this.X(x1);
    y1 = this.Y(y1);
    const T = this.T(t);
    const dx = Math.abs(x1 - x0);
    const dy = -Math.abs(y1 - y0);
    const sx = x0 < x1 ? 1 : -1;
    const sy = y0 < y1 ? 1 : -1;
    let err = dx + dy;
    const o = Math.floor(T / 2);
    for (;;) {
      this._span(x0 - o, y0 - o, x0 - o + T, y0 - o + T, c);
      if (x0 === x1 && y0 === y1) break;
      const e2 = 2 * err;
      if (e2 >= dy) { err += dy; x0 += sx; }
      if (e2 <= dx) { err += dx; y0 += sy; }
    }
  }

  tri(ax, ay, bx, by, cx, cy, c) {
    const s = this.s;
    const P = (x, y) => [(x + this.ox) * s, (y + this.oy) * s];
    const pts = [P(ax, ay), P(bx, by), P(cx, cy)].sort((p, q) => p[1] - q[1]);
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
      if (r > l) this._span(l, y, r, y + 1, c);
    }
  }

  quad(ax, ay, bx, by, cx, cy, dx, dy, c) {
    this.tri(ax, ay, bx, by, cx, cy, c);
    this.tri(ax, ay, cx, cy, dx, dy, c);
  }

  // 타원 테두리 (rot 라디안 회전, from~to 각도 구간만)
  oval(cx, cy, rx, ry, c, { rot = 0, t = 1, from = 0, to = Math.PI * 2 } = {}) {
    const s = this.s;
    const n = Math.max(24, Math.ceil((rx + ry) * 3 * s));
    const cr = Math.cos(rot);
    const sr = Math.sin(rot);
    const T = this.T(t);
    const o = Math.floor(T / 2);
    for (let i = 0; i <= n; i++) {
      const a = from + ((to - from) * i) / n;
      const ex = Math.cos(a) * rx;
      const ey = Math.sin(a) * ry;
      const px = this.X(cx + ex * cr - ey * sr);
      const py = this.Y(cy + ex * sr + ey * cr);
      this._span(px - o, py - o, px - o + T, py - o + T, c);
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

  // rows: 문자열 배열. sx/sy 는 배율 — 실제 픽셀 정수배로 맞춰 픽셀이 고르게 찍힌다
  sprite(rows, x, y, { sx = 1, sy = 1, flip = false, pal = null, ax = 0, ay = 0 } = {}) {
    const sh = rows.length;
    const sw = rows[0].length;
    const kx = Math.max(1, Math.round(Math.abs(sx) * this.s));
    const ky = Math.max(1, Math.round(Math.abs(sy) * this.s));
    const x0 = this.X(x) - Math.round(ax * sw * kx);
    const y0 = this.Y(y) - Math.round(ay * sh * ky);
    for (let v = 0; v < sh; v++) {
      const row = rows[v];
      let run = -1;
      let runC = 0;
      for (let i = 0; i <= sw; i++) {
        let col = 0;
        if (i < sw) {
          const ch = row[flip ? sw - 1 - i : i];
          if (ch !== '.') col = (pal && pal[ch]) || SP[ch] || 0;
        }
        if (col !== runC) {
          if (runC) this._span(x0 + run * kx, y0 + v * ky, x0 + i * kx, y0 + (v + 1) * ky, runC);
          run = i;
          runC = col;
        }
      }
    }
  }

  // ───── 텍스트 (BDF 비트맵) ─────
  // scale·ow·sdx·sdy 는 실제 픽셀 단위 — 글자 픽셀이 고르게 찍힌다
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

  _capPx(font) {
    const f = this.fonts[font];
    if (f._cap == null) {
      const g = f.glyphs['가'] || f.glyphs.H;
      f._cap = g[2] + g[4];
    }
    return f._cap;
  }

  // 대문자/한글 높이 (설계 단위)
  cap(font) {
    return this._capPx(font) / this.s;
  }

  _measurePx(str, font, scale, sp) {
    let w = 0;
    for (const ch of str) w += (this.glyph(font, ch).dw + sp) * scale;
    return w - sp * scale;
  }

  // 글자 폭 (설계 단위)
  measure(str, { font = 'b11', scale = 1, sp = 0 } = {}) {
    return this._measurePx(str, font, scale, sp) / this.s;
  }

  // 반환: 그린 폭(설계 단위). each(i,ch) → {dx,dy,hide,color} 로 글자별 애니메이션
  text(str, x, y, o = {}) {
    const {
      font = 'b11', scale: s = 1, color = C.ink, fill2 = null, outline = null,
      ow = s, shadow = null, sdx = s, sdy = s, align = 'left', sp = 0, each = null,
    } = o;
    const wpx = this._measurePx(str, font, s, sp);
    const bx = this.X(x) - (align === 'center' ? Math.round(wpx / 2) : align === 'right' ? wpx : 0);
    const capPx = this._capPx(font);
    const base = this.Y(y) + capPx * s;
    const placed = [];
    let pen = bx;
    [...str].forEach((ch, i) => {
      const g = this.glyph(font, ch);
      const a = each ? each(i, ch) || {} : {};
      if (!a.hide) placed.push([g, pen + Math.round((a.dx || 0) * this.s), base + Math.round((a.dy || 0) * this.s), a.color]);
      pen += (g.dw + sp) * s;
    });
    const pass = (dx, dy, grow, colFn) => {
      for (const [g, gx, gy, cc] of placed) {
        const { px } = g;
        for (let k = 0; k < px.length; k += 2) {
          const c = colFn(px[k + 1], cc);
          const x0 = gx + px[k] * s + dx - grow;
          const y0 = gy + px[k + 1] * s + dy - grow;
          this._span(x0, y0, x0 + s + 2 * grow, y0 + s + 2 * grow, c);
        }
      }
    };
    if (shadow != null) pass(sdx, sdy, outline != null ? ow : 0, () => shadow);
    if (outline != null) pass(0, 0, ow, () => outline);
    pass(0, 0, 0, (py, cc) => cc || (fill2 != null && py > -capPx / 2 ? fill2 : color));
    return wpx / this.s;
  }

  // 원 밖을 c 로 채움 (아이리스 전환)
  irisOut(cx, cy, R, c) {
    const s = this.s;
    const dcx = (cx + this.ox) * s;
    const dcy = (cy + this.oy) * s;
    const dR = R * s;
    for (let y = 0; y < this.dh; y++) {
      const dy = y + 0.5 - dcy;
      if (Math.abs(dy) >= dR) {
        this._span(0, y, this.dw, y + 1, c);
        continue;
      }
      const hw = Math.sqrt(dR * dR - dy * dy);
      this._span(0, y, Math.round(dcx - hw), y + 1, c);
      this._span(Math.round(dcx + hw), y, this.dw, y + 1, c);
    }
  }

  // 화면 전체를 디더 패턴으로 덮기(전환용)
  cover(c, level) {
    if (level <= 0) return;
    const { buf, dw, dh } = this;
    if (level >= 1) return buf.fill(c);
    for (let y = 0; y < dh; y++) {
      for (let x = 0; x < dw; x++) if (bayer(x, y) < level) buf[y * dw + x] = c;
    }
  }
}
