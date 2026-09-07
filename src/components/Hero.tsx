import { motion } from 'motion/react';
import { Star, ArrowRight, ShieldCheck, MapPin, Scissors } from 'lucide-react';
import { BUSINESS_INFO } from '../data/barberData';

interface HeroProps {
  onOpenBooking: () => void;
  onViewServices: () => void;
}

export default function Hero({ onOpenBooking, onViewServices }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-[90vh] lg:min-h-[94vh] flex items-center justify-center overflow-hidden bg-[#09090c]"
    >
      {/* Background Barber Image with Subtle Parallax Zoom */}
      <div className="absolute inset-0 z-0 select-none">
        <motion.div
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: [0.25, 1, 0.5, 1] }}
          className="w-full h-full"
        >
          <img
            src="/assets/cuts/hero-barber.jpg"
            alt="Master barber crafting a precision fade"
            onError={(e) => {
              e.currentTarget.src = '/assets/cuts/classic-cut.jpg';
            }}
            className="w-full h-full object-cover object-center filter brightness-[0.42] contrast-[1.12]"
          />
        </motion.div>

        {/* Sophisticated Dark Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/65 to-[#0a0a0a]/80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(197,160,89,0.08)_0%,rgba(10,10,10,0.85)_75%)]" />
    </div>

    {/* Hero Content */}
    <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
      {/* Trust Indicator Pill */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="inline-flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full mb-8 shadow-2xl"
      >
        <span className="text-[#c5a059] text-sm font-black">★</span>
        <span className="text-sm font-semibold text-white tracking-wide">4.9</span>
        <span className="text-[10px] text-white/60 uppercase tracking-widest ml-1">329 Reviews</span>
        <span className="text-white/20 mx-1">•</span>
        <span className="text-[#c5a059] text-[10px] uppercase tracking-widest font-semibold">Booksy Verified</span>
      </motion.div>

      {/* Main Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.25 }}
        className="serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white font-normal leading-[0.92] tracking-tight max-w-4xl"
      >
        SHARP CUTS.<br />
        <span className="italic text-[#c5a059]">SHARP</span><br />
        CONFIDENCE.
      </motion.h1>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="mt-6 text-white/70 max-w-xl text-sm sm:text-base leading-relaxed tracking-normal font-normal text-center"
      >
        Precision cuts, clean fades and premium grooming by Cash. Experienced craftsmanship for the modern gentleman in Garland, TX.
      </motion.p>

      {/* Primary & Secondary Call to Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.55 }}
        className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
      >
        <button
          id="hero-primary-cta"
          onClick={onOpenBooking}
          className="w-full sm:w-auto bg-[#c5a059] text-black px-7 py-3.5 text-[11px] font-bold uppercase tracking-widest hover:bg-white transition-colors cursor-pointer shadow-xl flex items-center justify-center gap-2.5"
        >
          <span>BOOK YOUR CUT</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <button
          id="hero-secondary-cta"
          onClick={onViewServices}
          className="w-full sm:w-auto border border-[#c5a059] text-[#c5a059] px-7 py-3.5 text-[11px] uppercase tracking-widest hover:bg-[#c5a059] hover:text-black transition-all cursor-pointer backdrop-blur-sm flex items-center justify-center gap-2"
        >
          <Scissors className="w-3.5 h-3.5" />
          <span>VIEW SERVICES</span>
        </button>
      </motion.div>

      {/* Location & Trust Sub-bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.75 }}
        className="mt-14 pt-8 border-t border-white/5 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-[10px] text-white/50 font-medium tracking-widest uppercase"
      >
        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-[#c5a059]" />
          <span>1226 E Northwest Hwy, Garland, TX</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" />
          <span>Straight Razor Detailing</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
          <span>Walk-ins & Appointments</span>
        </div>
      </motion.div>
    </div>

    {/* Decorative Bottom Fade */}
    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />
    </section>
  );
}
