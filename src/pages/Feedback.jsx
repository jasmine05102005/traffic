import React, { useState } from 'react';
import { 
  Star, 
  MessageSquare, 
  CheckCircle2, 
  MapPin, 
  ThumbsUp, 
  Calendar,
  Heart
} from 'lucide-react';
import { CITIES } from '../data/mockData';

const initialFeedbacks = [
  { 
    id: 1, 
    name: 'Suresh Kumar', 
    city: CITIES.HYDERABAD, 
    rating: 5, 
    comment: 'The multi-modal route planning is a lifesaver. Combining the Hitec City Metro and E-scooter feeder in one step saved me 25 minutes of walk and auto negotiation today. The CO2 tracking is a great touch!',
    date: 'Today',
    likes: 12
  },
  { 
    id: 2, 
    name: 'Priya Narayanan', 
    city: CITIES.BENGALURU, 
    rating: 4, 
    comment: 'Smart parking reservation saved my morning. Knowing I had slot #14 reserved at ITPL Cyber Park meant I did not have to circle in traffic for 20 minutes. Highly recommend expanding this corridor.',
    date: 'Yesterday',
    likes: 8
  },
  { 
    id: 3, 
    name: 'Aditya Patil', 
    city: CITIES.PUNE, 
    rating: 5, 
    comment: 'Tried the EV rideshare shuttle from Hinjewadi IT park. The cost split was only ₹95 compared to my usual ₹350 private cab rate, plus I commuted in an EV car. Commuting made green and cheap!',
    date: '3 days ago',
    likes: 14
  }
];

export default function Feedback() {
  const [feedbacks, setFeedbacks] = useState(initialFeedbacks);
  const [name, setName] = useState('');
  const [city, setCity] = useState(CITIES.HYDERABAD);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [success, setSuccess] = useState(false);
  const [likedMap, setLikedMap] = useState({}); // { feedbackId: true }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !comment) return;

    const newFeedback = {
      id: Date.now(),
      name,
      city,
      rating,
      comment,
      date: 'Just now',
      likes: 0
    };

    setFeedbacks([newFeedback, ...feedbacks]);
    setSuccess(true);
    
    // Clear inputs
    setName('');
    setComment('');
    setRating(5);
    
    setTimeout(() => {
      setSuccess(false);
    }, 4500);
  };

  const handleLike = (id) => {
    if (likedMap[id]) return; // can only like once
    
    const updated = feedbacks.map(f => {
      if (f.id === id) {
        return { ...f, likes: f.likes + 1 };
      }
      return f;
    });
    setFeedbacks(updated);
    setLikedMap({ ...likedMap, [id]: true });
  };

  return (
    <div className="space-y-8 pb-16 text-left max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="space-y-2 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 text-glow-cyan">
          Commuter Feedback & Ratings
        </h1>
        <p className="text-sm text-slate-400">
          Share your transit experiences, rate your EV rides or smart parking bookings, and help municipal agencies optimize transit hubs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Side: Submit Feedback Form */}
        <div className="lg:col-span-5 flex flex-col justify-start">
          <div className="glass-panel p-6 rounded-3xl border-slate-800 space-y-5 flex-1 relative overflow-hidden">
            
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2 border-b border-slate-900 pb-3">
              <MessageSquare className="w-5 h-5 text-cyan-400" />
              <span>Write a Commuter Review</span>
            </h3>

            {success && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>Review submitted! Added to the live commuter board below.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-slate-500">Commuter Name</label>
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
                <label className="text-[10px] uppercase font-bold text-slate-500">City Hub</label>
                <select 
                  value={city} 
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-850 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none cursor-pointer"
                >
                  {Object.values(CITIES).map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Star Rating selector */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-slate-500 block">Transit Star Rating</label>
                <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-850 p-2.5 rounded-xl justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="transition-all hover:scale-125 focus:outline-none"
                    >
                      <Star 
                        className={`w-6 h-6 ${
                          star <= (hoverRating || rating) 
                            ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]' 
                            : 'text-slate-700'
                        }`} 
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-slate-500">Comments & Suggestions</label>
                <textarea 
                  rows="4"
                  placeholder="Describe your commute, route savings, or general suggestions for municipal corridors..." 
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                  className="w-full bg-slate-900 border border-slate-850 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-cyan-500/50 resize-none leading-relaxed"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-slate-950 font-extrabold flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-500/15"
              >
                Publish Feedback
              </button>

            </form>

          </div>
        </div>

        {/* Right Side: Live Feedback Stream */}
        <div className="lg:col-span-7 flex flex-col justify-start">
          <div className="glass-panel p-6 rounded-3xl border-slate-800 space-y-4 flex-1 flex flex-col justify-start">
            
            <div className="flex justify-between items-center border-b border-slate-900 pb-3">
              <span className="text-xs font-bold text-slate-400">COMMUTER BOARD</span>
              <span className="text-[10px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">
                Live stream
              </span>
            </div>

            {/* List */}
            <div className="space-y-4 overflow-y-auto max-h-[440px] pr-1 flex-1">
              {feedbacks.map((f) => (
                <div key={f.id} className="p-4 bg-slate-900/40 border border-slate-850 rounded-2xl space-y-3 text-xs text-left">
                  
                  {/* Card Header: User, City, date, rating */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-200">{f.name}</span>
                        <span className="text-[10px] text-slate-500 flex items-center gap-0.5">
                          <MapPin className="w-3 h-3 text-cyan-500" />
                          {f.city}
                        </span>
                      </div>
                      <div className="flex items-center gap-0.5 pt-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            className={`w-3 h-3 ${
                              star <= f.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-800'
                            }`} 
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-[9px] text-slate-500">
                      <Calendar className="w-3 h-3" />
                      <span>{f.date}</span>
                    </div>
                  </div>

                  {/* Comment text */}
                  <p className="text-slate-300 leading-relaxed leading-normal">{f.comment}</p>

                  {/* Likes/Helpful footer action */}
                  <div className="pt-2 border-t border-slate-900/60 flex items-center justify-between text-[10px] text-slate-500">
                    <span>Helpful? Click to support.</span>
                    <button 
                      onClick={() => handleLike(f.id)}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border transition-all ${
                        likedMap[f.id] 
                          ? 'bg-cyan-500/15 border-cyan-500/30 text-cyan-400' 
                          : 'bg-slate-950 border-slate-850 hover:border-slate-700 text-slate-400'
                      }`}
                    >
                      <ThumbsUp className="w-3 h-3" />
                      <span>{f.likes}</span>
                    </button>
                  </div>

                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
