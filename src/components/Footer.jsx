import { Link } from 'react-router-dom';
import { Instagram, Twitter, Youtube, Mail, Music } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    discover: [
      { label: 'Browse Events', path: '/events' },
      { label: 'Featured Artists', path: '/artists' },
      { label: 'Cities', path: '/events?filter=cities' },
      { label: 'Genres', path: '/events?filter=genres' },
    ],
    company: [
      { label: 'About Us', path: '/about' },
      { label: 'How It Works', path: '/about#how-it-works' },
      { label: 'Host a Show', path: '/host' },
      { label: 'Become an Artist', path: '/artists/apply' },
    ],
    support: [
      { label: 'Help Center', path: '/help' },
      { label: 'Contact Us', path: '/contact' },
      { label: 'FAQs', path: '/about#faq' },
      { label: 'Accessibility', path: '/accessibility' },
    ],
    legal: [
      { label: 'Privacy Policy', path: '/privacy' },
      { label: 'Terms of Service', path: '/terms' },
      { label: 'Cookie Policy', path: '/cookies' },
    ],
  };

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'YouTube' },
    { icon: Mail, href: 'mailto:hello@secretshows.com', label: 'Email' },
  ];

  return (
    <footer className="bg-dark-900 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-white/5">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl md:text-3xl font-display font-semibold text-white mb-3">Never miss a secret show</h3>
            <p className="text-white/60">Get early access to events, artist announcements, and exclusive content.</p>
          </div>
          <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" className="flex-1 input-field" />
            <button type="submit" className="btn-primary whitespace-nowrap">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                <span className="text-dark-900 font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-display font-semibold text-white">SecretShows</span>
            </Link>
            <p className="text-white/50 text-sm mb-6">Discover live music in unexpected places. Intimate concerts, secret venues, unforgettable experiences.</p>
            <div className="flex space-x-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} aria-label={label} className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Discover</h4>
            <ul className="space-y-3">
              {footerLinks.discover.map(link => (
                <li key={link.path}><Link to={link.path} className="text-white/50 hover:text-white text-sm transition-colors">{link.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map(link => (
                <li key={link.path}><Link to={link.path} className="text-white/50 hover:text-white text-sm transition-colors">{link.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map(link => (
                <li key={link.path}><Link to={link.path} className="text-white/50 hover:text-white text-sm transition-colors">{link.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map(link => (
                <li key={link.path}><Link to={link.path} className="text-white/50 hover:text-white text-sm transition-colors">{link.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm">&copy; {currentYear} SecretShows. All rights reserved.</p>
            <div className="flex items-center space-x-2 text-white/40 text-sm">
              <Music size={16} />
              <span>Made with love for live music</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
