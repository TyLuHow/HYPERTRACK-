import React from 'react';
import { useWorkout } from '../context/WorkoutContext';

const HistoryView: React.FC = () => {
  const { history } = useWorkout();

  return (
    <div className="p-6 pt-12 pb-32 min-h-full">
      <h2 className="text-3xl font-light text-white tracking-tight mb-12">Archive</h2>
      
      {history.length === 0 ? (
        <div className="flex flex-col items-center justify-center opacity-30 mt-20">
          <span className="font-mono text-xs uppercase tracking-widest">Empty</span>
        </div>
      ) : (
        <div className="relative border-l border-white/10 ml-4 space-y-12">
          {history.map((workout) => (
            <div key={workout.id} className="relative pl-8 group">
              {/* Node */}
              <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-black border border-white/50 rounded-full group-hover:bg-white transition-colors"></div>
              
              <div className="space-y-2">
                 <div className="flex justify-between items-baseline">
                    <h3 className="text-xl font-light text-white">{workout.name}</h3>
                    <span className="font-mono text-[10px] text-zinc-500 uppercase">{new Date(workout.startTime).toLocaleDateString()}</span>
                 </div>
                 
                 <div className="flex gap-6 opacity-50">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Duration</span>
                        <span className="text-sm font-light text-zinc-300">
                             {workout.endTime ? Math.round((workout.endTime - workout.startTime) / 60000) : 0}m
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Volume</span>
                        <span className="text-sm font-light text-zinc-300">
                             {workout.exercises.reduce((acc, ex) => acc + ex.sets.length, 0)} sets
                        </span>
                    </div>
                 </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryView;