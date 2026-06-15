import React, { useState } from 'react';
import { 
  Users, 
  Car, 
  MapPin, 
  Clock, 
  Plus, 
  Check, 
  IndianRupee, 
  Star,
  Zap,
  TrendingUp,
  X,
  ShieldCheck,
  Leaf
} from 'lucide-react';
import { CITIES, RIDESHARES } from '../data/mockData';
import MapSimulator from '../components/MapSimulator';

export default function RideSharing() {
  const [selectedCity, setSelectedCity] = useState(CITIES.HYDERABAD);
  const [rideOffers, setRideOffers] = useState(RIDESHARES);
  const [joinedRides, setJoinedRides] = useState({}); // { rideId: true }
  
  // Search state
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [time, setTime] = useState('');

  // Offer Ride modal state
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [offerName, setOfferName] = useState('');
  const [offerVehicle, setOfferVehicle] = useState('Tata Nexon EV');
  const [offerRoute, setOfferRoute] = useState('');
  const [offerCost, setOfferCost] = useState('');
  const [offerSeats, setOfferSeats] = useState(3);

  const activeRides = rideOffers[selectedCity] || [];

  const handleJoinRide = (rideId) => {
    const rideIndex = activeRides.findIndex(r => r.id === rideId);
    if (rideIndex === -1) return;

    const ride = activeRides[rideIndex];
    if (ride.seats === 0 && !joinedRides[rideId]) {
      alert("No available seats left in this vehicle.");
      return;
    }

    const updatedOffers = { ...rideOffers };
    const updatedJoined = { ...joinedRides };

    if (joinedRides[rideId]) {
      // Cancel join
      updatedOffers[selectedCity][rideIndex].seats += 1;
      delete updatedJoined[rideId];
    } else {
      // Confirm join
      updatedOffers[selectedCity][rideIndex].seats -= 1;
      updatedJoined[rideId] = true;
    }

    setRideOffers(updatedOffers);
    setJoinedRides(updatedJoined);
  };

  const handleOfferSubmit = (e) => {
    e.preventDefault();
    if (!offerName || !offerRoute || !offerCost) return;

    const newOffer = {
      id: `rs_custom_${Date.now()}`,
      driver: offerName,
      rating: 4.9,
      vehicle: offerVehicle,
      route: offerRoute,
      cost: parseInt(offerCost),
      match: Math.floor(85 + Math.random() * 14),
      eta: Math.floor(3 + Math.random() * 8),
      seats: parseInt(offerSeats),
      coords: selectedCity === CITIES.HYDERABAD ? [17.43, 78.41] : [16.51, 80.63]
    };

    const updatedOffers = { ...rideOffers };
    updatedOffers[selectedCity] = [newOffer, ...updatedOffers[selectedCity]];

    setRideOffers(updatedOffers);
    
    // Clear and close modal
    setOfferName('');
    setOfferRoute('');
    setOfferCost('');
    setOfferSeats(3);
    setShowOfferModal(false);
  };

  return (
    <div className="space-y-8 pb-16 text-left relative">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-900 pb-5">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 text-glow-cyan">
            Co-Ride Sharing Hub
          </h1>
          <p className="text-sm text-slate-400 max-w-xl">
            Split costs, beat the traffic gridlock, and commute sustainably by sharing electric vehicles with verified co-riders heading your way.
          </p>
        </div>

        <button 
          onClick={() => setShowOfferModal(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-slate-950 font-bold flex items-center gap-1.5 shadow-lg shadow-cyan-500/10 transition-all hover:scale-[1.02]"
        >
          <Plus className="w-4 h-4" />
          <span>Offer a Ride</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Side: Search Form & Rides list */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-start">
          
          {/* Controls Bar */}
          <div className="glass-panel p-4 rounded-xl border-slate-800 flex flex-wrap gap-4 items-center justify-between">
            <span className="text-xs font-bold text-slate-400">ACTIVE TRANSIT HUB</span>
            <select 
              value={selectedCity} 
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-slate-900 border border-slate-800 text-cyan-400 rounded-lg px-2.5 py-1.5 text-xs font-semibold focus:outline-none focus:border-cyan-500 cursor-pointer"
            >
              {Object.values(CITIES).map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Ride offers list */}
          <div className="space-y-4 max-h-[550px] overflow-y-auto pr-1">
            <span className="text-xs font-bold text-slate-400 block px-1">MATCHING RIDESHARES</span>
            {activeRides.length === 0 ? (
              <div className="glass-panel p-8 text-center text-slate-500 text-xs rounded-xl">
                No active rideshares currently offered in this city. Be the first to offer one!
              </div>
            ) : (
              activeRides.map((ride) => {
                const isJoined = joinedRides[ride.id];
                return (
                  <div 
                    key={ride.id}
                    className={`glass-panel p-5 rounded-2xl border transition-all duration-300 ${
                      isJoined 
                        ? 'border-emerald-500/35 bg-emerald-950/5 shadow-[0_0_15px_rgba(16,185,129,0.05)]' 
                        : 'border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {/* Header: Driver rating vehicle */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex gap-3 items-center">
                        <div className="h-10 w-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center font-bold text-cyan-400">
                          {ride.driver.split(' ').map(n=>n[0]).join('')}
                        </div>
                        <div className="text-left space-y-0.5">
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm font-bold text-slate-100">{ride.driver}</span>
                            <span className="flex items-center gap-0.5 text-[10px] text-amber-400 font-bold bg-amber-500/10 px-1 py-0.5 rounded">
                              <Star className="w-2.5 h-2.5 fill-amber-400" />
                              {ride.rating}
                            </span>
                          </div>
                          <span className="text-[10px] font-medium text-slate-400 flex items-center gap-1">
                            <Zap className="w-3 h-3 text-emerald-400" />
                            {ride.vehicle}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-base font-extrabold text-slate-100">₹{ride.cost}</span>
                        <span className="text-[9px] text-slate-500 font-semibold block">Fixed Share</span>
                      </div>
                    </div>

                    {/* Route Details */}
                    <div className="mt-4 bg-slate-900/40 border border-slate-900 p-3 rounded-xl space-y-2 text-xs">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                        <span className="text-slate-300 font-medium">{ride.route}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-400">
                        <Clock className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                        <span>ETA: <strong className="text-slate-300">{ride.eta} mins away</strong></span>
                      </div>
                    </div>

                    {/* Footer: Savings and Join */}
                    <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-900/60">
                      <div className="flex items-center gap-3">
                        <div className="text-left">
                          <span className="text-[8px] text-slate-500 font-bold uppercase block">AI Match</span>
                          <span className="text-xs font-bold text-cyan-400">{ride.match}% compatibility</span>
                        </div>
                        <div className="h-6 w-[1px] bg-slate-800"></div>
                        <div className="text-left">
                          <span className="text-[8px] text-slate-500 font-bold uppercase block">Seats Left</span>
                          <span className={`text-xs font-bold ${ride.seats > 0 ? 'text-slate-300' : 'text-rose-500'}`}>
                            {ride.seats} slots
                          </span>
                        </div>
                      </div>

                      <button 
                        onClick={() => handleJoinRide(ride.id)}
                        disabled={ride.seats === 0 && !isJoined}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                          isJoined 
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30' 
                            : ride.seats === 0
                              ? 'bg-slate-900 border border-slate-800 text-slate-600 cursor-not-allowed'
                              : 'bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 font-bold hover:opacity-90'
                        }`}
                      >
                        {isJoined ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Joined</span>
                          </>
                        ) : (
                          'Request Join'
                        )}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Side: Map & Live Metrics panel */}
        <div className="lg:col-span-7 space-y-6 flex flex-col justify-start">
          
          {/* Map Display */}
          <div className="h-[420px] w-full">
            <MapSimulator 
              city={selectedCity} 
              activeLayer="rideshare"
            />
          </div>

          {/* Ride Share impact calculators */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Money Saved */}
            <div className="glass-panel p-5 rounded-2xl border-slate-800 flex items-start gap-4">
              <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div className="space-y-1 text-left">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Shared Transit Economics</h4>
                <div className="text-xl font-extrabold text-slate-100">Save up to 60%</div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Ridesharing cuts single-driver commuter expenses by splitting toll charges, fuel/power overheads, and city parking fees.
                </p>
              </div>
            </div>

            {/* Carbon Offset */}
            <div className="glass-panel p-5 rounded-2xl border-slate-800 flex items-start gap-4">
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <Leaf className="w-5 h-5" />
              </div>
              <div className="space-y-1 text-left">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Environmental Savings</h4>
                <div className="text-xl font-extrabold text-slate-100">1.4 kg CO2 / Trip</div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Pooling in EV ride-shares avoids unnecessary emissions. Each full vehicle removes up to 3 fossil-fuel cars off the grid.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* RIDE OFFER MODAL */}
      {showOfferModal && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="glass-panel w-full max-w-md p-6 rounded-3xl border-slate-800 shadow-2xl relative space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-1.5">
                <Car className="w-5 h-5 text-cyan-400" />
                <span>Register a Shared Commute</span>
              </h3>
              <button 
                onClick={() => setShowOfferModal(false)}
                className="p-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleOfferSubmit} className="space-y-4 text-left">
              
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Driver Full Name</label>
                <input 
                  type="text" 
                  placeholder="e.g., Suresh Kumar" 
                  value={offerName}
                  onChange={(e) => setOfferName(e.target.value)}
                  required
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">EV Vehicle Model</label>
                  <select 
                    value={offerVehicle}
                    onChange={(e) => setOfferVehicle(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500/50"
                  >
                    <option value="Tata Nexon EV">Tata Nexon EV</option>
                    <option value="Ola S1 Pro (Scooter)">Ola S1 Pro (Scooter)</option>
                    <option value="MG ZS EV">MG ZS EV</option>
                    <option value="TVS iQube (Scooter)">TVS iQube</option>
                    <option value="Mahindra Treo Auto">Mahindra Electric Auto</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Seats Available</label>
                  <select 
                    value={offerSeats}
                    onChange={(e) => setOfferSeats(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none"
                  >
                    <option value={1}>1 Slot (Scooter/Auto)</option>
                    <option value={2}>2 Slots (Sedan/Cab)</option>
                    <option value={3}>3 Slots (SUV/Cab)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Route Terminal Leg</label>
                <input 
                  type="text" 
                  placeholder="e.g., Secunderabad to Jubilee Hills" 
                  value={offerRoute}
                  onChange={(e) => setOfferRoute(e.target.value)}
                  required
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500/50"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Flat Contribution (₹)</label>
                <input 
                  type="number" 
                  placeholder="e.g., 50" 
                  value={offerCost}
                  onChange={(e) => setOfferCost(e.target.value)}
                  required
                  min="0"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500/50"
                />
              </div>

              <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-[11px] text-cyan-400 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <p>
                  By submitting, you agree to allow the AI engine to match your EV vehicle capacity with commuters along your travel vector. Safe riding protocols active.
                </p>
              </div>

              <button 
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-slate-950 font-extrabold text-sm shadow-lg shadow-cyan-500/15"
              >
                Publish Commute Route
              </button>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}
