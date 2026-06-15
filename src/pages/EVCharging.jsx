import React, { useState } from 'react';
import { 
  Zap, 
  BatteryCharging, 
  MapPin, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Battery, 
  Plus, 
  Info,
  Check
} from 'lucide-react';
import { CITIES, EV_STATIONS } from '../data/mockData';
import MapSimulator from '../components/MapSimulator';

export default function EVCharging() {
  const [selectedCity, setSelectedCity] = useState(CITIES.HYDERABAD);
  const [evHubs, setEvHubs] = useState(EV_STATIONS);
  const [filterType, setFilterType] = useState('all'); // all, fast, swap
  const [selectedHubId, setSelectedHubId] = useState(null);
  
  // Booking state
  const [chargerType, setChargerType] = useState('fast'); // fast, slow
  const [bookingTime, setBookingTime] = useState('');
  const [bookings, setBookings] = useState({}); // { hubId: { ticketId, type, time } }

  const hubs = evHubs[selectedCity] || [];

  const filteredHubs = hubs.filter(hub => {
    if (filterType === 'fast') return hub.fastChargers > 0;
    if (filterType === 'swap') return hub.batterySwapAvailable;
    return true;
  });

  const handleBookSlot = (hubId) => {
    if (!bookingTime) {
      alert("Please select a charging time slot.");
      return;
    }

    const hubIndex = hubs.findIndex(h => h.id === hubId);
    if (hubIndex === -1) return;

    const hub = hubs[hubIndex];
    const updatedHubs = { ...evHubs };
    const updatedBookings = { ...bookings };

    if (chargerType === 'fast') {
      if (hub.availableFast === 0) {
        alert("No Fast charging ports available for booking.");
        return;
      }
      updatedHubs[selectedCity][hubIndex].availableFast -= 1;
    } else {
      if (hub.availableSlow === 0) {
        alert("No Slow charging ports available for booking.");
        return;
      }
      updatedHubs[selectedCity][hubIndex].availableSlow -= 1;
    }

    const ticketId = `EV-${Math.floor(1000 + Math.random() * 9000)}`;
    updatedBookings[hubId] = {
      ticketId,
      type: chargerType === 'fast' ? 'Fast DC Port (CCS2)' : 'Slow AC Port (Type 2)',
      time: bookingTime
    };

    setEvHubs(updatedHubs);
    setBookings(updatedBookings);
  };

  const handleCancelBooking = (hubId) => {
    const hubIndex = hubs.findIndex(h => h.id === hubId);
    if (hubIndex === -1 || !bookings[hubId]) return;

    const booking = bookings[hubId];
    const updatedHubs = { ...evHubs };
    const updatedBookings = { ...bookings };

    if (booking.type.includes('Fast')) {
      updatedHubs[selectedCity][hubIndex].availableFast += 1;
    } else {
      updatedHubs[selectedCity][hubIndex].availableSlow += 1;
    }

    delete updatedBookings[hubId];

    setEvHubs(updatedHubs);
    setBookings(updatedBookings);
  };

  const handleMapMarkerClick = (marker, type) => {
    if (type === 'ev') {
      setSelectedHubId(marker.id);
    }
  };

  const selectedHub = hubs.find(h => h.id === selectedHubId) || null;

  return (
    <div className="space-y-8 pb-16 text-left">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 text-glow-cyan">
          EV Grid & Battery Swap Station finder
        </h1>
        <p className="text-sm text-slate-400 max-w-xl">
          Track nearby fast chargers, schedule charging reservations, or check hot-swappable battery inventory level at your local commute feeders.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Side: Filter and Station List */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-start">
          
          {/* Controls Bar */}
          <div className="glass-panel p-4 rounded-xl border-slate-800 flex flex-wrap gap-4 items-center justify-between">
            <select 
              value={selectedCity} 
              onChange={(e) => {
                setSelectedCity(e.target.value);
                setSelectedHubId(null);
              }}
              className="bg-slate-900 border border-slate-800 text-cyan-400 rounded-lg px-2.5 py-1.5 text-xs font-semibold focus:outline-none focus:border-cyan-500 cursor-pointer animate-none"
            >
              {Object.values(CITIES).map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            <div className="flex items-center gap-1.5">
              {[
                { id: 'all', label: 'All Stations' },
                { id: 'fast', label: 'Fast DC' },
                { id: 'swap', label: 'Swapping' }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setFilterType(f.id)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold border transition-all ${
                    filterType === f.id 
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400' 
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Hub list cards */}
          <div className="space-y-4 max-h-[550px] overflow-y-auto pr-1">
            {filteredHubs.length === 0 ? (
              <div className="glass-panel p-8 text-center text-slate-500 text-xs rounded-xl">
                No EV stations found matching this criteria.
              </div>
            ) : (
              filteredHubs.map((hub) => {
                const isSelected = selectedHubId === hub.id;
                const isBooked = bookings[hub.id];

                return (
                  <div 
                    key={hub.id}
                    onClick={() => setSelectedHubId(hub.id)}
                    className={`glass-panel p-5 rounded-2xl border transition-all cursor-pointer duration-300 text-left ${
                      isSelected 
                        ? 'border-emerald-500 bg-emerald-950/5 shadow-[0_0_15px_rgba(16,185,129,0.06)]' 
                        : 'border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <h3 className="text-base font-bold text-slate-100">{hub.name}</h3>
                        <p className="text-xs text-slate-400 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                          <span>1.6 km away • Verified Station</span>
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-bold text-emerald-400 block">₹{hub.rate}/kWh</span>
                        <span className="text-[9px] text-slate-500 font-semibold block">Grid rate</span>
                      </div>
                    </div>

                    {/* Charger statistics grids */}
                    <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-slate-900/60">
                      <div className="bg-slate-950/40 p-2.5 rounded-xl border border-slate-900">
                        <div className="text-[9px] font-bold text-slate-500 uppercase flex items-center gap-1">
                          <Zap className="w-3 h-3 text-cyan-400" />
                          <span>Fast Chargers</span>
                        </div>
                        <span className="text-sm font-bold text-slate-200 mt-1 block">
                          {hub.availableFast} / {hub.fastChargers} free
                        </span>
                      </div>

                      <div className="bg-slate-950/40 p-2.5 rounded-xl border border-slate-900">
                        <div className="text-[9px] font-bold text-slate-500 uppercase flex items-center gap-1">
                          <BatteryCharging className="w-3 h-3 text-slate-400" />
                          <span>Slow Chargers</span>
                        </div>
                        <span className="text-sm font-bold text-slate-200 mt-1 block">
                          {hub.availableSlow} / {hub.slowChargers} free
                        </span>
                      </div>
                    </div>

                    {/* Swap indicator and actions info */}
                    <div className="mt-4 flex items-center justify-between text-xs text-slate-400 pt-1">
                      <div className="flex items-center gap-1.5">
                        <Battery className={`w-4 h-4 ${hub.batterySwapAvailable ? 'text-emerald-400' : 'text-slate-600'}`} />
                        <span className="text-[10px] font-semibold">
                          {hub.batterySwapAvailable ? 'Battery Swapping Ready' : 'No Swap Stock'}
                        </span>
                      </div>
                      
                      {isBooked && (
                        <span className="text-[9px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          <span>Reserved</span>
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Side: Map and Reservation Portal */}
        <div className="lg:col-span-7 space-y-6 flex flex-col justify-start">
          
          {/* Map display */}
          <div className="h-[420px] w-full">
            <MapSimulator 
              city={selectedCity} 
              activeLayer="ev"
              selectedLocation={selectedHub}
              onMarkerClick={handleMapMarkerClick}
            />
          </div>

          {/* Interactive Booking Portal Panel */}
          {selectedHub && (
            <div className="glass-panel p-6 rounded-2xl border-slate-800 text-left space-y-5">
              
              <div className="flex items-center justify-between border-b border-slate-850 pb-3">
                <div className="space-y-0.5">
                  <h3 className="text-base font-bold text-slate-100">Schedule Charging at Hub</h3>
                  <p className="text-xs text-slate-400">{selectedHub.name}</p>
                </div>
                
                {bookings[selectedHub.id] && (
                  <button 
                    onClick={() => handleCancelBooking(selectedHub.id)}
                    className="text-xs font-bold text-rose-400 hover:underline"
                  >
                    Release Slot
                  </button>
                )}
              </div>

              {bookings[selectedHub.id] ? (
                /* Confirmed Booking details card */
                <div className="bg-emerald-500/5 border border-emerald-500/20 p-4 rounded-xl flex gap-4 items-start">
                  <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 flex-shrink-0 mt-0.5">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-slate-100 font-bold">Slot Confirmation Code</span>
                      <span className="font-mono text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded">
                        {bookings[selectedHub.id].ticketId}
                      </span>
                    </div>
                    <p className="text-slate-400 mt-1">
                      Reserved Port: <strong className="text-slate-300">{bookings[selectedHub.id].type}</strong>
                    </p>
                    <p className="text-slate-400">
                      Scheduled Window: <strong className="text-slate-300">{bookings[selectedHub.id].time} Today</strong>
                    </p>
                  </div>
                </div>
              ) : (
                /* Booking inputs */
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-end">
                  
                  {/* Select Charger Type */}
                  <div className="md:col-span-4 space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-slate-500">Charger Type</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button 
                        type="button" 
                        onClick={() => setChargerType('fast')}
                        className={`py-2 px-1 rounded-xl text-xs font-semibold border transition-all ${
                          chargerType === 'fast' 
                            ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' 
                            : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        Fast (DC)
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setChargerType('slow')}
                        className={`py-2 px-1 rounded-xl text-xs font-semibold border transition-all ${
                          chargerType === 'slow' 
                            ? 'bg-slate-900 border-emerald-500/50 text-emerald-300' 
                            : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        Slow (AC)
                      </button>
                    </div>
                  </div>

                  {/* Select Time slot */}
                  <div className="md:col-span-5 space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-slate-500">Scheduled Time Slot</label>
                    <select 
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 text-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-500/50"
                    >
                      <option value="">Select Time Slot...</option>
                      <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                      <option value="12:30 PM - 01:30 PM">12:30 PM - 01:30 PM</option>
                      <option value="03:00 PM - 04:00 PM">03:00 PM - 04:00 PM</option>
                      <option value="06:30 PM - 07:30 PM">06:30 PM - 07:30 PM</option>
                    </select>
                  </div>

                  {/* Submit Booking */}
                  <div className="md:col-span-3">
                    <button 
                      onClick={() => handleBookSlot(selectedHub.id)}
                      className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/10 transition-all flex items-center justify-center gap-1 hover:scale-[1.02] active:scale-95"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Confirm Book</span>
                    </button>
                  </div>

                </div>
              )}
            </div>
          )}

          {/* Instruction helper */}
          {!selectedHub && (
            <div className="glass-panel p-5 rounded-2xl border-slate-800 flex items-center gap-3">
              <Info className="w-5 h-5 text-slate-500 flex-shrink-0" />
              <p className="text-xs text-slate-400">
                Click an EV station from the directory list or tap an EV icon marker directly on the interactive map simulator above to book charging ports.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
