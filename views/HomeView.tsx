import React from 'react';
import { useWorkout } from '../context/WorkoutContext';
import { Play } from 'lucide-react';
import { WorkoutSession } from '../types';

const HomeView: React.FC<{ onViewChange: (v: any) => void }> = ({ onViewChange }) => {
  const { startWorkout, history } = useWorkout();
  
  // Contextual Greeting Logic
  const hour = new Date().getHours();
  const timeContext = hour < 12 ? 'Morning' : hour < 18 ? 'Afternoon' : 'Evening';
  const subContext = hour < 12 ? 'Awakening' : hour < 18 ? 'Focus' : 'Recovery';

  return (
    <div className="flex flex-col h-full relative overflow-hidden">
      
      {/* Top Left Context */}
      <div className="absolute top-8 left-6 flex flex-col items-start gap-1 opacity-60">
        <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">Phase</span>
        <span className="text-xs text-white tracking-wider">{subContext}</span>
      </div>

      {/* Top Right Context */}
      <div className="absolute top-8 right-6 flex flex-col items-end gap-1 opacity-60">
        <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">System</span>
        <span className="text-xs text-white tracking-wider">Ready</span>
      </div>

      {/* Center Trigger */}
      <div className="flex-1 flex flex-col items-center justify-center z-10">
        <div 
          onClick={startWorkout}
          className="group relative cursor-pointer"
        >
          {/* Pulsing Aura */}
          <div className="absolute inset-0 bg-white/5 rounded-full blur-[60px] animate-pulse-slow group-hover:bg-white/10 transition-all duration-1000"></div>
          <div className="absolute inset-0 border border-white/10 rounded-full scale-110 opacity-30 animate-[spin_10s_linear_infinite]"></div>
          
          {/* Core Circle */}
          <div className="w-64 h-64 rounded-full border border-white/20 flex flex-col items-center justify-center backdrop-blur-sm bg-black/20 group-hover:scale-105 transition-transform duration-700 ease-out relative overflow-hidden">
             
             {/* Inner Wave Animation */}
             <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
             
             <Play className="w-8 h-8 text-white mb-4 opacity-80 fill-white" />
             <span className="text-3xl font-light tracking-widest text-white uppercase">Start</span>
             <span className="text-[10px] font-mono tracking-[0.3em] text-zinc-400 mt-2 uppercase">Session</span>
          </div>
        </div>
      </div>

      {/* Bottom Data Stream */}
      <div className="pb-32 px-6 flex flex-col gap-6">
        <div className="flex items-end justify-between border-b border-white/10 pb-4">
           <span className="text-4xl font-extralight text-white">{history.length}</span>
           <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">Total Sessions</span>
        </div>
        
        <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-600 block mb-2">Recent Activity</span>
            {history.slice(0, 3).map((w, i) => (
                <div key={w.id} className="flex justify-between items-center py-2 opacity-60">
                    <span className="text-sm font-light text-zinc-300">{w.name}</span>
                    <span className="text-[10px] font-mono text-zinc-500">{new Date(w.startTime).toLocaleDateString(undefined, {month:'short', day:'numeric'})}</span>
                </div>
            ))}
        </div>
      </div>

    </div>
  );
};

export default HomeView;