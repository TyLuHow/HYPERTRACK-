import React from 'react';
import { useWorkout } from '../context/WorkoutContext';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';

const HistoryView: React.FC = () => {
  const { history } = useWorkout();

  return (
    <div className="p-6 pt-10 pb-32 space-y-6">
      <h2 className="text-2xl font-bold text-white">Workout History</h2>
      
      <div className="space-y-4">
        {history.length === 0 ? (
          <div className="glass-panel rounded-2xl p-8 text-center text-gray-500">
            <CalendarIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Your journey begins with the first step.</p>
          </div>
        ) : (
          history.map(workout => (
            <div key={workout.id} className="glass-card rounded-2xl overflow-hidden">
              <div className="bg-white/5 p-4 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-white">{workout.name}</h3>
                  <div className="text-xs text-gray-400 mt-1 flex items-center gap-2">
                    {new Date(workout.startTime).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                     {workout.endTime ? Math.round((workout.endTime - workout.startTime) / 60000) : 0} min
                  </div>
                </div>
              </div>
              
              <div className="p-4 space-y-3">
                {workout.exercises.map(ex => (
                  <div key={ex.id} className="flex justify-between items-center text-sm border-b border-white/5 last:border-0 pb-2 last:pb-0">
                    <span className="text-gray-300">{ex.name}</span>
                    <span className="text-gray-500 font-mono">
                      {ex.sets.filter(s => typeof s.weight === 'number' && typeof s.reps === 'number').length} sets
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HistoryView;
