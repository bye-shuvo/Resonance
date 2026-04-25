import React, { useCallback, useRef } from 'react';
import { PianoKey } from './PianoKey';
import { WHITE_KEYS, BLACK_KEYS } from '../constants/pianoConfig';

// Black key offsets as percentages within the white-key grid
// Pattern per octave: after C(0), D(1), no E, F(3), G(4), A(5), no B
// We have 15 white keys (7+7+1). Each is 100/15 wide.
// Black keys sit between white keys.
const WHITE_KEY_COUNT = WHITE_KEYS.length; // 15

function getBlackKeyLeft(note: string): number {
  // Map each black key note to its white-key boundary position
  const blackKeyPositions: Record<string, number> = {
    'C#3': 0,  'D#3': 1,  'F#3': 3,  'G#3': 4,  'A#3': 5,
    'C#4': 7,  'D#4': 8,  'F#4': 10, 'G#4': 11, 'A#4': 12,
  };
  const idx = blackKeyPositions[note];
  if (idx === undefined) return 0;
  const whiteW = 100 / WHITE_KEY_COUNT;
  // Position black key at end of the white key to its left + slight overlap
  return (idx + 1) * whiteW - (whiteW * 0.3);
}

interface PianoProps {
  activeNotes: Set<string>;
  onNoteOn: (note: string) => void;
  onNoteOff: (note: string) => void;
}

export const Piano: React.FC<PianoProps> = ({ activeNotes, onNoteOn, onNoteOff }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseLeaveContainer = useCallback(() => {
    // Safety: release all notes when mouse leaves piano entirely
  }, []);

  return (
    <div className="piano-wrapper" aria-label="Piano keyboard">
      {/* Wood frame */}
      <div className="piano-frame">
        {/* Top nameplate */}
        <div className="piano-nameplate">
          <span className="piano-brand">Grand Piano</span>
        </div>

        {/* Key bed */}
        <div className="piano-keybed" onMouseLeave={handleMouseLeaveContainer}>
          <div className="keys-container" ref={containerRef}>
            {/* White keys layer */}
            <div className="white-keys-layer">
              {WHITE_KEYS.map(key => (
                <PianoKey
                  key={key.note}
                  pianoKey={key}
                  isActive={activeNotes.has(key.note)}
                  onNoteOn={onNoteOn}
                  onNoteOff={onNoteOff}
                />
              ))}
            </div>

            {/* Black keys layer — absolutely positioned */}
            <div className="black-keys-layer" aria-hidden="false">
              {BLACK_KEYS.map(key => (
                <div
                  key={key.note}
                  className="black-key-positioner"
                  style={{
                    left: `${getBlackKeyLeft(key.note)}%`,
                    width: `${(100 / WHITE_KEY_COUNT) * 0.58}%`,
                  }}
                >
                  <PianoKey
                    pianoKey={key}
                    isActive={activeNotes.has(key.note)}
                    onNoteOn={onNoteOn}
                    onNoteOff={onNoteOff}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom rail */}
        <div className="piano-bottom-rail" />
      </div>
    </div>
  );
};
