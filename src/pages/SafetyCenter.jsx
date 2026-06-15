import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  PhoneCall, 
  Map, 
  Users, 
  ShieldCheck, 
  MapPin, 
  Plus, 
  Trash2, 
  Share2, 
  Clock, 
  X,
  AlertCircle
} from 'lucide-react';
import { CITIES } from '../data/mockData';

const initialContacts = [
  { id: 1, name: 'Mom (Family)', phone: '+91 98765 43210' },
  { id: 2, name: 'Rahul Sharma (Partner)', phone: '+91 91234 56789' }
];

const initialSafeRoutes = {
  [CITIES.HYDERABAD]: [
    { title: 'Jubilee Hills Metro Corridor', rating: '9.8/10 Safety Score', desc: 'Fully lit main boulevard with active CCTV nodes and TSRTC Pink Patrol vehicles every 800 meters.', type: 'Highly Safe' },
    { title: 'DLF Cybercity Pedestrian Lane', rating: '9.5/10 Safety Score', desc: 'Continuous surveillance, dedicated electric security golf-cart escorts available from DLF gate.', type: 'Highly Safe' }
  ],
  [CITIES.VIJAYAWADA]: [
    { title: 'MG Road Hub Corridor', rating: '9.4/10 Safety Score', desc: 'Well-lit municipal stretch, constant commuter traffic, active police outpost near Benz Circle.', type: 'Safe' }
  ]
};

