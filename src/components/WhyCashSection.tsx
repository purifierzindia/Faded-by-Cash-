import { motion } from 'motion/react';
import { Crosshair, Sparkles, Scissors, Award, Check } from 'lucide-react';
import { WHY_CASH_POINTS } from '../data/barberData';

export default function WhyCashSection() {
  const icons = [Crosshair, Sparkles, Scissors, Award];

  return (
    <section
      id="why-cash"
      className="py-24 sm:py-32 bg-[#0a0a0a] relative text-white border-b border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#c5a059] mb-3">
            <span className="w-6 h-[1px] bg-[#c5a059]" />
            <span>The Standard</span>
            <span className="w-6 h-[1px] bg-[#c5a059]" />
          </div>

          <h2 className="serif text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-white">
            WHY FADED BY CASH
          </h2>

          <p className="mt-4 text-sm sm:text-base text-white/60 font-light max-w-xl mx-auto">
            A reputation built on consistency, millimetric precision, and client trust in Garland, Texas.
          </p>
        </div>

        {/* 4 Points Grid */}
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {WHY_CASH_POINTS.map((point, index) => {
            const Icon = icons[index % icons.length];
            return (
              <motion.div
                key={point.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative p-8 bg-[#141414] border border-white/5 hover:border-[#c5a059]/40 transition-all duration-300 shadow-2xl flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Number & Icon */}
                  <div className="flex items-center justify-between pb-6 border-b border-white/5">
                    <span className="serif font-bold text-2xl text-white/30 group-hover:text-[#c5a059] transition-colors">
                      {point.number}
                    </span>
                    <div className="w-10 h-10 bg-[#0a0a0a] border border-white/10 group-hover:border-[#c5a059]/50 flex items-center justify-center text-[#c5a059] transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="serif text-xl font-bold uppercase tracking-tight text-white mt-6 group-hover:text-[#c5a059] transition-colors">
                    {point.title}
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                    {point.description}
                  </p>
                </div>

                {/* Bottom Highlight */}
                <div className="mt-8 pt-4 border-t border-white/5 flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#c5a059] font-semibold">
                  <Check className="w-3.5 h-3.5 shrink-0" />
                  <span>{point.highlight}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Client Trust Metric Bar */}
        <div className="mt-16 bg-[#141414] border border-white/5 p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="serif text-3xl sm:text-4xl font-bold text-[#c5a059]">
              4.9★
            </div>
            <div className="text-[10px] uppercase tracking-widest text-white/60 mt-1 font-medium">
              Average Rating
            </div>
          </div>
          <div>
            <div className="serif text-3xl sm:text-4xl font-bold text-white">
              329+
            </div>
            <div className="text-[10px] uppercase tracking-widest text-white/60 mt-1 font-medium">
              Booksy Reviews
            </div>
          </div>
          <div>
            <div className="serif text-3xl sm:text-4xl font-bold text-[#c5a059]">
              100%
            </div>
            <div className="text-[10px] uppercase tracking-widest text-white/60 mt-1 font-medium">
              Sanitized Tools
            </div>
          </div>
          <div>
            <div className="serif text-3xl sm:text-4xl font-bold text-white">
              Garland
            </div>
            <div className="text-[10px] uppercase tracking-widest text-white/60 mt-1 font-medium">
              Prime DFW Location
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
