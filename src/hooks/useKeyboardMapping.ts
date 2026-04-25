import { useEffect, useCallback, useRef } from 'react';
import { KEYBOARD_MAP } from '../constants/pianoConfig';

interface UseKeyboardMappingProps {
  onNoteOn: (note: string) => void;
  onNoteOff: (note: string) => void;
  onSustainChange?: (on: boolean) => void;
  enabled?: boolean;
}

export function useKeyboardMapping({
  onNoteOn,
  onNoteOff,
  onSustainChange,
  enabled = true,
}: UseKeyboardMappingProps) {
  // Track pressed keys to prevent key-repeat firing multiple note-ons
  const pressedKeys = useRef<Set<string>>(new Set());

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!enabled) return;
      // Ignore when typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      // Prevent default browser shortcuts for mapped keys
      const key = e.key.toLowerCase();

      // Sustain pedal via Space bar
      if (e.code === 'Space') {
        e.preventDefault();
        onSustainChange?.(true);
        return;
      }

      if (pressedKeys.current.has(key)) return; // already held
      const note = KEYBOARD_MAP[key];
      if (note) {
        e.preventDefault();
        pressedKeys.current.add(key);
        onNoteOn(note);
      }
    },
    [enabled, onNoteOn, onSustainChange]
  );

  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      if (!enabled) return;
      const key = e.key.toLowerCase();

      if (e.code === 'Space') {
        onSustainChange?.(false);
        return;
      }

      pressedKeys.current.delete(key);
      const note = KEYBOARD_MAP[key];
      if (note) {
        onNoteOff(note);
      }
    },
    [enabled, onNoteOff, onSustainChange]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  // Expose which notes correspond to held keyboard keys
  const getKeyboardNote = useCallback((keyboardKey: string): string | undefined => {
    return KEYBOARD_MAP[keyboardKey.toLowerCase()];
  }, []);

  return { getKeyboardNote };
}
