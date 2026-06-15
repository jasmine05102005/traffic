import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  MapPin, 
  Navigation, 
  Car, 
  BatteryCharging, 
  Leaf, 
  ShieldCheck, 
  BarChart3, 
  Mail, 
  Compass,
  User,
  MessageSquare,
  Lock,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import LandingPage from './pages/LandingPage';
import RoutePlanner from './pages/RoutePlanner';
import SmartParking from './pages/SmartParking';
import RideSharing from './pages/RideSharing';
import EVCharging from './pages/EVCharging';
import Sustainability from './pages/Sustainability';
import SafetyCenter from './pages/SafetyCenter';
import GovDashboard from './pages/GovDashboard';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Feedback from './pages/Feedback';

// Navigation Link Component to show active route styling
function NavLink({ to, children, icon: Icon, onClick }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
        isActive 
          ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/25 shadow-md shadow-cyan-500/5' 
          : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/40 border border-transparent'
      }`}
    >
      {Icon && <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />}
      <span>{children}</span>
    </Link>
  );
}

function NavigationMenu({ mobile, onLinkClick }) {
  const links = [
    { to: '/', label: 'Home', icon: Compass },
    { to: '/route-planner', label: 'Route Planner', icon: Navigation },
    { to: '/smart-parking', label: 'Smart Parking', icon: Car },
    { to: '/ride-sharing', label: 'Ride Sharing', icon: MapPin },
    { to: '/ev-stations', label: 'EV Stations', icon: BatteryCharging },
    { to: '/sustainability', label: 'Sustainability', icon: Leaf },
    { to: '/safety', label: 'Safety', icon: ShieldCheck },
    { to: '/gov-dashboard', label: 'Gov Admin', icon: BarChart3 },
    { to: '/feedback', label: 'Feedback', icon: MessageSquare },
    { to: '/contact', label: 'Contact', icon: Mail }
  ];

  return (
    <div className={mobile ? "flex flex-col gap-3 py-4 text-left" : "flex flex-row gap-1 items-center"}>
      {links.map((link) => (
        <NavLink 
          key={link.to} 
          to={link.to} 
          icon={link.icon}
          onClick={onLinkClick}
        >
          {link.label}
        </NavLink>
      ))}
    </div>
  );
}

function MainLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState({
    name: '',
    email: '',
    city: 'Hyderabad',
    role: 'user',
    isLoggedIn: false
  });

  const handleLogin = (sessionUser) => {
    setUser(sessionUser);
  };

  const handleLogout = () => {
    setUser({
      name: '',
      email: '',
      city: 'Hyderabad',
      role: 'user',
      isLoggedIn: false
    });
  };

  return (
    <div className="min-h-screen flex flex-col relative bg-grid-pattern">
      
      {/* 1. TOP NAVBAR HEADER */}
      <header className="sticky top-0 z-40 w-full glass-panel border-x-0 border-t-0 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Logo brand */}
          <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-emerald-500 p-2 flex items-center justify-center shadow-lg shadow-cyan-500/10 group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5 text-slate-950 font-bold" />
            </div>
            <div className="text-left hidden sm:block">
              <span className="text-sm font-black text-slate-100 tracking-tight block leading-none">
                SmartCommute
              </span>
              <span className="text-[10px] font-bold text-cyan-400 font-mono block tracking-widest mt-0.5 uppercase">
                AI PLATFORM
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center flex-grow justify-center">
            <NavigationMenu />
          </nav>

          {/* Right Action buttons: Auth Avatar */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Link 
              to="/login"
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border ${
                user.isLoggedIn 
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                  : 'bg-slate-900 border-slate-800 hover:border-cyan-500/50 text-slate-200'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {user.isLoggedIn ? user.name : 'Sign In'}
              </span>
            </Link>

            {/* Hamburger Mobile Menu Trigger */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-100 hover:border-slate-700 transition-all focus:outline-none"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

        </div>
      </header>

      {/* 2. MOBILE DRAWER SIDEBAR */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden flex">
          {/* Backdrop overlay */}
          <div 
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          ></div>
          
          {/* Drawer content */}
          <div className="fixed top-16 right-4 left-4 z-40 bg-slate-950/95 glass-panel rounded-3xl p-5 border border-slate-850 shadow-2xl flex flex-col max-h-[calc(100vh-80px)] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-900 pb-3">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                Navigation Directory
              </span>
              <span className="text-[9px] font-bold text-cyan-400 font-mono uppercase tracking-wider bg-cyan-500/15 px-2 py-0.5 rounded">
                COMMUTE BETA
              </span>
            </div>
            <NavigationMenu mobile={true} onLinkClick={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      {/* 3. MAIN CORE CONTENT WRAPPER */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 w-full">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/route-planner" element={<RoutePlanner />} />
          <Route path="/smart-parking" element={<SmartParking />} />
          <Route path="/ride-sharing" element={<RideSharing />} />
          <Route path="/ev-stations" element={<EVCharging />} />
          <Route path="/sustainability" element={<Sustainability />} />
          <Route path="/safety" element={<SafetyCenter />} />
          <Route 
            path="/gov-dashboard" 
            element={
              user.isLoggedIn && user.role === 'admin' ? (
                <GovDashboard />
              ) : (
                <div className="max-w-lg mx-auto py-12 text-left">
                  <div className="glass-panel p-6 sm:p-8 rounded-3xl border-rose-500/20 bg-rose-500/5 text-center space-y-5">
                    <div className="h-14 w-14 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto">
                      <Lock className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-slate-200">Access Restricted</h3>
                      <p className="text-xs text-slate-400">
                        Municipal diagnostics require administrative credentials.
                      </p>
                    </div>
                    
                    <div className="p-3 bg-slate-900/60 border border-slate-850 rounded-xl text-xs text-slate-400 leading-relaxed text-left space-y-1">
                      <span className="font-bold text-slate-300 block">Demonstration Credentials:</span>
                      <p>Email: <span className="font-mono text-cyan-400">admin@smartcommute.ai</span></p>
                      <p>Password: <span className="text-slate-400">Any password</span></p>
                    </div>

                    <Link 
                      to="/login"
                      className="w-full py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-850 text-cyan-400 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                    >
                      <span>Go to Login Hub</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              )
            } 
          />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/contact" element={<Contact />} />
          <Route 
            path="/login" 
            element={<Login user={user} onLogin={handleLogin} onLogout={handleLogout} />} 
          />
        </Routes>
      </main>

      {/* 4. FOOTER */}
      <footer className="w-full bg-slate-950 border-t border-slate-900 py-12 text-slate-500 text-xs mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 text-left">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="flex items-center gap-2 w-fit">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-emerald-500 p-1.5 flex items-center justify-center">
                <Compass className="w-4 h-4 text-slate-950 font-bold" />
              </div>
              <span className="text-base font-extrabold text-slate-100 tracking-tight">SmartCommute AI</span>
            </Link>
            <p className="text-slate-400 leading-relaxed max-w-sm">
              SmartCommute AI is an open-source smart city transit middleware designed for national-level hackathons and smart-city pitches. It bridges Indian urban transit fragmentation through AI optimizations.
            </p>
            <p className="text-[10px] text-slate-600">
              © {new Date().getFullYear()} SmartCommute AI. Built with React + Vite + Tailwind CSS.
            </p>
          </div>

          {/* Directory Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-slate-300 uppercase tracking-widest text-[11px]">Features</h4>
            <div className="grid grid-cols-1 gap-2.5">
              <Link to="/route-planner" className="hover:text-cyan-400 transition-colors">AI Routing Engine</Link>
              <Link to="/smart-parking" className="hover:text-cyan-400 transition-colors">Real-Time Parking slots</Link>
              <Link to="/ride-sharing" className="hover:text-cyan-400 transition-colors">Verified EV Pools</Link>
              <Link to="/ev-stations" className="hover:text-cyan-400 transition-colors">EV Charging Infrastructure</Link>
              <Link to="/feedback" className="hover:text-cyan-400 transition-colors">Commuter Feedback Stream</Link>
            </div>
          </div>

          {/* SDG targets */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-sm font-bold text-slate-300 uppercase tracking-widest text-[11px]">UN SDG Contributions</h4>
            <p className="text-slate-450 leading-relaxed">
              Actively supporting Sustainable Cities and Communities (SDG 11) and Climate Action (SDG 13) through calculated green route swaps and carbon tracking metrics.
            </p>
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded bg-orange-600/90 text-white font-extrabold text-[10px] tracking-wide">SDG 11: Sustainable Cities</span>
              <span className="px-2.5 py-1 rounded bg-emerald-750/90 text-white font-extrabold text-[10px] tracking-wide">SDG 13: Climate Action</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}

export default function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}
