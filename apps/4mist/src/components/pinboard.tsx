import React, { useState } from 'react';
// import styles from './pinboard.module.css';
import Sparkboard from './sparkboard';

const Pinboard = () => {
  const [pins, setPins] = useState<{ id: number; type: string; content: string; x: number; y: number }[]>([]);

  const handleAddNote = () => {
    const newNote = {
      id: Date.now(),
      type: 'note',
      content: 'New note...',
      x: 50,
      y: 50,
    };
    setPins(prev => [...prev, newNote]);
  };

  return (
    <div className="relative bg-brown text-text w-full h-full p-4 overflow-auto border-r border-orange">
      <h2 className="text-lg font-bold mb-2">🎭 Pinboard</h2>

      {/* Sparkboard Dropdown */}
      <div className="mb-4">
        <Sparkboard />
      </div>

      <button
        onClick={handleAddNote}
        className="bg-orange text-white px-3 py-1 rounded mb-4 shadow"
      >
        ➕ Add Note
      </button>

      {/* Pins */}
      <div className="relative">
        {pins.map(pin => (
          <div
            className="pin"
            style={{ left: pin.x, top: pin.y }}
          >
            {pin.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pinboard;
