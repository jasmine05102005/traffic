import React, { useState, useEffect } from 'react';
import { 
  Navigation, 
  MapPin, 
  BatteryCharging, 
  Flame, 
  Car, 
  Compass, 
  Layers,
  Map as MapIcon,
  Info
} from 'lucide-react';
import { CITY_COORDINATES, LOCATIONS, PARKING_LOTS, EV_STATIONS, RIDESHARES } from '../data/mockData';

export default function MapSimulator({ 
  city, 
  activeRoute = null, 
  selectedLocation = null, 
  onSelectLocation = null,
  activeLayer = 'all', // 'all', 'parking', 'ev', 'rideshare'
  onMarkerClick = null
}) {
  const [showTraffic, setShowTraffic] = useState(true);
  const [showStations, setShowStations] = useState(true);
  const [showParking, setShowParking] = useState(true);
  const [showRides, setShowRides] = useState(true);
  const [simulatedTime, setSimulatedTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));

  // Keep simulated clock ticking
  useEffect(() => {
    const timer = setInterval(() => {
      setSimulatedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const coords = CITY_COORDINATES[city] || [17.40, 78.40];
  const locations = LOCATIONS[city] || [];
  const parkingLots = PARKING_LOTS[city] || [];
  const evStations = EV_STATIONS[city] || [];
  const rideshares = RIDESHARES[city] || [];

  // Helper to convert lat/lng into SVG coordinates
  // We'll normalize coordinates to fit inside an 800x500 box based on bounds of locations
  const getMapBounds = () => {
    if (locations.length === 0) return { minLat: 16, maxLat: 18, minLng: 78, maxLng: 81 };
    
    // Collect all points to calculate bounds
    let lats = locations.map(l => l.coords[0]);
    let lngs = locations.map(l => l.coords[1]);
    
    // Include parking coordinates
    parkingLots.forEach(p => {
      lats.push(p.coords[0]);
      lngs.push(p.coords[1]);
    });
    
    // Include EV coordinates
    evStations.forEach(e => {
      lats.push(e.coords[0]);
      lngs.push(e.coords[1]);
    });

    const minLat = Math.min(...lats) - 0.015;
    const maxLat = Math.max(...lats) + 0.015;
    const minLng = Math.min(...lngs) - 0.015;
    const maxLng = Math.max(...lngs) + 0.015;

    return { minLat, maxLat, minLng, maxLng };
  };

  const { minLat, maxLat, minLng, maxLng } = getMapBounds();

  const toSvgCoords = (lat, lng) => {
    const width = 800;
    const height = 500;
    const padding = 50;

    // Scale linearly
    const x = padding + ((lng - minLng) / (maxLng - minLng)) * (width - 2 * padding);
    // Invert Y because SVG coordinates go down from top-left
    const y = height - padding - ((lat - minLat) / (maxLat - minLat)) * (height - 2 * padding);

    return { x, y };
  };

  // Check which layer filter is active globally
  const displayParking = showParking && (activeLayer === 'all' || activeLayer === 'parking');
  const displayEV = showStations && (activeLayer === 'all' || activeLayer === 'ev');
  const displayRides = showRides && (activeLayer === 'all' || activeLayer === 'rideshare');

  return (
    <div className="relative glass-panel rounded-2xl overflow-hidden shadow-2xl flex flex-col h-full min-h-[480px]">
      {/* Map Header Controls */}
      <div className="absolute top-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        {/* City Indicator & Time */}
        <div className="glass-panel px-4 py-2 rounded-xl flex items-center gap-3 text-xs md:text-sm font-semibold text-slate-200 pointer-events-auto backdrop-blur-md shadow-lg">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-glow-cyan text-cyan-400 font-mono tracking-wider">{city.toUpperCase()} SIMULATOR</span>
          <span className="h-4 w-[1px] bg-slate-800"></span>
          <span className="font-mono text-slate-300">{simulatedTime}</span>
        </div>

        {/* Toggle Overlays */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <button 
            onClick={() => setShowTraffic(!showTraffic)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
              showTraffic 
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
                : 'bg-slate-900/60 text-slate-400 border border-slate-800'
            }`}
            title="Toggle Traffic Speed Overlay"
          >
            <Flame className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Traffic</span>
          </button>
          
          <button 
            onClick={() => setShowParking(!showParking)}
            disabled={activeLayer !== 'all' && activeLayer !== 'parking'}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
              showParking && (activeLayer === 'all' || activeLayer === 'parking')
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40' 
                : 'bg-slate-900/60 text-slate-500 border border-slate-800 cursor-not-allowed opacity-50'
            }`}
          >
            <Car className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Parking</span>
          </button>

          <button 
            onClick={() => setShowStations(!showStations)}
            disabled={activeLayer !== 'all' && activeLayer !== 'ev'}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
              showStations && (activeLayer === 'all' || activeLayer === 'ev')
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                : 'bg-slate-900/60 text-slate-500 border border-slate-800 cursor-not-allowed opacity-50'
            }`}
          >
            <BatteryCharging className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">EV Chargers</span>
          </button>
        </div>
      </div>

      {/* Compass rose */}
      <div className="absolute bottom-4 right-4 z-10 glass-panel p-2.5 rounded-full flex items-center justify-center pointer-events-none opacity-80">
        <Compass className="w-6 h-6 text-cyan-400/80 animate-[spin_10s_linear_infinite]" />
      </div>

      {/* Map Canvas Box */}
      <div className="flex-1 w-full bg-slate-950/80 relative overflow-hidden bg-grid-pattern flex items-center justify-center min-h-[360px]">
        <svg 
          viewBox="0 0 800 500" 
          className="w-full h-full select-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Defs for gradients, patterns, markers */}
          <defs>
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="50%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            
            <radialGradient id="glow" r="50%" cx="50%" cy="50%">
              <stop offset="0%" stopColor="rgba(6,182,212,0.3)" />
              <stop offset="100%" stopColor="rgba(6,182,212,0)" />
            </radialGradient>
          </defs>

          {/* GRID BASE LINES (Fake Highways) */}
          <g stroke="rgba(255,255,255,0.03)" strokeWidth="2" fill="none">
            <line x1="0" y1="100" x2="800" y2="100" />
            <line x1="0" y1="250" x2="800" y2="250" />
            <line x1="0" y1="400" x2="800" y2="400" />
            <line x1="150" y1="0" x2="150" y2="500" />
            <line x1="400" y1="0" x2="400" y2="500" />
            <line x1="650" y1="0" x2="650" y2="500" />
          </g>

          {/* SIMULATED ROADS / TRANSIT LANES BETWEEN LOCATIONS */}
          {locations.map((loc, i) => {
            // Draw connecting lines to nearby locations to simulate roads
            return locations.slice(i + 1, i + 3).map((target, idx) => {
              const start = toSvgCoords(loc.coords[0], loc.coords[1]);
              const end = toSvgCoords(target.coords[0], target.coords[1]);
              
              // Decide traffic color based on index
              let strokeColor = 'rgba(255,255,255,0.1)';
              let isCongested = false;
              let isModerate = false;

              if (showTraffic) {
                const trafficKey = (i + idx) % 3;
                if (trafficKey === 0) {
                  strokeColor = 'rgba(239, 68, 68, 0.4)'; // Red congestion
                  isCongested = true;
                } else if (trafficKey === 1) {
                  strokeColor = 'rgba(245, 158, 11, 0.35)'; // Amber moderate
                  isModerate = true;
                } else {
                  strokeColor = 'rgba(16, 185, 129, 0.25)'; // Green free flow
                }
              }

              return (
                <g key={`road-${i}-${idx}`}>
                  {/* Outer glow road */}
                  <line 
                    x1={start.x} y1={start.y} x2={end.x} y2={end.y} 
                    stroke={strokeColor} 
                    strokeWidth={isCongested ? "4" : "3"} 
                    strokeLinecap="round" 
                  />
                  {/* Traffic particles moving */}
                  {showTraffic && (
                    <line 
                      x1={start.x} y1={start.y} x2={end.x} y2={end.y} 
                      stroke={isCongested ? "#ef4444" : isModerate ? "#f59e0b" : "#10b981"} 
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      className={isCongested ? "animate-traffic-flow opacity-60" : "animate-traffic-fast opacity-45"}
                    />
                  )}
                </g>
              );
            });
          })}

          {/* ACTIVE ROUTE DRAWING */}
          {activeRoute && activeRoute.segments && (
            <g>
              {activeRoute.segments.map((seg, idx) => {
                if (!seg.coords || seg.coords.length < 2) return null;
                
                // Map all coordinates in segment
                let pathD = '';
                seg.coords.forEach((coord, cIdx) => {
                  const pt = toSvgCoords(coord[0], coord[1]);
                  if (cIdx === 0) pathD += `M ${pt.x} ${pt.y}`;
                  else pathD += ` L ${pt.x} ${pt.y}`;
                });

                // Set color of segment based on travel mode
                let segmentColor = '#3b82f6'; // blue (metro)
                if (seg.mode === 'walk') segmentColor = '#94a3b8'; // gray
                if (seg.mode === 'scooter') segmentColor = '#10b981'; // green
                if (seg.mode === 'bus') segmentColor = '#a855f7'; // purple
                if (seg.mode === 'cab') segmentColor = '#f59e0b'; // orange

                return (
                  <g key={`route-seg-${idx}`}>
                    {/* Shadow under active route */}
                    <path 
                      d={pathD} 
                      fill="none" 
                      stroke="rgba(6, 182, 212, 0.15)" 
                      strokeWidth="10" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                    {/* Main Route Line */}
                    <path 
                      d={pathD} 
                      fill="none" 
                      stroke={segmentColor} 
                      strokeWidth="5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className="transition-all duration-500"
                    />
                    {/* Animated white flow indicator */}
                    <path 
                      d={pathD} 
                      fill="none" 
                      stroke="#ffffff" 
                      strokeWidth="2.5" 
                      strokeLinecap="round"
                      strokeDasharray="10, 20" 
                      className="animate-traffic-fast opacity-80"
                    />
                  </g>
                );
              })}
            </g>
          )}

          {/* INTERACTIVE MARKERS: SMART PARKING */}
          {displayParking && parkingLots.map((park) => {
            const pt = toSvgCoords(park.coords[0], park.coords[1]);
            const isSelected = selectedLocation && selectedLocation.id === park.id;
            
            return (
              <g 
                key={park.id} 
                className="cursor-pointer group"
                onClick={() => onMarkerClick && onMarkerClick(park, 'parking')}
              >
                {/* Glow ring */}
                <circle 
                  cx={pt.x} cy={pt.y} 
                  r={isSelected ? 16 : 10} 
                  fill="rgba(59, 130, 246, 0.15)"
                  className="group-hover:scale-125 transition-transform"
                />
                <circle 
                  cx={pt.x} cy={pt.y} 
                  r={isSelected ? 10 : 7} 
                  fill={park.available === 0 ? '#ef4444' : '#2563eb'} 
                  stroke="#ffffff" 
                  strokeWidth="1.5"
                />
                <text 
                  x={pt.x} y={pt.y + 4} 
                  fill="#ffffff" 
                  fontSize="9.5" 
                  fontWeight="bold" 
                  textAnchor="middle"
                >
                  P
                </text>
                
                {/* Tooltip on hover */}
                <rect 
                  x={pt.x - 65} y={pt.y - 45} 
                  width="130" height="32" 
                  rx="6" 
                  fill="rgba(15, 23, 42, 0.95)" 
                  stroke="rgba(59, 130, 246, 0.4)" 
                  strokeWidth="1"
                  className="opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                />
                <text 
                  x={pt.x} y={pt.y - 32} 
                  fill="#f8fafc" 
                  fontSize="9" 
                  fontWeight="bold" 
                  textAnchor="middle"
                  className="opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                >
                  {park.name.split(' ')[0]} Lot
                </text>
                <text 
                  x={pt.x} y={pt.y - 20} 
                  fill={park.available > 0 ? '#60a5fa' : '#f87171'} 
                  fontSize="8" 
                  textAnchor="middle"
                  className="opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                >
                  {park.available} / {park.total} slots free
                </text>
              </g>
            );
          })}

          {/* INTERACTIVE MARKERS: EV CHARGING STATIONS */}
          {displayEV && evStations.map((ev) => {
            const pt = toSvgCoords(ev.coords[0], ev.coords[1]);
            const isSelected = selectedLocation && selectedLocation.id === ev.id;

            return (
              <g 
                key={ev.id} 
                className="cursor-pointer group"
                onClick={() => onMarkerClick && onMarkerClick(ev, 'ev')}
              >
                {/* Glow ring */}
                <circle 
                  cx={pt.x} cy={pt.y} 
                  r={isSelected ? 16 : 10} 
                  fill="rgba(16, 185, 129, 0.15)"
                  className="group-hover:scale-125 transition-transform"
                />
                <circle 
                  cx={pt.x} cy={pt.y} 
                  r={isSelected ? 10 : 7} 
                  fill={ev.availableFast + ev.availableSlow === 0 ? '#ef4444' : '#10b981'} 
                  stroke="#ffffff" 
                  strokeWidth="1.5"
                />
                
                {/* Lightning Bolt Symbol */}
                <path 
                  d={`M ${pt.x - 2.5} ${pt.y + 4.5} L ${pt.x + 0.5} ${pt.y - 0.5} L ${pt.x - 1.5} ${pt.y - 0.5} L ${pt.x + 2} ${pt.y - 4.5} L ${pt.x - 1} ${pt.y + 0.5} L ${pt.x + 1} ${pt.y + 0.5} Z`}
                  fill="#ffffff"
                />

                {/* Tooltip on hover */}
                <rect 
                  x={pt.x - 65} y={pt.y - 45} 
                  width="130" height="32" 
                  rx="6" 
                  fill="rgba(15, 23, 42, 0.95)" 
                  stroke="rgba(16, 185, 129, 0.4)" 
                  strokeWidth="1"
                  className="opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                />
                <text 
                  x={pt.x} y={pt.y - 32} 
                  fill="#f8fafc" 
                  fontSize="9" 
                  fontWeight="bold" 
                  textAnchor="middle"
                  className="opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                >
                  {ev.name.split(' ')[0]} EV Hub
                </text>
                <text 
                  x={pt.x} y={pt.y - 20} 
                  fill="#34d399" 
                  fontSize="8" 
                  textAnchor="middle"
                  className="opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                >
                  Fast: {ev.availableFast} | Slow: {ev.availableSlow} free
                </text>
              </g>
            );
          })}

          {/* INTERACTIVE MARKERS: ACTIVE RIDESHARES */}
          {displayRides && rideshares.map((ride) => {
            const pt = toSvgCoords(ride.coords[0], ride.coords[1]);
            const isSelected = selectedLocation && selectedLocation.id === ride.id;

            return (
              <g 
                key={ride.id} 
                className="cursor-pointer group"
                onClick={() => onMarkerClick && onMarkerClick(ride, 'rideshare')}
              >
                {/* Pulsing ring for rideshares to show active mobility */}
                <circle 
                  cx={pt.x} cy={pt.y} 
                  r={isSelected ? 18 : 12} 
                  fill="rgba(245, 158, 11, 0.1)"
                  className="animate-pulse"
                />
                <circle 
                  cx={pt.x} cy={pt.y} 
                  r={isSelected ? 10 : 7} 
                  fill="#f59e0b" 
                  stroke="#ffffff" 
                  strokeWidth="1.5"
                />

                <circle cx={pt.x - 2} cy={pt.y + 1} r="1.5" fill="#ffffff" />
                <circle cx={pt.x + 2} cy={pt.y + 1} r="1.5" fill="#ffffff" />
                <path d={`M ${pt.x - 3} ${pt.y - 2} L ${pt.x + 3} ${pt.y - 2} L ${pt.x + 2.5} ${pt.y} L ${pt.x - 2.5} ${pt.y} Z`} fill="#ffffff" />

                {/* Tooltip on hover */}
                <rect 
                  x={pt.x - 65} y={pt.y - 45} 
                  width="130" height="32" 
                  rx="6" 
                  fill="rgba(15, 23, 42, 0.95)" 
                  stroke="rgba(245, 158, 11, 0.4)" 
                  strokeWidth="1"
                  className="opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                />
                <text 
                  x={pt.x} y={pt.y - 32} 
                  fill="#f8fafc" 
                  fontSize="9" 
                  fontWeight="bold" 
                  textAnchor="middle"
                  className="opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                >
                  {ride.driver}
                </text>
                <text 
                  x={pt.x} y={pt.y - 20} 
                  fill="#fbbf24" 
                  fontSize="8" 
                  textAnchor="middle"
                  className="opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                >
                  {ride.vehicle.split(' ')[0]} ({ride.seats} seats)
                </text>
              </g>
            );
          })}

          {/* MAIN CITY TRANSIT NODES (METRO STATIONS & HUBS) */}
          {locations.map((loc) => {
            const pt = toSvgCoords(loc.coords[0], loc.coords[1]);
            const isSelected = selectedLocation && selectedLocation.id === loc.id;
            
            return (
              <g 
                key={loc.id} 
                className="cursor-pointer"
                onClick={() => onSelectLocation && onSelectLocation(loc)}
              >
                {/* Selection outer ring */}
                {isSelected ? (
                  <circle 
                    cx={pt.x} cy={pt.y} 
                    r="15" 
                    fill="none" 
                    stroke="#06b6d4" 
                    strokeWidth="1.5" 
                    className="animate-pulse-cyan"
                  />
                ) : (
                  <circle 
                    cx={pt.x} cy={pt.y} 
                    r="10" 
                    fill="none" 
                    stroke="rgba(6, 182, 212, 0.3)" 
                    strokeWidth="1" 
                    className="hover:stroke-cyan-400 transition-colors"
                  />
                )}

                {/* Base node */}
                <circle 
                  cx={pt.x} cy={pt.y} 
                  r="5" 
                  fill={isSelected ? '#06b6d4' : '#0f172a'} 
                  stroke={isSelected ? '#ffffff' : '#06b6d4'} 
                  strokeWidth="2" 
                />

                {/* Text Label */}
                <text 
                  x={pt.x} y={pt.y - 12} 
                  fill={isSelected ? '#22d3ee' : '#94a3b8'} 
                  fontSize="10" 
                  fontWeight={isSelected ? 'bold' : 'normal'}
                  textAnchor="middle" 
                  className="pointer-events-none transition-all"
                  style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}
                >
                  {loc.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Map Footer Legend */}
      <div className="bg-slate-900/60 border-t border-slate-800 px-4 py-3 text-xs text-slate-400 flex flex-wrap items-center justify-between gap-3 backdrop-blur-md">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-cyan-500 border border-slate-700"></span>
            <span>Metro Node</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-blue-600 border border-slate-700"></span>
            <span>Parking Space</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 border border-slate-700"></span>
            <span>EV Charging Station</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500 border border-slate-700"></span>
            <span>Rideshare Vehicle</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-slate-500">
          <Info className="w-3.5 h-3.5" />
          <span>Click elements on map to select</span>
        </div>
      </div>
    </div>
  );
}
