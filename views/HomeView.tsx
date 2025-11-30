import React from 'react';
import { useWorkout } from '../context/WorkoutContext';
import { Plus, ArrowUpRight } from 'lucide-react';
import { WorkoutSession } from '../types';

const HomeView: React.FC<{ onViewChange: (v: any) => void }> = ({ onViewChange }) => {
  const { startWorkout, history } = useWorkout();

  return (
    <div className="flex flex-col h-full p-6 pt-16 space-y-12 pb-32 max-w-lg mx-auto w-full">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h1 className="text-xs font-semibold text-zinc-500 tracking-[0.2em] uppercase">
            HyperTrack
          </h1>
          <p className="text-4xl font-light text-white tracking-tight leading-tight">
            Design your <br/>
            <span className="font-medium text-zinc-200">Physique</span>
          </p>
        </div>
        <div className="flex flex-col items-center gap-1">
             <span className="text-[10px] text-zinc-600 uppercase tracking-widest font-mono">Date</span>
             <span className="text-xl font-mono font-light text-zinc-300">{new Date().getDate()}</span>
        </div>
      </div>

      {/* Hero Action: Minimalist & Typographic */}
      <div className="relative group cursor-pointer" onClick={startWorkout}>
        <div className="absolute inset-0 bg-white/5 blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-1000"></div>
        <div className="relative border border-white/10 p-8 rounded-2xl bg-zinc-900/10 backdrop-blur-sm transition-all duration-500 group-hover:border-white/20 group-hover:bg-zinc-900/20">
          <div className="flex justify-between items-start mb-16">
             <div className="h-2 w-2 rounded-full bg-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.3)] animate-pulse-slow"></div>
             <ArrowUpRight className="w-5 h-5 text-zinc-600 group-hover:text-zinc-300 transition-colors" />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-3xl font-light text-white tracking-tight">
              Initiate
            </h2>
            <div className="flex items-center gap-3">
              <div className="h-[1px] w-8 bg-zinc-700"></div>
              <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">
                New Session
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent History - Minimal List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.15em]">Recent Activity</h3>
        </div>
        
        <div className="relative">
          <div className="absolute left-2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-white/10 to-transparent"></div>
          <div className="space-y-6">
            {history.length === 0 ? (
              <div className="pl-8 py-2">
                <span className="text-zinc-700 text-sm font-light italic">No logs found.</span>
              </div>
            ) : (
              history.slice(0, 3).map((workout) => (
                <WorkoutHistoryRow key={workout.id} workout={workout} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const WorkoutHistoryRow: React.FC<{ workout: WorkoutSession }> = ({ workout }) => {
  const date = new Date(workout.startTime).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  const totalSets = workout.exercises.reduce((acc, ex) => acc + ex.sets.length, 0);

  return (
    <div className="pl-8 relative group cursor-pointer hover:opacity-80 transition-opacity">
      <div className="absolute left-[5px] top-[10px] w-1.5 h-1.5 rounded-full bg-zinc-800 border border-zinc-700 group-hover:bg-zinc-500 transition-colors"></div>
      
      <div className="flex justify-between items-baseline">
        <h4 className="text-zinc-200 text-lg font-light">{workout.name}</h4>
        <span className="font-mono text-xs text-zinc-600">{date}</span>
      </div>
      
      <div className="flex gap-4 mt-1">
         <span className="text-xs text-zinc-500 font-mono">{workout.exercises.length} Exercises</span>
         <span className="text-xs text-zinc-500 font-mono">{totalSets} Sets</span>
      </div>
    </div>
  );
};

export default HomeView;