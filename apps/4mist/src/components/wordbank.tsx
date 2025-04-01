import React from 'react';
import '../styles.css';

interface WordBankProps {
  words: string[];
  theme: {
    background: string;
    text: string;
    accent: string;
  };
  onWordClick?: (word: string) => void;
}

const WordBank: React.FC<WordBankProps> = ({ words, theme, onWordClick }) => {
  return (
    <section className="wordbank" style={{ backgroundColor: theme.background, color: theme.text }}>
      <h2>💬 Word Bank</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {words.map((word, i) => (
          <span
            key={i}
            style={{
              background: theme.accent,
              color: 'black',
              padding: '4px 6px',
              borderRadius: 6,
              boxShadow: '0 1px 2px rgba(0,0,0,0.3)',
              fontWeight: 500,
              fontSize: '0.95rem',
              cursor: 'pointer'
            }}
            onClick={() => onWordClick && onWordClick(word)}
          >
            {word}
          </span>
        ))}
      </div>
    </section>
  );
};

export default WordBank;