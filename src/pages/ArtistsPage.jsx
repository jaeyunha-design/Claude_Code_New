import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Music, ChevronDown } from 'lucide-react';
import ArtistCard from '../components/ArtistCard';
import { artists, genres } from '../data/mockData';

const ArtistsPage = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedGenre, setSelectedGenre] = useState(searchParams.get('genre') || '');
  const [sortBy, setSortBy] = useState('popular');

  const filteredArtists = useMemo(() => {
    let result = [...artists];
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(a => a.name.toLowerCase().includes(query) || a.genre.toLowerCase().includes(query) || a.bio.toLowerCase().includes(query));
    }
    if (selectedGenre) result = result.filter(a => a.genre.toLowerCase() === selectedGenre.toLowerCase());
    switch (sortBy) {
      case 'popular': result.sort((a, b) => b.followers - a.followers); break;
      case 'name': result.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'shows': result.sort((a, b) => b.upcomingShows - a.upcomingShows); break;
    }
    return result;
  }, [searchQuery, selectedGenre, sortBy]);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto section-padding mb-8">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Discover Artists</motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-white/60 text-lg">Explore talented artists performing at our intimate shows</motion.p>
      </div>

      <div className="max-w-7xl mx-auto section-padding mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1"><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} /><input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search artists..." className="w-full pl-12 pr-4 input-field" /></div>
          <div className="relative"><select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)} className="input-field pr-10 appearance-none cursor-pointer min-w-[160px]"><option value="">All Genres</option>{genres.map(genre => <option key={genre} value={genre.toLowerCase()}>{genre}</option>)}</select><ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" size={18} /></div>
          <div className="relative"><select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="input-field pr-10 appearance-none cursor-pointer min-w-[160px]"><option value="popular">Most Popular</option><option value="name">Name A-Z</option><option value="shows">Most Shows</option></select><ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" size={18} /></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto section-padding">
        <p className="text-white/60 mb-6">{filteredArtists.length} {filteredArtists.length === 1 ? 'artist' : 'artists'} found</p>
        {filteredArtists.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">{filteredArtists.map((artist, index) => <ArtistCard key={artist.id} artist={artist} variant="featured" index={index} />)}</div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center"><Music size={32} className="text-white/20" /></div>
            <h3 className="text-xl font-semibold text-white mb-2">No artists found</h3>
            <p className="text-white/50 mb-6">Try adjusting your search or filters</p>
            <button onClick={() => { setSearchQuery(''); setSelectedGenre(''); }} className="btn-primary">Clear Filters</button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ArtistsPage;