export default function SafetyCenter() {
  const [selectedCity, setSelectedCity] = useState(CITIES.HYDERABAD);
  const [contacts, setContacts] = useState(initialContacts);
  const [newContactName, setNewContactName] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');
  const [isLocationSharing, setIsLocationSharing] = useState(false);
  
  // SOS countdown state
  const [sosCountdown, setSosCountdown] = useState(null);
  const [sosTriggered, setSosTriggered] = useState(false);

  // SOS Countdown timer effect
  useEffect(() => {
    let interval = null;
    if (sosCountdown !== null && sosCountdown > 0) {
      interval = setInterval(() => {
        setSosCountdown(prev => prev - 1);
      }, 1000);
    } else if (sosCountdown === 0) {
      setSosTriggered(true);
      setSosCountdown(null);
    }
    return () => clearInterval(interval);
  }, [sosCountdown]);

  const handleStartSos = () => {
    setSosCountdown(5);
  };

  const handleCancelSos = () => {
    setSosCountdown(null);
    setSosTriggered(false);
  };

  const handleAddContact = (e) => {
    e.preventDefault();
    if (!newContactName || !newContactPhone) return;
    
    const newContact = {
      id: Date.now(),
      name: newContactName,
      phone: newContactPhone
    };

    setContacts([...contacts, newContact]);
    setNewContactName('');
    setNewContactPhone('');
  };

  const handleDeleteContact = (id) => {
    setContacts(contacts.filter(c => c.id !== id));
  };

  const safeRoutes = initialSafeRoutes[selectedCity] || [];

  return (
    <div className="space-y-8 pb-16 text-left">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-amber-400 text-glow-green">
          Safety & SOS Command Center
        </h1>
        <p className="text-sm text-slate-400 max-w-xl">
          Trigger immediate emergency SOS alerts, share live GPS locations with contacts, and view community-vouched highly lit walking routes.
        </p>
      </div>

      {/* SOS Alert Section */}
      <section className="glass-panel p-6 md:p-8 rounded-3xl border-rose-500/20 bg-rose-950/5 relative overflow-hidden flex flex-col items-center text-center justify-center space-y-6">
        
        {sosTriggered ? (
          /* SOS Activated Mode */
          <div className="space-y-4 max-w-md animate-pulse">
            <div className="mx-auto h-20 w-20 rounded-full bg-rose-600 flex items-center justify-center shadow-lg shadow-rose-600/35 border-2 border-white">
              <AlertTriangle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-black text-rose-500 uppercase tracking-wider">SOS ALERT BROADCASTED</h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Your exact GPS coordinates have been sent to the Police Control Hub (112), TSRTC Highway Patrol, and your {contacts.length} registered trusted contacts. Support is actively dispatched.
            </p>
            <button 
              onClick={handleCancelSos}
              className="px-6 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-bold text-rose-400"
            >
              Dismiss SOS Alert
            </button>
          </div>
        ) : sosCountdown !== null ? (
          /* SOS Countdown Mode */
          <div className="space-y-4 max-w-sm">
            <div className="mx-auto h-24 w-24 rounded-full border-4 border-rose-500 flex items-center justify-center text-4xl font-black text-rose-500 font-mono animate-bounce">
              {sosCountdown}
            </div>
            <h2 className="text-xl font-bold text-slate-200">Broadcasting SOS in {sosCountdown}...</h2>
            <p className="text-xs text-slate-400">
              This will contact municipal emergency response divisions. Tap Cancel immediately if you triggered this by mistake.
            </p>
            <button 
              onClick={handleCancelSos}
              className="px-6 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-rose-500 text-xs font-extrabold text-slate-200 transition-all"
            >
              Cancel SOS Action
            </button>
          </div>
        ) : (
          /* SOS Ready Mode */
          <div className="space-y-4 max-w-md">
            {/* Big red pulsing circle */}
            <div className="relative h-28 w-28 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-rose-600/20 animate-ping"></div>
              <button 
                onClick={handleStartSos}
                className="relative h-24 w-24 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-black text-lg shadow-xl shadow-rose-600/20 active:scale-95 transition-all border border-rose-500/35"
              >
                SOS
              </button>
            </div>
            
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-200">Emergency Distress Button</h3>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Distress broadcasting. Press to start a 5-second countdown. Notifies police control nodes and trusted contacts.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Main Grid: Location Sharing + Contacts & Safe Routes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Side: Live Location Sharing & Trusted Contacts */}
        <div className="lg:col-span-6 space-y-6 flex flex-col justify-start">
          
          {/* Live Location Sharing card */}
          <div className="glass-panel p-6 rounded-2xl border-slate-800 space-y-4 text-left">
            <div className="flex justify-between items-center border-b border-slate-900 pb-3">
              <div className="space-y-0.5">
                <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-cyan-400" />
                  <span>Live Location Sharing</span>
                </h3>
                <p className="text-[11px] text-slate-500">Share your active transit leg with your circle.</p>
              </div>

              {/* Toggle Switch */}
              <button 
                onClick={() => setIsLocationSharing(!isLocationSharing)}
                className={`w-11 h-6 rounded-full transition-colors relative ${
                  isLocationSharing ? 'bg-cyan-500' : 'bg-slate-800'
                }`}
              >
                <span className={`absolute top-1 left-1 bg-slate-950 w-4 h-4 rounded-full transition-transform ${
                  isLocationSharing ? 'translate-x-5' : ''
                }`}></span>
              </button>
            </div>

            {isLocationSharing ? (
              <div className="p-3 bg-cyan-500/5 border border-cyan-500/20 rounded-xl space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-cyan-500 animate-pulse"></span>
                    <span>Active Tracking Link Shared</span>
                  </span>
                  <span className="text-[9px] font-mono text-slate-500">ID: SL-9041</span>
                </div>
                <p className="text-slate-300">
                  Sharing transit vector: <strong className="text-slate-100">Secunderabad Metro Hub → DLF Gate</strong>
                </p>
                <div className="flex items-center gap-2 text-[10px] text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Sharing active with {contacts.length} trusted contacts.</span>
                </div>
              </div>
            ) : (
              <div className="p-3 bg-slate-900/40 border border-slate-900 rounded-xl text-xs text-slate-500 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <p>
                  Turn on location sharing when boarding buses or cabs. Generates a secured tracking token shared with your selected safety circle.
                </p>
              </div>
            )}
          </div>

          {/* Trusted Contacts Manager */}
          <div className="glass-panel p-6 rounded-2xl border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2 border-b border-slate-900 pb-3">
              <Users className="w-5 h-5 text-indigo-400" />
              <span>Safety Circle Contacts</span>
            </h3>

            {/* List */}
            <div className="space-y-3">
              {contacts.map((contact) => (
                <div key={contact.id} className="p-3 bg-slate-900/60 border border-slate-850 rounded-xl flex items-center justify-between text-xs">
                  <div className="text-left space-y-0.5">
                    <span className="font-bold text-slate-200 block">{contact.name}</span>
                    <span className="text-slate-400 font-mono">{contact.phone}</span>
                  </div>
                  <button 
                    onClick={() => handleDeleteContact(contact.id)}
                    className="p-1.5 rounded-lg bg-slate-950 border border-slate-850 text-slate-500 hover:text-rose-400 hover:border-rose-500/30 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add form */}
            <form onSubmit={handleAddContact} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end pt-2">
              <div className="sm:col-span-5 space-y-1">
                <label className="text-[9px] uppercase font-bold text-slate-500">Contact Name</label>
                <input 
                  type="text" 
                  placeholder="e.g., Dad" 
                  value={newContactName}
                  onChange={(e) => setNewContactName(e.target.value)}
                  required
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500/50"
                />
              </div>

              <div className="sm:col-span-5 space-y-1">
                <label className="text-[9px] uppercase font-bold text-slate-500">Mobile Number</label>
                <input 
                  type="text" 
                  placeholder="e.g., +91 99999 99999" 
                  value={newContactPhone}
                  onChange={(e) => setNewContactPhone(e.target.value)}
                  required
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500/50 font-mono"
                />
              </div>

              <div className="sm:col-span-2">
                <button 
                  type="submit"
                  className="w-full py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800 text-cyan-400 font-bold text-xs flex items-center justify-center"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Right Side: Safe Recommendations & Help Centers */}
        <div className="lg:col-span-6 space-y-6 flex flex-col justify-start">
          
          {/* Safe Route Recommendations */}
          <div className="glass-panel p-6 rounded-2xl border-slate-800 space-y-4">
            
            <div className="flex justify-between items-center border-b border-slate-900 pb-3">
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>Patrolled Safety Corridors</span>
              </h3>

              <select 
                value={selectedCity} 
                onChange={(e) => setSelectedCity(e.target.value)}
                className="bg-slate-900 border border-slate-800 text-cyan-400 rounded-lg px-2.5 py-1 text-xs font-semibold focus:outline-none cursor-pointer"
              >
                {Object.values(CITIES).map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="space-y-4">
              {safeRoutes.map((route, i) => (
                <div key={i} className="p-4 bg-slate-900/30 border border-slate-850 rounded-xl space-y-2 text-left">
                  <div className="flex justify-between items-center flex-wrap gap-1">
                    <span className="text-sm font-bold text-slate-200">{route.title}</span>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                      {route.rating}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{route.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Directory Helplines */}
          <div className="glass-panel p-6 rounded-2xl border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2 border-b border-slate-900 pb-3">
              <PhoneCall className="w-5 h-5 text-amber-400" />
              <span>National Safety Directory</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              
              <div className="p-3 bg-slate-900/50 border border-slate-850 rounded-xl flex items-center justify-between">
                <div className="text-left space-y-0.5">
                  <span className="font-bold text-slate-300">Police Support</span>
                  <span className="text-[10px] text-slate-500">Emergency response</span>
                </div>
                <a href="tel:112" className="px-2.5 py-1 rounded bg-rose-500/15 border border-rose-500/30 text-rose-400 font-bold">112</a>
              </div>

              <div className="p-3 bg-slate-900/50 border border-slate-850 rounded-xl flex items-center justify-between">
                <div className="text-left space-y-0.5">
                  <span className="font-bold text-slate-300">Women Helpline</span>
                  <span className="text-[10px] text-slate-500">National hotline</span>
                </div>
                <a href="tel:1091" className="px-2.5 py-1 rounded bg-amber-500/15 border border-amber-500/30 text-amber-400 font-bold">1091</a>
              </div>

              <div className="p-3 bg-slate-900/50 border border-slate-850 rounded-xl flex items-center justify-between">
                <div className="text-left space-y-0.5">
                  <span className="font-bold text-slate-300">TSRTC Helpdesk</span>
                  <span className="text-[10px] text-slate-500">Bus safety assistance</span>
                </div>
                <span className="font-mono text-slate-300 font-bold">040 301028</span>
              </div>

              <div className="p-3 bg-slate-900/50 border border-slate-850 rounded-xl flex items-center justify-between">
                <div className="text-left space-y-0.5">
                  <span className="font-bold text-slate-300">Metro Helpdesk</span>
                  <span className="text-[10px] text-slate-500">Corridor guard escort</span>
                </div>
                <span className="font-mono text-slate-300 font-bold">1800 425 40</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
