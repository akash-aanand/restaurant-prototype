
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Clock, Send } from 'lucide-react';
import { createReservation } from '../src/services/api.ts';

export const ReservationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    guests: 2,
    date: '',
    time: '',
    specialRequests: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await createReservation(formData);
      setStatus('success');
      setMessage('Reservation request sent! We will confirm via email.');
      setFormData({ fullName: '', email: '', guests: 2, date: '', time: '', specialRequests: '' });
    } catch (err) {
      setStatus('error');
      setMessage((err as Error).message);
    }
  };

  return (
    <section id="reserve" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="bg-white/40 backdrop-blur-3xl border border-white/60 rounded-[60px] p-8 md:p-16 shadow-2xl relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-400/10 blur-[100px] rounded-full" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">Secure Your <br/><span className="text-orange-500">Moment</span> with Us</h2>
            <p className="text-gray-500 text-lg mb-10 max-w-md">Experience fine dining at its best. Reserve your table now for an unforgettable culinary journey.</p>
            
            <div className="space-y-6">
              {[
                { icon: <Calendar className="text-orange-500" />, text: "Book up to 3 months in advance" },
                { icon: <Users className="text-orange-500" />, text: "Groups up to 12 people online" },
                { icon: <Clock className="text-orange-500" />, text: "Last call for kitchen at 10:30 PM" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 text-gray-700 font-semibold">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                    {item.icon}
                  </div>
                  {item.text}
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 md:p-10 rounded-[40px] shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-2">Full Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe" 
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-orange-500 outline-none transition-all" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-2">Email Address</label>
                <input 
                  type="email" 
                  placeholder="john@example.com" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-orange-500 outline-none transition-all" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-2">Guests</label>
                <select 
                  value={formData.guests}
                  onChange={(e) => setFormData({...formData, guests: Number(e.target.value)})}
                  className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-orange-500 outline-none transition-all appearance-none"
                >
                  {[2, 4, 6, 8, 10, 12].map(n => (
                    <option key={n} value={n}>{n} Persons</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-2">Date</label>
                <input 
                  type="date" 
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-orange-500 outline-none transition-all" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-2">Time</label>
                <input 
                  type="time" 
                  required
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                  className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-orange-500 outline-none transition-all" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-2">Special Requests (Occasion, Allergies)</label>
              <textarea 
                value={formData.specialRequests}
                onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}
                placeholder="Anniversary, Nut allergy, etc."
                className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-orange-500 outline-none transition-all resize-none h-24"
              />
            </div>

            {status !== 'idle' && (
              <p className={`text-sm font-bold text-center ${status === 'error' ? 'text-red-500' : 'text-green-500'}`}>
                {status === 'loading' ? 'Processing...' : message}
              </p>
            )}

            <motion.button 
              type="submit"
              disabled={status === 'loading'}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full ${status === 'loading' ? 'bg-gray-400' : 'bg-black'} text-white py-5 rounded-[24px] font-black text-lg flex items-center justify-center gap-3 shadow-2xl hover:bg-orange-600 transition-colors`}
            >
              {status === 'loading' ? 'One Moment...' : 'Confirm Reservation'}
              <Send size={20} />
            </motion.button>
          </form>
        </div>
      </div>
    </section>
  );
};
