import React, { useState, useEffect } from 'react';

interface ThemeToggleProps {
  minimal?: boolean;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ minimal = false }) => {
  const [isDark, setIsDark] = useState(true);

  // Load theme preference from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    } else {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Handle theme toggle
  const toggleTheme = () => {
    setIsDark(prev => {
      const newTheme = !prev;
      localStorage.setItem('theme', newTheme ? 'dark' : 'light');
      
      if (newTheme) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      return newTheme;
    });
  };

  if (minimal) {
    return (
      <button
        onClick={toggleTheme}
        className="p-2 rounded-full hover:bg-gray-700"
        title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      >
        {isDark ? '☀️' : '🌙'}
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-400">Theme</span>
      <button
        onClick={toggleTheme}
        className="w-12 h-6 rounded-full bg-gray-700 flex items-center px-0.5 cursor-pointer relative"
      >
        <div
          className={`w-5 h-5 rounded-full transition-all duration-300 ${
            isDark ? 'bg-teal-400 ml-6' : 'bg-gray-400 ml-0'
          }`}
        />
        <span className="sr-only">{isDark ? 'Dark theme' : 'Light theme'}</span>
      </button>
      <span className="text-sm">{isDark ? '🌙' : '☀️'}</span>
    </div>
  );
};

export default ThemeToggle;