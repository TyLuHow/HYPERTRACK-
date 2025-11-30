import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { WorkoutSession, WorkoutExercise, Exercise, WorkoutSet } from '../types';
import { EXERCISE_DATABASE } from '../constants';

interface WorkoutContextType {
  activeWorkout: WorkoutSession | null;
  history: WorkoutSession[];
  startWorkout: () => void;
  cancelWorkout: () => void;
  finishWorkout: () => void;
  addExercise: (exercise: Exercise) => void;
  addSet: (workoutExerciseId: string) => void;
  updateSet: (workoutExerciseId: string, setId: string, field: 'weight' | 'reps', value: number | '') => void;
  removeSet: (workoutExerciseId: string, setId: string) => void;
  getPreviousSet: (exerciseId: string, setIndex: number) => { weight: number, reps: number } | null;
  exercises: Exercise[];
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export const WorkoutProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeWorkout, setActiveWorkout] = useState<WorkoutSession | null>(() => {
    const saved = localStorage.getItem('activeWorkout');
    return saved ? JSON.parse(saved) : null;
  });

  const [history, setHistory] = useState<WorkoutSession[]>(() => {
    const saved = localStorage.getItem('workoutHistory');
    return saved ? JSON.parse(saved) : [];
  });

  // Persist state
  useEffect(() => {
    if (activeWorkout) {
      localStorage.setItem('activeWorkout', JSON.stringify(activeWorkout));
    } else {
      localStorage.removeItem('activeWorkout');
    }
  }, [activeWorkout]);

  useEffect(() => {
    localStorage.setItem('workoutHistory', JSON.stringify(history));
  }, [history]);

  const startWorkout = () => {
    const newWorkout: WorkoutSession = {
      id: crypto.randomUUID(),
      startTime: Date.now(),
      exercises: [],
      name: `Workout ${new Date().toLocaleDateString()}`,
    };
    setActiveWorkout(newWorkout);
  };

  const cancelWorkout = () => {
    if (confirm('Discard current workout?')) {
      setActiveWorkout(null);
    }
  };

  const finishWorkout = () => {
    if (!activeWorkout) return;
    const completedWorkout = { ...activeWorkout, endTime: Date.now() };
    setHistory(prev => [completedWorkout, ...prev]);
    setActiveWorkout(null);
  };

  const addExercise = (exercise: Exercise) => {
    if (!activeWorkout) return;
    const newExercise: WorkoutExercise = {
      id: crypto.randomUUID(),
      exerciseId: exercise.id,
      name: exercise.name,
      sets: [
        { id: crypto.randomUUID(), weight: '', reps: '', completed: false }
      ]
    };
    
    // Auto-fill first set based on history if available
    const prev = getPreviousSet(exercise.id, 0);
    if (prev) {
      newExercise.sets[0].weight = prev.weight;
    }

    setActiveWorkout(prev => ({
      ...prev!,
      exercises: [...prev!.exercises, newExercise]
    }));
  };

  const addSet = (workoutExerciseId: string) => {
    if (!activeWorkout) return;
    setActiveWorkout(prev => {
      const exercises = prev!.exercises.map(ex => {
        if (ex.id !== workoutExerciseId) return ex;
        
        // Auto-fill logic: use previous set's weight
        const lastSet = ex.sets[ex.sets.length - 1];
        const newSet: WorkoutSet = {
          id: crypto.randomUUID(),
          weight: lastSet ? lastSet.weight : '',
          reps: '',
          completed: false
        };
        return { ...ex, sets: [...ex.sets, newSet] };
      });
      return { ...prev!, exercises };
    });
  };

  const updateSet = (workoutExerciseId: string, setId: string, field: 'weight' | 'reps', value: number | '') => {
    if (!activeWorkout) return;
    setActiveWorkout(prev => {
      const exercises = prev!.exercises.map(ex => {
        if (ex.id !== workoutExerciseId) return ex;
        const sets = ex.sets.map(s => s.id === setId ? { ...s, [field]: value } : s);
        return { ...ex, sets };
      });
      return { ...prev!, exercises };
    });
  };

  const removeSet = (workoutExerciseId: string, setId: string) => {
    if (!activeWorkout) return;
    setActiveWorkout(prev => {
      const exercises = prev!.exercises.map(ex => {
        if (ex.id !== workoutExerciseId) return ex;
        return { ...ex, sets: ex.sets.filter(s => s.id !== setId) };
      });
      return { ...prev!, exercises };
    });
  };

  const getPreviousSet = (exerciseId: string, setIndex: number): { weight: number, reps: number } | null => {
    // Find the last completed session that had this exercise
    const lastSession = history.find(h => h.exercises.some(e => e.exerciseId === exerciseId));
    if (!lastSession) return null;
    
    const exercise = lastSession.exercises.find(e => e.exerciseId === exerciseId);
    if (!exercise || !exercise.sets[setIndex]) return null;

    const s = exercise.sets[setIndex];
    if (typeof s.weight === 'number' && typeof s.reps === 'number') {
      return { weight: s.weight, reps: s.reps };
    }
    return null;
  };

  return (
    <WorkoutContext.Provider value={{
      activeWorkout,
      history,
      startWorkout,
      cancelWorkout,
      finishWorkout,
      addExercise,
      addSet,
      updateSet,
      removeSet,
      getPreviousSet,
      exercises: EXERCISE_DATABASE
    }}>
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkout = () => {
  const context = useContext(WorkoutContext);
  if (!context) throw new Error('useWorkout must be used within a WorkoutProvider');
  return context;
};
