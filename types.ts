export type MuscleGroup = 'Chest' | 'Back' | 'Shoulders' | 'Biceps' | 'Triceps' | 'Legs' | 'Core' | 'Forearms';

export interface Exercise {
  id: string;
  name: string;
  muscle: MuscleGroup;
}

export interface WorkoutSet {
  id: string;
  weight: number | '';
  reps: number | '';
  completed: boolean;
}

export interface WorkoutExercise {
  id: string; // Unique ID for this instance in the workout
  exerciseId: string;
  name: string;
  sets: WorkoutSet[];
}

export interface WorkoutSession {
  id: string;
  startTime: number;
  endTime?: number;
  exercises: WorkoutExercise[];
  note?: string;
  name: string; // E.g. "Evening Chest"
}

export type ViewState = 'home' | 'history' | 'progress' | 'settings' | 'active-workout';
