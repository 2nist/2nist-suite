// chordUtils functions will go here
// src/utils/chordUtils.js

// Converts axial coordinates (q, r) to pixel positions for layout
export function axialToPixel(q, r, size = 60) {
  const x = size * (Math.sqrt(3) * q + Math.sqrt(3) / 2 * r);
  const y = size * (3 / 2 * r);
  return { x, y };
}

// Returns the points of a hexagon for SVG rendering
export function getHexPoints(size = 60) {
  return [...Array(6)].map((_, i) => {
    const angle = Math.PI / 3 * i;
    const x = size * Math.cos(angle);
    const y = size * Math.sin(angle);
    return `${x},${y}`;
  }).join(' ');
}

// Axial directions used for neighbor detection
export const directions = [
  { q: 1, r: 0 },
  { q: 1, r: -1 },
  { q: 0, r: -1 },
  { q: -1, r: 0 },
  { q: -1, r: 1 },
  { q: 0, r: 1 }
];

// Diatonic chords per major key
export const keyChords = {
  C: ['C', 'Dm', 'Em', 'F', 'G', 'Am', 'Bdim'],
  D: ['D', 'Em', 'F#m', 'G', 'A', 'Bm', 'C#dim'],
  E: ['E', 'F#m', 'G#m', 'A', 'B', 'C#m', 'D#dim'],
  F: ['F', 'Gm', 'Am', 'Bb', 'C', 'Dm', 'Edim'],
  G: ['G', 'Am', 'Bm', 'C', 'D', 'Em', 'F#dim'],
  A: ['A', 'Bm', 'C#m', 'D', 'E', 'F#m', 'G#dim'],
  B: ['B', 'C#m', 'D#m', 'E', 'F#', 'G#m', 'A#dim']
};

// Modes mapped to chord scale degrees
export const modeChords = {
  Ionian: [0, 1, 2, 3, 4, 5, 6],
  Dorian: [1, 2, 3, 4, 5, 6, 0],
  Phrygian: [2, 3, 4, 5, 6, 0, 1],
  Lydian: [3, 4, 5, 6, 0, 1, 2],
  Mixolydian: [4, 5, 6, 0, 1, 2, 3],
  Aeolian: [5, 6, 0, 1, 2, 3, 4],
  Locrian: [6, 0, 1, 2, 3, 4, 5]
};

// Generates a chord label map with fixed hex layout
export function generateFullChordMap(mode = 'Ionian', key = 'C', useRoman = true) {
  const chords = keyChords[key];
  const order = modeChords[mode];

  const roman = ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'];
  const map = {};

  let positions = [
    [0, 0],
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, 0],
    [-1, 1],
    [0, 1]
  ];

  for (let i = 0; i < 7; i++) {
    const [q, r] = positions[i];
    const label = useRoman ? roman[order[i]] : chords[order[i]];
    map[`${q},${r}`] = label;
  }

  return map;
}