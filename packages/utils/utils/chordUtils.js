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

export const chordNumeralMap = {
  'I': 0, 'II': 1, 'III': 2, 'IV': 3, 'V': 4, 'VI': 5, 'VII': 6,
  'i': 0, 'ii': 1, 'iii': 2, 'iv': 3, 'v': 4, 'vi': 5, 'vii': 6
};

// Diatonic chords per major key
export const keyChords = {
  'C': ['C', 'Dm', 'Em', 'F', 'G', 'Am', 'Bdim'],
  'D': ['D', 'Em', 'F#m', 'G', 'A', 'Bm', 'C#dim'],
  'E': ['E', 'F#m', 'G#m', 'A', 'B', 'C#m', 'D#dim'],
  'F': ['F', 'Gm', 'Am', 'Bb', 'C', 'Dm', 'Edim'],
  'G': ['G', 'Am', 'Bm', 'C', 'D', 'Em', 'F#dim'],
  'A': ['A', 'Bm', 'C#m', 'D', 'E', 'F#m', 'G#dim'],
  'B': ['B', 'C#m', 'D#m', 'E', 'F#', 'G#m', 'A#dim']
};

export function getProgression(genre, variant) {
  return commonProgressions[genre]?.[variant] || commonProgressions[genre]?.basic || [];
}

export function getCadence(type, variant) {
  return cadenceTypes[type]?.[variant] || cadenceTypes[type]?.basic || [];
}

export function getTransitionProgression(fromSection, toSection, variant) {
  return transitionProgressions[fromSection]?.[toSection]?.[variant] || 
         transitionProgressions[fromSection]?.[toSection]?.basic || [];
}

export function transposeProgression(progression, key) {
  if (!progression || !key || !keyChords[key]) return [];
  
  return progression.map(romanNumeral => {
    const baseNumeral = romanNumeral.replace(/[7Maj\u00F8\u00BA]/g, '');
    const extensions = romanNumeral.slice(baseNumeral.length);
    const index = chordNumeralMap[baseNumeral];
    return index !== undefined ? keyChords[key][index] + extensions : romanNumeral;
  });
}

// Common chord progressions by genre/style
export const commonProgressions = {
  pop: {
    basic: ['I', 'V', 'vi', 'IV'],
    dramatic: ['vi', 'IV', 'I', 'V'],
    variant1: ['I', 'IV', 'vi', 'V'],
    variant2: ['vi', 'IV', 'I', 'V']
  },
  jazz: {
    basic: ['ii7', 'V7', 'IMaj7'],
    dramatic: ['iiø7', 'V7b9', 'i'],
    variant1: ['ii7', 'V7', 'iii7', 'VI7'],
    variant2: ['IMaj7', 'vi7', 'ii7', 'V7']
  },
  classical: {
    basic: ['I', 'IV', 'V', 'I'],
    dramatic: ['I', 'vi', 'IV', 'V7'],
    variant1: ['I', 'IV', 'viiº', 'iii'],
    variant2: ['vi', 'ii', 'V7', 'I']
  }
};

export const cadenceTypes = {
  perfect: {
    basic: ['V', 'I'],
    dramatic: ['V7', 'I']
  },
  imperfect: {
    basic: ['V6', 'I'],
    dramatic: ['V6/5', 'I']
  },
  deceptive: {
    basic: ['V', 'vi'],
    dramatic: ['V7', 'VI']
  },
  half: {
    basic: ['I', 'V'],
    dramatic: ['I', 'V7']
  }
};

export const transitionProgressions = {
  verse: {
    chorus: {
      basic: ['ii', 'V', 'I'],
      dramatic: ['IV', 'V/V', 'V']
    },
    bridge: {
      basic: ['IV', 'V', 'vi'],
      dramatic: ['bVI', 'bVII', 'I']
    }
  },
  chorus: {
    verse: {
      basic: ['V', 'vi', 'IV'],
      dramatic: ['V7', 'bVII', 'IV']
    },
    bridge: {
      basic: ['I', 'V/vi', 'vi'],
      dramatic: ['I', 'bVI', 'bVII']
    }
  },
  bridge: {
    verse: {
      basic: ['V7', 'IV', 'I'],
      dramatic: ['bVII', 'V7', 'I']
    },
    chorus: {
      basic: ['ii7', 'V7', 'I'],
      dramatic: ['V/V', 'V7', 'I']
    }
  }
};