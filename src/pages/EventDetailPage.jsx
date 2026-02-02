import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, Music, Heart, Share2, ArrowLeft, Lock, Check, AlertCircle, Minus, Plus, X, Ticket } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { events } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import EventCard from '../components/EventCard';

const EventDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, isEventSaved, toggleSaveEvent, isEventBooked, getBookingForEvent, bookEvent } = useAuth();
  const [ticketCount, setTicketCount] = useState(1);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);

  const event = events.find(e => e.id === id);
  if (!event) return <div className="min-h-screen pt-32 text-center"><h1 className="text-2xl font-semibold text-white mb-4">Event not found</h1><Link to="/events" className="btn-primary">Browse Events</Link></div>;

  const isSaved = isAuthenticated && isEventSaved(event.id);
  const isBooked = isAuthenticated && isEventBooked(event.id);
  const booking = getBookingForEvent(event.id);
  const isSoldOut = event.ticketsRemaining === 0;
  const relatedEvents = events.filter(e => e.id !== event.id && (e.artist.id === event.artist.id || e.artist.genre === event.artist.genre)).slice(0, 3);

  const handleSave = () => { if (!isAuthenticated) { navigate('/login', { state: { from: `/events/${event.id}` } }); return; } toggleSaveEvent(event.id); };
  const handleBooking = () => { if (!isAuthenticated) { navigate('/login', { state: { from: `/events/${event.id}` } }); return; } setShowBookingModal(true); setBookingStep(1); };
  const processBooking = async () => { setIsProcessing(true); await new Promise(resolve => setTimeout(resolve, 2000)); bookEvent(event.id, ticketCount); setIsProcessing(false); setBookingComplete(true); };
  const formatPrice = (price, currency) => `${currency === 'USD' ? '$' : currency === 'GBP' ? '£' : '€'}${price}`;

  return (
    <div className="min-h-screen">
      <div className="relative h-[50vh] md:h-[60vh]">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/50 to-transparent" />
        <Link to="/events" className="absolute top-24 left-4 md:left-8 flex items-center gap-2 text-white/70 hover:text-white transition-colors"><ArrowLeft size={20} /><span className="hidden sm:inline">Back to Events</span></Link>
        <div className="absolute top-24 right-4 md:right-8 flex items-center gap-3">
          <button onClick={handleSave} className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isSaved ? 'bg-primary-500 text-dark-900' : 'bg-white/10 backdrop-blur-sm text-white hover:bg-white/20'}`}><Heart size={18} fill={isSaved ? 'currentColor' : 'none'} /></button>
          <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 flex items-center justify-center"><Share2 size={18} /></button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto section-padding -mt-32 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-6 md:p-8">
              <div className="flex flex-wrap gap-2 mb-4">{event.tags.map(tag => <span key={tag} className="px-3 py-1 bg-white/5 text-white/70 text-sm rounded-full">{tag}</span>)}</div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">{event.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-white/60 mb-6">
                <div className="flex items-center gap-2"><Calendar size={18} /><span>{format(parseISO(event.date), 'EEEE, MMMM d, yyyy')}</span></div>
                <div className="flex items-center gap-2"><Clock size={18} /><span>Doors at {event.time}</span></div>
              </div>
              <p className="text-white/70 leading-relaxed">{event.description}</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card p-6 md:p-8">
              <h2 className="text-xl font-display font-semibold text-white mb-6">Lineup</h2>
              {event.lineup.map((artistName, index) => {
                const artistData = event.artist.name === artistName ? event.artist : null;
                return (
                  <Link key={index} to={artistData ? `/artists/${artistData.id}` : '#'} className="flex items-center gap-4 p-4 -mx-4 hover:bg-white/5 rounded-xl transition-colors">
                    {artistData ? (<><img src={artistData.image} alt={artistData.name} className="w-16 h-16 rounded-full object-cover" /><div className="flex-1"><h3 className="text-lg font-semibold text-white">{artistData.name}</h3><p className="text-white/50">{artistData.genre}</p></div><Music size={20} className="text-white/30" /></>) : (<><div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center"><Music size={24} className="text-white/40" /></div><div className="flex-1"><h3 className="text-lg font-semibold text-white">{artistName}</h3><p className="text-white/50">Guest Artist</p></div></>)}
                  </Link>
                );
              })}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card p-6 md:p-8">
              <h2 className="text-xl font-display font-semibold text-white mb-6">Venue</h2>
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0"><Lock size={32} className="text-primary-400" /></div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">{event.venue.type}</h3>
                  <p className="text-white/50 mb-3">{event.venue.neighborhood} • Capacity {event.venue.capacity}</p>
                  <p className="text-white/70 text-sm">{event.venue.description}</p>
                  <div className="mt-4 p-3 bg-primary-500/10 rounded-lg border border-primary-500/20"><p className="text-primary-400 text-sm flex items-center gap-2"><MapPin size={14} />Exact address revealed 24-48 hours before the event</p></div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-1">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card p-6 sticky top-24">
              {isBooked ? (
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center"><Ticket size={32} className="text-green-400" /></div>
                  <h3 className="text-xl font-semibold text-white mb-2">You're Going!</h3>
                  <p className="text-white/60 mb-4">{booking?.tickets} {booking?.tickets === 1 ? 'ticket' : 'tickets'} booked</p>
                  <div className="p-4 bg-white/5 rounded-xl text-left mb-4"><p className="text-white/50 text-sm mb-1">Confirmation #</p><p className="text-white font-mono">{booking?.id.toUpperCase()}</p></div>
                  <p className="text-white/50 text-sm">You'll receive venue details via email 24-48 hours before the show.</p>
                </div>
              ) : isSoldOut ? (
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center"><AlertCircle size={32} className="text-red-400" /></div>
                  <h3 className="text-xl font-semibold text-white mb-2">Sold Out</h3>
                  <p className="text-white/60 mb-4">This event has sold out. Join the waitlist to be notified if spots open up.</p>
                  <button className="btn-secondary w-full">Join Waitlist</button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <div><p className="text-3xl font-bold text-white">{formatPrice(event.price, event.currency)}</p><p className="text-white/50 text-sm">per person</p></div>
                    <div className={`px-3 py-1 rounded-full text-sm ${event.ticketsRemaining <= 10 ? 'bg-primary-500/20 text-primary-400' : 'bg-white/10 text-white/70'}`}>{event.ticketsRemaining} spots left</div>
                  </div>
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-2 text-white/60 text-sm"><Calendar size={16} /><span>{format(parseISO(event.date), 'MMM d, yyyy')}</span></div>
                    <div className="flex items-center gap-2 text-white/60 text-sm"><Clock size={16} /><span>Doors at {event.time}</span></div>
                    <div className="flex items-center gap-2 text-white/60 text-sm"><Users size={16} /><span>Capacity {event.capacity} people</span></div>
                  </div>
                  <button onClick={handleBooking} className="btn-primary w-full text-lg">Get Tickets</button>
                  <p className="text-white/40 text-xs text-center mt-4">Secure your spot now. Limited capacity event.</p>
                </>
              )}
            </motion.div>
          </div>
        </div>

        {relatedEvents.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-display font-semibold text-white mb-8">You Might Also Like</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{relatedEvents.map((evt, index) => <EventCard key={evt.id} event={evt} index={index} />)}</div>
          </section>
        )}
      </div>

      <AnimatePresence>
        {showBookingModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-dark-950/90 backdrop-blur-sm" onClick={() => !isProcessing && setShowBookingModal(false)} />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative w-full max-w-md bg-dark-800 border border-white/10 rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h3 className="text-xl font-semibold text-white">{bookingComplete ? 'Booking Confirmed!' : 'Complete Your Booking'}</h3>
                {!isProcessing && !bookingComplete && <button onClick={() => setShowBookingModal(false)} className="text-white/40 hover:text-white"><X size={24} /></button>}
              </div>
              <div className="p-6">
                {bookingComplete ? (
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center"><Check size={40} className="text-green-400" /></div>
                    <p className="text-white/70 mb-6">Your {ticketCount} {ticketCount === 1 ? 'ticket has' : 'tickets have'} been booked for <strong className="text-white">{event.title}</strong>.</p>
                    <p className="text-white/50 text-sm mb-6">Check your email for confirmation details. The venue address will be sent 24-48 hours before the event.</p>
                    <button onClick={() => { setShowBookingModal(false); setBookingComplete(false); setBookingStep(1); }} className="btn-primary w-full">Done</button>
                  </div>
                ) : bookingStep === 1 ? (
                  <>
                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl mb-6">
                      <img src={event.image} alt={event.title} className="w-16 h-16 rounded-lg object-cover" />
                      <div><h4 className="text-white font-medium">{event.title}</h4><p className="text-white/50 text-sm">{format(parseISO(event.date), 'MMM d')} • {event.time}</p></div>
                    </div>
                    <div className="mb-6">
                      <label className="text-white/70 text-sm mb-2 block">Number of Tickets</label>
                      <div className="flex items-center gap-4">
                        <button onClick={() => setTicketCount(Math.max(1, ticketCount - 1))} className="w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center disabled:opacity-50" disabled={ticketCount <= 1}><Minus size={18} /></button>
                        <span className="text-2xl font-semibold text-white w-12 text-center">{ticketCount}</span>
                        <button onClick={() => setTicketCount(Math.min(event.ticketsRemaining, ticketCount + 1))} className="w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center disabled:opacity-50" disabled={ticketCount >= event.ticketsRemaining}><Plus size={18} /></button>
                      </div>
                    </div>
                    <div className="space-y-3 mb-6 p-4 bg-white/5 rounded-xl">
                      <div className="flex justify-between text-white/70"><span>{ticketCount}x Ticket</span><span>{formatPrice(event.price * ticketCount, event.currency)}</span></div>
                      <div className="flex justify-between text-white/70"><span>Service Fee</span><span>{formatPrice(Math.round(event.price * ticketCount * 0.1), event.currency)}</span></div>
                      <div className="border-t border-white/10 pt-3 flex justify-between text-white font-semibold"><span>Total</span><span>{formatPrice(Math.round(event.price * ticketCount * 1.1), event.currency)}</span></div>
                    </div>
                    <button onClick={() => setBookingStep(2)} className="btn-primary w-full">Continue to Payment</button>
                  </>
                ) : (
                  <>
                    <div className="space-y-4 mb-6">
                      <div><label className="text-white/70 text-sm mb-2 block">Card Number</label><input type="text" placeholder="4242 4242 4242 4242" className="input-field" /></div>
                      <div className="grid grid-cols-2 gap-4">
                        <div><label className="text-white/70 text-sm mb-2 block">Expiry</label><input type="text" placeholder="MM/YY" className="input-field" /></div>
                        <div><label className="text-white/70 text-sm mb-2 block">CVC</label><input type="text" placeholder="123" className="input-field" /></div>
                      </div>
                    </div>
                    <div className="flex justify-between text-white font-semibold mb-6 p-4 bg-white/5 rounded-xl"><span>Total</span><span>{formatPrice(Math.round(event.price * ticketCount * 1.1), event.currency)}</span></div>
                    <div className="space-y-3">
                      <button onClick={processBooking} disabled={isProcessing} className="btn-primary w-full disabled:opacity-50">
                        {isProcessing ? <span className="flex items-center justify-center gap-2"><svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>Processing...</span> : `Pay ${formatPrice(Math.round(event.price * ticketCount * 1.1), event.currency)}`}
                      </button>
                      <button onClick={() => setBookingStep(1)} disabled={isProcessing} className="btn-ghost w-full text-white/60">Back</button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EventDetailPage;
