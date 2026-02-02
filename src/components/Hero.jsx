import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Play, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { stats } from '../data/mockData';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="video-container">
        <img src="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1920&auto=format&fit=crop" alt="Intimate concert atmosphere" className="object-cover" />
        <div className="video-overlay" />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary-500/10 rounded-full blur-3xl" />
        <motion.div animate={{ x: [0, -100, 0], y: [0, 50, 0], scale: [1, 1.3, 1] }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }} className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-primary-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="inline-flex items-center px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full mb-8">
            <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse mr-2" />
            <span className="text-white/80 text-sm">{stats.citiesActive} cities worldwide</span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 text-balance">
            Discover Live Music in
            <span className="block mt-2 gradient-text">Unexpected Places</span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/60 mb-10 text-balance">
            Intimate concerts in secret venues. From living rooms to rooftops, experience music the way it was meant to be heard—up close and personal.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/events" className="btn-primary text-lg px-8 py-4 flex items-center gap-2 group">
              Find Your Show
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="btn-secondary text-lg px-8 py-4 flex items-center gap-2">
              <Play size={20} />
              Watch How It Works
            </button>
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-white/50">
            <Link to="/events?city=nyc" className="flex items-center gap-2 hover:text-white transition-colors"><MapPin size={16} /><span>New York</span></Link>
            <Link to="/events?city=london" className="flex items-center gap-2 hover:text-white transition-colors"><MapPin size={16} /><span>London</span></Link>
            <Link to="/events?city=la" className="flex items-center gap-2 hover:text-white transition-colors"><MapPin size={16} /><span>Los Angeles</span></Link>
            <Link to="/events?date=weekend" className="flex items-center gap-2 hover:text-white transition-colors"><Calendar size={16} /><span>This Weekend</span></Link>
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center">
          <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-1.5 h-3 bg-white/40 rounded-full mt-2" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
