import React, { ReactNode, useState } from 'react';
import Header from './Header';
import ThemeToggle from './ThemeToggle';
import ToolsMenu from './ToolsMenu';

interface LayoutShellProps {
  children: ReactNode;
}

const LayoutShell: React.FC<LayoutShellProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Header />
      
      <div className="flex flex-grow">
        {/* Collapsible sidebar */}
        <aside className={`bg-gray-800 border-r border-gray-700 transition-all duration-300 ${
          sidebarCollapsed ? 'w-14' : 'w-64'
        }`}>
          <div className="p-3 flex justify-between items-center border-b border-gray-700">
            <h3 className={`font-bold text-teal-400 ${sidebarCollapsed ? 'hidden' : 'block'}`}>
              Tools
            </h3>
            <button 
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 hover:bg-gray-700 rounded"
            >
              {sidebarCollapsed ? '→' : '←'}
            </button>
          </div>
          
          <div className="p-2">
            <ToolsMenu collapsed={sidebarCollapsed} />
          </div>
          
          <div className="mt-auto p-3 border-t border-gray-700">
            <ThemeToggle minimal={sidebarCollapsed} />
          </div>
        </aside>
        
        {/* Main content area */}
        <main className="flex-grow p-4 md:p-6 overflow-auto">
          <div className="container mx-auto">
            {children}
          </div>
        </main>
      </div>
      
      <footer className="bg-gray-800 border-t border-gray-700 p-4 text-sm text-gray-400">
        <div className="container mx-auto flex justify-between items-center">
          <div>4mist Lyric Studio</div>
          <div>Part of the 2nist-suite</div>
        </div>
      </footer>
    </div>
  );
};

export default LayoutShell;
