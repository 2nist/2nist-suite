import React from 'react';

const Lyricsheet: React.FC = () => {
  return (
    <div className="p-4 min-h-[600px]">
      <h2 className="text-xl font-bold mb-4">🎶 Lyrics</h2>
      <textarea
        className="w-full h-[400px] p-3 bg-white border border-neutral-300 rounded resize-none text-black"
        placeholder="✍️ your lyrics will live here..."
      />
    </div>
  );
};

export default Lyricsheet;
