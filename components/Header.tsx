
import React, { useState, useEffect } from 'react';
import Icon from './common/Icon';

interface HeaderProps {
  sidebarToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ sidebarToggle }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <header className="flex-shrink-0 bg-white shadow-md h-16 flex items-center justify-between px-4 sm:px-6">
      <div className="flex items-center">
        <button onClick={sidebarToggle} className="text-slate-600 hover:text-blue-600">
          <Icon name="menu" className="w-6 h-6" />
        </button>
      </div>
      <div className="flex items-center space-x-4">
        <div className="hidden md:flex items-center space-x-2 text-slate-600">
           <Icon name="sun" className="w-5 h-5 text-yellow-500" />
           <span className="text-sm font-medium">24°C</span>
        </div>
        <div className="hidden md:block h-6 border-l border-slate-300"></div>
        <div className="hidden sm:flex items-center text-sm font-medium text-slate-600">
          <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
        <div className="hidden md:block h-6 border-l border-slate-300"></div>
        <button onClick={toggleFullScreen} className="text-slate-600 hover:text-blue-600" title="Toggle Fullscreen">
          <Icon name="fullscreen" className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

export default Header;
