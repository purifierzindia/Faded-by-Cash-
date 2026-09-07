import { Scissors, Phone, MapPin, Calendar, ExternalLink, ShieldCheck, Instagram } from 'lucide-react';
import { BUSINESS_INFO } from '../data/barberData';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenOwnerPortal?: () => void;
}

export default function Footer({ onOpenBooking, onOpenOwnerPortal }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="main-footer" className="bg-[#0a0a0a] border-t border-white/5 text-white/60 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/5">
          {/* Brand & Slogan (4 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="serif font-bold tracking-widest text-2xl text-white uppercase">
                FADED BY CASH
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
            </div>

            <p className="serif italic text-[#c5a059] text-sm tracking-wide">
              "Precision. Style. Confidence."
            </p>

            <p className="text-xs text-white/50 font-light max-w-sm leading-relaxed">
              Garland’s premier destination for surgical fades, clean beard architecture, and uncompromised barbershop craftsmanship by Cash.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-white/50">
              <ShieldCheck className="w-4 h-4 text-[#c5a059]" />
              <span>Booksy Verified 4.9★ with 329+ Client Reviews</span>
            </div>
          </div>

          {/* Quick Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#services" className="hover:text-[#c5a059] transition-colors">Services Menu</a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-[#c5a059] transition-colors">The Work</a>
              </li>
              <li>
                <a href="#craft" className="hover:text-[#c5a059] transition-colors">See The Craft</a>
              </li>
              <li>
                <a href="#why-cash" className="hover:text-[#c5a059] transition-colors">Why Cash</a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-[#c5a059] transition-colors">Client Reviews</a>
              </li>
              <li>
                <a href="#location" className="hover:text-[#c5a059] transition-colors">Shop Location</a>
              </li>
            </ul>
          </div>

          {/* Contact Details (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-white">
              Garland Shop
            </h4>
            <div className="space-y-2.5 text-xs text-white/70">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                <span>
                  1226 E Northwest Highway<br />
                  Garland, TX 75041
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#c5a059] shrink-0" />
                <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="hover:text-white transition-colors">
                  {BUSINESS_INFO.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Booking & Platforms (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-white">
              Booking
            </h4>
            <div className="space-y-2.5">
              <button
                onClick={onOpenBooking}
                className="w-full py-2.5 px-4 bg-[#c5a059] hover:bg-white text-black font-bold text-[10px] uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Now</span>
              </button>

              <a
                href={BUSINESS_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-[#141414] hover:bg-[#1f1f1f] text-white/80 hover:text-white text-[10px] font-semibold uppercase tracking-widest transition-all border border-white/10 flex items-center justify-center gap-1.5"
              >
                <Instagram className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>{BUSINESS_INFO.instagramHandle}</span>
                <ExternalLink className="w-3 h-3 text-white/40" />
              </a>

              <a
                href={BUSINESS_INFO.booksyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-[#141414] hover:bg-[#1f1f1f] text-white/80 hover:text-white text-[10px] font-semibold uppercase tracking-widest transition-all border border-white/10 flex items-center justify-center gap-1.5"
              >
                <span>Booksy Profile</span>
                <ExternalLink className="w-3 h-3 text-[#c5a059]" />
              </a>

              {onOpenOwnerPortal && (
                <button
                  type="button"
                  onClick={onOpenOwnerPortal}
                  className="w-full py-2 px-4 bg-transparent hover:bg-white/5 text-[#c5a059]/80 hover:text-[#c5a059] text-[9px] font-bold uppercase tracking-widest transition-all border border-[#c5a059]/20 hover:border-[#c5a059]/50 flex items-center justify-center gap-1.5 cursor-pointer rounded"
                >
                  <span>Barber Portal</span>
                  <span className="text-[8px] bg-[#c5a059]/20 px-1 rounded text-[#c5a059]">Admin</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar with Discreet Demo Label */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] uppercase tracking-widest text-white/40">
          <p>
            © {currentYear} Faded By Cash. Precision Barbering Garland, TX.
          </p>

          <div className="flex items-center gap-4">
            {onOpenOwnerPortal && (
              <button
                type="button"
                onClick={onOpenOwnerPortal}
                className="hover:text-[#c5a059] transition-colors cursor-pointer"
              >
                Owner Portal
              </button>
            )}

            {/* Discreet Demo Label as requested */}
            <div className="flex items-center gap-2 text-white/40">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
              <span className="tracking-widest">
                Website concept by <span className="text-white/70 font-semibold">KK MARTECH</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
