import { useState } from 'react';

interface DragDropChord {
  id: string;
  name: string;
  position: number;
}

interface UseDragDropChordsReturn {
  chords: DragDropChord[];
  onDragStart: (id: string) => void;
  onDrop: (id: string, newPosition: number) => void;
}

export function useDragDropChords(initialChords: DragDropChord[]): UseDragDropChordsReturn {
  const [chords, setChords] = useState(initialChords);

  const onDragStart = (id: string) => {
    console.log(`Dragging chord with id: ${id}`);
  };

  const onDrop = (id: string, newPosition: number) => {
    setChords((prevChords) => {
      const updatedChords = [...prevChords];
      const draggedChordIndex = updatedChords.findIndex((chord) => chord.id === id);
      const [draggedChord] = updatedChords.splice(draggedChordIndex, 1);
      updatedChords.splice(newPosition, 0, draggedChord);
      return updatedChords;
    });
  };

  return { chords, onDragStart, onDrop };
}