import React from 'react';

export const KeyboardGuide: React.FC = () => {
  return (
    <div className="keyboard-guide" role="complementary" aria-label="Keyboard mapping guide">
      <h3 className="guide-title">Keyboard Mapping</h3>
      <div className="guide-octaves">

        <div className="guide-octave">
          <span className="guide-octave-label">Octave 3</span>
          <div className="guide-keys">
            <div className="guide-row">
              <span className="guide-chip black">S</span>
              <span className="guide-chip black">D</span>
              <span className="guide-gap" />
              <span className="guide-chip black">G</span>
              <span className="guide-chip black">H</span>
              <span className="guide-chip black">J</span>
            </div>
            <div className="guide-row">
              <span className="guide-chip white">Z</span>
              <span className="guide-chip white">X</span>
              <span className="guide-chip white">C</span>
              <span className="guide-chip white">V</span>
              <span className="guide-chip white">B</span>
              <span className="guide-chip white">N</span>
              <span className="guide-chip white">M</span>
            </div>
            <div className="guide-row notes">
              <span>C</span><span>D</span><span>E</span>
              <span>F</span><span>G</span><span>A</span><span>B</span>
            </div>
          </div>
        </div>

        <div className="guide-divider">│</div>

        <div className="guide-octave">
          <span className="guide-octave-label">Octave 4</span>
          <div className="guide-keys">
            <div className="guide-row">
              <span className="guide-chip black">2</span>
              <span className="guide-chip black">3</span>
              <span className="guide-gap" />
              <span className="guide-chip black">5</span>
              <span className="guide-chip black">6</span>
              <span className="guide-chip black">7</span>
            </div>
            <div className="guide-row">
              <span className="guide-chip white">Q</span>
              <span className="guide-chip white">W</span>
              <span className="guide-chip white">E</span>
              <span className="guide-chip white">R</span>
              <span className="guide-chip white">T</span>
              <span className="guide-chip white">Y</span>
              <span className="guide-chip white">U</span>
            </div>
            <div className="guide-row notes">
              <span>C</span><span>D</span><span>E</span>
              <span>F</span><span>G</span><span>A</span><span>B</span>
            </div>
          </div>
        </div>

        <div className="guide-divider">│</div>

        <div className="guide-octave">
          <span className="guide-octave-label">Octave 5</span>
          <div className="guide-keys">
            <div className="guide-row">
              <span className="guide-chip black">8</span>
              <span className="guide-chip black">9</span>
              <span className="guide-gap" />
              <span className="guide-chip black">-</span>
              <span className="guide-chip black">=</span>
              <span className="guide-chip black">0</span>
            </div>
            <div className="guide-row">
              <span className="guide-chip white">I</span>
              <span className="guide-chip white">O</span>
              <span className="guide-chip white">P</span>
              <span className="guide-chip white">[</span>
              <span className="guide-chip white">]</span>
              <span className="guide-chip white">\</span>
              <span className="guide-chip white">'</span>
            </div>
            <div className="guide-row notes">
              <span>C</span><span>D</span><span>E</span>
              <span>F</span><span>G</span><span>A</span><span>B</span>
            </div>
          </div>
        </div>

      </div>
      <p className="guide-note">
        <kbd>Space</kbd> — Sustain pedal
      </p>
    </div>
  );
};
