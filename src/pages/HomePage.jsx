import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Lock, Music, Sparkles } from 'lucide-react';
import Hero from '../components/Hero';
import EventCard from '../components/EventCard';
import ArtistCard from '../components/ArtistCard';
import TestimonialCard from '../components/TestimonialCard';
import StatsSection from '../components/StatsSection';
import { events, artists, testimonials, cities } from '../data/mockData';

const HomePage = () => {
  const featuredEvents = events.filter(e => e.isFeatured && e.status === 'upcoming').slice(0, 4);
  const featuredArtists = artists.slice(0, 4);

  const howItWorks = [
    { icon: MapPin, title: 'Choose Your City', description: 'Browse upcoming shows in your area. We host intimate concerts in 65+ cities worldwide.' },
    { icon: Lock, title: 'Get Your Spot', description: 'RSVP to secure your place. The exact venue location is revealed 24-48 hours before the show.' },
    { icon: Music, title: 'Experience the Magic', description: 'Arrive at a unique secret venue and enjoy an unforgettable intimate performance.' },
  ];

  return (
    <div className="min-h-screen">
      <Hero />

      <section className="py-20 section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-primary-400 font-medium mb-2">Don't Miss Out</motion.p>
              <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-3xl md:text-4xl font-display font-bold text-white">Featured Events</motion.h2>
            </div>
            <Link to="/events" className="group flex items-center gap-2 text-white/60 hover:text-white transition-colors">View All Events<ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></Link>
          </div>
          <div className="grid md:grid-cols-2 gap-6">{featuredEvents.map((event, index) => <EventCard key={event.id} event={event} variant="featured" index={index} />)}</div>
        </div>
      </section>

      <section className="py-20 bg-dark-900/50">
        <div className="max-w-7xl mx-auto section-padding">
          <div className="text-center mb-16">
            <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-primary-400 font-medium mb-2">Simple & Magical</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-3xl md:text-4xl font-display font-bold text-white mb-4">How SecretShows Works</motion.h2>
            <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-white/60 max-w-2xl mx-auto">We curate incredible live music experiences in unexpected venues. The surprise is part of the magic.</motion.p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <motion.div key={step.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="relative text-center">
                {index < howItWorks.length - 1 && <div className="hidden md:block absolute top-12 left-1/2 w-full h-px bg-gradient-to-r from-primary-500/50 to-transparent" />}
                <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-primary-500/20 to-primary-600/10 border border-primary-500/20 mb-6">
                  <step.icon size={36} className="text-primary-400" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-dark-800 border border-primary-500/30 flex items-center justify-center text-primary-400 font-bold text-sm">{index + 1}</div>
                </div>
                <h3 className="text-xl font-display font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-white/60">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <StatsSection />

      <section className="py-20 section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-primary-400 font-medium mb-2">65+ Cities Worldwide</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-3xl md:text-4xl font-display font-bold text-white">Find Shows Near You</motion.h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {cities.slice(0, 8).map((city, index) => (
              <motion.div key={city.id} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}>
                <Link to={`/events?city=${city.id}`} className="group block card p-6 text-center hover:bg-white/5">
                  <h3 className="text-lg font-semibold text-white group-hover:text-primary-400 transition-colors">{city.name}</h3>
                  <p className="text-white/50 text-sm">{city.eventCount} upcoming events</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-dark-900/50 section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-primary-400 font-medium mb-2">Discover Talent</motion.p>
              <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-3xl md:text-4xl font-display font-bold text-white">Featured Artists</motion.h2>
            </div>
            <Link to="/artists" className="group flex items-center gap-2 text-white/60 hover:text-white transition-colors">View All Artists<ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">{featuredArtists.map((artist, index) => <ArtistCard key={artist.id} artist={artist} variant="featured" index={index} />)}</div>
        </div>
      </section>

      <section className="py-20 section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 text-primary-400 font-medium mb-2"><Sparkles size={18} />Community Love</motion.div>
            <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-3xl md:text-4xl font-display font-bold text-white">What People Are Saying</motion.h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">{testimonials.map((testimonial, index) => <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />)}</div>
        </div>
      </section>

      <section className="py-20 section-padding">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative overflow-hidden rounded-3xl">
            <div className="absolute inset-0"><img src="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1200&auto=format&fit=crop" alt="" className="w-full h-full object-cover" /><div className="absolute inset-0 bg-gradient-to-r from-dark-950/95 to-dark-950/80" /></div>
            <div className="relative p-8 md:p-16 text-center">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Ready for Something Different?</h2>
              <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">Join thousands of music lovers who have discovered the magic of intimate live performances. Your next unforgettable experience awaits.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/events" className="btn-primary text-lg px-8">Find Your Show</Link>
                <Link to="/about" className="btn-secondary text-lg px-8">Learn More</Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
