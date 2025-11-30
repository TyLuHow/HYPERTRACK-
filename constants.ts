import { Exercise } from './types';

export const EXERCISE_DATABASE: Exercise[] = [
  { id: 'bp', name: 'Bench Press (Barbell)', muscle: 'Chest' },
  { id: 'db_press', name: 'Dumbbell Press', muscle: 'Chest' },
  { id: 'inc_bench', name: 'Incline Bench Press', muscle: 'Chest' },
  { id: 'flys', name: 'Cable Flys', muscle: 'Chest' },
  
  { id: 'dl', name: 'Deadlift', muscle: 'Back' },
  { id: 'pullup', name: 'Pull Up', muscle: 'Back' },
  { id: 'lat_pull', name: 'Lat Pulldown', muscle: 'Back' },
  { id: 'row_bb', name: 'Barbell Row', muscle: 'Back' },
  
  { id: 'ohp', name: 'Overhead Press', muscle: 'Shoulders' },
  { id: 'lat_raise', name: 'Lateral Raise', muscle: 'Shoulders' },
  { id: 'face_pull', name: 'Face Pull', muscle: 'Shoulders' },
  
  { id: 'squat', name: 'Squat (Barbell)', muscle: 'Legs' },
  { id: 'leg_press', name: 'Leg Press', muscle: 'Legs' },
  { id: 'lunge', name: 'Walking Lunge', muscle: 'Legs' },
  { id: 'ext', name: 'Leg Extension', muscle: 'Legs' },
  
  { id: 'curl_bb', name: 'Barbell Curl', muscle: 'Biceps' },
  { id: 'curl_db', name: 'Dumbbell Curl', muscle: 'Biceps' },
  
  { id: 'tri_pd', name: 'Tricep Pushdown', muscle: 'Triceps' },
  { id: 'skull', name: 'Skullcrushers', muscle: 'Triceps' },
  { id: 'dips', name: 'Dips', muscle: 'Triceps' },
];

export const MOCK_HISTORY = [
  // Generated mock data for initial visualization would go here if needed
];
