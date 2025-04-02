import React, { useState } from 'react';

interface SparkboardProps {
  prompts: string[];
  onPromptChange: (responses: Record<string, string>) => void;
}

export const Sparkboard: React.FC<SparkboardProps> = ({ prompts, onPromptChange }) => {
  const [responses, setResponses] = useState<Record<string, string>>({});

  const handleChange = (prompt: string, value: string) => {
    const updated = { ...responses, [prompt]: value };
    setResponses(updated);
    onPromptChange(updated);
  };

  return (
    <section className="p-4 bg-[#2d2d2d] text-[#f4e7d4] rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">🧠 Sparkboard</h2>
      {prompts.map((prompt, i) => (
        <div key={i} className="mb-4">
          <label className="block text-sm mb-1">{prompt}</label>
          <input
            className="w-full p-2 rounded bg-[#333] text-white"
            placeholder={`Enter your response for "${prompt}"`}
            value={responses[prompt] || ''}
            onChange={(e) => handleChange(prompt, e.target.value)}
          />
        </div>
      ))}
    </section>
  );
};