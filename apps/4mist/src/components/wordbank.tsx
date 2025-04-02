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
    <section className="wordbank p-4 bg-gray-800 rounded-lg border-2 border-emerald-500">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">💬 Word Bank</h2>
        <div className="flex gap-2">
          <select className="bg-gray-700 text-white border border-gray-600 rounded px-2 py-1 text-sm">
            <option value="all">All Words</option>
            <option value="rhyme">Rhymes</option>
            <option value="similar">Similar</option>
            <option value="theme">Thematic</option>
          </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 min-h-[200px]">
        {words.length > 0 ? (
          words.map((word, i) => (
            <span
              key={i}
              style={{
                background: theme.accent,
                color: 'black',
                padding: '4px 8px',
                borderRadius: '6px',
                boxShadow: '0 1px 2px rgba(0,0,0,0.3)',
                fontWeight: 500,
                fontSize: '0.95rem',
                cursor: 'pointer'
              }}
              onClick={() => onWordClick && onWordClick(word)}
              className="hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              {word}
            </span>
          ))
        ) : (
          <div className="text-gray-400 text-center w-full py-8">
            No words available. Type some lyrics to get suggestions.
          </div>
        )}
      </div>
      
      <div className="mt-4 flex justify-between">
        <button 
          className="px-3 py-1 text-sm bg-emerald-600 hover:bg-emerald-700 text-white rounded"
          onClick={() => {/* Future feature: generate more words */}}
        >
          Generate More
        </button>
        <span className="text-xs text-gray-400">Click any word to add it to your lyrics</span>
      </div>
    </section>
  );
};

export default WordBank;