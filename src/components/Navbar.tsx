import { useState, useEffect } from 'react';
import { Menu, X, Phone, Calendar, Star, MapPin, Instagram } from 'lucide-react';
import { BUSINESS_INFO } from '../data/barberData';

interface NavbarProps {
  onOpenBooking: () => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'The Work', href: '#portfolio' },
    { name: 'See The Craft', href: '#craft' },
    { name: 'Why Cash', href: '#why-cash' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Location', href: '#location' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/5 py-4 shadow-2xl'
          : 'bg-gradient-to-b from-[#0a0a0a]/95 to-transparent py-5 border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          id="navbar-brand-logo"
          className="group flex flex-col focus:outline-none"
        >
          <div className="flex items-center gap-2">
            <span className="serif text-xl sm:text-2xl font-bold tracking-widest text-white uppercase group-hover:text-[#c5a059] transition-colors">
              FADED BY CASH
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
          </div>
          <span className="text-[9px] uppercase tracking-[0.3em] text-[#c5a059] font-medium mt-0.5">
            Precision • Style • Confidence
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav id="desktop-nav" className="hidden lg:flex items-center gap-9">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.href)}
              className="text-[11px] uppercase tracking-widest font-medium text-white/80 hover:text-[#c5a059] transition-colors relative py-1 focus:outline-none cursor-pointer after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#c5a059] hover:after:w-full after:transition-all after:duration-200"
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            id="navbar-instagram-link"
            href={BUSINESS_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-semibold text-zinc-300 hover:text-[#c5a059] transition-colors p-2 rounded-sm hover:bg-white/5"
            title="Follow Faded By Cash on Instagram"
            aria-label="Instagram profile"
          >
            <Instagram className="w-4 h-4 text-[#c5a059]" />
          </a>

          <a
            id="navbar-phone-link"
            href={`tel:${BUSINESS_INFO.phoneRaw}`}
            className="flex items-center gap-1.5 text-xs font-semibold text-zinc-300 hover:text-white transition-colors px-3 py-2 rounded-sm hover:bg-white/5"
            title="Call Faded By Cash"
          >
            <Phone className="w-3.5 h-3.5 text-[#c5a059]" />
            <span className="tracking-wider">{BUSINESS_INFO.phone}</span>
          </a>

          <button
            id="navbar-book-btn"
            onClick={onOpenBooking}
            className="bg-[#c5a059] text-black px-6 py-2.5 text-[11px] font-bold uppercase tracking-widest hover:bg-white transition-colors cursor-pointer rounded-none"
          >
            <span className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Appointment</span>
            </span>
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex sm:hidden items-center gap-2">
          <a
            href={BUSINESS_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 text-[#c5a059] hover:text-white"
            aria-label="Instagram"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <button
            id="mobile-book-cut-quick"
            onClick={onOpenBooking}
            className="px-3 py-1.5 rounded bg-[#c5a059] text-black text-xs font-bold uppercase tracking-wider"
          >
            Book
          </button>
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-zinc-300 hover:text-white focus:outline-none rounded-lg hover:bg-zinc-900"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="sm:hidden bg-[#0c0c10] border-b border-zinc-800 px-6 py-6 mt-3 space-y-4 shadow-2xl animate-in slide-in-from-top-4 duration-200"
        >
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80 text-xs text-zinc-400">
            <span className="flex items-center gap-1.5 text-[#e5c583]">
              <Star className="w-3.5 h-3.5 fill-[#e5c583]" />
              <strong className="text-zinc-100">{BUSINESS_INFO.rating}</strong> ({BUSINESS_INFO.reviewsCount} reviews)
            </span>
            <span className="flex items-center gap-1 text-zinc-400">
              <MapPin className="w-3.5 h-3.5 text-zinc-500" /> Garland, TX
            </span>
          </div>

          <div className="space-y-3 pt-2">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className="block w-full text-left py-2 text-sm uppercase tracking-widest font-medium text-zinc-200 hover:text-[#e5c583] transition-colors"
              >
                {link.name}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-zinc-800 space-y-3">
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="flex items-center justify-center gap-2 w-full py-3 rounded bg-zinc-900 text-zinc-200 font-semibold text-xs tracking-wider"
            >
              <Phone className="w-4 h-4 text-[#c5a059]" />
              <span>Call Cash: {BUSINESS_INFO.phone}</span>
            </a>
            <a
              href={BUSINESS_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded bg-zinc-900/70 border border-white/10 text-white font-semibold text-xs tracking-wider"
            >
              <Instagram className="w-4 h-4 text-[#c5a059]" />
              <span>Follow {BUSINESS_INFO.instagramHandle}</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded bg-gradient-to-r from-[#c5a059] to-[#d4af37] text-black font-bold text-xs uppercase tracking-widest shadow-md"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
