import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RadialHexMenu from './components/radialhexmenu';
import './styles.css';
import WordBank from './components/wordbank'; // Corrected casing to match file name
import { Sparkboard } from './components/sparkboard'; // Corrected to named import
import ConstructionZone from './components/constructionzone'; // Corrected casing

// Removed duplicate App component definition

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <nav className="nav">
          <Link to="/">🎶 Construction Zone</Link>
          <Link to="/sparkboard">🧠 Sparkboard</Link>
          <Link to="/wordbank">💬 Word Bank</Link>
          <Link to="/menu">🧭 Radial Menu</Link>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<ConstructionZone />} />
            <Route path="/sparkboard" element={
              <Sparkboard 
                prompts={[
                  "what shape is your fear?",
                  "how does silence sound?",
                  "where do lost things live?",
                  "what is the color of regret?",
                  "when does stillness move?"
                ]} 
                onPromptChange={(responses) => console.log(responses)} 
              />
            } />
            <Route path="/wordbank" element={<WordBank words={[]} theme={{
              background: "#2d2d2d",
              text: "#f4e7d4",
              accent: "#2fb7b3",
            }} />} />
            <Route path="/menu" element={<RadialHexMenu />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;