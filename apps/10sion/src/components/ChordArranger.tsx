import React, { useState } from 'react';
import { useDragDropChords } from '@2nist/ui-hooks';
import { ModifierPanel } from '@2nist/ui/components/ModifierPanel';
import { ProgressionSelector } from '@2nist/ui/components/ProgressionSelector';

interface Modifier {
  id: string;
  name: string;
}

export const ChordArranger: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState('C');
  const [selectedChordId, setSelectedChordId] = useState<string | null>(null);
  const { chords, onDragStart, onDrop, setChords } = useDragDropChords([]);
  const [draggedId, setDraggedId] = useState<string | null>(null);

  const handleDragStart = (id: string) => {
    setDraggedId(id);
    onDragStart(id);
  };

  const handleDragEnd = () => {
    setDraggedId(null);
  };

  const handleProgressionSelect = (progression: string[]) => {
    const newChords = progression.map((chord, index) => ({
      id: `${Date.now()}-${index}`,
      name: chord,
      position: chords.length + index
    }));
    
    setChords([...chords, ...newChords]);
  };

  const resetChords = () => {
    setChords([]);
  };

  const handleKeyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedKey(event.target.value);
  };

  return (
    <div className="flex gap-6">
      <div className="w-80 p-6 bg-white rounded-lg shadow-lg">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Key</label>
          <select
            value={selectedKey}
            onChange={handleKeyChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          >
            {['C', 'D', 'E', 'F', 'G', 'A', 'B'].map(key => (
              <option key={key} value={key}>{key}</option>
            ))}
          </select>
        </div>

        <h2 className="text-xl font-bold mb-4 text-gray-800">Chord Progression</h2>
        <div className="flex flex-col items-center space-y-2 mb-6">
          {chords.map((chord, index) => (
            <div
              key={chord.id}
              draggable
              onDragStart={() => handleDragStart(chord.id)}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => onDrop(chord.id, index)}
              onClick={() => setSelectedChordId(chord.id)}
              className={`w-full p-3 ${
                draggedId === chord.id 
                  ? 'bg-blue-300' 
                  : selectedChordId === chord.id
                    ? 'bg-blue-400'
                    : 'bg-blue-500'
              } text-white rounded shadow-md cursor-move transition-colors duration-150 hover:bg-blue-600 flex justify-between items-center`}
            >
              <span>{chord.name}</span>
              <span className="text-xs bg-blue-700 px-2 py-1 rounded-full">{index + 1}</span>
            </div>
          ))}
        </div>
        <button 
          onClick={resetChords}
          className="w-full py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded transition-colors duration-150"
        >
          Clear All
        </button>
      </div>

      <ProgressionSelector
        onProgressionSelect={handleProgressionSelect}
        selectedKey={selectedKey}
      />

      {selectedChordId && (
        <ModifierPanel
          selectedChord={chords.find(c => c.id === selectedChordId)}
          onModifierSelect={(modifier: Modifier) => {
            setChords(chords.map(c => 
              c.id === selectedChordId
                ? { ...c, name: `${c.name}${modifier}` }
                : c
            ));
          }}
        />
      )}
    </div>
  );
};