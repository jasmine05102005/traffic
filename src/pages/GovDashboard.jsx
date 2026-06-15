import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  CartesianGrid, 
  Legend 
} from 'recharts';
import { 
  TrendingUp, 
  Flame, 
  AlertTriangle, 
  Leaf, 
  Info, 
  Play, 
  Activity, 
  BellRing,
  Globe
} from 'lucide-react';
import { CITIES, MOCK_NOTIFICATIONS, CONGESTION_FORECAST } from '../data/mockData';

const initialHighTrafficZones = {
  [CITIES.HYDERABAD]: [
    { zone: 'Jubilee Hills Road No. 36', delay: '+18 mins', status: 'Critical', color: 'text-rose-400 bg-rose-500/10 border-rose-500/20' },
    { zone: 'HITEC Cyber Towers Junction', delay: '+12 mins', status: 'Moderate', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
    { zone: 'Secunderabad station corridor', delay: '+5 mins', status: 'Normal', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' }
  ],
  [CITIES.VIJAYAWADA]: [
    { zone: 'Benz Circle Flyover Hub', delay: '+14 mins', status: 'Critical', color: 'text-rose-400 bg-rose-500/10 border-rose-500/20' },
    { zone: 'Pandit Nehru Bus Station Entry', delay: '+6 mins', status: 'Normal', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' }
  ]
};

export default function GovDashboard() {
  const [selectedCity, setSelectedCity] = useState(CITIES.HYDERABAD);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [zones, setZones] = useState(initialHighTrafficZones);

  // Stats cards
  const stats = [
    { label: 'Congestion Index', value: '42%', change: '-12% vs. historical', icon: Activity, color: 'text-cyan-400' },
    { label: 'City Air Quality (AQI)', value: selectedCity === CITIES.HYDERABAD ? '128' : '98', change: 'Moderate Level', icon: Leaf, color: 'text-emerald-400' },
    { label: 'Active Green Vehicles', value: selectedCity === CITIES.HYDERABAD ? '2,480' : '840', change: 'E-Bikes & EV fleets', icon: Globe, color: 'text-indigo-400' },
    { label: 'AI Optimization Decisions', value: '148', change: 'Interventions / Hr', icon: BellRing, color: 'text-amber-400' }
  ];

  // Simulates a spike in traffic gridlock
  const triggerTrafficSpike = () => {
    const randomZone = selectedCity === CITIES.HYDERABAD 
      ? 'Charminar Heritage Plaza' 
      : 'Kanaka Durga Temple Ghat Road';

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Add warning notification
    const newAlert = {
      id: Date.now(),
      type: 'warning',
      text: `Congestion spike detected at ${randomZone}. AI Rerouting protocols engaged.`,
      time: timestamp
    };

    setNotifications([newAlert, ...notifications]);

    // Insert zone gridlock into listing
    const updatedZones = { ...zones };
    updatedZones[selectedCity] = [
      { zone: randomZone, delay: '+24 mins', status: 'Critical', color: 'text-rose-400 bg-rose-500/10 border-rose-500/20' },
      ...updatedZones[selectedCity]
    ];
    setZones(updatedZones);
  };

  const activeZones = zones[selectedCity] || [];

  return (
    <div className="space-y-8 pb-16 text-left">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-900 pb-5">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 text-glow-cyan">
            Municipal Transit & Safety Analytics
          </h1>
          <p className="text-sm text-slate-400 max-w-xl">
            ADMINISTRATOR PRIVILEGES ACTIVE. Monitor city-wide passenger flow, evaluate AI routing interventions, and dispatch feeder fleets.
          </p>
        </div>

        <button 
          onClick={triggerTrafficSpike}
          className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-rose-600/10 transition-all hover:scale-[1.02] active:scale-95"
        >
          <Play className="w-3.5 h-3.5" />
          <span>Simulate Congestion Spike</span>
        </button>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const IconComp = stat.icon;
          return (
            <div key={i} className="glass-panel p-5 rounded-2xl border-slate-800 text-left flex justify-between items-start gap-3">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">{stat.label}</span>
                <div className="text-xl sm:text-2xl font-black text-slate-100 mt-1">{stat.value}</div>
                <p className="text-[10px] text-slate-400 font-semibold">{stat.change}</p>
              </div>
              <div className={`p-2.5 rounded-xl bg-slate-900 border border-slate-800 ${stat.color}`}>
                <IconComp className="w-5 h-5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Charts area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Congestion forecast chart */}
        <div className="lg:col-span-8 glass-panel p-6 rounded-2xl border-slate-800 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-900 pb-3 flex-wrap gap-2">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-slate-300 block">CONGESTION LEVEL FORECAST (24 HOUR CYCLE)</span>
              <p className="text-[10px] text-slate-500">Historical vs AI-guided routing flow curves.</p>
            </div>
            
            <div className="flex items-center gap-4 text-[10px] font-bold">
              <span className="flex items-center gap-1 text-cyan-400">
                <span className="h-2 w-2 rounded-full bg-cyan-500"></span>
                <span>AI Optimized</span>
              </span>
              <span className="flex items-center gap-1 text-slate-500">
                <span className="h-2 w-2 rounded-full bg-slate-700"></span>
                <span>Unmanaged Route</span>
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart 
                data={CONGESTION_FORECAST} 
                margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" />
                <XAxis dataKey="hour" stroke="#475569" fontSize={10} tickLine={false} />
                <YAxis stroke="#475569" fontSize={10} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc', borderRadius: 8, fontSize: 11 }}
                />
                <Line type="monotone" dataKey="optimized" name="AI Rerouted flow" stroke="#22d3ee" strokeWidth={2.5} dot={false} activeDot={{ r: 4 }} />
                <Line type="monotone" dataKey="historical" name="Standard Traffic" stroke="#475569" strokeDasharray="4 4" strokeWidth={1.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Real-time Ticker of AI Interventions */}
        <div className="lg:col-span-4 glass-panel p-6 rounded-2xl border-slate-800 flex flex-col justify-start space-y-4">
          <div className="flex justify-between items-center border-b border-slate-900 pb-2.5">
            <span className="text-xs font-bold text-slate-400">AI OPTIMIZATION LOGS</span>
            <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded animate-pulse">
              Live Feed
            </span>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto max-h-[260px] pr-1">
            {notifications.map((notif) => {
              let alertBorder = 'border-slate-800';
              let alertIconColor = 'text-cyan-400';

              if (notif.type === 'warning') {
                alertBorder = 'border-rose-500/25 bg-rose-500/5';
                alertIconColor = 'text-rose-400';
              } else if (notif.type === 'eco') {
                alertBorder = 'border-emerald-500/25 bg-emerald-500/5';
                alertIconColor = 'text-emerald-400';
              }

              return (
                <div key={notif.id} className={`p-3 rounded-xl border flex gap-2.5 items-start text-xs ${alertBorder}`}>
                  <span className={`text-[10px] font-bold font-mono ${alertIconColor} mt-0.5 flex-shrink-0`}>
                    {notif.time}
                  </span>
                  <p className="text-slate-300 text-left leading-normal">{notif.text}</p>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* High Congestion Corridors list */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border-slate-800 space-y-4 text-left">
          
          <div className="flex justify-between items-center border-b border-slate-900 pb-3">
            <h3 className="text-xs font-bold text-slate-400">CORRIDOR GRIDLOCK INTENSITY</h3>
            <select 
              value={selectedCity} 
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-slate-900 border border-slate-800 text-cyan-400 rounded-lg px-2.5 py-0.5 text-xs font-semibold focus:outline-none cursor-pointer"
            >
              {Object.values(CITIES).map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="space-y-3">
            {activeZones.map((zone, i) => (
              <div key={i} className={`p-3.5 rounded-xl border flex items-center justify-between text-xs ${zone.color}`}>
                <div className="space-y-0.5 text-left">
                  <span className="font-bold text-slate-200 block">{zone.zone}</span>
                  <span className="text-[10px] text-slate-500">Monitored Corridor</span>
                </div>
                <div className="text-right space-y-0.5">
                  <span className="font-bold block">{zone.delay}</span>
                  <span className="text-[9px] uppercase font-bold tracking-wider opacity-80">{zone.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Recommendations logic description */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-2xl border-slate-800 space-y-4">
          <span className="text-xs font-bold text-slate-400 block border-b border-slate-900 pb-2">
            AI DECISION ENGINE SPECIFICATION
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-900/40 border border-slate-850 rounded-xl space-y-2 text-left">
              <span className="font-bold text-cyan-400 flex items-center gap-1.5">
                <Flame className="w-4 h-4" />
                <span>Congestion Prediction</span>
              </span>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                Utilizes recurrent neural networks trained on historical city transit schedules to predict bottle-neck coordinates up to 45 minutes ahead of gridlock occurrence.
              </p>
            </div>

            <div className="p-4 bg-slate-900/40 border border-slate-850 rounded-xl space-y-2 text-left">
              <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                <Leaf className="w-4 h-4" />
                <span>Multi-Modal Routing</span>
              </span>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                Formulates shortest-path networks dynamically linking metro segments and bus lines with available EV feeder scooters, prioritizing carbon offsets.
              </p>
            </div>
          </div>

          <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-400 flex items-start gap-2 text-left">
            <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <p>
              AI interventions are fully automated. Real-time fleet dispatches and reroutes take place on city buses (TSRTC/APSRTC) without human dispatch overhead.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
