import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Lock, 
  LogIn, 
  UserPlus, 
  CheckCircle2, 
  ShieldAlert,
  MapPin,
  ArrowRight
} from 'lucide-react';
import { CITIES } from '../data/mockData';

export default function Login({ user, onLogin, onLogout }) {
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Register fields
  const [name, setName] = useState('');
  const [prefCity, setPrefCity] = useState(CITIES.HYDERABAD);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isLoginTab) {
      // Login logic
      if (!email || !password) {
        setError('Please fill in all credentials.');
        return;
      }

      // Check for mock admin email
      const role = email.toLowerCase() === 'admin@smartcommute.ai' ? 'admin' : 'user';
      const mockName = role === 'admin' ? 'Administrator' : email.split('@')[0];

      onLogin({
        name: mockName.charAt(0).toUpperCase() + mockName.slice(1),
        email: email,
        city: prefCity,
        role: role,
        isLoggedIn: true
      });
      
      setSuccess(true);
    } else {
      // Register logic
      if (!name || !email || !password) {
        setError('Please fill in all registration fields.');
        return;
      }

      onLogin({
        name: name,
        email: email,
        city: prefCity,
        role: 'user',
        isLoggedIn: true
      });

      setSuccess(true);
    }
  };

  const handleLogoutClick = () => {
    onLogout();
    setSuccess(false);
    setEmail('');
    setPassword('');
    setName('');
  };

  if (user && user.isLoggedIn) {
    return (
      <div className="max-w-md mx-auto py-12 text-left">
        <div className="glass-panel p-8 rounded-3xl border-emerald-500/20 bg-emerald-500/5 space-y-6 text-center">
          
          <div className="h-16 w-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-100">Welcome Back, {user.name}!</h2>
            <p className="text-xs text-slate-400">
              Active Session: <span className="font-mono text-cyan-400">{user.email}</span>
            </p>
          </div>

          <div className="p-4 bg-slate-900/60 border border-slate-850 rounded-2xl text-xs text-left space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">Security Clearance:</span>
              <span className={`font-bold uppercase tracking-wider ${user.role === 'admin' ? 'text-rose-400' : 'text-emerald-400'}`}>
                {user.role}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Default Commute Center:</span>
              <span className="font-semibold text-slate-200">{user.city}</span>
            </div>
            {user.role === 'admin' && (
              <div className="pt-2 border-t border-slate-900 mt-2 text-rose-400 flex items-start gap-1.5 leading-normal">
                <ShieldAlert className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <p>Municipal diagnostics unlocked. You now have full clearance to dispatch fleets on the Government Dashboard.</p>
              </div>
            )}
          </div>

          <button 
            onClick={handleLogoutClick}
            className="w-full py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-rose-500/50 hover:bg-slate-850 text-slate-200 font-bold text-xs transition-all"
          >
            Terminate active session
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto py-8 text-left">
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border-slate-800 space-y-6">
        
        {/* Header Tabs */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-950 border border-slate-900 rounded-2xl">
          <button 
            onClick={() => { setIsLoginTab(true); setError(''); }}
            className={`py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all ${
              isLoginTab 
                ? 'bg-slate-900 border border-slate-800 text-slate-100 shadow-md' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </button>
          
          <button 
            onClick={() => { setIsLoginTab(false); setError(''); }}
            className={`py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all ${
              !isLoginTab 
                ? 'bg-slate-900 border border-slate-800 text-slate-100 shadow-md' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Register</span>
          </button>
        </div>

        {/* Title */}
        <div className="text-center space-y-1">
          <h2 className="text-xl font-bold text-slate-100">
            {isLoginTab ? 'Access SmartCommute' : 'Create Commuter Account'}
          </h2>
          <p className="text-xs text-slate-400">
            {isLoginTab 
              ? 'Log in to sync routes, wallet, and emissions score.' 
              : 'Sign up to register for smart city transit credits.'}
          </p>
        </div>

        {/* Error notification */}
        {error && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-xs flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          
          {/* Register Name field */}
          {!isLoginTab && (
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-500">Full Name</label>
              <div className="flex items-center bg-slate-900/60 border border-slate-850 rounded-xl px-3 py-2.5 focus-within:border-cyan-500/50">
                <User className="w-4 h-4 text-slate-400 mr-2.5 flex-shrink-0" />
                <input 
                  type="text" 
                  placeholder="e.g., Ramesh Kumar" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-transparent border-none text-slate-200 text-xs sm:text-sm focus:outline-none w-full"
                />
              </div>
            </div>
          )}

          {/* Email field */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-slate-500">Email Address</label>
            <div className="flex items-center bg-slate-900/60 border border-slate-850 rounded-xl px-3 py-2.5 focus-within:border-cyan-500/50">
              <Mail className="w-4 h-4 text-slate-400 mr-2.5 flex-shrink-0" />
              <input 
                type="email" 
                placeholder={isLoginTab ? "commuter@email.com (or admin@smartcommute.ai)" : "commuter@email.com"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-transparent border-none text-slate-200 text-xs sm:text-sm focus:outline-none w-full font-mono"
              />
            </div>
          </div>

          {/* Password field */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-slate-500">Password</label>
            <div className="flex items-center bg-slate-900/60 border border-slate-850 rounded-xl px-3 py-2.5 focus-within:border-cyan-500/50">
              <Lock className="w-4 h-4 text-slate-400 mr-2.5 flex-shrink-0" />
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-transparent border-none text-slate-200 text-xs sm:text-sm focus:outline-none w-full"
              />
            </div>
          </div>

          {/* Pref City dropdown */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-slate-500">City Hub</label>
            <div className="flex items-center bg-slate-900/60 border border-slate-850 rounded-xl px-3 py-2.5">
              <MapPin className="w-4 h-4 text-cyan-400 mr-2.5 flex-shrink-0" />
              <select 
                value={prefCity} 
                onChange={(e) => setPrefCity(e.target.value)}
                className="bg-transparent border-none text-slate-200 text-xs sm:text-sm focus:outline-none w-full cursor-pointer"
              >
                {Object.values(CITIES).map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-slate-950 font-extrabold flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-500/10 hover:scale-[1.01]"
          >
            <span>{isLoginTab ? 'Authenticate Session' : 'Create Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </form>

        {isLoginTab && (
          <div className="p-3 bg-cyan-500/5 border border-cyan-500/10 rounded-xl text-[10px] leading-relaxed text-cyan-400 text-center">
            <span className="font-bold">Hackathon Demo Tip:</span> Use email <span className="font-mono font-bold text-slate-200 bg-slate-900 px-1 py-0.5 rounded">admin@smartcommute.ai</span> and any password to unlock administrator rights on the Gov Dashboard.
          </div>
        )}

      </div>
    </div>
  );
}
