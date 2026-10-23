# 리틀마인즈 쇼릴 (22초 · 60fps)

이미지·동영상 소스 없이 **코드만으로** 그리는 픽셀 아트 쇼릴입니다.
480×270 픽셀 캔버스에 매 프레임을 직접 그리고, ffmpeg 로 4배(최근접 보간) 확대해
1920×1080 · 60fps 영상으로 뽑습니다. 사운드트랙(8비트 칩튠)과 효과음도 전부 합성합니다.

결과물: `public/showreel/little-minds-showreel.mp4` (H.264/AAC), `.webm` (VP9/Opus), `poster.png`

## 구성 (120BPM · 1마디 = 2초)

| 시간 | 장면 | 내용 |
| --- | --- | --- |
| 0–2s | BOOT | CRT 전원 → 연필·자·책·주판·플라스크·돋보기·지구본이 궤도로, 로고 낙하 |
| 2–6s | STAGE 1 · ABC 숲 | 자 땅·책 계단·연필 다리를 달려 C·A·T 블록 박치기 → 단어 완성, 고양이 등장 |
| 6–8s | STAGE 2 · 숫자 산 | `3 + 4 = ?` 수식 다리에 '7'을 끌어다 끼우면 건넘 |
| 8–10s | STAGE 3 · 과학 실험실 | 스포이트로 파랑 + 노랑 → 초록, 펑! 새싹이 자람 |
| 10–16s | WORLD MAP | 집(ONLINE) → 학원(OFFLINE) → 어디에서나 |
| 16–18s | PLAYER SELECT | 5세·7세·초3, 나이·수준별 맞춤 |
| 18–20s | PARENT | 부모님 폰으로 오는 오늘의 리포트 |
| 20–22s | FINALE | 로고 + 무료 체험 수업 신청 |

## 명령

```bash
npm run showreel          # 영상 + 포스터 렌더 (약 2분)
npm run showreel:sheet    # 30프레임 간격 컨택트 시트 → showreel/out/
node showreel/render.mjs --stills 0,300,900   # 특정 프레임 PNG
npm run showreel:font     # 텍스트를 바꿨다면 폰트 서브셋 재생성
```

ffmpeg 가 PATH 에 있어야 합니다.

## 파일

- `scenes.mjs` — 타임라인, 장면, 효과음 큐(`SFX`). 문구·타이밍은 여기서 수정
- `art.mjs` — 마스코트 "미니", 아이들, 이펙트(파티클·아이리스·모자이크·와이프)
- `tools.mjs` — 픽셀 수업 도구(연필·크레파스·자·책·주판·플라스크·스포이트 등)
- `gfx.mjs` — 의존성 없는 픽셀 래스터라이저 + 비트맵 폰트 렌더
- `audio.mjs` — 칩튠 합성(펄스·삼각파·노이즈)과 효과음
- `fonts.json` — 갈무리(Galmuri, OFL-1.1) 픽셀 폰트 중 사용 글자만 추린 것
