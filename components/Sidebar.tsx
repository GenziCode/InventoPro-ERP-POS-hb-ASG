
import React from 'react';
import { ModuleType } from '../types';
import Icon from './common/Icon';

interface SidebarProps {
  activeModule: ModuleType;
  setActiveModule: (module: ModuleType) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const modules: { name: ModuleType; icon: string }[] = [
  { name: 'Dashboard', icon: 'dashboard' },
  { name: 'Inventory', icon: 'inventory' },
  { name: 'POS', icon: 'pos' },
  { name: 'Customers', icon: 'customers' },
  { name: 'Admin Panel', icon: 'admin' },
];

const Sidebar: React.FC<SidebarProps> = ({ activeModule, setActiveModule, isOpen, setIsOpen }) => {
  const baseItemClass = 'flex items-center p-3 my-1 rounded-lg cursor-pointer transition-all duration-200';
  const activeItemClass = 'bg-blue-600 text-white shadow-md';
  const inactiveItemClass = 'text-slate-600 hover:bg-blue-100 hover:text-blue-700';
  const iconBaseClass = 'w-6 h-6 transition-all duration-200';
  const iconActiveClass = 'text-white';
  const iconInactiveClass = 'text-slate-500';

  return (
    <>
      <div className={`bg-white shadow-lg transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-20'} relative hidden md:flex flex-col`}>
        <div className={`flex items-center ${isOpen ? 'justify-between' : 'justify-center'} p-4 h-16 border-b`}>
          <h1 className={`text-2xl font-bold text-blue-700 transition-opacity duration-200 ${!isOpen && 'opacity-0 scale-0'}`}>InventoPro</h1>
        </div>
        <nav className="flex-1 px-4 py-4">
          <ul>
            {modules.map((module) => (
              <li key={module.name}>
                <div
                  className={`${baseItemClass} ${activeModule === module.name ? activeItemClass : inactiveItemClass}`}
                  onClick={() => setActiveModule(module.name)}
                  title={module.name}
                >
                  <Icon name={module.icon} className={`${iconBaseClass} ${activeModule === module.name ? iconActiveClass : iconInactiveClass}`} />
                  <span className={`ml-4 font-medium transition-all duration-200 whitespace-nowrap ${!isOpen && 'opacity-0 -translate-x-3'}`}>
                    {module.name}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t">
          <div className="flex items-center">
            <img src="https://i.pravatar.cc/40" alt="User" className="w-10 h-10 rounded-full" />
            <div className={`ml-3 transition-all duration-200 ${!isOpen && 'opacity-0 scale-0'}`}>
              <p className="font-semibold text-sm">Admin User</p>
              <p className="text-xs text-slate-500">Administrator</p>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden ${isOpen ? 'block' : 'hidden'}`} onClick={() => setIsOpen(false)}></div>
      <div className={`fixed top-0 left-0 h-full bg-white shadow-lg z-40 transition-transform duration-300 ease-in-out md:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'} w-64`}>
        {/* Mobile content is same as desktop, but handled with fixed positioning */}
        <div className="flex items-center justify-between p-4 h-16 border-b">
           <h1 className="text-2xl font-bold text-blue-700">InventoPro</h1>
            <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-slate-800">
                <Icon name="close" />
            </button>
        </div>
         <nav className="flex-1 px-4 py-4">
          <ul>
            {modules.map((module) => (
              <li key={module.name}>
                <div
                  className={`${baseItemClass} ${activeModule === module.name ? activeItemClass : inactiveItemClass}`}
                  onClick={() => { setActiveModule(module.name); setIsOpen(false); }}
                  title={module.name}
                >
                  <Icon name={module.icon} className={`${iconBaseClass} ${activeModule === module.name ? iconActiveClass : iconInactiveClass}`} />
                  <span className="ml-4 font-medium whitespace-nowrap">
                    {module.name}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </nav>
      </div>

    </>
  );
};

export default Sidebar;
