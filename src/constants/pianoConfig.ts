import type { PianoKey } from '../types/piano';

/**
 * Keyboard mapping — carefully designed for spatial ergonomics:
 *
 * OCTAVE 3  (lower, Z-row):
 *   White:  Z=C3  X=D3  C=E3  V=F3  B=G3  N=A3  M=B3
 *   Black:  S=C#3 D=D#3       G=F#3 H=G#3 J=A#3
 *   (S/D/G/H/J sit spatially above Z/X/V/B/N on QWERTY)
 *
 * OCTAVE 4  (upper, Q-row):
 *   White:  Q=C4  W=D4  E=E4  R=F4  T=G4  Y=A4  U=B4
 *   Black:  2=C#4 3=D#4       5=F#4 6=G#4 7=A#4
 *   (number row is above Q-row)
 *
 * HIGH C:   I=C5
 */
export const KEYBOARD_MAP: Record<string, string> = {
  // Octave 3 whites
  z: 'C3', x: 'D3', c: 'E3', v: 'F3', b: 'G3', n: 'A3', m: 'B3',
  // Octave 3 blacks
  s: 'C#3', d: 'D#3', g: 'F#3', h: 'G#3', j: 'A#3',
  // Octave 4 whites
  q: 'C4', w: 'D4', e: 'E4', r: 'F4', t: 'G4', y: 'A4', u: 'B4',
  // Octave 4 blacks
  '2': 'C#4', '3': 'D#4', '5': 'F#4', '6': 'G#4', '7': 'A#4',
  // High C
  i: 'C5',
};

// Reverse map: note -> keyboard key label
export const NOTE_TO_KEY: Record<string, string> = Object.fromEntries(
  Object.entries(KEYBOARD_MAP).map(([k, n]) => [n, k.toUpperCase()])
);

// All piano keys in visual order (C3 → C5)
const WHITE_NOTES = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const BLACK_NOTES: Record<string, string | null> = {
  C: 'C#', D: 'D#', E: null, F: 'F#', G: 'G#', A: 'A#', B: null,
};

function buildKeys(): PianoKey[] {
  const keys: PianoKey[] = [];
  let pos = 0;

  for (const octave of [3, 4] as const) {
    for (const wn of WHITE_NOTES) {
      const note = `${wn}${octave}`;
      keys.push({
        note,
        keyboardKey: NOTE_TO_KEY[note] ?? '',
        isBlack: false,
        position: pos++,
        octave,
      });
    }
  }
  // High C
  keys.push({ note: 'C5', keyboardKey: NOTE_TO_KEY['C5'] ?? 'I', isBlack: false, position: pos++, octave: 5 });

  // Black keys
  let blackPos = 0;
  for (const octave of [3, 4] as const) {
    for (const wn of WHITE_NOTES) {
      const bn = BLACK_NOTES[wn];
      if (bn) {
        const note = `${bn}${octave}`;
        keys.push({
          note,
          keyboardKey: NOTE_TO_KEY[note] ?? '',
          isBlack: true,
          position: blackPos++,
          octave,
        });
      }
    }
  }

  return keys;
}

export const PIANO_KEYS: PianoKey[] = buildKeys();

export const WHITE_KEYS = PIANO_KEYS.filter(k => !k.isBlack);
export const BLACK_KEYS = PIANO_KEYS.filter(k => k.isBlack);

// Salamander Grand Piano samples (CC BY 3.0)
export const SAMPLE_BASE_URL = 'https://tonejs.github.io/audio/salamander/';

export const SAMPLE_NOTES: Record<string, string> = {
  A0: `${SAMPLE_BASE_URL}A0.mp3`,
  C1: `${SAMPLE_BASE_URL}C1.mp3`,
  'D#1': `${SAMPLE_BASE_URL}Ds1.mp3`,
  'F#1': `${SAMPLE_BASE_URL}Fs1.mp3`,
  A1: `${SAMPLE_BASE_URL}A1.mp3`,
  C2: `${SAMPLE_BASE_URL}C2.mp3`,
  'D#2': `${SAMPLE_BASE_URL}Ds2.mp3`,
  'F#2': `${SAMPLE_BASE_URL}Fs2.mp3`,
  A2: `${SAMPLE_BASE_URL}A2.mp3`,
  C3: `${SAMPLE_BASE_URL}C3.mp3`,
  'D#3': `${SAMPLE_BASE_URL}Ds3.mp3`,
  'F#3': `${SAMPLE_BASE_URL}Fs3.mp3`,
  A3: `${SAMPLE_BASE_URL}A3.mp3`,
  C4: `${SAMPLE_BASE_URL}C4.mp3`,
  'D#4': `${SAMPLE_BASE_URL}Ds4.mp3`,
  'F#4': `${SAMPLE_BASE_URL}Fs4.mp3`,
  A4: `${SAMPLE_BASE_URL}A4.mp3`,
  C5: `${SAMPLE_BASE_URL}C5.mp3`,
  'D#5': `${SAMPLE_BASE_URL}Ds5.mp3`,
  'F#5': `${SAMPLE_BASE_URL}Fs5.mp3`,
  A5: `${SAMPLE_BASE_URL}A5.mp3`,
  C6: `${SAMPLE_BASE_URL}C6.mp3`,
};
