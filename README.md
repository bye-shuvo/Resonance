# Resonance 🎹

> A virtual grand piano powered by real concert grand piano samples — rich, warm, and true to life.

Resonance brings the expressiveness of an acoustic instrument to your browser. Play across two octaves with your keyboard, mouse, or touch screen, with a natural key layout that actually feels like playing. No install, no account.
Resonance brings the expressiveness of an acoustic instrument to your browser. Play across two octaves with your keyboard, mouse, or touch screen, with a natural key layout that actually feels like playing. No install, no account.

---

## Features

- **Authentic Piano Sound** — Real concert grand piano samples stream at runtime. No synth approximations.
- **Keyboard Play** — Two full octaves mapped ergonomically across your QWERTY keyboard, designed to feel natural under your fingers.
- **Mouse & Touch Support** — Fully playable with a mouse or on any touch screen device.
- **Sustain Pedal** — Hold `Space` to sustain notes, just like a real pedal.
- **Volume Control** — Smooth slider to dial in the perfect level.
- **Keyboard Guide** — On-screen overlay showing every key mapping, toggleable at any time.
- **Classic Design** — Skeuomorphic mahogany and ivory aesthetic with realistic key press animations.
- **Reverb** — Subtle hall reverb applied to every note for a natural, spacious sound.
- **Responsive** — Works on desktop, tablet, and mobile.
- **Zero Dependencies on You** — No login, no setup, no file downloads.

---

## Keyboard Mapping

```
Black:  S  D     G  H  J  │  2  3     5  6  7  │  8  9     -  =
White:  Z  X  C  V  B  N  M  Q  W  E  R  T  Y  U  I  O  P  [  ]  \  '
Note:   C3 D3 E3 F3 G3 A3 B3 C4 D4 E4 F4 G4 A4 B4 C5 D5 E5 F5 G5 A5 B5
```

`Space` — Sustain pedal

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build Tool | Vite 5 |
| Audio Engine | Tone.js 14 |
| Samples | Salamander Grand Piano (CC BY 3.0) |
| Styling | Pure CSS — no UI framework |

---

## Project Structure

```
src/
├── hooks/
│   ├── usePianoSound.ts      # Tone.js sampler, reverb, attack/release
│   ├── useKeyboardMapping.ts # Keyboard events, sustain, repeat prevention
│   └── usePianoState.ts      # Active notes, volume, sustain state
├── components/
│   ├── Piano.tsx             # Keyboard layout and key positioning
│   ├── PianoKey.tsx          # Individual white/black key
│   ├── Controls.tsx          # Volume, sustain, guide toggle
│   ├── Header.tsx            # Title and load status
│   └── KeyboardGuide.tsx     # On-screen key mapping overlay
├── constants/
│   └── pianoConfig.ts        # Key definitions, keyboard map, sample URLs
└── types/
    └── piano.ts              # Shared TypeScript types
```

---

## Contributing

Contributions are welcome. Please read the following before submitting.

### What We Welcome

- Bug fixes with a clear description of the problem and solution
- Accessibility improvements (contrast, keyboard navigation, screen reader support)
- Performance optimizations
- Additional keyboard layouts or octave ranges
- Mobile/touch experience improvements
- New visual themes that match the existing design quality

### What to Avoid

- Introducing UI frameworks or heavy dependencies without prior discussion
- Changes that break the existing keyboard mapping logic
- Styling changes that deviate significantly from the classic aesthetic
- Features that require a backend or user accounts — Nocturne is intentionally client-only

### Guidelines

- Keep hooks separated by concern — audio logic stays in `usePianoSound`, keyboard logic in `useKeyboardMapping`
- Write TypeScript — no `any` types
- Test on at least one mobile device before submitting UI changes
- One feature or fix per pull request
- Open an issue first for large or breaking changes

### Code Style

- Functional components only
- Prefer `useCallback` and `useRef` for performance-sensitive handlers
- CSS custom properties for all colors and spacing — no hardcoded hex values in new rules
- Accessible by default — every interactive element needs an `aria-label`

---

## License

MIT © Resonance
