import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Ticket, Heart, Settings, Calendar, MapPin, Edit2, LogOut, ChevronRight } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { useAuth } from '../context/AuthContext';
import { events } from '../data/mockData';
import EventCard from '../components/EventCard';

const ProfilePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'bookings');
  const { user, isAuthenticated, logout, bookings, savedEvents } = useAuth();
  const navigate = useNavigate();

  useEffect(() => { if (!isAuthenticated) navigate('/login', { state: { from: '/profile' } }); }, [isAuthenticated, navigate]);
  useEffect(() => { const tab = searchParams.get('tab'); if (tab) setActiveTab(tab); }, [searchParams]);

  const handleTabChange = (tab) => { setActiveTab(tab); setSearchParams({ tab }); };
  if (!user) return null;

  const bookedEvents = bookings.map(b => ({ ...b, event: events.find(e => e.id === b.eventId) })).filter(b => b.event);
  const savedEventsList = events.filter(e => savedEvents.includes(e.id));

  const tabs = [
    { id: 'bookings', label: 'My Bookings', icon: Ticket, count: bookedEvents.length },
    { id: 'saved', label: 'Saved Events', icon: Heart, count: savedEventsList.length },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto section-padding">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative">
              <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full object-cover" />
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-dark-900 hover:bg-primary-400 transition-colors"><Edit2 size={14} /></button>
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-display font-bold text-white mb-1">{user.name}</h1>
              <p className="text-white/50 mb-3">{user.email}</p>
              <div className="flex flex-wrap items-center gap-4 text-white/50 text-sm">
                <div className="flex items-center gap-1"><MapPin size={14} /><span>{user.city}</span></div>
                <div className="flex items-center gap-1"><Calendar size={14} /><span>Member since {format(parseISO(user.joinedDate), 'MMMM yyyy')}</span></div>
              </div>
            </div>
            <button onClick={() => { logout(); navigate('/'); }} className="flex items-center gap-2 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"><LogOut size={18} /><span>Log Out</span></button>
          </div>
        </motion.div>

        <div className="flex border-b border-white/10 mb-8 overflow-x-auto">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => handleTabChange(tab.id)} className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.id ? 'border-primary-500 text-white' : 'border-transparent text-white/50 hover:text-white'}`}>
              <tab.icon size={18} /><span>{tab.label}</span>{tab.count !== undefined && <span className={`px-2 py-0.5 rounded-full text-xs ${activeTab === tab.id ? 'bg-primary-500/20 text-primary-400' : 'bg-white/10 text-white/50'}`}>{tab.count}</span>}
            </button>
          ))}
        </div>

        {activeTab === 'bookings' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {bookedEvents.length > 0 ? (
              <div className="space-y-4">
                {bookedEvents.map((booking) => (
                  <div key={booking.id} className="card p-4 md:p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      <img src={booking.event.image} alt={booking.event.title} className="w-full md:w-32 h-32 rounded-xl object-cover" />
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <Link to={`/events/${booking.event.id}`} className="text-lg font-semibold text-white hover:text-primary-400 transition-colors">{booking.event.title}</Link>
                            <div className="flex flex-wrap items-center gap-3 mt-2 text-white/50 text-sm">
                              <div className="flex items-center gap-1"><Calendar size={14} /><span>{format(parseISO(booking.event.date), 'EEE, MMM d')}</span></div>
                              <div className="flex items-center gap-1"><MapPin size={14} /><span>{booking.event.venue.neighborhood}</span></div>
                              <div className="flex items-center gap-1"><Ticket size={14} /><span>{booking.tickets} {booking.tickets === 1 ? 'ticket' : 'tickets'}</span></div>
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${booking.status === 'confirmed' ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-white/50'}`}>{booking.status}</span>
                        </div>
                        <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                          <div><p className="text-white/40 text-xs">Confirmation #</p><p className="text-white font-mono text-sm">{booking.id.toUpperCase()}</p></div>
                          <Link to={`/events/${booking.event.id}`} className="flex items-center gap-1 text-primary-400 text-sm hover:text-primary-300">View Details<ChevronRight size={16} /></Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16"><div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center"><Ticket size={32} className="text-white/20" /></div><h3 className="text-xl font-semibold text-white mb-2">No bookings yet</h3><p className="text-white/50 mb-6">Your upcoming shows will appear here</p><Link to="/events" className="btn-primary">Browse Events</Link></div>
            )}
          </motion.div>
        )}

        {activeTab === 'saved' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {savedEventsList.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{savedEventsList.map((event, index) => <EventCard key={event.id} event={event} index={index} />)}</div>
            ) : (
              <div className="text-center py-16"><div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center"><Heart size={32} className="text-white/20" /></div><h3 className="text-xl font-semibold text-white mb-2">No saved events</h3><p className="text-white/50 mb-6">Save events you're interested in to see them here</p><Link to="/events" className="btn-primary">Browse Events</Link></div>
            )}
          </motion.div>
        )}

        {activeTab === 'settings' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl">
            <div className="card p-6 md:p-8 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Profile Information</h3>
                <div className="space-y-4">
                  <div><label className="text-white/70 text-sm mb-2 block">Full Name</label><input type="text" defaultValue={user.name} className="input-field" /></div>
                  <div><label className="text-white/70 text-sm mb-2 block">Email</label><input type="email" defaultValue={user.email} className="input-field" /></div>
                  <div><label className="text-white/70 text-sm mb-2 block">City</label><input type="text" defaultValue={user.city} className="input-field" /></div>
                </div>
              </div>
              <div className="pt-6 border-t border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">Notifications</h3>
                <div className="space-y-4">
                  <label className="flex items-center justify-between cursor-pointer"><span className="text-white/70">New shows in my city</span><input type="checkbox" defaultChecked className="rounded border-white/20 bg-white/5 text-primary-500 focus:ring-primary-500/50" /></label>
                  <label className="flex items-center justify-between cursor-pointer"><span className="text-white/70">Artist announcements</span><input type="checkbox" defaultChecked className="rounded border-white/20 bg-white/5 text-primary-500 focus:ring-primary-500/50" /></label>
                  <label className="flex items-center justify-between cursor-pointer"><span className="text-white/70">Booking reminders</span><input type="checkbox" defaultChecked className="rounded border-white/20 bg-white/5 text-primary-500 focus:ring-primary-500/50" /></label>
                  <label className="flex items-center justify-between cursor-pointer"><span className="text-white/70">Weekly newsletter</span><input type="checkbox" className="rounded border-white/20 bg-white/5 text-primary-500 focus:ring-primary-500/50" /></label>
                </div>
              </div>
              <div className="pt-6 border-t border-white/10"><button className="btn-primary">Save Changes</button></div>
            </div>
            <div className="card p-6 md:p-8 mt-6">
              <h3 className="text-lg font-semibold text-red-400 mb-4">Danger Zone</h3>
              <p className="text-white/50 text-sm mb-4">Once you delete your account, there is no going back. Please be certain.</p>
              <button className="px-4 py-2 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/10 transition-colors">Delete Account</button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
