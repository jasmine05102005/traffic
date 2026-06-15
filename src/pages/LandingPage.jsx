import React from 'react';
import { 
  ArrowRight, 
  Clock, 
  Leaf, 
  Users, 
  MapPin, 
  AlertTriangle, 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  AlertOctagon,
  Sparkles,
  Smartphone
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const stats = [
  { id: 1, label: 'Daily Commute Time Saved', value: '28%', icon: Clock, color: 'text-cyan-400' },
  { id: 2, label: 'Carbon Emissions Offset', value: '18.5 Tons', icon: Leaf, color: 'text-emerald-400' },
  { id: 3, label: 'Active Smart Commuters', value: '45K+', icon: Users, color: 'text-blue-400' },
  { id: 4, label: 'Connected Modes', value: '7 / 7', icon: MapPin, color: 'text-purple-400' },
];

const problems = [
  { title: 'Traffic Congestion', text: 'Average speeds in Indian metros drop below 15 km/h during peak hours, wasting billions of hours yearly.', icon: AlertOctagon },
  { title: 'Parking Struggles', text: 'Commuters spend 15-20 minutes circling blocks to find parking, leading to fuel waste and frustration.', icon: AlertTriangle },
  { title: 'Air Pollution', text: 'Transportation causes over 30% of urban air pollution, raising respiratory health risks in cities.', icon: AlertTriangle },
  { title: 'Rising Fuel Expenses', text: 'Inefficient routing and traffic delays inflate monthly household fuel bills by up to 25%.', icon: AlertOctagon },
  { title: 'Last-Mile Disconnections', text: 'Exiting a metro station often leaves commuters stranded or dependent on expensive, uncoordinated local rides.', icon: AlertTriangle },
  { title: 'Commute Stress & Burnout', text: 'Uncertain schedules, long delays, and unsafe routes degrade productivity and mental well-being.', icon: AlertTriangle },
];

const solutions = [
  { title: 'Faster Multi-Modal Routes', text: 'Intelligently combines Metro, Buses, and EV E-scooters dynamically matching live traffic schedules.', icon: Zap, color: 'from-cyan-500/20 to-blue-500/20 border-cyan-500/30' },
  { title: 'Lower Transit Cost', text: 'Integrates cheap public transport lines with shared ride models, slashing travel budgets.', icon: TrendingUp, color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30' },
  { title: 'Greener Sustainability Tracking', text: 'Suggests carbon-optimized routes, rewards eco-friendly choices, and shows live tree-planting offsets.', icon: Leaf, color: 'from-emerald-500/20 to-cyan-500/20 border-emerald-500/30' },
  { title: 'Enhanced Safety Network', text: 'Includes a one-click SOS panic trigger, live route safety scoring, and trusted contact sharing.', icon: ShieldCheck, color: 'from-blue-500/20 to-purple-500/20 border-blue-500/30' },
];

export default function LandingPage() {
  return (
    <div className="space-y-24 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 md:pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Copy */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-semibold text-cyan-400 tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Smart City Pilot Phase 1 Live</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              SmartCommute AI – <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 text-glow-cyan">
                Smarter Travel for Smarter Cities
              </span>
            </h1>
            
            <p className="text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
              AI-powered mobility platform that integrates public transport, ride sharing, parking, and EV services into one seamless, green, and cost-effective commuting experience.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link 
                to="/route-planner" 
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 font-semibold text-slate-950 flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02]"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                to="/sustainability" 
                className="px-6 py-3 rounded-xl bg-slate-900/80 border border-slate-700 hover:border-cyan-500/50 hover:bg-slate-900 text-slate-200 font-semibold transition-all hover:scale-[1.02]"
              >
                Explore Features
              </Link>
            </div>

            {/* Indian City Tags */}
            <div className="pt-4 flex items-center gap-2 text-xs text-slate-400">
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800">Hyderabad (Secunderabad - Hitec City)</span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800">Vijayawada (Benz Circle)</span>
            </div>
          </div>

          {/* Hero Illustration / Preview */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Background glowing rings */}
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 rounded-full blur-3xl opacity-60"></div>
            
            {/* Phone Frame Simulator */}
            <div className="relative w-72 h-[560px] bg-slate-950 rounded-[40px] border-[6px] border-slate-800 shadow-2xl overflow-hidden flex flex-col p-1.5">
              {/* Dynamic island notch */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-2xl z-20 flex items-center justify-center">
                <div className="w-3.5 h-3.5 rounded-full bg-slate-950 absolute left-3"></div>
                <div className="w-12 h-1 bg-slate-950 rounded-full"></div>
              </div>
              
              {/* Internal Screen mockup */}
              <div className="flex-1 bg-slate-900 rounded-[32px] overflow-hidden flex flex-col pt-10 pb-4 px-4 space-y-4">
                {/* Micro Header */}
                <div className="flex justify-between items-center text-[10px] text-slate-400 font-medium">
                  <span className="flex items-center gap-1">
                    <Smartphone className="w-3 h-3 text-cyan-400" />
                    <span>SmartCommute app</span>
                  </span>
                  <span>9:41 AM</span>
                </div>

                {/* Simulated Map Route card */}
                <div className="glass-panel p-3 rounded-2xl border-cyan-500/30 shadow-inner">
                  <div className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider flex items-center justify-between">
                    <span>AI Route Suggestion</span>
                    <span className="bg-cyan-500/20 px-1.5 py-0.5 rounded text-cyan-300">Fastest</span>
                  </div>
                  <div className="text-sm font-extrabold text-slate-100 mt-1">Metro + E-Scooter</div>
                  <div className="text-[11px] text-slate-300 mt-0.5">Secunderabad → HITEC City</div>
                  
                  {/* Route progress visual */}
                  <div className="mt-3 flex items-center justify-between gap-1 text-[9px] font-mono text-slate-400">
                    <div className="flex flex-col items-center">
                      <span className="w-3.5 h-3.5 rounded-full bg-blue-500 border border-slate-900 flex items-center justify-center text-[7px] text-white">W</span>
                      <span className="mt-0.5 text-slate-400">Walk</span>
                    </div>
                    <div className="h-0.5 flex-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
                    <div className="flex flex-col items-center">
                      <span className="w-3.5 h-3.5 rounded-full bg-indigo-600 border border-slate-900 flex items-center justify-center text-[7px] text-white">M</span>
                      <span className="mt-0.5 text-slate-400">Metro</span>
                    </div>
                    <div className="h-0.5 flex-1 bg-gradient-to-r from-indigo-500 to-emerald-500"></div>
                    <div className="flex flex-col items-center">
                      <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 border border-slate-900 flex items-center justify-center text-[7px] text-white">S</span>
                      <span className="mt-0.5 text-slate-400">Scooter</span>
                    </div>
                  </div>
                </div>

                {/* Savings Cards */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="bg-emerald-500/10 border border-emerald-500/20 p-2.5 rounded-xl">
                    <div className="text-[9px] text-emerald-400 font-semibold">CO2 OFFSET</div>
                    <div className="text-base font-bold text-slate-100">1.8 kg</div>
                    <div className="text-[8px] text-emerald-500/80 font-bold">92% eco score</div>
                  </div>
                  <div className="bg-cyan-500/10 border border-cyan-500/20 p-2.5 rounded-xl">
                    <div className="text-[9px] text-cyan-400 font-semibold">EST. TIME</div>
                    <div className="text-base font-bold text-slate-100">26 min</div>
                    <div className="text-[8px] text-cyan-500/80 font-bold">Save 22 mins</div>
                  </div>
                </div>

                {/* Interactive Map Visual */}
                <div className="flex-1 bg-slate-950/80 rounded-2xl relative overflow-hidden border border-slate-800 flex items-center justify-center p-2">
                  <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]"></div>
                  
                  {/* Drawing paths */}
                  <svg viewBox="0 0 100 100" className="w-full h-full stroke-cyan-500/30" strokeWidth="2" fill="none">
                    <path d="M 10 30 Q 30 10 50 40 T 90 20" />
                    <path d="M 10 80 L 40 60 Q 60 90 90 70" />
                    {/* Active route */}
                    <path d="M 10 30 L 40 60 L 90 70" stroke="#06b6d4" strokeWidth="3.5" strokeLinecap="round" className="animate-[dash_3s_linear_infinite]" strokeDasharray="5,5" />
                    
                    {/* Pulsing Start & End Markers */}
                    <circle cx="10" cy="30" r="4" fill="#3b82f6" stroke="#ffffff" strokeWidth="1" />
                    <circle cx="90" cy="70" r="4" fill="#10b981" stroke="#ffffff" strokeWidth="1" />
                  </svg>
                  
                  <span className="absolute bottom-2 left-2 text-[8px] text-slate-500 font-mono">LIVE MAP REPLICATOR</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="glass-panel py-8 px-6 rounded-3xl border-slate-800">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <div key={stat.id} className="space-y-2 p-2">
                <div className="inline-flex p-3 rounded-2xl bg-slate-900/80 border border-slate-800 mb-1">
                  <IconComponent className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">{stat.value}</div>
                <div className="text-xs sm:text-sm text-slate-400 font-medium">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. PROBLEM STATEMENT SECTION */}
      <section className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-cyan-400">Urban Transit Gridlocks</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-100">
            The Commute Challenges in Indian Cities
          </h3>
          <p className="text-slate-400 text-sm sm:text-base">
            Rapid urbanization, fragmented public transit schedules, and fossil fuel dependencies are clogging our cities and impacting commuters daily.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((problem, i) => {
            const IconComp = problem.icon;
            return (
              <div 
                key={i} 
                className="glass-panel p-6 rounded-2xl border-rose-500/10 hover:border-rose-500/25 transition-all duration-300 hover:shadow-[0_0_20px_rgba(244,63,94,0.03)] group text-left"
              >
                <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 w-fit mb-4 group-hover:scale-110 transition-transform">
                  <IconComp className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-slate-100 mb-2">{problem.title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed">{problem.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. SOLUTION SECTION */}
      <section className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-400">INTELLIGENT INTEGRATION</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-100">
            How SmartCommute AI Solves This
          </h3>
          <p className="text-slate-400 text-sm sm:text-base">
            By connecting metro, bus networks, private rideshare options, and battery-swapping EV hubs under a single AI-optimized brain.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {solutions.map((sol, i) => {
            const IconComp = sol.icon;
            return (
              <div 
                key={i} 
                className={`glass-panel p-8 rounded-2xl bg-gradient-to-br ${sol.color} border transition-all duration-300 hover:shadow-lg flex gap-5 text-left items-start`}
              >
                <div className="p-3 rounded-xl bg-slate-950/80 text-cyan-400 border border-slate-800 shadow-md">
                  <IconComp className="w-6 h-6 text-cyan-400" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-bold text-slate-100">{sol.title}</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">{sol.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. SDG LINKAGES SECTION */}
      <section className="glass-panel p-8 md:p-12 rounded-3xl border-slate-800 relative overflow-hidden bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.06),transparent_50%)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4 text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
              Aligning with United Nations Sustainable Development Goals
            </h3>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl">
              SmartCommute AI is designed directly to target and progress SDG Goal 11 (Sustainable Cities and Communities) and SDG Goal 13 (Climate Action) in urban India by promoting public transit usage and calculating direct carbon emissions offsets.
            </p>
          </div>
          
          <div className="lg:col-span-4 flex flex-row lg:flex-col sm:flex-row gap-4 justify-center items-center">
            {/* SDG 11 Badge */}
            <div className="flex items-center gap-4 bg-orange-600/90 border border-orange-500/30 p-4 rounded-2xl w-full max-w-[240px] shadow-lg">
              <div className="text-2xl font-black text-white font-mono bg-slate-900/40 p-2 rounded-xl">11</div>
              <div className="text-left text-xs font-extrabold text-white leading-tight">
                SUSTAINABLE CITIES<br />AND COMMUNITIES
              </div>
            </div>
            
            {/* SDG 13 Badge */}
            <div className="flex items-center gap-4 bg-emerald-700/90 border border-emerald-600/30 p-4 rounded-2xl w-full max-w-[240px] shadow-lg">
              <div className="text-2xl font-black text-white font-mono bg-slate-900/40 p-2 rounded-xl">13</div>
              <div className="text-left text-xs font-extrabold text-white leading-tight">
                CLIMATE<br />ACTION
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
