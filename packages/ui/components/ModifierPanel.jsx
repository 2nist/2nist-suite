import React from 'react';

export const ModifierPanel = ({ selectedChord, onModifierSelect }) => {
  const modifierCategories = {
    extensions: ['7', 'maj7', '9', 'maj9', '11', '13'],
    suspensions: ['sus2', 'sus4'],
    alterations: ['♭5', '♯5', '♭9', '♯9'],
    additions: ['add9', 'add11', 'add13'],
    bass: ['/3', '/5', '/7', '/9']
  };

  return (
    <div className="absolute right-4 top-24 bg-white shadow-md rounded p-4 w-72">
      <h3 className="font-bold mb-2">Modify: {selectedChord?.name}</h3>
      {Object.entries(modifierCategories).map(([category, mods]) => (
        <div key={category} className="mb-3">
          <h4 className="text-xs font-semibold text-gray-600 mb-1">{category}</h4>
          <div className="flex flex-wrap gap-1">
            {mods.map(mod => (
              <button
                key={mod}
                onClick={() => onModifierSelect(mod)}
                className="bg-gray-100 hover:bg-gray-200 text-sm px-2 py-1 rounded"
              >
                {mod}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
