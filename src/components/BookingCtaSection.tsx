import { motion } from 'motion/react';
import { Calendar, Phone, ArrowUpRight, Shield, CreditCard, Banknote } from 'lucide-react';
import { BUSINESS_INFO } from '../data/barberData';

interface BookingCtaSectionProps {
  onOpenBooking: () => void;
}

export default function BookingCtaSection({ onOpenBooking }: BookingCtaSectionProps) {
  return (
    <section
      id="booking-cta"
      className="py-24 sm:py-32 bg-[#0a0a0a] relative overflow-hidden text-white border-b border-white/5"
    >
      {/* Background with Dark Atmospheric Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/cuts/classic-cut.jpg"
          alt="Luxury Barber Chair at Faded By Cash"
          onError={(e) => {
            e.currentTarget.src = '/assets/cuts/hero-barber.jpg';
          }}
          className="w-full h-full object-cover object-center filter brightness-[0.16] contrast-[1.1]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-[#0a0a0a]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Subtle Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#141414] border border-[#c5a059]/30 text-[10px] text-[#c5a059] tracking-[0.3em] uppercase font-bold mb-6">
          <Calendar className="w-3.5 h-3.5" />
          <span>Appointments & Walk-ins</span>
        </div>

        {/* Headline */}
        <h2 className="serif text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-white leading-none">
          READY FOR A FRESH CUT?
        </h2>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-xl text-white/70 font-light max-w-xl">
          Book your next signature appointment with Cash.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            id="book-appointment-cta-btn"
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-10 py-4 bg-[#c5a059] hover:bg-white text-black font-bold text-[11px] uppercase tracking-widest transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-2xl"
          >
            <Calendar className="w-4 h-4" />
            <span>BOOK APPOINTMENT</span>
          </button>

          <a
            id="call-cash-cta-btn"
            href={`tel:${BUSINESS_INFO.phoneRaw}`}
            className="w-full sm:w-auto px-8 py-4 bg-[#141414] border border-white/10 hover:border-[#c5a059] text-white hover:text-[#c5a059] font-bold text-[11px] uppercase tracking-widest transition-all flex items-center justify-center gap-2.5"
          >
            <Phone className="w-4 h-4 text-[#c5a059]" />
            <span>Call: {BUSINESS_INFO.phone}</span>
          </a>
        </div>

        {/* Payment & Booking Notice */}
        <div className="mt-12 pt-8 border-t border-white/5 w-full flex flex-wrap items-center justify-center gap-6 text-[10px] uppercase tracking-widest text-white/60 font-medium">
          <span className="flex items-center gap-1.5">
            <CreditCard className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Accepted Payments: Zelle, Cash & Debit</span>
          </span>
          <span className="text-white/20">•</span>
          <span className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>1226 E Northwest Hwy, Garland, TX</span>
          </span>
        </div>
      </div>
    </section>
  );
}
