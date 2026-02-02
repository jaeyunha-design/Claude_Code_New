import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, User, LogOut, Heart, Ticket, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setIsProfileOpen(false);
  }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/events?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    navigate('/');
  };

  const navLinks = [
    { path: '/events', label: 'Events' },
    { path: '/artists', label: 'Artists' },
    { path: '/about', label: 'About' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'bg-dark-950/95 backdrop-blur-lg border-b border-white/5' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                <span className="text-dark-900 font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-display font-semibold text-white group-hover:text-primary-400 transition-colors">
                SecretShows
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors relative ${
                    location.pathname === link.path ? 'text-white' : 'text-white/60 hover:text-white'
                  }`}
                >
                  {link.label}
                  {location.pathname === link.path && (
                    <motion.div layoutId="navbar-indicator" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-500" />
                  )}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <button onClick={() => setIsSearchOpen(true)} className="p-2 text-white/60 hover:text-white transition-colors">
                <Search size={20} />
              </button>

              {isAuthenticated ? (
                <div className="relative">
                  <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center space-x-2 p-1 rounded-full hover:bg-white/5 transition-colors">
                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover border border-white/10" />
                    <ChevronDown size={16} className={`text-white/60 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-56 bg-dark-800 border border-white/10 rounded-xl shadow-xl overflow-hidden"
                      >
                        <div className="p-4 border-b border-white/10">
                          <p className="text-white font-medium">{user.name}</p>
                          <p className="text-white/50 text-sm truncate">{user.email}</p>
                        </div>
                        <div className="p-2">
                          <Link to="/profile" className="flex items-center space-x-3 px-3 py-2 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                            <User size={18} /><span>Profile</span>
                          </Link>
                          <Link to="/profile?tab=bookings" className="flex items-center space-x-3 px-3 py-2 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                            <Ticket size={18} /><span>My Bookings</span>
                          </Link>
                          <Link to="/profile?tab=saved" className="flex items-center space-x-3 px-3 py-2 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                            <Heart size={18} /><span>Saved Events</span>
                          </Link>
                          <button onClick={handleLogout} className="w-full flex items-center space-x-3 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors">
                            <LogOut size={18} /><span>Log Out</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="hidden sm:flex items-center space-x-3">
                  <Link to="/login" className="btn-ghost text-sm">Log In</Link>
                  <Link to="/signup" className="btn-primary text-sm !py-2">Sign Up</Link>
                </div>
              )}

              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 text-white/60 hover:text-white transition-colors">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 md:hidden">
            <div className="absolute inset-0 bg-dark-950/95 backdrop-blur-lg" onClick={() => setIsMobileMenuOpen(false)} />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween', duration: 0.3 }} className="absolute right-0 top-0 bottom-0 w-80 bg-dark-900 border-l border-white/10 p-6 pt-24">
              <div className="space-y-6">
                {navLinks.map(link => (
                  <Link key={link.path} to={link.path} className={`block text-2xl font-display ${location.pathname === link.path ? 'text-primary-400' : 'text-white/70 hover:text-white'}`}>
                    {link.label}
                  </Link>
                ))}
                {!isAuthenticated && (
                  <div className="pt-6 border-t border-white/10 space-y-3">
                    <Link to="/login" className="block w-full text-center btn-secondary">Log In</Link>
                    <Link to="/signup" className="block w-full text-center btn-primary">Sign Up</Link>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSearchOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-start justify-center pt-32 px-4">
            <div className="absolute inset-0 bg-dark-950/90 backdrop-blur-sm" onClick={() => setIsSearchOpen(false)} />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative w-full max-w-2xl">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40" size={24} />
                  <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search events, artists, cities..." className="w-full pl-14 pr-12 py-5 bg-dark-800 border border-white/10 rounded-2xl text-white text-lg placeholder-white/40 focus:outline-none focus:border-primary-500/50" autoFocus />
                  <button type="button" onClick={() => setIsSearchOpen(false)} className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-white/40 hover:text-white">
                    <X size={20} />
                  </button>
                </div>
              </form>
              <div className="mt-4 p-4 bg-dark-800/50 rounded-xl border border-white/5">
                <p className="text-white/40 text-sm">Quick searches:</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {['New York', 'Jazz', 'This Weekend', 'Luna Waves'].map(term => (
                    <button key={term} onClick={() => { setSearchQuery(term); navigate(`/events?search=${encodeURIComponent(term)}`); setIsSearchOpen(false); }} className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded-full text-sm text-white/70 hover:text-white transition-colors">
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
