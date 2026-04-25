import React, { useCallback } from 'react';

interface ControlsProps {
  volume: number;
  sustain: boolean;
  showGuide: boolean;
  onVolumeChange: (v: number) => void;
  onSustainChange: (on: boolean) => void;
  onToggleGuide: () => void;
}

export const Controls: React.FC<ControlsProps> = ({
  volume,
  sustain,
  showGuide,
  onVolumeChange,
  onSustainChange,
  onToggleGuide,
}) => {
  const handleVolume = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onVolumeChange(Number(e.target.value));
    },
    [onVolumeChange]
  );

  const toggleSustain = useCallback(() => {
    onSustainChange(!sustain);
  }, [sustain, onSustainChange]);

  return (
    <div className="controls-bar" role="toolbar" aria-label="Piano controls">
      {/* Volume */}
      <div className="control-group">
        <label className="control-label" htmlFor="volume-slider">
          <span className="control-icon">◈</span>
          Volume
        </label>
        <div className="slider-track-wrap">
          <input
            id="volume-slider"
            type="range"
            min={0}
            max={100}
            value={volume}
            onChange={handleVolume}
            className="volume-slider"
            aria-label="Volume"
          />
          <span className="slider-value">{volume}%</span>
        </div>
      </div>

      {/* Sustain */}
      <div className="control-group">
        <button
          className={`sustain-btn ${sustain ? 'active' : ''}`}
          onClick={toggleSustain}
          aria-pressed={sustain}
          aria-label="Toggle sustain pedal"
        >
          <span className="sustain-icon">⬛</span>
          <span>Sustain {sustain ? 'On' : 'Off'}</span>
          <kbd className="sustain-hint">Space</kbd>
        </button>
      </div>

      {/* Guide toggle */}
      <div className="control-group">
        <button
          className={`guide-btn ${showGuide ? 'active' : ''}`}
          onClick={onToggleGuide}
          aria-pressed={showGuide}
          aria-label="Toggle keyboard guide"
        >
          <span>⌨ Key Guide</span>
        </button>
      </div>
    </div>
  );
};
