import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, Calendar, Play, ExternalLink, Instagram, Globe, Music } from 'lucide-react';
import { artists, events } from '../data/mockData';
import EventCard from '../components/EventCard';

const ArtistDetailPage = () => {
  const { id } = useParams();
  const artist = artists.find(a => a.id === id);
  if (!artist) return <div className="min-h-screen pt-32 text-center"><h1 className="text-2xl font-semibold text-white mb-4">Artist not found</h1><Link to="/artists" className="btn-primary">Browse Artists</Link></div>;

  const artistEvents = events.filter(e => e.artist.id === artist.id);
  const upcomingEvents = artistEvents.filter(e => e.status === 'upcoming');
  const formatNumber = (num) => num >= 1000000 ? (num / 1000000).toFixed(1) + 'M' : num >= 1000 ? (num / 1000).toFixed(1) + 'K' : num.toString();

  return (
    <div className="min-h-screen">
      <div className="relative h-[50vh] md:h-[60vh]">
        <img src={artist.coverImage} alt={artist.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/60 to-dark-950/20" />
        <Link to="/artists" className="absolute top-24 left-4 md:left-8 flex items-center gap-2 text-white/70 hover:text-white transition-colors"><ArrowLeft size={20} /><span className="hidden sm:inline">Back to Artists</span></Link>
      </div>

      <div className="max-w-7xl mx-auto section-padding -mt-48 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row items-start gap-6">
              <img src={artist.image} alt={artist.name} className="w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover border-4 border-dark-950" />
              <div className="flex-1">
                <span className="inline-block px-3 py-1 bg-primary-500/20 text-primary-400 text-sm font-medium rounded-full mb-3">{artist.genre}</span>
                <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">{artist.name}</h1>
                <div className="flex flex-wrap items-center gap-6 text-white/60">
                  <div className="flex items-center gap-2"><Users size={18} /><span>{formatNumber(artist.followers)} followers</span></div>
                  <div className="flex items-center gap-2"><Play size={18} /><span>{formatNumber(artist.monthlyListeners)} monthly listeners</span></div>
                  <div className="flex items-center gap-2"><Calendar size={18} /><span>{artist.pastShows} past shows</span></div>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card p-6 md:p-8">
              <h2 className="text-xl font-display font-semibold text-white mb-4">About</h2>
              <p className="text-white/70 leading-relaxed">{artist.longBio}</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card p-6 md:p-8">
              <h2 className="text-xl font-display font-semibold text-white mb-6">Popular Tracks</h2>
              <div className="space-y-2">
                {artist.tracks.map((track, index) => (
                  <div key={track.id} className="flex items-center gap-4 p-3 -mx-3 hover:bg-white/5 rounded-lg transition-colors group">
                    <span className="w-6 text-white/40 text-sm">{index + 1}</span>
                    <div className="w-10 h-10 rounded bg-white/10 flex items-center justify-center"><Play size={16} className="text-white/40 group-hover:text-primary-400 transition-colors" /></div>
                    <div className="flex-1 min-w-0"><p className="text-white font-medium truncate">{track.title}</p><p className="text-white/50 text-sm">{formatNumber(track.plays)} plays</p></div>
                    <span className="text-white/40 text-sm">{track.duration}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {upcomingEvents.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <h2 className="text-xl font-display font-semibold text-white mb-6">Upcoming Shows</h2>
                <div className="grid sm:grid-cols-2 gap-6">{upcomingEvents.map((event, index) => <EventCard key={event.id} event={event} index={index} />)}</div>
              </motion.div>
            )}
          </div>

          <div className="lg:col-span-1 space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-white mb-4">Connect</h3>
              <div className="space-y-3">
                {artist.spotifyUrl && <a href={artist.spotifyUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors"><div className="w-10 h-10 rounded-full bg-[#1DB954]/20 flex items-center justify-center"><Music size={18} className="text-[#1DB954]" /></div><span className="text-white flex-1">Spotify</span><ExternalLink size={16} className="text-white/40" /></a>}
                {artist.instagramUrl && <a href={artist.instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors"><div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center"><Instagram size={18} className="text-pink-400" /></div><span className="text-white flex-1">Instagram</span><ExternalLink size={16} className="text-white/40" /></a>}
                {artist.websiteUrl && <a href={artist.websiteUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors"><div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"><Globe size={18} className="text-white/60" /></div><span className="text-white flex-1">Website</span><ExternalLink size={16} className="text-white/40" /></a>}
              </div>
              <div className="mt-6 pt-6 border-t border-white/10"><button className="btn-primary w-full">Follow Artist</button><p className="text-white/40 text-xs text-center mt-3">Get notified about new shows</p></div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between"><span className="text-white/60">Total Shows</span><span className="text-white font-medium">{artist.pastShows + artist.upcomingShows}</span></div>
                <div className="flex justify-between"><span className="text-white/60">Upcoming Shows</span><span className="text-primary-400 font-medium">{artist.upcomingShows}</span></div>
                <div className="flex justify-between"><span className="text-white/60">Monthly Listeners</span><span className="text-white font-medium">{formatNumber(artist.monthlyListeners)}</span></div>
                <div className="flex justify-between"><span className="text-white/60">Followers</span><span className="text-white font-medium">{formatNumber(artist.followers)}</span></div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistDetailPage;
