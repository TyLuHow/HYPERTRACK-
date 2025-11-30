import React, { useState } from 'react';
import { Home, History, Activity, Settings } from 'lucide-react';
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
    <div className="h-screen flex flex-col overflow-hidden relative selection:bg-white selection:text-black">
      
      {/* Main View Area */}
      <main className="flex-1 overflow-y-auto no-scrollbar relative z-10">
        <div className="max-w-md mx-auto h-full">
             {renderView()}
        </div>
      </main>

      {/* Floating Control Capsule */}
      <div className="absolute bottom-8 left-0 right-0 z-50 flex justify-center pointer-events-none">
        <nav className="bg-black border border-white/10 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.5)] px-6 py-3 pointer-events-auto backdrop-blur-md flex items-center gap-8">
            <NavButton 
                active={currentView === 'home'} 
                onClick={() => setCurrentView('home')} 
                icon={Home} 
            />
            <NavButton 
                active={currentView === 'history'} 
                onClick={() => setCurrentView('history')} 
                icon={History} 
            />
            <NavButton 
                active={currentView === 'progress'} 
                onClick={() => setCurrentView('progress')} 
                icon={Activity} 
            />
            <NavButton 
                active={currentView === 'settings'} 
                onClick={() => setCurrentView('settings')} 
                icon={Settings} 
            />
        </nav>
      </div>
    </div>
  );
};

const NavButton: React.FC<{ active: boolean, onClick: () => void, icon: any }> = ({ active, onClick, icon: Icon }) => (
  <button 
    onClick={onClick}
    className="relative flex items-center justify-center group"
  >
    {active && (
        <span className="absolute -bottom-2 w-1 h-1 bg-white rounded-full"></span>
    )}
    <Icon 
        className={`w-5 h-5 transition-all duration-300 ${active ? 'text-white' : 'text-zinc-600 group-hover:text-zinc-400'}`} 
        strokeWidth={1.5}
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