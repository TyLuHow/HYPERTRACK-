import React from 'react';
import { useWorkout } from '../context/WorkoutContext';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const ProgressView: React.FC = () => {
  const { history } = useWorkout();

  // Mock data generator for visuals if history is empty
  const mockData = [
    { name: 'W1', volume: 4000 },
    { name: 'W2', volume: 5500 },
    { name: 'W3', volume: 4800 },
    { name: 'W4', volume: 6200 },
    { name: 'W5', volume: 7100 },
  ];

  const data = history.length > 2 ? history.map((h, i) => ({
    name: new Date(h.startTime).toLocaleDateString(undefined, { month: 'numeric', day: 'numeric' }),
    volume: h.exercises.reduce((acc, ex) => 
      acc + ex.sets.reduce((sAcc, s) => sAcc + (Number(s.weight)||0) * (Number(s.reps)||0), 0)
    , 0)
  })).reverse() : mockData;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-zinc-900 p-2 border border-white/10 shadow-xl">
          <p className="text-zinc-500 text-[10px] uppercase tracking-wider mb-1">{label}</p>
          <p className="text-white font-mono text-sm">{(payload[0].value/1000).toFixed(1)}k <span className="text-zinc-600">lbs</span></p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 pt-12 space-y-10 pb-32 max-w-lg mx-auto">
      <div className="flex justify-between items-end border-b border-white/5 pb-4">
        <h2 className="text-sm font-medium text-zinc-500 tracking-widest uppercase">Performance</h2>
        <span className="text-xs text-zinc-600 font-mono">LIFETIME VOL</span>
      </div>

      <div className="space-y-2">
        <h3 className="text-white text-lg font-light">Volume Trend</h3>
        <div className="h-64 w-full -ml-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis 
                dataKey="name" 
                stroke="#52525b" 
                tick={{fontSize: 10, fill: '#52525b'}} 
                tickLine={false} 
                axisLine={false}
                dy={10}
              />
              <YAxis 
                stroke="#52525b" 
                tick={{fontSize: 10, fill: '#52525b'}} 
                tickLine={false} 
                axisLine={false}
                tickFormatter={(value) => `${value / 1000}k`}
              />
              <Tooltip content={<CustomTooltip />} cursor={{stroke: '#3f3f46', strokeWidth: 1}} />
              <Line 
                type="linear" 
                dataKey="volume" 
                stroke="#d4d4d8" 
                strokeWidth={1.5} 
                dot={{fill: '#09090b', stroke: '#d4d4d8', strokeWidth: 1.5, r: 3}} 
                activeDot={{r: 5, fill: '#ffffff'}}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-white/5">
        <h3 className="text-white text-lg font-light">Distribution</h3>
        <div className="space-y-4">
            {[
                {m: 'Chest', v: 60},
                {m: 'Back', v: 80},
                {m: 'Legs', v: 50},
                {m: 'Shoulders', v: 70}
            ].map(item => (
                <div key={item.m} className="group">
                    <div className="flex justify-between text-xs mb-1">
                        <span className="text-zinc-400">{item.m}</span>
                        <span className="text-zinc-600 font-mono">{item.v}%</span>
                    </div>
                    <div className="w-full bg-zinc-900 h-1 rounded-full overflow-hidden">
                        <div 
                            className="bg-zinc-500 h-full rounded-full"
                            style={{width: `${item.v}%`}}
                        ></div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressView;