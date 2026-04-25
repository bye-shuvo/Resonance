import { useState, useCallback, useRef } from 'react';

export interface UsePianoStateReturn {
  activeNotes: Set<string>;
  volume: number;
  sustain: boolean;
  showGuide: boolean;
  pressNote: (note: string) => void;
  releaseNote: (note: string) => void;
  setVolume: (v: number) => void;
  setSustain: (on: boolean) => void;
  toggleGuide: () => void;
}

export function usePianoState(): UsePianoStateReturn {
  const [activeNotes, setActiveNotes] = useState<Set<string>>(new Set());
  const [volume, setVolumeState] = useState(75);
  const [sustain, setSustainState] = useState(false);
  const [showGuide, setShowGuide] = useState(true);

  // Use ref to track mouse-held notes separately from keyboard
  const mouseHeldNotes = useRef<Set<string>>(new Set());

  const pressNote = useCallback((note: string) => {
    setActiveNotes(prev => {
      const next = new Set(prev);
      next.add(note);
      return next;
    });
  }, []);

  const releaseNote = useCallback((note: string) => {
    mouseHeldNotes.current.delete(note);
    setActiveNotes(prev => {
      const next = new Set(prev);
      next.delete(note);
      return next;
    });
  }, []);

  const setVolume = useCallback((v: number) => {
    setVolumeState(v);
  }, []);

  const setSustain = useCallback((on: boolean) => {
    setSustainState(on);
    if (!on) {
      // Clear sustained notes from display
      setActiveNotes(prev => {
        const next = new Set(mouseHeldNotes.current);
        return next;
      });
    }
  }, []);

  const toggleGuide = useCallback(() => {
    setShowGuide(prev => !prev);
  }, []);

  return {
    activeNotes,
    volume,
    sustain,
    showGuide,
    pressNote,
    releaseNote,
    setVolume,
    setSustain,
    toggleGuide,
  };
}
