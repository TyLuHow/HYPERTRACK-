import React, { useState, useEffect } from 'react';
import { useWorkout } from '../context/WorkoutContext';
import { Plus, X, Trash2, MoreHorizontal, ArrowDown, CheckCircle2 } from 'lucide-react';
import ExerciseSearchModal from '../components/ExerciseSearchModal';
import { WorkoutExercise } from '../types';

const ActiveWorkout: React.FC = () => {
  const { activeWorkout, finishWorkout, cancelWorkout, addSet, updateSet, removeSet, getPreviousSet } = useWorkout();
  const [elapsed, setElapsed] = useState(0);
  const [isAddModalOpen, setAddModalOpen] = useState(false);

  useEffect(() => {
    if (!activeWorkout) return;
    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - activeWorkout.startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [activeWorkout]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!activeWorkout) return null;

  return (
    <div className="flex flex-col h-screen relative z-20 bg-black/50 backdrop-blur-sm">
      
      {/* Header - Minimal HUD */}
      <div className="absolute top-0 left-0 right-0 pt-safe px-6 py-6 flex items-center justify-between z-30 pointer-events-none">
        <button onClick={cancelWorkout} className="pointer-events-auto opacity-50 hover:opacity-100 transition-opacity">
          <X className="w-6 h-6 text-white" strokeWidth={1} />
        </button>
        <div className="flex flex-col items-center">
            <span className="font-mono text-[10px] tracking-[0.2em] text-zinc-500 uppercase">Elapsed</span>
            <span className="font-mono text-lg text-white font-light">{formatTime(elapsed)}</span>
        </div>
        <button onClick={finishWorkout} className="pointer-events-auto opacity-50 hover:opacity-100 transition-opacity">
          <CheckCircle2 className="w-6 h-6 text-white" strokeWidth={1} />
        </button>
      </div>

      {/* Main Flow Stream */}
      <div className="flex-1 overflow-y-auto px-6 pt-28 pb-40 no-scrollbar space-y-16">
        
        {/* Session Title - Fades into background */}
        <div className="text-center space-y-2 opacity-40">
            <h1 className="text-sm font-mono uppercase tracking-widest text-white">{activeWorkout.name}</h1>
        </div>

        {activeWorkout.exercises.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-6">
            <button 
                onClick={() => setAddModalOpen(true)}
                className="w-24 h-24 rounded-full border border-white/20 flex items-center justify-center hover:scale-105 hover:bg-white/5 transition-all duration-500"
            >
                <Plus className="w-8 h-8 text-white opacity-50" strokeWidth={1} />
            </button>
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">Add Movement</span>
          </div>
        ) : (
          <div className="space-y-20">
              {activeWorkout.exercises.map((exercise, index) => (
                <div key={exercise.id} className="relative animate-in fade-in slide-in-from-bottom-8 duration-700">
                   {/* Connection Line */}
                   {index !== activeWorkout.exercises.length - 1 && (
                       <div className="absolute left-1/2 bottom-[-80px] w-[1px] h-[80px] bg-gradient-to-b from-white/10 to-transparent -translate-x-1/2"></div>
                   )}
                   
                   <ExerciseFocus 
                     exercise={exercise}
                     onAddSet={() => addSet(exercise.id)}
                     onUpdateSet={(setId, field, val) => updateSet(exercise.id, setId, field, val)}
                     onRemoveSet={(setId) => removeSet(exercise.id, setId)}
                     getPrevious={(idx) => getPreviousSet(exercise.exerciseId, idx)}
                   />
                </div>
              ))}
              
              {/* Add Next Button */}
              <div className="flex justify-center pt-8">
                <button
                  onClick={() => setAddModalOpen(true)}
                  className="group flex flex-col items-center gap-3 opacity-40 hover:opacity-100 transition-opacity"
                >
                  <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:border-white">
                    <Plus className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest">Next</span>
                </button>
              </div>
          </div>
        )}
      </div>

      <ExerciseSearchModal isOpen={isAddModalOpen} onClose={() => setAddModalOpen(false)} />
    </div>
  );
};

const ExerciseFocus: React.FC<{
  exercise: WorkoutExercise;
  onAddSet: () => void;
  onUpdateSet: (setId: string, field: 'weight' | 'reps', val: number | '') => void;
  onRemoveSet: (setId: string) => void;
  getPrevious: (idx: number) => { weight: number, reps: number } | null;
}> = ({ exercise, onAddSet, onUpdateSet, onRemoveSet, getPrevious }) => {
  return (
    <div className="flex flex-col items-center space-y-6">
      <h2 className="text-3xl md:text-4xl font-extralight text-white text-center tracking-tight leading-tight">
        {exercise.name}
      </h2>

      <div className="w-full max-w-sm space-y-1">
        {/* Header Row */}
        <div className="grid grid-cols-12 text-[10px] font-mono uppercase tracking-widest text-zinc-600 mb-4 text-center">
            <div className="col-span-2">Set</div>
            <div className="col-span-4">Lbs</div>
            <div className="col-span-4">Reps</div>
            <div className="col-span-2"></div>
        </div>

        {exercise.sets.map((set, idx) => {
            const prev = getPrevious(idx);
            return (
              <div key={set.id} className="grid grid-cols-12 items-center gap-4 py-2 text-center group">
                {/* Set Number */}
                <div className="col-span-2 flex justify-center">
                   <div className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center text-xs font-mono text-zinc-500">
                     {idx + 1}
                   </div>
                </div>

                {/* Weight Input - Ghost */}
                <div className="col-span-4 relative">
                    <input
                        type="number"
                        placeholder={prev ? String(prev.weight) : "—"}
                        value={set.weight}
                        onChange={(e) => onUpdateSet(set.id, 'weight', e.target.value === '' ? '' : Number(e.target.value))}
                        className="w-full bg-transparent text-center font-light text-xl text-white placeholder-zinc-800 focus:outline-none focus:placeholder-transparent transition-all"
                    />
                    <div className="absolute bottom-0 left-4 right-4 h-[1px] bg-white/10 group-hover:bg-white/30 transition-colors"></div>
                </div>

                {/* Reps Input - Ghost */}
                <div className="col-span-4 relative">
                    <input
                        type="number"
                        placeholder={prev ? String(prev.reps) : "—"}
                        value={set.reps}
                        onChange={(e) => onUpdateSet(set.id, 'reps', e.target.value === '' ? '' : Number(e.target.value))}
                        className="w-full bg-transparent text-center font-light text-xl text-white placeholder-zinc-800 focus:outline-none focus:placeholder-transparent transition-all"
                    />
                    <div className="absolute bottom-0 left-4 right-4 h-[1px] bg-white/10 group-hover:bg-white/30 transition-colors"></div>
                </div>

                {/* Remove / Status */}
                <div className="col-span-2 flex justify-center">
                    {idx > 0 && (
                        <button onClick={() => onRemoveSet(set.id)} className="text-zinc-800 hover:text-red-900 transition-colors">
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>
              </div>
            );
        })}
      </div>

      <button onClick={onAddSet} className="text-zinc-600 hover:text-white transition-colors">
        <Plus className="w-6 h-6" strokeWidth={1} />
      </button>
    </div>
  );
};

export default ActiveWorkout;