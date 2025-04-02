import React, { useState } from 'react';

const TitleInput: React.FC = () => {
  const [title, setTitle] = useState<string>('Untitled Song');
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleBlur = () => {
    setIsEditing(false);
    if (!title.trim()) setTitle('Untitled Song');
  };

  return (
    <div className="flex items-center">
      <div className="text-teal-400 text-xl mr-2">🎵</div>
      {isEditing ? (
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={(e) => e.key === 'Enter' && handleBlur()}
          autoFocus
          className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-white text-lg font-semibold focus:outline-none focus:border-teal-500"
        />
      ) : (
        <h1 
          className="text-lg font-semibold cursor-pointer hover:text-teal-400"
          onClick={() => setIsEditing(true)}
        >
          {title}
        </h1>
      )}
    </div>
  );
};

export default TitleInput;