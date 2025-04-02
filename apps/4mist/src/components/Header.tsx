import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import TitleInput from './TitleInput';

const Header: React.FC = () => {
  const location = useLocation();

  // Navigation items
  const navItems = [
    { path: '/', label: '🎶 Construction', title: 'Construction Zone' },
    { path: '/lyrics', label: '📝 Lyrics', title: 'Lyric Sheet' },
    { path: '/sparkboard', label: '🧠 Spark', title: 'Sparkboard' },
    { path: '/wordbank', label: '💬 Words', title: 'Word Bank' },
    { path: '/menu', label: '🧭 Menu', title: 'Radial Menu' }
  ];

  // Get the current page title based on route
  const getCurrentPageTitle = () => {
    const currentItem = navItems.find(item => item.path === location.pathname);
    return currentItem ? currentItem.title : '4mist';
  };

  return (
    <header className="bg-gray-800 border-b border-gray-700">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between p-4">
        <div className="flex items-center mb-4 sm:mb-0">
          <div className="flex items-center">
            <span className="text-teal-400 font-bold text-xl mr-2">4mist</span>
            <span className="text-gray-400 text-sm">Lyric Studio</span>
          </div>
          <div className="mx-6 h-6 w-px bg-gray-700 hidden sm:block"></div>
          <TitleInput />
        </div>
        
        <div className="flex justify-center">
          <nav className="flex space-x-1">
            {navItems.map(item => (
              <Link 
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  location.pathname === item.path 
                    ? 'bg-teal-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
                title={item.title}
              >
                <span className="sm:hidden">{item.label.split(' ')[0]}</span>
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;