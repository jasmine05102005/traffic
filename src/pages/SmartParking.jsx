import React, { useState } from 'react';
import { 
  Search, 
  Car, 
  MapPin, 
  Clock, 
  Navigation, 
  CheckCircle2, 
  Calendar,
  CreditCard,
  QrCode,
  AlertCircle
} from 'lucide-react';
import { CITIES, PARKING_LOTS } from '../data/mockData';
import MapSimulator from '../components/MapSimulator';

export default function SmartParking() {
  const [selectedCity, setSelectedCity] = useState(CITIES.HYDERABAD);
  const [searchQuery, setSearchQuery] = useState('');
  const [parkingSlots, setParkingSlots] = useState(PARKING_LOTS);
  const [selectedLotId, setSelectedLotId] = useState(null);
  const [reservations, setReservations] = useState({}); // { lotId: ticketNumber }
  const [showNavAlert, setShowNavAlert] = useState(null); // lot object

  const lots = parkingSlots[selectedCity] || [];

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredLots = lots.filter(lot => 
    lot.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const reserveSlot = (lotId) => {
    // Check if slots are available
    const lotIndex = lots.findIndex(l => l.id === lotId);
    if (lotIndex === -1) return;
    
    const lot = lots[lotIndex];
    if (lot.available === 0 && !reservations[lotId]) {
      alert("No slots available at this parking lot.");
      return;
    }

    // Toggle Reservation
    if (reservations[lotId]) {
      // Cancel reservation
      const updatedLots = { ...parkingSlots };
      updatedLots[selectedCity][lotIndex].available += 1;
      
      const updatedReservations = { ...reservations };
      delete updatedReservations[lotId];
      
      setParkingSlots(updatedLots);
      setReservations(updatedReservations);
    } else {
      // Book reservation
      const updatedLots = { ...parkingSlots };
      updatedLots[selectedCity][lotIndex].available -= 1;
      
      const ticketId = `PK-${Math.floor(1000 + Math.random() * 9000)}`;
      
      setParkingSlots(updatedLots);
      setReservations({ ...reservations, [lotId]: ticketId });
    }
  };

  const handleMapMarkerClick = (marker, type) => {
    if (type === 'parking') {
      setSelectedLotId(marker.id);
    }
  };

  const handleNavClick = (lot) => {
    setShowNavAlert(lot);
    setTimeout(() => {
      setShowNavAlert(null);
    }, 4500);
  };

  // Get active selected lot
  const selectedLot = lots.find(l => l.id === selectedLotId) || null;

  return (
    <div className="space-y-8 pb-16 text-left">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 text-glow-cyan">
          Smart Parking Reservation
        </h1>
        <p className="text-sm text-slate-400 max-w-xl">
          Search nearby parking lots, check real-time bay availability, and secure your spot with digital reservation before arriving.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left: Parking Lots List & Search */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-start">
          
          {/* Controls Bar */}
          <div className="glass-panel p-4 rounded-xl border-slate-800 flex flex-wrap gap-4 items-center justify-between">
            <select 
              value={selectedCity} 
              onChange={(e) => {
                setSelectedCity(e.target.value);
                setSelectedLotId(null);
              }}
              className="bg-slate-900 border border-slate-800 text-cyan-400 rounded-lg px-2.5 py-1.5 text-xs font-semibold focus:outline-none focus:border-cyan-500 cursor-pointer"
            >
              {Object.values(CITIES).map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            <div className="relative flex-1 max-w-[200px]">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search lots..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full bg-slate-900/60 border border-slate-800 rounded-lg pl-8 pr-2.5 py-1 text-xs focus:outline-none focus:border-cyan-500/50 text-slate-200"
              />
            </div>
          </div>

          {/* Cards Container */}
          <div className="space-y-4 max-h-[550px] overflow-y-auto pr-1">
            {filteredLots.length === 0 ? (
              <div className="glass-panel p-8 text-center text-slate-500 text-xs rounded-xl border-slate-800">
                No parking slots found matching your criteria.
              </div>
            ) : (
              filteredLots.map((lot) => {
                const isSelected = selectedLotId === lot.id;
                const isReserved = reservations[lot.id];
                const pctAvailable = Math.round((lot.available / lot.total) * 100);

                return (
                  <div 
                    key={lot.id}
                    onClick={() => setSelectedLotId(lot.id)}
                    className={`glass-panel p-5 rounded-2xl border transition-all cursor-pointer duration-300 text-left ${
                      isSelected 
                        ? 'border-blue-500 bg-blue-950/5 shadow-[0_0_15px_rgba(59,130,246,0.06)]' 
                        : 'border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <h3 className="text-base font-bold text-slate-100">{lot.name}</h3>
                        <p className="text-xs text-slate-400 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-blue-500" />
                          <span>{lot.type} • Approx. 1.4 km away</span>
                        </p>
                      </div>
                      
                      <div className="text-right">
                        <span className="text-xs font-bold text-emerald-400 block">₹{lot.rate}/hr</span>
                        <span className="text-[10px] text-slate-500 font-semibold block">Flat Tariff</span>
                      </div>
                    </div>

                    {/* Progress Bar indicator */}
                    <div className="mt-4 space-y-1.5">
                      <div className="flex justify-between text-[11px] font-semibold text-slate-400">
                        <span>Slots Available</span>
                        <span className={lot.available > 20 ? 'text-emerald-400' : lot.available > 0 ? 'text-amber-400' : 'text-red-500'}>
                          {lot.available} / {lot.total} free
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            pctAvailable > 40 ? 'bg-emerald-500' : pctAvailable > 0 ? 'bg-amber-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${pctAvailable}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="mt-4 flex items-center justify-between gap-3 pt-4 border-t border-slate-900/60">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNavClick(lot);
                        }}
                        className="px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-800 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-all"
                      >
                        <Navigation className="w-3.5 h-3.5 text-blue-400" />
                        <span>Navigate</span>
                      </button>

                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          reserveSlot(lot.id);
                        }}
                        disabled={lot.available === 0 && !isReserved}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          isReserved 
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30' 
                            : lot.available === 0 
                              ? 'bg-slate-900 border border-slate-800 text-slate-600 cursor-not-allowed'
                              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/10'
                        }`}
                      >
                        {isReserved ? 'Cancel Booking' : lot.available === 0 ? 'Full' : 'Reserve Spot'}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right: Map and Booking Detail Ticket */}
        <div className="lg:col-span-7 space-y-6 flex flex-col justify-start">
          
          {/* Map display */}
          <div className="h-[420px] w-full">
            <MapSimulator 
              city={selectedCity} 
              activeLayer="parking"
              selectedLocation={selectedLot}
              onMarkerClick={handleMapMarkerClick}
            />
          </div>

          {/* Navigation Overlay Alert */}
          {showNavAlert && (
            <div className="glass-panel p-4 rounded-xl border-blue-500/20 bg-blue-500/5 flex items-start gap-3">
              <Navigation className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5 animate-bounce" />
              <div className="text-xs space-y-1">
                <span className="font-bold text-slate-200">Simulating GPS Navigation to {showNavAlert.name}</span>
                <p className="text-slate-400">
                  Driving: 1.4 km • Est. Time: 4 mins • Moderate congestion detected on flyover. Map optimized.
                </p>
              </div>
            </div>
          )}

          {/* Active booking ticket view */}
          {selectedLot && reservations[selectedLot.id] && (
            <div className="glass-panel p-6 rounded-2xl border-emerald-500/20 bg-emerald-500/5 relative overflow-hidden flex flex-col sm:flex-row gap-6 items-center">
              
              {/* Ticket side cutouts */}
              <div className="hidden sm:block absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-950 border border-slate-950"></div>
              <div className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-950 border border-slate-950"></div>

              {/* QR representation */}
              <div className="bg-white p-2.5 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                <QrCode className="w-24 h-24 text-slate-950" />
              </div>

              {/* Info Column */}
              <div className="flex-1 space-y-3 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-between flex-wrap gap-2">
                  <div className="inline-flex items-center gap-1 text-emerald-400 text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Slot Confirmed</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">
                    {reservations[selectedLot.id]}
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="text-base font-extrabold text-slate-100">{selectedLot.name}</h4>
                  <div className="text-xs text-slate-300 grid grid-cols-2 gap-y-1.5 pt-1 max-w-xs">
                    <span className="text-slate-400 font-medium">Spot Status:</span>
                    <span className="font-semibold text-slate-200">Reserved for 45 min</span>
                    <span className="text-slate-400 font-medium">Hourly Rate:</span>
                    <span className="font-semibold text-slate-200">₹{selectedLot.rate}/hr</span>
                    <span className="text-slate-400 font-medium">Billed Mode:</span>
                    <span className="font-semibold text-slate-200 flex items-center gap-1">
                      <CreditCard className="w-3 h-3 text-cyan-400" />
                      Smart Wallet
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Fallback instruction banner */}
          {!selectedLot && (
            <div className="glass-panel p-5 rounded-2xl border-slate-800 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-slate-500 flex-shrink-0" />
              <p className="text-xs text-slate-400">
                Select a parking location from the list or click a blue marker on the map to reserve a parking slot and generate a reservation code.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
