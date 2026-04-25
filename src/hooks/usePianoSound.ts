import { useEffect, useRef, useState, useCallback } from 'react';
import * as Tone from 'tone';
import { SAMPLE_NOTES } from '../constants/pianoConfig';

export interface UsePianoSoundReturn {
  isLoaded: boolean;
  isLoading: boolean;
  playNote: (note: string) => void;
  releaseNote: (note: string) => void;
  releaseAll: () => void;
  setVolume: (db: number) => void;
  setSustain: (on: boolean) => void;
}

export function usePianoSound(): UsePianoSoundReturn {
  const samplerRef = useRef<Tone.Sampler | null>(null);
  const reverbRef = useRef<Tone.Reverb | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const sustainRef = useRef(false);
  const heldNotesRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);

    const reverb = new Tone.Reverb({ decay: 1.8, wet: 0.25 }).toDestination();
    reverbRef.current = reverb;

    const sampler = new Tone.Sampler({
      urls: SAMPLE_NOTES,
      release: 1.2,
      onload: () => {
        if (!cancelled) {
          setIsLoaded(true);
          setIsLoading(false);
        }
      },
    }).connect(reverb);

    samplerRef.current = sampler;

    return () => {
      cancelled = true;
      sampler.dispose();
      reverb.dispose();
    };
  }, []);

  const ensureAudioContext = useCallback(async () => {
    if (Tone.getContext().state !== 'running') {
      await Tone.start();
    }
  }, []);

  const playNote = useCallback(async (note: string) => {
    if (!samplerRef.current || !isLoaded) return;
    await ensureAudioContext();
    try {
      samplerRef.current.triggerAttack(note, Tone.now());
      heldNotesRef.current.add(note);
    } catch {
      // ignore
    }
  }, [isLoaded, ensureAudioContext]);

  const releaseNote = useCallback((note: string) => {
    if (!samplerRef.current || !isLoaded) return;
    heldNotesRef.current.delete(note);
    if (!sustainRef.current) {
      try {
        samplerRef.current.triggerRelease(note, Tone.now() + 0.05);
      } catch {
        // ignore
      }
    }
  }, [isLoaded]);

  const releaseAll = useCallback(() => {
    if (!samplerRef.current || !isLoaded) return;
    heldNotesRef.current.forEach(note => {
      try {
        samplerRef.current!.triggerRelease(note, Tone.now() + 0.05);
      } catch {
        // ignore
      }
    });
    heldNotesRef.current.clear();
  }, [isLoaded]);

  const setVolume = useCallback((db: number) => {
    if (samplerRef.current) {
      samplerRef.current.volume.value = db;
    }
  }, []);

  const setSustain = useCallback((on: boolean) => {
    sustainRef.current = on;
    if (!on) {
      // release all notes that aren't held by mouse/touch
      releaseAll();
    }
  }, [releaseAll]);

  return { isLoaded, isLoading, playNote, releaseNote, releaseAll, setVolume, setSustain };
}
