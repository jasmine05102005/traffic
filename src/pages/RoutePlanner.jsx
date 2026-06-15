import React, { useState, useEffect } from 'react';
import { 
  Navigation, 
  MapPin, 
  Leaf, 
  IndianRupee, 
  Clock, 
  ArrowRight, 
  ArrowRightLeft,
  Flame,
  Info,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { CITIES, LOCATIONS, getDefaultRoute } from '../data/mockData';
import MapSimulator from '../components/MapSimulator';

export default function RoutePlanner() {
  const [selectedCity, setSelectedCity] = useState(CITIES.HYDERABAD);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [routes, setRoutes] = useState([]);
  const [activeRouteIndex, setActiveRouteIndex] = useState(0);
  const [preference, setPreference] = useState('fastest'); // fastest, cheapest, greenest
  const [showNotification, setShowNotification] = useState(false);
  const [loading, setLoading] = useState(false);

  const cityLocations = LOCATIONS[selectedCity] || [];

  // Reset origin/destination when city changes
  useEffect(() => {
    setOrigin('');
    setDestination('');
    setRoutes([]);
    setActiveRouteIndex(0);
  }, [selectedCity]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!origin || !destination) return;
    if (origin === destination) {
      alert("Origin and Destination cannot be the same.");
      return;
    }

    setLoading(true);
    // Simulate AI computing route options
    setTimeout(() => {
      const originLoc = cityLocations.find(l => l.id === origin);
      const destLoc = cityLocations.find(l => l.id === destination);
      const computed = getDefaultRoute(originLoc, destLoc);
      
      setRoutes(computed);
      
      // Default to fastest or first option
      let defaultIdx = 0;
      if (preference === 'cheapest') {
        const cheapIdx = computed.findIndex(r => r.id.includes('cheapest') || r.type.toLowerCase().includes('cheap'));
        if (cheapIdx !== -1) defaultIdx = cheapIdx;
      } else if (preference === 'greenest') {
        const greenIdx = computed.findIndex(r => r.id.includes('greenest') || r.type.toLowerCase().includes('green'));
        if (greenIdx !== -1) defaultIdx = greenIdx;
      }
      
      setActiveRouteIndex(defaultIdx !== -1 ? defaultIdx : 0);
      setLoading(false);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 5000);
    }, 800);
  };

  const swapLocations = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
    if (routes.length > 0) {
      // Re-trigger search after swap
      setRoutes([]);
    }
  };

  const activeRoute = routes[activeRouteIndex] || null;

  return (
    <div className="space-y-8 pb-16 text-left">
      {/* Page Heading */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 text-glow-cyan">
          AI Multi-Modal Route Planner
        </h1>
        <p className="text-sm text-slate-400 max-w-xl">
          Get real-time multi-modal recommendations. The AI Optimizer analyzes live bus and metro frequencies, road congestion, and EV fleet charge levels.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Side: Inputs and Route Cards */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-start">
          
          {/* Input Panel */}
          <div className="glass-panel p-6 rounded-2xl border-slate-800 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-sm font-bold text-slate-200">Select City Hub</span>
              <select 
                value={selectedCity} 
                onChange={(e) => setSelectedCity(e.target.value)}
                className="bg-slate-900 border border-slate-800 text-cyan-400 rounded-lg px-2.5 py-1.5 text-xs font-semibold focus:outline-none focus:border-cyan-500"
              >
                {Object.values(CITIES).map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <form onSubmit={handleSearch} className="space-y-4">
              
              {/* Origin Dropdown */}
              <div className="relative">
                <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block mb-1">Current Location</label>
                <div className="flex items-center bg-slate-900/60 border border-slate-800 rounded-xl px-3 py-2.5 focus-within:border-cyan-500/50">
                  <MapPin className="w-4 h-4 text-cyan-400 mr-2.5 flex-shrink-0" />
                  <select 
                    value={origin} 
                    onChange={(e) => setOrigin(e.target.value)}
                    required
                    className="bg-transparent border-none text-slate-200 text-sm focus:outline-none w-full cursor-pointer"
                  >
                    <option value="" disabled>Select Starting Point...</option>
                    {cityLocations.map(l => (
                      <option key={l.id} value={l.id} disabled={l.id === destination}>{l.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Swap Button Line */}
              <div className="flex justify-center -my-2">
                <button 
                  type="button" 
                  onClick={swapLocations}
                  className="p-2 rounded-full bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800 text-cyan-400 transition-all shadow-md active:scale-95"
                >
                  <ArrowRightLeft className="w-4 h-4 rotate-90" />
                </button>
              </div>

              {/* Destination Dropdown */}
              <div>
                <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block mb-1">Destination</label>
                <div className="flex items-center bg-slate-900/60 border border-slate-800 rounded-xl px-3 py-2.5 focus-within:border-cyan-500/50">
                  <Navigation className="w-4 h-4 text-emerald-400 mr-2.5 flex-shrink-0" />
                  <select 
                    value={destination} 
                    onChange={(e) => setDestination(e.target.value)}
                    required
                    className="bg-transparent border-none text-slate-200 text-sm focus:outline-none w-full cursor-pointer"
                  >
                    <option value="" disabled>Select Destination...</option>
                    {cityLocations.map(l => (
                      <option key={l.id} value={l.id} disabled={l.id === origin}>{l.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Preferences Selector */}
              <div>
                <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block mb-2">AI Optimization Mode</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'fastest', label: 'Fastest', color: 'border-cyan-500/30 text-cyan-400' },
                    { id: 'cheapest', label: 'Cheapest', color: 'border-blue-500/30 text-blue-400' },
                    { id: 'greenest', label: 'Greenest', color: 'border-emerald-500/30 text-emerald-400' }
                  ].map(p => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPreference(p.id)}
                      className={`py-2 px-1 rounded-xl text-xs font-semibold border transition-all text-center ${
                        preference === p.id 
                          ? 'bg-slate-800 border-cyan-500 text-slate-100 shadow-md' 
                          : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit CTA */}
              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 font-bold text-slate-950 flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/10 transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <span className="animate-spin border-2 border-slate-950 border-t-transparent rounded-full w-4 h-4"></span>
                    <span>Analyzing Route Data...</span>
                  </>
                ) : (
                  <>
                    <TrendingUp className="w-4 h-4" />
                    <span>Calculate AI Routes</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Route Options List */}
          {routes.length > 0 && (
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-400 block px-1">AI RECOMMENDED OPTIONS</span>
              <div className="space-y-3">
                {routes.map((route, index) => {
                  const isSelected = activeRouteIndex === index;
                  
                  // Color highlights based on route type
                  let colorClass = 'border-slate-800';
                  let badgeColor = 'bg-slate-800 text-slate-400';
                  
                  if (route.type.toLowerCase().includes('fast')) {
                    colorClass = isSelected ? 'border-cyan-500 bg-cyan-950/10' : 'hover:border-cyan-500/30';
                    badgeColor = 'bg-cyan-500/20 text-cyan-300';
                  } else if (route.type.toLowerCase().includes('cheap')) {
                    colorClass = isSelected ? 'border-blue-500 bg-blue-950/10' : 'hover:border-blue-500/30';
                    badgeColor = 'bg-blue-500/20 text-blue-300';
                  } else {
                    colorClass = isSelected ? 'border-emerald-500 bg-emerald-950/10' : 'hover:border-emerald-500/30';
                    badgeColor = 'bg-emerald-500/20 text-emerald-300';
                  }

                  return (
                    <div 
                      key={route.id}
                      onClick={() => setActiveRouteIndex(index)}
                      className={`glass-panel p-4 rounded-xl border text-left cursor-pointer transition-all duration-300 ${colorClass} ${
                        isSelected ? 'shadow-[0_0_15px_rgba(6,182,212,0.04)]' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase ${badgeColor}`}>
                          {route.type}
                        </span>
                        <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                          <Leaf className="w-3 h-3" />
                          <span>-{route.co2Saved} kg CO2</span>
                        </div>
                      </div>

                      <h4 className="text-sm font-bold text-slate-100 mt-2">{route.title}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">Modes: {route.mode}</p>

                      {/* Route specs banner */}
                      <div className="mt-3 pt-3 border-t border-slate-800/60 grid grid-cols-3 gap-2 text-center text-xs">
                        <div>
                          <span className="text-[9px] font-bold text-slate-500 block uppercase">Travel Time</span>
                          <span className="font-bold text-slate-200 flex items-center justify-center gap-1 mt-0.5">
                            <Clock className="w-3 h-3 text-cyan-400" />
                            {route.duration} m
                          </span>
                        </div>
                        <div className="border-x border-slate-800/60">
                          <span className="text-[9px] font-bold text-slate-500 block uppercase">Est. Cost</span>
                          <span className="font-bold text-slate-200 flex items-center justify-center gap-0.5 mt-0.5">
                            <IndianRupee className="w-3 h-3 text-blue-400" />
                            {route.cost}
                          </span>
                        </div>
                        <div>
                          <span className="text-[9px] font-bold text-slate-500 block uppercase">Eco Score</span>
                          <span className="font-bold text-emerald-400 mt-0.5 block">{route.ecoScore}%</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Simulated Map & Instructions */}
        <div className="lg:col-span-7 space-y-6 flex flex-col justify-start">
          
          {/* Map box */}
          <div className="h-[460px] w-full">
            <MapSimulator 
              city={selectedCity} 
              activeRoute={activeRoute} 
              selectedLocation={
                activeRoute 
                  ? cityLocations.find(l => l.id === origin) 
                  : null
              }
            />
          </div>

          {/* AI Decision overlay / Routing logs */}
          {showNotification && (
            <div className="glass-panel p-4 rounded-xl border-amber-500/20 bg-amber-500/5 flex items-start gap-3">
              <Info className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <span className="font-bold text-slate-200">AI Congestion Avoidance Engaged</span>
                <p className="text-slate-400">
                  Rerouted to include {selectedCity === CITIES.HYDERABAD ? 'HITEC Metro' : 'MG Road Hub'} to avoid a 12-minute delay detected on primary roads. Transit modes synchronized.
                </p>
              </div>
            </div>
          )}

          {/* Detailed Navigation Segment Steps */}
          {activeRoute && (
            <div className="glass-panel p-6 rounded-2xl border-slate-800 space-y-4">
              <span className="text-xs font-bold text-slate-400 block border-b border-slate-800 pb-2">
                STEP-BY-STEP TRANSIT INSTRUCTIONS
              </span>
              
              <div className="relative border-l border-slate-800 pl-6 space-y-6">
                {activeRoute.segments.map((seg, sIdx) => {
                  let modeColor = 'bg-blue-500';
                  let modeLabel = 'Walk';

                  if (seg.mode === 'metro') { modeColor = 'bg-indigo-600'; modeLabel = 'Metro'; }
                  if (seg.mode === 'scooter') { modeColor = 'bg-emerald-500'; modeLabel = 'E-Scooter'; }
                  if (seg.mode === 'bus') { modeColor = 'bg-purple-500'; modeLabel = 'City Bus'; }
                  if (seg.mode === 'cab') { modeColor = 'bg-amber-500'; modeLabel = 'EV Cab'; }

                  return (
                    <div key={sIdx} className="relative group text-left">
                      {/* Pulsing indicator node */}
                      <span className={`absolute -left-[30px] top-0.5 w-4 h-4 rounded-full border-[3px] border-slate-950 ${modeColor} shadow-md`}></span>
                      
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-extrabold text-slate-200">{modeLabel}</span>
                          <span className="text-[10px] text-slate-500 font-bold bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded">
                            {seg.duration} min
                          </span>
                        </div>
                        {seg.cost > 0 && (
                          <span className="text-xs font-bold text-slate-400 flex items-center">
                            <IndianRupee className="w-3 h-3 text-slate-500" />
                            {seg.cost}
                          </span>
                        )}
                      </div>
                      
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{seg.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
