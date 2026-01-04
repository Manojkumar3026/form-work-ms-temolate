import React from 'react';
import { LayoutDashboard, FileText, ShieldCheck, Bot, Settings, LogOut } from 'lucide-react';
import { View } from '../types';

interface SidebarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView }) => {
  const menuItems = [
    { id: View.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { id: View.QMS, label: 'QMS Documents', icon: ShieldCheck },
    { id: View.TECH_DOCS, label: 'Technical Files', icon: FileText },
    { id: View.ASSISTANT, label: 'Regulatory AI', icon: Bot },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col h-full border-r border-slate-800 flex-shrink-0">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <span className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center text-white font-bold text-lg">O</span>
          OpenReg
        </h1>
        <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Compliance OS</p>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setCurrentView(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon size={18} />
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
        
        <div className="mt-8 px-6">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Projects</h3>
            <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-slate-300 hover:text-white cursor-pointer">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span>VitalMonitor X1</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-300 hover:text-white cursor-pointer">
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <span>NeuroPatch v2</span>
                </div>
            </div>
        </div>
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button 
          onClick={() => setCurrentView(View.SETTINGS)}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium mb-1 transition-colors ${
            currentView === View.SETTINGS ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Settings size={18} />
          Settings
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;