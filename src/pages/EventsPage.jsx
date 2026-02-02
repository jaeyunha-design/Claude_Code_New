import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, Calendar, MapPin, Music, ChevronDown } from 'lucide-react';
import EventCard from '../components/EventCard';
import { events, cities, genres } from '../data/mockData';

const EventsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCity, setSelectedCity] = useState(searchParams.get('city') || '');
  const [selectedGenre, setSelectedGenre] = useState(searchParams.get('genre') || '');
  const [selectedDate, setSelectedDate] = useState(searchParams.get('date') || '');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('date');

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('search', searchQuery);
    if (selectedCity) params.set('city', selectedCity);
    if (selectedGenre) params.set('genre', selectedGenre);
    if (selectedDate) params.set('date', selectedDate);
    setSearchParams(params);
  }, [searchQuery, selectedCity, selectedGenre, selectedDate, setSearchParams]);

  const filteredEvents = useMemo(() => {
    let result = [...events].filter(e => e.status === 'upcoming' || e.status === 'sold_out');
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(e => e.title.toLowerCase().includes(query) || e.artist.name.toLowerCase().includes(query) || e.venue.city.toLowerCase().includes(query) || e.venue.neighborhood.toLowerCase().includes(query) || e.tags.some(tag => tag.toLowerCase().includes(query)));
    }
    if (selectedCity) result = result.filter(e => e.venue.city === selectedCity);
    if (selectedGenre) result = result.filter(e => e.artist.genre.toLowerCase() === selectedGenre.toLowerCase() || e.tags.some(tag => tag.toLowerCase() === selectedGenre.toLowerCase()));
    switch (sortBy) {
      case 'date': result.sort((a, b) => new Date(a.date) - new Date(b.date)); break;
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'availability': result.sort((a, b) => b.ticketsRemaining - a.ticketsRemaining); break;
    }
    return result;
  }, [searchQuery, selectedCity, selectedGenre, selectedDate, sortBy]);

  const clearFilters = () => { setSearchQuery(''); setSelectedCity(''); setSelectedGenre(''); setSelectedDate(''); };
  const hasActiveFilters = searchQuery || selectedCity || selectedGenre || selectedDate;
  const dateOptions = [{ value: '', label: 'Any Date' }, { value: 'today', label: 'Today' }, { value: 'weekend', label: 'This Weekend' }, { value: 'this-week', label: 'This Week' }, { value: 'this-month', label: 'This Month' }];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto section-padding mb-8">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Discover Events</motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-white/60 text-lg">Find your next unforgettable intimate concert experience</motion.p>
      </div>

      <div className="max-w-7xl mx-auto section-padding mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search events, artists, cities..." className="w-full pl-12 pr-4 input-field" />
          </div>
          <button onClick={() => setShowFilters(!showFilters)} className="lg:hidden btn-secondary flex items-center justify-center gap-2">
            <Filter size={18} />Filters{hasActiveFilters && <span className="w-5 h-5 bg-primary-500 text-dark-900 text-xs rounded-full flex items-center justify-center">{[searchQuery, selectedCity, selectedGenre, selectedDate].filter(Boolean).length}</span>}
          </button>
          <div className="hidden lg:flex items-center gap-3">
            <div className="relative">
              <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} className="input-field pr-10 appearance-none cursor-pointer min-w-[160px]">
                <option value="">All Cities</option>{cities.map(city => <option key={city.id} value={city.id}>{city.name}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" size={18} />
            </div>
            <div className="relative">
              <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)} className="input-field pr-10 appearance-none cursor-pointer min-w-[160px]">
                <option value="">All Genres</option>{genres.map(genre => <option key={genre} value={genre.toLowerCase()}>{genre}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" size={18} />
            </div>
            <div className="relative">
              <select value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="input-field pr-10 appearance-none cursor-pointer min-w-[160px]">
                {dateOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" size={18} />
            </div>
            <div className="relative">
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="input-field pr-10 appearance-none cursor-pointer min-w-[140px]">
                <option value="date">Sort by Date</option><option value="price-low">Price: Low to High</option><option value="price-high">Price: High to Low</option><option value="availability">Availability</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" size={18} />
            </div>
          </div>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="lg:hidden overflow-hidden">
              <div className="pt-4 grid grid-cols-2 gap-3">
                <div className="relative"><select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} className="input-field pr-10 appearance-none cursor-pointer w-full"><option value="">All Cities</option>{cities.map(city => <option key={city.id} value={city.id}>{city.name}</option>)}</select><ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" size={18} /></div>
                <div className="relative"><select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)} className="input-field pr-10 appearance-none cursor-pointer w-full"><option value="">All Genres</option>{genres.map(genre => <option key={genre} value={genre.toLowerCase()}>{genre}</option>)}</select><ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" size={18} /></div>
                <div className="relative"><select value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="input-field pr-10 appearance-none cursor-pointer w-full">{dateOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}</select><ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" size={18} /></div>
                <div className="relative"><select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="input-field pr-10 appearance-none cursor-pointer w-full"><option value="date">Sort by Date</option><option value="price-low">Price: Low to High</option><option value="price-high">Price: High to Low</option><option value="availability">Availability</option></select><ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" size={18} /></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <span className="text-white/50 text-sm">Active filters:</span>
            {selectedCity && <button onClick={() => setSelectedCity('')} className="flex items-center gap-1 px-3 py-1 bg-white/10 rounded-full text-sm text-white hover:bg-white/20 transition-colors"><MapPin size={12} />{cities.find(c => c.id === selectedCity)?.name}<X size={14} /></button>}
            {selectedGenre && <button onClick={() => setSelectedGenre('')} className="flex items-center gap-1 px-3 py-1 bg-white/10 rounded-full text-sm text-white hover:bg-white/20 transition-colors"><Music size={12} />{selectedGenre}<X size={14} /></button>}
            {selectedDate && <button onClick={() => setSelectedDate('')} className="flex items-center gap-1 px-3 py-1 bg-white/10 rounded-full text-sm text-white hover:bg-white/20 transition-colors"><Calendar size={12} />{dateOptions.find(d => d.value === selectedDate)?.label}<X size={14} /></button>}
            <button onClick={clearFilters} className="text-primary-400 text-sm hover:text-primary-300 transition-colors">Clear all</button>
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto section-padding">
        <div className="flex items-center justify-between mb-6"><p className="text-white/60">{filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'} found</p></div>
        {filteredEvents.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{filteredEvents.map((event, index) => <EventCard key={event.id} event={event} index={index} />)}</div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center"><Search size={32} className="text-white/20" /></div>
            <h3 className="text-xl font-semibold text-white mb-2">No events found</h3>
            <p className="text-white/50 mb-6">Try adjusting your filters or search terms</p>
            <button onClick={clearFilters} className="btn-primary">Clear Filters</button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;
