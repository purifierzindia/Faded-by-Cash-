import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Maximize2, Tag, Calendar } from 'lucide-react';
import { PORTFOLIO_ITEMS } from '../data/barberData';
import { PortfolioItem } from '../types';
import BeforeAfterSlider from './BeforeAfterSlider';

interface PortfolioSectionProps {
  onOpenLightbox: (item: PortfolioItem, index: number) => void;
  onOpenBooking: () => void;
}

export default function PortfolioSection({ onOpenLightbox, onOpenBooking }: PortfolioSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filterTabs = [
    { id: 'all', label: 'All Portfolio' },
    { id: 'fades', label: 'Skin Fades' },
    { id: 'lineups', label: 'Crisp Lineups' },
    { id: 'beard', label: 'Beard Sculpting' },
    { id: 'modern', label: 'Modern Styles' },
  ];

  const filteredItems = selectedCategory === 'all'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter(item => item.category === selectedCategory);

  return (
    <section
      id="portfolio"
      className="py-24 sm:py-32 bg-[#0a0a0a] relative text-white border-t border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#c5a059] mb-3">
            <span className="w-6 h-[1px] bg-[#c5a059]" />
            <span>Mastery In Motion</span>
            <span className="w-6 h-[1px] bg-[#c5a059]" />
          </div>

          <h2 className="serif text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-white">
            THE WORK
          </h2>

          <p className="mt-4 text-sm sm:text-base text-white/60 font-light max-w-xl mx-auto">
            Authentic client haircuts, sharp tapers, surgical line-ups, and luxury beard finishing executed daily in Garland, TX.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-4 py-2 text-[11px] uppercase tracking-widest font-semibold transition-all cursor-pointer ${
                selectedCategory === tab.id
                  ? 'bg-[#c5a059] text-black border border-[#c5a059]'
                  : 'bg-[#141414] text-white/60 hover:text-white border border-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Masonry / Responsive Grid Gallery with Hover Reveal */}
        <motion.div
          layout
          className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group relative overflow-hidden bg-[#141414] border border-white/5 hover:border-[#c5a059]/50 shadow-2xl cursor-pointer"
                onClick={() => onOpenLightbox(item, index)}
              >
                {/* Photo Display */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#0a0a0a]">
                  <img
                    src={item.image}
                    alt={item.title}
                    onError={(e) => {
                      e.currentTarget.src = '/assets/cuts/modern-cut.jpg';
                    }}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-[0.9] contrast-[1.08]"
                  />

                  {/* Dark Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-2.5 py-1 bg-black/80 backdrop-blur-md border border-white/10 text-[9px] font-bold uppercase tracking-widest text-[#c5a059] flex items-center gap-1">
                      <Tag className="w-2.5 h-2.5" />
                      {item.category}
                    </span>

                    <span className="w-8 h-8 bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/80 group-hover:bg-[#c5a059] group-hover:text-black transition-all">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  {/* Bottom Hover Details */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-[#c5a059]">
                      {item.styleName}
                    </p>
                    <h3 className="serif text-lg font-bold text-white uppercase tracking-tight mt-0.5">
                      {item.title}
                    </h3>
                    <p className="text-xs text-white/70 font-light mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">
                      {item.description}
                    </p>

                    <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] uppercase tracking-widest text-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span>Click to enlarge style</span>
                      <span className="text-[#c5a059] font-bold">View Detail →</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Interactive Before/After Transformation Feature */}
        <BeforeAfterSlider />

        {/* Book Gallery Style CTA */}
        <div className="mt-14 text-center">
          <p className="text-xs sm:text-sm text-white/60">
            Want one of these exact looks? Cash customizes every fade and beard line to your hairline.
          </p>
          <button
            onClick={onOpenBooking}
            className="mt-4 px-8 py-3.5 bg-[#c5a059] hover:bg-white text-black font-bold text-[11px] uppercase tracking-widest transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Your Transformation with Cash</span>
          </button>
        </div>
      </div>
    </section>
  );
}
