import React, { useState } from 'react';
import { getProgression, getCadence, getTransitionProgression, transposeProgression } from '@2nist/utils/utils/chordUtils';

export const ProgressionSelector = ({ onProgressionSelect, selectedKey = 'C' }) => {
  const [category, setCategory] = useState('progression'); // progression, cadence, or transition
  const [genre, setGenre] = useState('pop');
  const [variant, setVariant] = useState('basic');
  const [fromSection, setFromSection] = useState('verse');
  const [toSection, setToSection] = useState('chorus');
  const [cadenceType, setCadenceType] = useState('perfect');

  const handleSelection = () => {
    let progression = [];
    
    switch(category) {
      case 'progression':
        progression = getProgression(genre, variant);
        break;
      case 'cadence':
        progression = getCadence(cadenceType, variant);
        break;
      case 'transition':
        progression = getTransitionProgression(fromSection, toSection, variant);
        break;
    }

    if (progression) {
      const transposed = transposeProgression(progression, selectedKey);
      onProgressionSelect(transposed);
    }
  };

  return (
    <div className="w-80 p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Progression Builder</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          >
            <option value="progression">Common Progression</option>
            <option value="cadence">Cadence</option>
            <option value="transition">Section Transition</option>
          </select>
        </div>

        {category === 'progression' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Genre</label>
            <select 
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            >
              <option value="pop">Pop</option>
              <option value="jazz">Jazz</option>
              <option value="classical">Classical</option>
            </select>
          </div>
        )}

        {category === 'cadence' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Cadence Type</label>
            <select 
              value={cadenceType}
              onChange={(e) => setCadenceType(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            >
              <option value="perfect">Perfect</option>
              <option value="imperfect">Imperfect</option>
              <option value="deceptive">Deceptive</option>
              <option value="half">Half</option>
            </select>
          </div>
        )}

        {category === 'transition' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">From</label>
              <select 
                value={fromSection}
                onChange={(e) => setFromSection(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              >
                <option value="verse">Verse</option>
                <option value="chorus">Chorus</option>
                <option value="bridge">Bridge</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">To</label>
              <select 
                value={toSection}
                onChange={(e) => setToSection(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              >
                <option value="chorus">Chorus</option>
                <option value="bridge">Bridge</option>
                <option value="verse">Verse</option>
              </select>
            </div>
          </>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">Style</label>
          <select 
            value={variant}
            onChange={(e) => setVariant(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          >
            <option value="basic">Basic</option>
            <option value="dramatic">Dramatic</option>
            {category === 'progression' && (
              <>
                <option value="variant1">Variant 1</option>
                <option value="variant2">Variant 2</option>
              </>
            )}
          </select>
        </div>

        <button
          onClick={handleSelection}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Add Progression
        </button>
      </div>
    </div>
  );
};