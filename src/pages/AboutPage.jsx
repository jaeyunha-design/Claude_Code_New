import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Music, MapPin, Users, Heart, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import StatsSection from '../components/StatsSection';
import { faqs } from '../data/mockData';

const AboutPage = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const values = [
    { icon: Music, title: 'Intimate Experiences', description: 'We believe music is best experienced up close. Our shows cap at 50-80 guests, creating connections between artists and audiences that larger venues simply cannot.' },
    { icon: MapPin, title: 'Unexpected Venues', description: 'From lofts and rooftops to galleries and gardens, our secret locations transform ordinary spaces into extraordinary concert halls.' },
    { icon: Users, title: 'Community First', description: 'We are building a community of music lovers who value authentic experiences over mainstream entertainment.' },
    { icon: Heart, title: 'Artist-Centric', description: 'We support emerging and independent artists by providing a platform to connect with dedicated fans in meaningful settings.' },
  ];

  const howItWorks = [
    { step: '01', title: 'Discover', description: 'Browse upcoming shows in your city. Each listing tells you about the artist, venue type, and experience—without revealing the exact location.' },
    { step: '02', title: 'Reserve', description: 'Secure your spot with a quick RSVP. Spaces are limited to maintain intimacy, so book early to avoid disappointment.' },
    { step: '03', title: 'Reveal', description: '24-48 hours before the show, you will receive the secret venue address via email. The anticipation is part of the experience.' },
    { step: '04', title: 'Experience', description: 'Arrive at a unique space, meet fellow music lovers, and experience an unforgettable intimate performance.' },
  ];

  const team = [
    { name: 'Maya Chen', role: 'Founder & CEO', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop', bio: 'Former music journalist with a passion for discovering emerging talent.' },
    { name: 'James Morrison', role: 'Head of Artist Relations', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop', bio: 'A decade of experience in artist management and live events.' },
    { name: 'Sofia Rodriguez', role: 'Creative Director', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop', bio: 'Award-winning designer focused on creating memorable experiences.' },
    { name: 'Alex Kim', role: 'Head of Venues', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop', bio: 'Former architect with an eye for transforming spaces into stages.' },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative min-h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0"><img src="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1920&auto=format&fit=crop" alt="Concert atmosphere" className="w-full h-full object-cover" /><div className="absolute inset-0 bg-gradient-to-b from-dark-950/70 via-dark-950/60 to-dark-950" /></div>
        <div className="relative z-10 max-w-4xl mx-auto section-padding text-center pt-32">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-display font-bold text-white mb-6">Redefining Live Music</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-xl text-white/70 max-w-2xl mx-auto">We connect music lovers with incredible artists in the most unexpected places. No stadiums, no barriers—just pure, intimate musical experiences.</motion.p>
        </div>
      </section>

      <StatsSection />

      <section className="py-20 section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-primary-400 font-medium mb-2">Our Philosophy</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-3xl md:text-4xl font-display font-bold text-white">What We Believe In</motion.h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div key={value.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="card p-6 text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-primary-500/10 flex items-center justify-center"><value.icon size={28} className="text-primary-400" /></div>
                <h3 className="text-lg font-semibold text-white mb-3">{value.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-20 bg-dark-900/50 section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-primary-400 font-medium mb-2">The Experience</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-3xl md:text-4xl font-display font-bold text-white mb-4">How SecretShows Works</motion.h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((item, index) => (
              <motion.div key={item.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="relative">
                {index < howItWorks.length - 1 && <div className="hidden lg:block absolute top-8 left-1/2 w-full h-px bg-gradient-to-r from-primary-500/30 to-transparent" />}
                <div className="relative z-10"><div className="text-5xl font-display font-bold text-primary-500/20 mb-4">{item.step}</div><h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3><p className="text-white/60 text-sm leading-relaxed">{item.description}</p></div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12"><Link to="/events" className="btn-primary inline-flex items-center gap-2">Find Your First Show<ArrowRight size={18} /></Link></div>
        </div>
      </section>

      <section className="py-20 section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-primary-400 font-medium mb-2">The People</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-3xl md:text-4xl font-display font-bold text-white">Meet Our Team</motion.h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div key={member.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="text-center">
                <img src={member.image} alt={member.name} className="w-32 h-32 mx-auto rounded-full object-cover mb-4" />
                <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                <p className="text-primary-400 text-sm mb-2">{member.role}</p>
                <p className="text-white/50 text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="py-20 bg-dark-900/50 section-padding">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-primary-400 font-medium mb-2">Questions?</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-3xl md:text-4xl font-display font-bold text-white">Frequently Asked Questions</motion.h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className="card overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="w-full flex items-center justify-between p-6 text-left">
                  <span className="text-white font-medium pr-4">{faq.question}</span>
                  {openFaq === index ? <ChevronUp size={20} className="text-primary-400 flex-shrink-0" /> : <ChevronDown size={20} className="text-white/40 flex-shrink-0" />}
                </button>
                {openFaq === index && <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} className="px-6 pb-6"><p className="text-white/60 leading-relaxed">{faq.answer}</p></motion.div>}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Ready to Experience Something Different?</h2>
            <p className="text-white/60 text-lg mb-8">Join our community and discover the magic of intimate live music.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/events" className="btn-primary text-lg px-8">Browse Events</Link>
              <Link to="/signup" className="btn-secondary text-lg px-8">Create Account</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
