import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ModifierPanel from '../components/ModifierPanel';
import {
  axialToPixel,
  getHexPoints,
  generateFullChordMap,
  directions,
  keyChords,
  modeChords
} from '../utils/chordUtils';

function HexChordGrid() {
  const [useRoman, setUseRoman] = useState(true);
  const [selectedKey, setSelectedKey] = useState('C');
  const [selectedMode, setSelectedMode] = useState('Ionian');
  const [progression, setProgression] = useState([]);
  const [selectedChord, setSelectedChord] = useState(null);
  const [showModifiers, setShowModifiers] = useState(true);
  const [chordModifiers, setChordModifiers] = useState({});

  const regenerateChords = () => {
    const map = generateFullChordMap(selectedMode, selectedKey, useRoman);
    return Object.entries(map).map(([key, label]) => {
      const [q, r] = key.split(',').map(Number);
      return {
        id: key,
        q,
        r,
        baseLabel: label,
        selected: false,
        visible: ['0,0','1,0','1,-1','0,-1','-1,0','-1,1','0,1'].includes(key)
      };
    });
  };

  const [chords, setChords] = useState(regenerateChords);

  const handleSelect = (selectedChordObj) => {
    const neighborIds = directions.map(dir => `${selectedChordObj.q + dir.q},${selectedChordObj.r + dir.r}`);
    setSelectedChord(selectedChordObj);
    const updatedChords = chords.map(c => {
      if (c.id === selectedChordObj.id) return { ...c, selected: true };
      if (neighborIds.includes(c.id)) return { ...c, visible: true };
      return c;
    });
    setChords(updatedChords);

    const modLabel = chordModifiers[selectedChordObj.id]?.join('') || '';
    setProgression(prev => [...prev, `${selectedChordObj.baseLabel}${modLabel}`]);
  };

  const applyModifier = (mod) => {
    if (!selectedChord) return;
    const id = selectedChord.id;
    setChordModifiers(prev => ({
      ...prev,
      [id]: [...(prev[id] || []), mod]
    }));
    setSelectedChord(null);
  };

  const undoLast = () => {
    const updatedProgression = progression.slice(0, -1);
    setProgression(updatedProgression);
    const updatedChords = chords.map(c => ({ ...c, selected: false }));
    setChords(updatedChords);
  };

  const updateView = () => setChords(regenerateChords());

  const renderHex = (chord, x, y) => {
    const mods = chordModifiers[chord.id] || [];
    const label = `${chord.baseLabel}${mods.join('')}`;

    return (
      chord.visible && (
        <g key={chord.id} transform={`translate(${x}, ${y})`}>
          <polygon
            points={getHexPoints()}
            fill={chord.selected ? '#82c91e' : '#f28c28'}
            stroke="#222"
            strokeWidth="3"
            onClick={() => handleSelect(chord)}
            style={{ cursor: 'pointer' }}
          />
          <text x="0" y="5" textAnchor="middle" fontSize="14" fill="#000">
            {label}
          </text>
        </g>
      )
    );
  };

  return (
    <Router>
      <nav className="flex gap-4 p-4 bg-gray-100">
        <Link to="/" className="text-blue-600 hover:underline">Hex Grid</Link>
        <Link to="/modifiers" className="text-blue-600 hover:underline">Modifier Panel</Link>
      </nav>

      <Routes>
        <Route path="/" element={
          <div className="relative w-full h-[850px] flex flex-col items-center justify-center bg-[#f0e9dd]">
            <div className="flex gap-4 mb-2">
              <select value={selectedKey} onChange={e => setSelectedKey(e.target.value)}>
                {Object.keys(keyChords).map(key => <option key={key} value={key}>{key}</option>)}
              </select>
              <select value={selectedMode} onChange={e => setSelectedMode(e.target.value)}>
                {Object.keys(modeChords).map(mode => <option key={mode} value={mode}>{mode}</option>)}
              </select>
              <button onClick={() => { setUseRoman(!useRoman); updateView(); }} className="px-4 py-2 bg-gray-800 text-white rounded shadow">
                Toggle: {useRoman ? 'Roman' : 'Letter'}
              </button>
              <button onClick={undoLast} className="px-4 py-2 bg-red-500 text-white rounded shadow">Undo</button>
              <button onClick={() => setShowModifiers(!showModifiers)} className="px-4 py-2 bg-blue-500 text-white rounded shadow">
                {showModifiers ? 'Hide Modifiers' : 'Show Modifiers'}
              </button>
            </div>

            <svg width="1000" height="1000">
              {chords.map(chord => {
                const { x, y } = axialToPixel(chord.q, chord.r);
                return renderHex(chord, x + 500, y + 500);
              })}
            </svg>

            <div className="absolute bottom-4 bg-white text-black px-4 py-2 rounded shadow max-w-[80%] text-sm">
              Progression: {progression.join(' - ')}
            </div>

            {selectedChord && showModifiers && (
              <ModifierPanel
                selectedChord={selectedChord}
                onModifierSelect={applyModifier}
                onClearModifiers={() =>
                  setChordModifiers(prev => ({ ...prev, [selectedChord.id]: [] }))
                }
              />
            )}
          </div>
        } />

        <Route path="/modifiers" element={
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Modifier Panel View</h2>
            {selectedChord ? (
              <ModifierPanel
                selectedChord={selectedChord}
                onModifierSelect={applyModifier}
                onClearModifiers={() =>
                  setChordModifiers(prev => ({ ...prev, [selectedChord.id]: [] }))
                }
              />
            ) : (
              <p>No chord selected.</p>
            )}
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default HexChordGrid;