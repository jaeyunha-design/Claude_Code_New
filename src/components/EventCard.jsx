import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Heart, Ticket } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { useAuth } from '../context/AuthContext';

const EventCard = ({ event, variant = 'default', index = 0 }) => {
  const { isAuthenticated, isEventSaved, toggleSaveEvent, isEventBooked } = useAuth();
  const isSaved = isAuthenticated && isEventSaved(event.id);
  const isBooked = isAuthenticated && isEventBooked(event.id);
  const isSoldOut = event.ticketsRemaining === 0;

  const handleSaveClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAuthenticated) toggleSaveEvent(event.id);
  };

  const formattedDate = format(parseISO(event.date), 'EEE, MMM d');
  const ticketStatus = isSoldOut ? 'Sold Out' : event.ticketsRemaining <= 10 ? `Only ${event.ticketsRemaining} left` : `${event.ticketsRemaining} spots`;

  if (variant === 'featured') {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
        <Link to={`/events/${event.id}`} className="group block card card-hover">
          <div className="relative aspect-[16/9] overflow-hidden">
            <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/30 to-transparent" />
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              {event.isFeatured && <span className="px-3 py-1 bg-primary-500 text-dark-900 text-xs font-semibold rounded-full">Featured</span>}
              {isSoldOut && <span className="px-3 py-1 bg-red-500/80 text-white text-xs font-semibold rounded-full">Sold Out</span>}
              {isBooked && <span className="px-3 py-1 bg-green-500/80 text-white text-xs font-semibold rounded-full flex items-center gap-1"><Ticket size={12} />Booked</span>}
            </div>
            <button onClick={handleSaveClick} className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all ${isSaved ? 'bg-primary-500 text-dark-900' : 'bg-white/10 backdrop-blur-sm text-white hover:bg-white/20'}`}>
              <Heart size={18} fill={isSaved ? 'currentColor' : 'none'} />
            </button>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center gap-2 text-white/70 text-sm mb-2">
                <Calendar size={14} /><span>{formattedDate}</span><span className="text-white/30">•</span><Clock size={14} /><span>{event.time}</span>
              </div>
              <h3 className="text-xl md:text-2xl font-display font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">{event.title}</h3>
              <div className="flex items-center gap-2 text-white/60 text-sm"><MapPin size={14} /><span>{event.venue.type} • {event.venue.neighborhood}</span></div>
            </div>
          </div>
          <div className="p-6 flex items-center justify-between border-t border-white/5">
            <div className="flex items-center gap-3">
              <img src={event.artist.image} alt={event.artist.name} className="w-10 h-10 rounded-full object-cover" />
              <div><p className="text-white font-medium">{event.artist.name}</p><p className="text-white/50 text-sm">{event.artist.genre}</p></div>
            </div>
            <div className="text-right">
              <p className="text-white font-semibold">{event.currency === 'USD' && '$'}{event.currency === 'GBP' && '£'}{event.currency === 'EUR' && '€'}{event.price}</p>
              <p className={`text-sm ${isSoldOut ? 'text-red-400' : event.ticketsRemaining <= 10 ? 'text-primary-400' : 'text-white/50'}`}>{ticketStatus}</p>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
      <Link to={`/events/${event.id}`} className="group block card card-hover">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent" />
          <div className="absolute top-3 left-3 flex gap-2">
            {isSoldOut && <span className="px-2 py-1 bg-red-500/80 text-white text-xs font-medium rounded-full">Sold Out</span>}
            {isBooked && <span className="px-2 py-1 bg-green-500/80 text-white text-xs font-medium rounded-full">Booked</span>}
          </div>
          <button onClick={handleSaveClick} className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${isSaved ? 'bg-primary-500 text-dark-900' : 'bg-white/10 backdrop-blur-sm text-white hover:bg-white/20'}`}>
            <Heart size={14} fill={isSaved ? 'currentColor' : 'none'} />
          </button>
          <div className="absolute bottom-3 left-3">
            <div className="px-3 py-1.5 bg-dark-900/80 backdrop-blur-sm rounded-lg">
              <p className="text-white font-medium text-sm">{formattedDate}</p>
              <p className="text-white/60 text-xs">{event.time}</p>
            </div>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-primary-400 transition-colors line-clamp-1">{event.title}</h3>
          <div className="flex items-center gap-1.5 text-white/50 text-sm mb-3"><MapPin size={12} /><span className="line-clamp-1">{event.venue.type} • {event.venue.neighborhood}</span></div>
          <div className="flex items-center justify-between pt-3 border-t border-white/5">
            <div className="flex items-center gap-2">
              <img src={event.artist.image} alt={event.artist.name} className="w-6 h-6 rounded-full object-cover" />
              <span className="text-white/70 text-sm">{event.artist.name}</span>
            </div>
            <p className="text-white font-semibold">{event.currency === 'USD' && '$'}{event.currency === 'GBP' && '£'}{event.currency === 'EUR' && '€'}{event.price}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default EventCard;
