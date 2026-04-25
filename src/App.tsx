import React, { useEffect } from 'react';
import { Piano } from './components/Piano';
import { Header } from './components/Header';
import { Controls } from './components/Controls';
import { KeyboardGuide } from './components/KeyboardGuide';
import { usePianoSound } from './hooks/usePianoSound';
import { useKeyboardMapping } from './hooks/useKeyboardMapping';
import { usePianoState } from './hooks/usePianoState';

// Convert 0-100 volume to decibels (-40 to 0 dB)
function volumeToDb(v: number): number {
  if (v === 0) return -Infinity;
  return -40 + (v / 100) * 40;
}

const App: React.FC = () => {
  const sound = usePianoSound();
  const state = usePianoState();

  // Sync volume to audio engine
  useEffect(() => {
    sound.setVolume(volumeToDb(state.volume));
  }, [state.volume, sound]);

  const handleNoteOn = (note: string) => {
    state.pressNote(note);
    sound.playNote(note);
  };

  const handleNoteOff = (note: string) => {
    state.releaseNote(note);
    sound.releaseNote(note);
  };

  const handleSustainChange = (on: boolean) => {
    state.setSustain(on);
    sound.setSustain(on);
  };

  // Keyboard integration
  useKeyboardMapping({
    onNoteOn: handleNoteOn,
    onNoteOff: handleNoteOff,
    onSustainChange: handleSustainChange,
    enabled: sound.isLoaded,
  });

  return (
    <div className="app">
      {/* Ambient background particles */}
      <div className="bg-particles" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className={`particle particle-${i + 1}`} />
        ))}
      </div>

      <div className="app-content">
        <Header isLoaded={sound.isLoaded} isLoading={sound.isLoading} />

        <main className="piano-stage">
          <Piano
            activeNotes={state.activeNotes}
            onNoteOn={handleNoteOn}
            onNoteOff={handleNoteOff}
          />
        </main>

        <Controls
          volume={state.volume}
          sustain={state.sustain}
          showGuide={state.showGuide}
          onVolumeChange={state.setVolume}
          onSustainChange={handleSustainChange}
          onToggleGuide={state.toggleGuide}
        />

        {state.showGuide && <KeyboardGuide />}

        <footer className="app-footer">
          <p>
            powered by real concert grand piano samples
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
