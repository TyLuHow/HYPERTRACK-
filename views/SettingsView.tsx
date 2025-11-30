import React from 'react';
import { User, Shield, Bell, Moon, ChevronRight } from 'lucide-react';

const SettingsView: React.FC = () => {
  return (
    <div className="p-6 pt-12 space-y-10 max-w-lg mx-auto">
      <div className="border-b border-white/5 pb-4">
        <h2 className="text-sm font-medium text-zinc-500 tracking-widest uppercase">System Config</h2>
      </div>

      <div className="space-y-8">
        <Section title="User Parameters">
            <SettingItem icon={User} label="Bodyweight" value="185 lbs" />
        </Section>

        <Section title="App Interface">
            <SettingItem icon={Moon} label="Theme" value="Obsidian" />
            <SettingItem icon={Bell} label="Haptics" toggle />
            <SettingItem icon={Shield} label="Local Storage" value="Active" />
        </Section>
        
        <div className="pt-12 flex justify-center">
            <p className="text-zinc-800 text-[10px] font-mono tracking-widest uppercase">HyperTrack Pro v1.1.0</p>
        </div>
      </div>
    </div>
  );
};

const Section: React.FC<{title: string, children: React.ReactNode}> = ({title, children}) => (
    <div className="space-y-2">
        <h3 className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest pl-1">{title}</h3>
        <div className="divide-y divide-white/5 border-t border-b border-white/5">
            {children}
        </div>
    </div>
)

const SettingItem: React.FC<{icon: any, label: string, value?: string, toggle?: boolean}> = ({icon: Icon, label, value, toggle}) => (
    <div className="flex items-center justify-between py-4 hover:bg-white/[0.02] transition-colors cursor-pointer group">
        <div className="flex items-center gap-3">
            <Icon className="w-4 h-4 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
            <span className="text-zinc-300 font-light text-sm">{label}</span>
        </div>
        <div className="flex items-center gap-2">
            {value && <span className="text-zinc-500 text-xs font-mono">{value}</span>}
            {toggle ? (
                <div className="w-8 h-4 bg-zinc-800 rounded-full relative">
                    <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-zinc-400 rounded-full"></div>
                </div>
            ) : (
                <ChevronRight className="w-4 h-4 text-zinc-700" />
            )}
        </div>
    </div>
)

export default SettingsView;