import React, { useState } from 'react';
import { 
  Mail, 
  MapPin, 
  Phone, 
  Send, 
  CheckCircle2, 
  MessageSquare 
} from 'lucide-react';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    // Simulate ticket creation
    const generatedId = `SC-${Math.floor(1000 + Math.random() * 9000)}`;
    setTicketId(generatedId);
    setSubmitted(true);

    // Reset inputs
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <div className="space-y-8 pb-16 text-left max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="space-y-2 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 text-glow-cyan">
          Connect With SmartCommute
        </h1>
        <p className="text-sm text-slate-400">
          Have queries about pilot integrations, smart parking nodes, or EV charging APIs? Send us a ticket, and our smart city logistics team will respond within 12 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Side: Form */}
        <div className="md:col-span-7 flex flex-col justify-start">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border-slate-800 space-y-6 flex-1">
            
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2 border-b border-slate-900 pb-3">
              <MessageSquare className="w-5 h-5 text-cyan-400" />
              <span>Submit a Logistics Ticket</span>
            </h3>

            {submitted ? (
              <div className="py-8 text-center space-y-4 max-w-sm mx-auto">
                <div className="h-14 w-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-slate-100">Ticket Created Successfully</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Your request has been filed. Our smart city operations desk is investigating. Note your ticket reference ID:
                </p>
                <div className="font-mono text-sm font-bold bg-slate-900 border border-slate-800 text-cyan-400 px-3 py-1.5 rounded-xl inline-block">
                  {ticketId}
                </div>
                <div>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="text-xs text-slate-500 hover:text-cyan-400 hover:underline mt-4"
                  >
                    Submit another inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-500">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g., Suresh Kumar" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full bg-slate-900 border border-slate-850 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-cyan-500/50"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-500">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="e.g., suresh@gmail.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-slate-900 border border-slate-850 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-cyan-500/50 font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-slate-500">Inquiry Subject</label>
                  <input 
                    type="text" 
                    placeholder="e.g., EV Charging station integration request" 
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-850 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-cyan-500/50"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-slate-500">Detailed Message</label>
                  <textarea 
                    rows="4"
                    placeholder="Enter your query here..." 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="w-full bg-slate-900 border border-slate-850 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-cyan-500/50 resize-none leading-relaxed"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-slate-950 font-extrabold flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-500/15 transition-all hover:scale-[1.01]"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Inquiry</span>
                </button>

              </form>
            )}

          </div>
        </div>

        {/* Right Side: Contact Details */}
        <div className="md:col-span-5 space-y-6 flex flex-col justify-start">
          
          {/* Smart City Headquarters Details */}
          <div className="glass-panel p-6 rounded-3xl border-slate-800 space-y-5 flex-1">
            <h3 className="text-base font-bold text-slate-100 border-b border-slate-900 pb-3">
              HQ Contacts & Offices
            </h3>

            <div className="space-y-4 text-xs">
              
              {/* Address */}
              <div className="flex gap-3 items-start">
                <div className="p-2 rounded-xl bg-slate-900 border border-slate-850 text-cyan-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="space-y-0.5 text-left">
                  <span className="font-bold text-slate-200 block">Regional Headquarters</span>
                  <p className="text-slate-400 leading-normal">
                    DLF Cybercity Campus, Gachibowli, Hyderabad, Telangana - 500032
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-3 items-start">
                <div className="p-2 rounded-xl bg-slate-900 border border-slate-850 text-emerald-400">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="space-y-0.5 text-left font-mono">
                  <span className="font-bold text-slate-200 block">Operations Helpline</span>
                  <span className="text-slate-400 font-bold block">+91 40 3012 9000</span>
                  <span className="text-[10px] text-slate-500">Mon - Fri: 9:00 AM to 6:00 PM</span>
                </div>
              </div>

              {/* Mail */}
              <div className="flex gap-3 items-start">
                <div className="p-2 rounded-xl bg-slate-900 border border-slate-850 text-indigo-400">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="space-y-0.5 text-left font-mono">
                  <span className="font-bold text-slate-200 block">API Integrations</span>
                  <a href="mailto:support@smartcommute.ai" className="text-cyan-400 font-semibold block hover:underline">
                    support@smartcommute.ai
                  </a>
                </div>
              </div>

            </div>

            {/* Social Grid */}
            <div className="pt-4 border-t border-slate-900/60 text-left space-y-3">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Follow Development</span>
              
              <div className="flex items-center gap-3">
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-850 hover:border-cyan-500/50 hover:bg-slate-800 text-slate-400 hover:text-cyan-400 transition-all flex items-center justify-center"
                  title="Twitter / X"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-850 hover:border-cyan-500/50 hover:bg-slate-800 text-slate-400 hover:text-blue-400 transition-all flex items-center justify-center"
                  title="LinkedIn"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z" />
                  </svg>
                </a>

                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-850 hover:border-cyan-500/50 hover:bg-slate-800 text-slate-400 hover:text-white transition-all flex items-center justify-center"
                  title="GitHub"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
