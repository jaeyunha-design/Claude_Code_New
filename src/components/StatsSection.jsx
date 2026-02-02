import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { MapPin, Music, Users, Ticket } from 'lucide-react';
import { stats } from '../data/mockData';

const AnimatedCounter = ({ value, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) { setCount(value); clearInterval(timer); }
      else { setCount(Math.floor(current)); }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, value]);

  const formatNumber = (num) => {
    if (num >= 1000) return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 1) + 'K';
    return num.toLocaleString();
  };

  return <span ref={ref}>{formatNumber(count)}{suffix}</span>;
};

const StatsSection = () => {
  const statItems = [
    { icon: Ticket, value: stats.totalShows, label: 'Secret Shows', suffix: '+' },
    { icon: MapPin, value: stats.citiesActive, label: 'Cities Worldwide', suffix: '' },
    { icon: Music, value: stats.artistsFeatured, label: 'Artists Featured', suffix: '+' },
    { icon: Users, value: stats.happyAttendees, label: 'Happy Attendees', suffix: '+' },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {statItems.map((stat, index) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary-500/10 text-primary-400 mb-4">
                <stat.icon size={24} />
              </div>
              <div className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-white/50">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
