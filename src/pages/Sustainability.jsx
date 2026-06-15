import React from 'react';
import { 
  Leaf, 
  IndianRupee, 
  Flame, 
  Compass, 
  Award, 
  ShieldCheck, 
  TrendingUp, 
  Sparkles,
  Zap,
  Info
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell, 
  Legend,
  CartesianGrid
} from 'recharts';
import { TRANSIT_SHARE, MONTHLY_CARBON_SAVINGS } from '../data/mockData';

const userStats = [
  { label: 'Total Green Trips', value: '42', desc: 'Active commute loops', color: 'border-cyan-500/20' },
  { label: 'Money Saved', value: '₹1,480', desc: 'Vs. private cabs/fuel', color: 'border-blue-500/20' },
  { label: 'Fuel Saved', value: '18.4 Liters', desc: 'Avoided congestion idle', color: 'border-amber-500/20' },
  { label: 'Carbon Reduced', value: '78.5 kg', desc: 'Offset directly in app', color: 'border-emerald-500/20' }
];

const badges = [
  { title: 'Eco Traveler', desc: 'Avoided 50kg carbon emissions.', icon: Leaf, unlocked: true, date: 'Unlocked 3 days ago', color: 'text-emerald-400 border-emerald-500/25 bg-emerald-500/5' },
  { title: 'Carbon Saver', desc: 'Completed 15 consecutive EV rides.', icon: Award, unlocked: true, date: 'Unlocked last week', color: 'text-cyan-400 border-cyan-500/25 bg-cyan-500/5' },
  { title: 'Green Commuter', desc: 'Commute score above 90 for 7 days.', icon: Sparkles, unlocked: false, date: 'Progress: 85%', color: 'text-slate-500 border-slate-800 bg-slate-900/40' }
];

export default function Sustainability() {
  
  // Custom Pie Chart Label
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="#020617" fontSize="10" fontWeight="bold" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="space-y-8 pb-16 text-left">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 text-glow-cyan">
          Sustainability & Carbon Dashboard
        </h1>
        <p className="text-sm text-slate-400 max-w-xl">
          Track your personal carbon footprint, monitor travel analytics, and check gamified badges unlocked through green transport choices.
        </p>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {userStats.map((stat, i) => (
          <div key={i} className={`glass-panel p-5 rounded-2xl border ${stat.color} text-left`}>
            <span className="text-[10px] font-bold text-slate-500 uppercase block">{stat.label}</span>
            <div className="text-xl sm:text-2xl font-black text-slate-100 mt-1">{stat.value}</div>
            <p className="text-[10px] text-slate-400 mt-1 leading-none">{stat.desc}</p>
          </div>
        ))}
      </div>

      {/* Main Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Monthly Carbon Savings Chart */}
        <div className="lg:col-span-8 glass-panel p-6 rounded-2xl border-slate-800 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-900 pb-3 flex-wrap gap-2">
            <span className="text-xs font-bold text-slate-300">CARBON MITIGATION FORECAST (KG CO2 OFFSET)</span>
            <div className="flex items-center gap-3 text-[10px] font-bold">
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                <span>My Offset</span>
              </span>
              <span className="flex items-center gap-1 text-slate-500">
                <span className="h-2 w-2 rounded-full bg-slate-700"></span>
                <span>Municipal Target</span>
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart 
                data={MONTHLY_CARBON_SAVINGS} 
                margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorOffset" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#475569" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#475569" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" />
                <XAxis dataKey="month" stroke="#475569" fontSize={10} tickLine={false} />
                <YAxis stroke="#475569" fontSize={10} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc', borderRadius: 8, fontSize: 11 }}
                />
                <Area type="monotone" dataKey="co2" name="My CO2 Offset" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorOffset)" />
                <Area type="monotone" dataKey="target" name="Target CO2" stroke="#475569" strokeDasharray="5 5" fillOpacity={1} fill="url(#colorTarget)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Green Travel Score Circle */}
        <div className="lg:col-span-4 glass-panel p-6 rounded-2xl border-slate-800 flex flex-col justify-between items-center text-center space-y-4">
          <span className="text-xs font-bold text-slate-400 block border-b border-slate-900 pb-2 w-full">
            GREEN TRAVEL SCORE
          </span>

          {/* Circle Visualization */}
          <div className="relative h-36 w-36 flex items-center justify-center">
            {/* Pulsing ring outer */}
            <div className="absolute inset-0 rounded-full border border-emerald-500/20 animate-ping opacity-75"></div>
            
            {/* Base Ring border */}
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="72" cy="72" r="64" stroke="rgba(15,23,42,0.6)" strokeWidth="8" fill="transparent" />
              <circle 
                cx="72" cy="72" r="64" 
                stroke="#10b981" strokeWidth="8" fill="transparent" 
                strokeDasharray={400} 
                strokeDashoffset={400 - (400 * 85) / 100}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>

            {/* Inner Score text */}
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-slate-100 tracking-tighter">85</span>
              <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest">Percentile</span>
            </div>
          </div>

          <div className="text-xs text-slate-400 leading-relaxed px-1">
            <span className="text-slate-200 font-bold block mb-0.5">Top 15% in Hyderabad</span>
            Your daily commute offsets more carbon than 85% of active corridor travelers this month. Keep it up!
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Weekly Transit Share Pie Chart */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-2xl border-slate-800 space-y-4">
          <span className="text-xs font-bold text-slate-400 block border-b border-slate-900 pb-2">
            WEEKLY TRANSIT MODE DISTRIBUTION (%)
          </span>

          <div className="h-60 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={TRANSIT_SHARE}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={75}
                  dataKey="value"
                >
                  {TRANSIT_SHARE.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc', borderRadius: 8, fontSize: 11 }}
                />
                <Legend 
                  layout="vertical" 
                  align="right" 
                  verticalAlign="middle"
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ fontSize: 10, color: '#94a3b8' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Unlocked Badges list */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border-slate-800 space-y-4">
          <span className="text-xs font-bold text-slate-400 block border-b border-slate-900 pb-2">
            UNLOCKED ECO ACHIEVEMENTS
          </span>

          <div className="space-y-4">
            {badges.map((badge, i) => {
              const IconComp = badge.icon;
              return (
                <div key={i} className={`p-4 rounded-xl border flex gap-3.5 items-center ${badge.color}`}>
                  <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-850 flex-shrink-0">
                    <IconComp className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="space-y-0.5 text-left flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-slate-100">{badge.title}</h4>
                      <span className="text-[8px] text-slate-500 font-bold tracking-wider uppercase">
                        {badge.date}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-normal">{badge.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
