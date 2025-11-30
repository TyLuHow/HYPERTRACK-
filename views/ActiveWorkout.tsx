import React, { useState, useEffect } from 'react';
import { useWorkout } from '../context/WorkoutContext';
import { Plus, X, Trash2, MoreHorizontal, Clock, Check } from 'lucide-react';
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
    <div className="flex flex-col h-screen bg-transparent relative z-20">
      {/* Top Bar - Floating Glass */}
      <div className="absolute top-0 left-0 right-0 pt-safe px-6 py-6 flex items-center justify-between z-30 bg-gradient-to-b from-[#050505] to-transparent">
        <button onClick={cancelWorkout} className="text-zinc-600 hover:text-red-400 transition-colors">
          <X className="w-5 h-5" strokeWidth={1.5} />
        </button>
        <div className="flex items-center gap-2 bg-zinc-900/50 backdrop-blur px-3 py-1 rounded-full border border-white/5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="font-mono text-zinc-300 text-xs tracking-wider">
            {formatTime(elapsed)}
          </span>
        </div>
        <button 
          onClick={finishWorkout} 
          className="text-white text-[10px] font-semibold tracking-[0.2em] uppercase hover:text-emerald-400 transition-colors"
        >
          Finish
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-4 pt-24 space-y-12 pb-40 no-scrollbar">
        <div className="px-2">
            <h1 className="text-2xl font-light text-white tracking-tight">{activeWorkout.name}</h1>
            <p className="text-zinc-600 text-xs uppercase tracking-widest mt-1">Session In Progress</p>
        </div>

        {activeWorkout.exercises.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4 opacity-40">
            <div className="w-12 h-12 border border-dashed border-zinc-700 rounded-full flex items-center justify-center">
              <Plus className="w-4 h-4 text-zinc-500" />
            </div>
            <p className="text-zinc-500 font-light text-sm">Add movement to timeline</p>
          </div>
        ) : (
          activeWorkout.exercises.map((exercise, index) => (
            <div key={exercise.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{animationDelay: `${index * 100}ms`}}>
              <ExerciseCard 
                exercise={exercise}
                onAddSet={() => addSet(exercise.id)}
                onUpdateSet={(setId, field, val) => updateSet(exercise.id, setId, field, val)}
                onRemoveSet={(setId) => removeSet(exercise.id, setId)}
                getPrevious={(idx) => getPreviousSet(exercise.exerciseId, idx)}
              />
            </div>
          ))
        )}
        
        {/* Add Exercise Trigger - Minimal */}
        <button
          onClick={() => setAddModalOpen(true)}
          className="w-full py-6 rounded-xl border border-dashed border-zinc-800 text-zinc-600 hover:text-zinc-300 hover:border-zinc-700 transition-all text-xs font-medium tracking-widest uppercase flex items-center justify-center gap-2 group"
        >
          <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" /> Add Movement
        </button>
      </div>

      <ExerciseSearchModal isOpen={isAddModalOpen} onClose={() => setAddModalOpen(false)} />
    </div>
  );
};

const ExerciseCard: React.FC<{
  exercise: WorkoutExercise;
  onAddSet: () => void;
  onUpdateSet: (setId: string, field: 'weight' | 'reps', val: number | '') => void;
  onRemoveSet: (setId: string) => void;
  getPrevious: (idx: number) => { weight: number, reps: number } | null;
}> = ({ exercise, onAddSet, onUpdateSet, onRemoveSet, getPrevious }) => {
  return (
    <div className="space-y-4 relative">
      <div className="absolute -left-4 top-0 bottom-0 w-[1px] bg-zinc-900"></div>
      
      {/* Header */}
      <div className="flex items-baseline justify-between pl-2">
        <h3 className="font-normal text-lg text-zinc-100">{exercise.name}</h3>
        <button className="text-zinc-700 hover:text-zinc-400 p-2">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Sets */}
      <div className="space-y-2 pl-2">
        {exercise.sets.map((set, idx) => {
            const prev = getPrevious(idx);
            const isCompleted = set.weight !== '' && set.reps !== '';
            
            return (
              <div key={set.id} className="group relative grid grid-cols-12 gap-3 items-center py-2">
                {/* Set Number */}
                <div className="col-span-1 flex justify-center">
                   <span className="text-[10px] font-mono text-zinc-700">
                     {idx + 1}
                   </span>
                </div>

                {/* Previous Data (Ghost) */}
                <div className="col-span-3 text-[10px] text-zinc-700 font-mono flex items-center gap-1">
                  {prev ? (
                    <>
                      <span>{prev.weight}</span>
                      <span className="opacity-50">x</span>
                      <span>{prev.reps}</span>
                    </>
                  ) : (
                    <span className="opacity-30">—</span>
                  )}
                </div>

                {/* Input Area */}
                <div className="col-span-7 flex items-center gap-2">
                    <div className="relative flex-1">
                        <input
                            type="number"
                            pattern="[0-9]*"
                            value={set.weight}
                            placeholder="LBS"
                            onChange={(e) => onUpdateSet(set.id, 'weight', e.target.value === '' ? '' : Number(e.target.value))}
                            className="w-full bg-zinc-900/30 text-center font-mono text-sm text-zinc-100 placeholder-zinc-800 focus:bg-zinc-800/60 focus:outline-none py-3 rounded-md transition-all border border-transparent focus:border-white/5"
                        />
                    </div>
                    <div className="relative flex-1">
                        <input
                            type="number"
                            pattern="[0-9]*"
                            value={set.reps}
                            placeholder="REPS"
                            onChange={(e) => onUpdateSet(set.id, 'reps', e.target.value === '' ? '' : Number(e.target.value))}
                            className={`w-full bg-zinc-900/30 text-center font-mono text-sm placeholder-zinc-800 focus:bg-zinc-800/60 focus:outline-none py-3 rounded-md transition-all border border-transparent focus:border-white/5
                            ${isCompleted ? 'text-emerald-400 font-medium' : 'text-zinc-100'}`}
                        />
                    </div>
                </div>

                {/* Action */}
                <div className="col-span-1 flex justify-end">
                    {idx > 0 ? (
                      <button 
                        onClick={() => onRemoveSet(set.id)}
                        className="p-2 text-zinc-800 hover:text-red-900 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    ) : (
                        <div className={`w-1 h-1 rounded-full ${isCompleted ? 'bg-emerald-500' : 'bg-zinc-800'} transition-colors duration-500`}></div>
                    )}
                </div>
              </div>
            );
        })}

        {/* Add Set Button - Very Subtle */}
        <div className="pt-2">
            <button
            onClick={onAddSet}
            className="text-[10px] text-zinc-600 hover:text-zinc-400 uppercase tracking-widest pl-10 transition-colors flex items-center gap-2"
            >
            <Plus className="w-3 h-3" /> Add Set
            </button>
        </div>
      </div>
    </div>
  );
};

export default ActiveWorkout;