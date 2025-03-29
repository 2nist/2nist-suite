import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ChordArranger } from './ChordArranger';

// Mock the useDragDropChords hook since we're not testing its implementation
vi.mock('@2nist/ui-hooks', () => ({
  useDragDropChords: () => ({
    chords: [
      { id: '1', name: 'C Major', position: 0 },
      { id: '2', name: 'G Major', position: 1 },
    ],
    onDragStart: vi.fn(),
    onDrop: vi.fn(),
  }),
}));

describe('ChordArranger', () => {
  it('renders chords correctly', () => {
    render(<ChordArranger />);
    
    expect(screen.getByText('C Major')).toBeInTheDocument();
    expect(screen.getByText('G Major')).toBeInTheDocument();
  });
});