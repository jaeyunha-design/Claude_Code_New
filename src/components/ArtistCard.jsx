import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Music, Users, Calendar } from 'lucide-react';

const ArtistCard = ({ artist, variant = 'default', index = 0 }) => {
  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  if (variant === 'featured') {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
        <Link to={`/artists/${artist.id}`} className="group block relative overflow-hidden rounded-2xl">
          <div className="aspect-[3/4] relative">
            <img src={artist.image} alt={artist.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <span className="inline-block px-3 py-1 bg-primary-500/20 text-primary-400 text-xs font-medium rounded-full mb-3">{artist.genre}</span>
              <h3 className="text-2xl font-display font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">{artist.name}</h3>
              <p className="text-white/60 text-sm line-clamp-2 mb-4">{artist.bio}</p>
              <div className="flex items-center gap-4 text-white/50 text-sm">
                <div className="flex items-center gap-1.5"><Users size={14} /><span>{formatNumber(artist.followers)} followers</span></div>
                {artist.upcomingShows > 0 && <div className="flex items-center gap-1.5"><Calendar size={14} /><span>{artist.upcomingShows} upcoming</span></div>}
              </div>
            </div>
            <div className="absolute inset-0 bg-primary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
      <Link to={`/artists/${artist.id}`} className="group block card card-hover p-4">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
            <img src={artist.image} alt={artist.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-semibold group-hover:text-primary-400 transition-colors truncate">{artist.name}</h3>
            <p className="text-white/50 text-sm truncate">{artist.genre}</p>
            <div className="flex items-center gap-3 mt-1 text-white/40 text-xs">
              <span>{formatNumber(artist.followers)} followers</span>
              {artist.upcomingShows > 0 && <span className="text-primary-400">{artist.upcomingShows} shows</span>}
            </div>
          </div>
          <Music size={20} className="text-white/20 group-hover:text-primary-400 transition-colors flex-shrink-0" />
        </div>
      </Link>
    </motion.div>
  );
};

export default ArtistCard;
