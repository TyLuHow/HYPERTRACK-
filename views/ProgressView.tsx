import React from 'react';
import { useWorkout } from '../context/WorkoutContext';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const ProgressView: React.FC = () => {
  const { history } = useWorkout();

  // Mock data generator
  const mockData = [
    { name: '1', volume: 4000 },
    { name: '2', volume: 5500 },
    { name: '3', volume: 4800 },
    { name: '4', volume: 6200 },
    { name: '5', volume: 7100 },
    { name: '6', volume: 6800 },
    { name: '7', volume: 8200 },
  ];

  const data = history.length > 2 ? history.map((h, i) => ({
    name: String(i + 1),
    volume: h.exercises.reduce((acc, ex) => 
      acc + ex.sets.reduce((sAcc, s) => sAcc + (Number(s.weight)||0) * (Number(s.reps)||0), 0)
    , 0)
  })).reverse() : mockData;

  return (
    <div className="p-6 pt-12 pb-32 h-full flex flex-col justify-center">
      <div className="mb-12">
         <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block mb-2">Metric</span>
         <h2 className="text-3xl font-light text-white tracking-tight">Total Volume</h2>
      </div>

      <div className="h-64 w-full relative">
          {/* Background Grid Lines - Vertical Only */}
          <div className="absolute inset-0 flex justify-between pointer-events-none opacity-10">
              <div className="w-[1px] h-full bg-white"></div>
              <div className="w-[1px] h-full bg-white"></div>
              <div className="w-[1px] h-full bg-white"></div>
              <div className="w-[1px] h-full bg-white"></div>
          </div>

          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <Line 
                type="monotone" 
                dataKey="volume" 
                stroke="#ffffff" 
                strokeWidth={1} 
                dot={false}
                activeDot={{r: 4, fill: '#000', stroke: '#fff', strokeWidth: 1}}
              />
            </LineChart>
          </ResponsiveContainer>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-8">
         <div className="border-t border-white/20 pt-4">
             <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block">Last Session</span>
             <span className="text-2xl font-light text-white">45m</span>
         </div>
         <div className="border-t border-white/20 pt-4">
             <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block">Weekly Load</span>
             <span className="text-2xl font-light text-white">High</span>
         </div>
      </div>
    </div>
  );
};

export default ProgressView;