import React from 'react';
import { useDragDropChords } from '@2nist/ui-hooks';

const initialChords = [
  { id: '1', name: 'C Major', position: 0 },
  { id: '2', name: 'G Major', position: 1 },
  { id: '3', name: 'A Minor', position: 2 },
  { id: '4', name: 'F Major', position: 3 },
];

export const ChordArranger: React.FC = () => {
  const { chords, onDragStart, onDrop } = useDragDropChords(initialChords);

  return (
    <div className="flex flex-col items-center space-y-4">
      {chords.map((chord, index) => (
        <div
          key={chord.id}
          draggable
          onDragStart={() => onDragStart(chord.id)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => onDrop(chord.id, index)}
          className="p-4 bg-blue-500 text-white rounded shadow cursor-pointer"
        >
          {chord.name}
        </div>
      ))}
    </div>
  );
};