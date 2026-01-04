import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import DocumentList from './components/DocumentList';
import RegulatoryAssistant from './components/RegulatoryAssistant';
import { View } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);

  const renderContent = () => {
    switch (currentView) {
      case View.DASHBOARD:
        return <Dashboard />;
      case View.QMS:
        return <DocumentList type="QMS" />;
      case View.TECH_DOCS:
        return <DocumentList type="TECH_DOCS" />;
      case View.ASSISTANT:
        return <RegulatoryAssistant />;
      case View.SETTINGS:
        return (
            <div className="p-8 max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Settings</h2>
                <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm text-center py-20">
                    <div className="text-4xl mb-4">⚙️</div>
                    <h3 className="text-lg font-medium text-slate-900">Settings Placeholder</h3>
                    <p className="text-slate-500 mt-2">Configuration options for organization, users, and billing would go here.</p>
                </div>
            </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 font-sans text-slate-900">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      <main className="flex-1 h-full overflow-hidden relative">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;