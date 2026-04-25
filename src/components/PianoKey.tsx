import React, { useCallback } from 'react';
import type { PianoKey as PianoKeyType } from '../../piano-app/piano-app/src/types/piano';

interface PianoKeyProps {
  pianoKey: PianoKeyType;
  isActive: boolean;
  onNoteOn: (note: string) => void;
  onNoteOff: (note: string) => void;
}

export const PianoKey: React.FC<PianoKeyProps> = ({ pianoKey, isActive, onNoteOn, onNoteOff }) => {
  const { note, keyboardKey, isBlack } = pianoKey;

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    onNoteOn(note);
  }, [note, onNoteOn]);

  const handleMouseUp = useCallback(() => {
    onNoteOff(note);
  }, [note, onNoteOff]);

  const handleMouseLeave = useCallback(() => {
    onNoteOff(note);
  }, [note, onNoteOff]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    onNoteOn(note);
  }, [note, onNoteOn]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    onNoteOff(note);
  }, [note, onNoteOff]);

  if (isBlack) {
    return (
      <div
        className={`piano-key black-key ${isActive ? 'active' : ''}`}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        role="button"
        aria-label={`Piano key ${note}`}
        aria-pressed={isActive}
        tabIndex={-1}
      >
        <div className="black-key-inner">
          {keyboardKey && (
            <span className="key-label black-key-label">{keyboardKey}</span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`piano-key white-key ${isActive ? 'active' : ''}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="button"
      aria-label={`Piano key ${note}`}
      aria-pressed={isActive}
      tabIndex={-1}
    >
      <div className="white-key-inner">
        <div className="white-key-bottom">
          {keyboardKey && (
            <span className="key-label white-key-label">{keyboardKey}</span>
          )}
          <span className="note-label">{note.replace('#', '♯')}</span>
        </div>
      </div>
    </div>
  );
};
