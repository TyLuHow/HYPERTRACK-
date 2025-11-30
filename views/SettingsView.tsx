import React from 'react';
import { ToggleRight, ChevronRight } from 'lucide-react';

const SettingsView: React.FC = () => {
  return (
    <div className="p-6 pt-12 space-y-12 max-w-lg mx-auto">
      <h2 className="text-3xl font-light text-white tracking-tight">Configuration</h2>

      <div className="space-y-12">
        <Section title="Profile">
            <SettingItem label="Body Weight" value="185 lbs" />
            <SettingItem label="Height" value="6'0\"" />
        </Section>

        <Section title="Interface">
            <SettingItem label="Theme" value="Void" />
            <SettingItem label="Haptics" toggle />
            <SettingItem label="Soundscape" value="Off" />
        </Section>
        
        <Section title="Data">
            <SettingItem label="Export CSV" action />
            <SettingItem label="Clear Cache" action />
        </Section>
      </div>
      
      <div className="pt-12 text-center opacity-30">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase">HyperTrack Pro 1.2</p>
      </div>
    </div>
  );
};

const Section: React.FC<{title: string, children: React.ReactNode}> = ({title, children}) => (
    <div className="space-y-6">
        <h3 className="text-zinc-500 text-[10px] font-mono uppercase tracking-[0.2em]">{title}</h3>
        <div className="space-y-6">
            {children}
        </div>
    </div>
)

const SettingItem: React.FC<{label: string, value?: string, toggle?: boolean, action?: boolean}> = ({label, value, toggle, action}) => (
    <div className="flex items-center justify-between group cursor-pointer">
        <span className="text-zinc-200 font-light text-lg group-hover:text-white transition-colors">{label}</span>
        <div className="flex items-center gap-3">
            {value && <span className="text-zinc-500 font-mono text-xs">{value}</span>}
            {toggle && <ToggleRight className="w-6 h-6 text-white" />}
            {action && <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-white" />}
        </div>
    </div>
)

export default SettingsView;