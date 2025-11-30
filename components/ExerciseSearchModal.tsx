import React, { useState, useMemo } from 'react';
import { X, Search, Dumbbell, ArrowRight } from 'lucide-react';
import { useWorkout } from '../context/WorkoutContext';
import { MuscleGroup } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ExerciseSearchModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { exercises, addExercise } = useWorkout();
  const [search, setSearch] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState<MuscleGroup | 'All'>('All');

  const filteredExercises = useMemo(() => {
    return exercises.filter(ex => {
      const matchesSearch = ex.name.toLowerCase().includes(search.toLowerCase());
      const matchesMuscle = selectedMuscle === 'All' || ex.muscle === selectedMuscle;
      return matchesSearch && matchesMuscle;
    });
  }, [exercises, search, selectedMuscle]);

  if (!isOpen) return null;

  const handleSelect = (ex: any) => {
    addExercise(ex);
    onClose();
    setSearch('');
  };

  const muscles: (MuscleGroup | 'All')[] = ['All', 'Chest', 'Back', 'Legs', 'Shoulders', 'Biceps', 'Triceps', 'Core'];

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#09090b] animate-in slide-in-from-bottom-5 duration-300">
      
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/5 bg-[#09090b]">
        <h2 className="text-sm font-semibold text-white uppercase tracking-widest">Select Movement</h2>
        <button onClick={onClose} className="p-2 -mr-2 text-zinc-500 hover:text-white transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Search & Filter */}
      <div className="p-4 space-y-4 bg-[#09090b]">
        <div className="relative">
          <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
          <input
            type="text"
            placeholder="FILTER..."
            className="w-full pl-8 pr-4 py-2 bg-transparent border-b border-zinc-800 text-white font-mono text-sm focus:border-white transition-colors placeholder-zinc-700 rounded-none focus:outline-none uppercase tracking-wide"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {muscles.map(m => (
            <button
              key={m}
              onClick={() => setSelectedMuscle(m)}
              className={`px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider border transition-all ${
                selectedMuscle === m 
                  ? 'bg-zinc-100 text-black border-zinc-100' 
                  : 'bg-transparent text-zinc-600 border-zinc-800 hover:border-zinc-600'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-4 pt-0">
        <div className="space-y-1">
          {filteredExercises.map(ex => (
            <button
              key={ex.id}
              onClick={() => handleSelect(ex)}
              className="w-full flex items-center justify-between p-4 border-b border-white/[0.03] hover:bg-white/[0.03] transition-colors text-left group"
            >
              <div className="flex flex-col">
                <span className="text-sm font-medium text-zinc-200 group-hover:text-white">{ex.name}</span>
                <span className="text-[10px] text-zinc-600 uppercase tracking-wider">{ex.muscle}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-zinc-800 group-hover:text-zinc-400 transition-colors" />
            </button>
          ))}
          {filteredExercises.length === 0 && (
             <p className="text-center text-zinc-700 text-sm mt-10">No matches found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExerciseSearchModal;