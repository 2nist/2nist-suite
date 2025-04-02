import React from 'react';
import { Link } from 'react-router-dom';

interface ToolsMenuProps {
  collapsed?: boolean;
}

const ToolsMenu: React.FC<ToolsMenuProps> = ({ collapsed = false }) => {
  // Tool categories and items
  const toolCategories = [
    {
      name: 'Creative Tools',
      icon: '✨',
      items: [
        { icon: '🎭', name: 'Mood Board', path: '/pinboard' },
        { icon: '🧠', name: 'AI Prompts', path: '/sparkboard' },
        { icon: '🌀', name: 'Rhyme Map', path: '/rhymemap' },
      ]
    },
    {
      name: 'Writing Tools',
      icon: '✒️',
      items: [
        { icon: '📝', name: 'Lyric Editor', path: '/lyrics' },
        { icon: '💬', name: 'Word Bank', path: '/wordbank' },
        { icon: '📚', name: 'Thesaurus', path: '/thesaurus' },
      ]
    },
    {
      name: 'Composition',
      icon: '🎵',
      items: [
        { icon: '🎶', name: 'Construction', path: '/' },
        { icon: '🎸', name: 'Chord Finder', path: '/chords' },
        { icon: '🥁', name: 'Beat Maker', path: '/beats' },
      ]
    }
  ];

  return (
    <div className="text-sm">
      {toolCategories.map((category, idx) => (
        <div key={idx} className="mb-4">
          <h4 className={`mb-2 flex items-center text-gray-400 ${collapsed ? 'justify-center' : 'px-2'}`}>
            <span>{category.icon}</span>
            {!collapsed && <span className="ml-2">{category.name}</span>}
          </h4>
          
          <div className="space-y-1">
            {category.items.map((item, itemIdx) => (
              <Link
                key={itemIdx}
                to={item.path}
                className={`flex items-center rounded-md hover:bg-gray-700 transition-colors py-1 ${
                  collapsed ? 'justify-center px-2' : 'px-3'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {!collapsed && <span className="ml-2 truncate">{item.name}</span>}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToolsMenu;