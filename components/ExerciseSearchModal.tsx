import React, { useState, useMemo } from 'react';
import { X, Search } from 'lucide-react';
import { useWorkout } from '../context/WorkoutContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ExerciseSearchModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { exercises, addExercise } = useWorkout();
  const [search, setSearch] = useState('');

  const filteredExercises = useMemo(() => {
    return exercises.filter(ex => 
      ex.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [exercises, search]);

  if (!isOpen) return null;

  const handleSelect = (ex: any) => {
    addExercise(ex);
    onClose();
    setSearch('');
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-xl animate-in fade-in duration-300">
      
      {/* Close */}
      <div className="absolute top-6 right-6 z-10">
        <button onClick={onClose} className="p-2 text-zinc-500 hover:text-white transition-colors">
          <X className="w-8 h-8" strokeWidth={1} />
        </button>
      </div>

      {/* Large Input */}
      <div className="pt-32 px-8 pb-8 border-b border-white/10">
        <input
            type="text"
            placeholder="Type Movement..."
            className="w-full bg-transparent text-4xl font-light text-white placeholder-zinc-800 focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-8 py-8 no-scrollbar">
        <div className="space-y-4">
          {filteredExercises.map(ex => (
            <button
              key={ex.id}
              onClick={() => handleSelect(ex)}
              className="w-full text-left py-2 group"
            >
              <div className="flex items-baseline gap-4">
                <span className="text-2xl text-zinc-500 group-hover:text-white group-hover:pl-4 transition-all duration-300 font-light">{ex.name}</span>
                <span className="text-[10px] text-zinc-700 font-mono uppercase tracking-widest">{ex.muscle}</span>
              </div>
            </button>
          ))}
          {filteredExercises.length === 0 && (
             <p className="text-zinc-700 font-mono text-xs uppercase tracking-widest mt-10">No matches found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExerciseSearchModal;