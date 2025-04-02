import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Sparkboard } from './components/sparkboard';
import WordBank from './components/wordbank';
import ConstructionZone from './components/constructionzone';
import RadialHexMenu from './components/radialhexmenu';
import Lyricsheet from './components/lyricsheet';
import LayoutShell from './components/LayoutShell';
import './styles.css';

const App: React.FC = () => {
  const [lyrics, setLyrics] = useState<string>('');
  const [suggestedWords, setSuggestedWords] = useState<string[]>([
    'melody', 'harmony', 'rhythm', 'crescendo', 'whisper', 'ecstasy',
    'shadow', 'light', 'dream', 'silence', 'storm', 'gentle'
  ]);
  const [promptResponses, setPromptResponses] = useState<{ [key: string]: string }>({});
  const [theme] = useState<"dark" | "light">("dark");

  const currentTheme = {
    background: "#2d2d2d",
    text: "#f4e7d4",
    accent: "#2fb7b3",
    border: "#e89f4f"
  };
  
  // Handle prompt responses from Sparkboard
  const handlePromptChange = (responses: Record<string, string>) => {
    setPromptResponses(responses);
    
    // Extract interesting words from responses to suggest
    const words = Object.values(responses)
      .join(' ')
      .split(/\s+/)
      .filter(word => word.length > 3)
      .slice(0, 10);
    
    // Only update if we have new words
    if (words.length > 0) {
      setSuggestedWords(words);
    }
  };
  
  // Generate new word suggestions when lyrics change
  const handleLyricsChange = (newLyrics: string) => {
    setLyrics(newLyrics);
    
    // This would typically call an API like Hugging Face
    // For now, just using some basic word association logic
    const words = newLyrics.split(/\s+/).filter(word => word.length > 3);
    if (words.length > 0) {
      const lastWord = words[words.length - 1].toLowerCase().replace(/[^a-z]/g, '');
      if (lastWord) {
        // Simple word associations (would be replaced by AI in production)
        const wordMap: Record<string, string[]> = {
          'dream': ['ethereal', 'vision', 'sleep', 'fantasy', 'surreal'],
          'heart': ['soul', 'love', 'beat', 'emotion', 'passion'],
          'light': ['shine', 'glow', 'bright', 'illuminate', 'radiance'],
          'dark': ['shadow', 'night', 'abyss', 'deep', 'mysterious'],
          // Add more associations as needed
        };
        
        if (wordMap[lastWord]) {
          setSuggestedWords(wordMap[lastWord]);
        }
      }
    }
  };
  
  // Insert selected word into lyrics
  const handleWordClick = (word: string) => {
    setLyrics(prev => prev + (prev.endsWith(' ') || prev === '' ? '' : ' ') + word + ' ');
  };

  return (
    <Router>
      <LayoutShell>
        <nav className="nav mb-6 flex flex-wrap gap-4">
          <Link to="/" className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-white transition-colors">
            🎶 Construction Zone
          </Link>
          <Link to="/lyrics" className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-white transition-colors">
            📝 Lyricsheet
          </Link>
          <Link to="/sparkboard" className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-white transition-colors">
            🧠 Sparkboard
          </Link>
          <Link to="/wordbank" className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-white transition-colors">
            💬 Word Bank
          </Link>
          <Link to="/menu" className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-white transition-colors">
            🧭 Radial Menu
          </Link>
        </nav>

        <Routes>
          <Route path="/" element={<ConstructionZone />} />
          <Route path="/lyrics" element={
            <Lyricsheet 
              initialLyrics={lyrics}
              onLyricsChange={handleLyricsChange}
              suggestedWords={suggestedWords}
            />
          } />
          <Route path="/sparkboard" element={
            <Sparkboard onPromptChange={handlePromptChange} />
          } />
          <Route path="/wordbank" element={
            <WordBank 
              words={suggestedWords} 
              theme={currentTheme}
              onWordClick={handleWordClick}
            />
          } />
          <Route path="/menu" element={<RadialHexMenu />} />
        </Routes>
      </LayoutShell>
    </Router>
  );
};

export default App;