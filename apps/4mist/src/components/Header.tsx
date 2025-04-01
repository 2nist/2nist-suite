import React from 'react';
import TitleInput from './TitleInput';
import ToolsMenu from './ToolsMenu';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-800 text-white shadow-md">
      <TitleInput />
      <div className="flex items-center gap-4">
        <ToolsMenu />
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;