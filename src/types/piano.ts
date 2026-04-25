export interface PianoKey {
  note: string;        // e.g. "C4"
  keyboardKey: string; // display label e.g. "A"
  isBlack: boolean;
  position: number;    // visual position index
  octave: number;
}

export interface PianoConfig {
  keys: PianoKey[];
  keyboardMap: Record<string, string>; // keyboard key -> note
}

export type OctaveRange = 3 | 4 | 5;
