import React, { useState } from 'react';
import { Home, Calendar, BarChart2, Settings } from 'lucide-react';
import { WorkoutProvider, useWorkout } from './context/WorkoutContext';
import { ViewState } from './types';

import HomeView from './views/HomeView';
import HistoryView from './views/HistoryView';
import ProgressView from './views/ProgressView';
import SettingsView from './views/SettingsView';
import ActiveWorkout from './views/ActiveWorkout';

const AppContent: React.FC = () => {
  const { activeWorkout } = useWorkout();
  const [currentView, setCurrentView] = useState<ViewState>('home');

  if (activeWorkout) {
    return <ActiveWorkout />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'home': return <HomeView onViewChange={setCurrentView} />;
      case 'history': return <HistoryView />;
      case 'progress': return <ProgressView />;
      case 'settings': return <SettingsView />;
      default: return <HomeView onViewChange={setCurrentView} />;
    }
  };

  return (
    <div className="h-screen flex flex-col text-zinc-200 overflow-hidden relative z-10 selection:bg-zinc-700 selection:text-white">
      
      {/* Main View Area */}
      <main className="flex-1 overflow-y-auto no-scrollbar relative z-10">
        <div className="max-w-md mx-auto h-full">
             {renderView()}
        </div>
      </main>

      {/* Floating Navigation */}
      <div className="absolute bottom-6 left-0 right-0 z-20 px-6 pointer-events-none">
        <nav className="max-w-xs mx-auto bg-[#101010]/90 backdrop-blur-xl border border-white/5 rounded-2xl shadow-2xl pointer-events-auto">
            <div className="flex items-center justify-between px-6 py-4">
            <NavButton 
                active={currentView === 'home'} 
                onClick={() => setCurrentView('home')} 
                icon={Home} 
            />
            <NavButton 
                active={currentView === 'history'} 
                onClick={() => setCurrentView('history')} 
                icon={Calendar} 
            />
            <NavButton 
                active={currentView === 'progress'} 
                onClick={() => setCurrentView('progress')} 
                icon={BarChart2} 
            />
            <NavButton 
                active={currentView === 'settings'} 
                onClick={() => setCurrentView('settings')} 
                icon={Settings} 
            />
            </div>
        </nav>
      </div>
    </div>
  );
};

const NavButton: React.FC<{ active: boolean, onClick: () => void, icon: any }> = ({ active, onClick, icon: Icon }) => (
  <button 
    onClick={onClick}
    className="group relative flex items-center justify-center w-10 h-10"
  >
    {active && (
        <div className="absolute inset-0 bg-white/5 rounded-full blur-sm"></div>
    )}
    <Icon 
        className={`w-5 h-5 transition-all duration-300 ${active ? 'text-white' : 'text-zinc-600 group-hover:text-zinc-400'}`} 
        strokeWidth={active ? 2 : 1.5}
    />
  </button>
)

const App: React.FC = () => {
  return (
    <WorkoutProvider>
      <AppContent />
    </WorkoutProvider>
  );
};

export default App;