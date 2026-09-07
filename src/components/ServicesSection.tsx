import { useState } from 'react';
import { motion } from 'motion/react';
import { Clock, Check, Calendar, ArrowRight } from 'lucide-react';
import { SERVICES_DATA } from '../data/barberData';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
}

export default function ServicesSection({ onSelectService }: ServicesSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'haircuts', label: 'Cuts & Fades' },
    { id: 'beard', label: 'Beard & Shaves' },
    { id: 'kids-teens', label: 'Youth & Teens' },
    { id: 'packages', label: 'Grooming Packages' },
  ];

  const filteredServices = activeCategory === 'all'
    ? SERVICES_DATA
    : SERVICES_DATA.filter(s => s.category === activeCategory);

  return (
    <section
      id="services"
      className="py-24 sm:py-32 bg-[#0a0a0a] relative text-white border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#c5a059] mb-3">
            <span className="w-6 h-[1px] bg-[#c5a059]" />
            <span>Curated Menu</span>
            <span className="w-6 h-[1px] bg-[#c5a059]" />
          </div>

          <h2 className="serif text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white">
            SERVICES & CRAFT
          </h2>

          <p className="mt-4 text-sm sm:text-base text-white/60 font-light max-w-xl mx-auto">
            Transparent pricing, uncompromised craftsmanship. Every appointment is reserved exclusively for you with Cash.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-[11px] uppercase tracking-widest font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-[#c5a059] text-black border border-[#c5a059]'
                  : 'bg-[#141414] text-white/60 hover:text-white border border-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Cards Grid with Large Visuals */}
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group flex flex-col overflow-hidden bg-[#141414] border border-white/5 hover:border-[#c5a059]/40 transition-all duration-300 shadow-2xl"
            >
              {/* Card Visual Header */}
              <div className="relative h-56 w-full overflow-hidden bg-[#0a0a0a]">
                <img
                  src={service.image}
                  alt={service.name}
                  onError={(e) => {
                    e.currentTarget.src = '/assets/cuts/modern-cut.jpg';
                  }}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-[0.85] contrast-[1.1]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/30 to-transparent" />

                {/* Popular Pill */}
                {service.popular && (
                  <div className="absolute top-4 right-4">
                    <span className="px-2.5 py-1 bg-[#c5a059] text-black text-[9px] font-bold uppercase tracking-widest shadow-md">
                      Client Favorite
                    </span>
                  </div>
                )}

                {/* Price Tag Overlay */}
                <div className="absolute bottom-4 left-5 flex items-baseline gap-2">
                  <span className="serif text-3xl sm:text-4xl font-bold text-[#c5a059] tracking-tight">
                    ${service.price}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-white/70 font-medium tracking-wide">
                    <Clock className="w-3 h-3 text-[#c5a059]" />
                    {service.duration}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                <div>
                  <h3 className="serif text-xl font-bold uppercase tracking-tight text-white group-hover:text-[#c5a059] transition-colors">
                    {service.name}
                  </h3>

                  <p className="mt-2.5 text-xs sm:text-sm text-white/60 font-light leading-relaxed">
                    {service.description}
                  </p>

                  {/* What's Included */}
                  <div className="mt-5 pt-4 border-t border-white/5 space-y-2">
                    {service.included.slice(0, 3).map((perk, pIdx) => (
                      <div key={pIdx} className="flex items-center gap-2 text-xs text-white/80">
                        <Check className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                        <span className="line-clamp-1">{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Book Button */}
                <button
                  id={`book-service-${service.id}`}
                  onClick={() => onSelectService(service)}
                  className="w-full py-3 bg-[#0a0a0a] hover:bg-[#c5a059] text-white hover:text-black border border-white/10 hover:border-[#c5a059] font-bold text-[11px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer group/btn"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#c5a059] group-hover/btn:text-black" />
                  <span>Book with Cash</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Booking Guarantee */}
        <div className="mt-16 p-6 bg-[#141414] border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 bg-[#0a0a0a] border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059] shrink-0 serif font-bold text-base">
              4.9★
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Booksy Verified Guarantee</p>
              <p className="text-xs text-white/60">329+ five-star client reviews. Instant online confirmation with Cash.</p>
            </div>
          </div>
          <a
            href="https://booksy.com/en-us/108330_faded-by-cash_barber-shop_36509_garland"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-[#0a0a0a] hover:bg-[#c5a059] hover:text-black text-white border border-white/10 text-[11px] uppercase tracking-widest font-bold transition-all whitespace-nowrap"
          >
            Direct Booksy Schedule
          </a>
        </div>
      </div>
    </section>
  );
}
