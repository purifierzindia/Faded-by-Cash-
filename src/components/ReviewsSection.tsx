import { useState } from 'react';
import { motion } from 'motion/react';
import { Star, ShieldCheck, ExternalLink, Quote } from 'lucide-react';
import { REVIEWS_DATA, BUSINESS_INFO } from '../data/barberData';

export default function ReviewsSection() {
  const [filter, setFilter] = useState<'all' | '5star'>('all');

  return (
    <section
      id="reviews"
      className="py-24 sm:py-32 bg-[#0a0a0a] relative text-white border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Booksy Rating Badge */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#c5a059] mb-3">
            <span className="w-6 h-[1px] bg-[#c5a059]" />
            <span>Public Booksy Feedback</span>
            <span className="w-6 h-[1px] bg-[#c5a059]" />
          </div>

          <h2 className="serif text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-white">
            CLIENT REPUTATION
          </h2>

          {/* Booksy Score Big Badge */}
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-5 px-6 py-3 bg-[#141414] border border-[#c5a059]/40 shadow-2xl">
            <div className="flex items-center gap-2 text-[#c5a059]">
              <span className="serif font-bold text-3xl sm:text-4xl text-white">
                {BUSINESS_INFO.rating}
              </span>
              <div className="flex items-center text-[#c5a059] ml-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#c5a059]" />
                ))}
              </div>
            </div>

            <div className="h-8 w-[1px] bg-white/10 hidden sm:block" />

            <div className="text-left">
              <p className="text-[11px] uppercase tracking-widest font-bold text-white">
                {BUSINESS_INFO.reviewsCount} Verified Reviews
              </p>
              <p className="text-[10px] text-white/60 font-light flex items-center gap-1 mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Booksy Recommended Top Barber</span>
              </p>
            </div>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {REVIEWS_DATA.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="p-6 sm:p-7 bg-[#141414] border-l-2 border-[#c5a059] border-y border-r border-white/5 hover:border-r-[#c5a059]/40 transition-all duration-300 shadow-2xl flex flex-col justify-between group"
            >
              <div>
                {/* Review Header: Stars & Verified Badge */}
                <div className="flex items-center justify-between pb-4 border-b border-white/5">
                  <div className="flex items-center gap-1 text-[#c5a059]">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#c5a059]" />
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-widest font-semibold text-[#c5a059] bg-[#c5a059]/10 border border-[#c5a059]/30 px-2 py-0.5">
                    <ShieldCheck className="w-3 h-3" />
                    Booksy Verified
                  </span>
                </div>

                {/* Comment */}
                <div className="mt-4 relative">
                  <p className="relative z-10 text-xs sm:text-sm text-white/80 font-normal leading-relaxed italic">
                    "{review.comment}"
                  </p>
                </div>
              </div>

              {/* Author & Service Info */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <div>
                  <h4 className="serif text-sm font-bold text-white tracking-wide">
                    {review.author}
                  </h4>
                  <p className="text-[10px] uppercase tracking-widest text-[#c5a059] font-medium mt-0.5">
                    {review.service}
                  </p>
                </div>
                <div className="w-8 h-8 bg-[#0a0a0a] border border-white/10 text-[#c5a059] text-xs font-bold flex items-center justify-center serif">
                  {review.author.charAt(0)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All on Booksy Link */}
        <div className="mt-14 text-center">
          <a
            href={BUSINESS_INFO.booksyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#141414] border border-white/10 hover:border-[#c5a059] text-[11px] font-bold uppercase tracking-widest text-white hover:text-[#c5a059] transition-all shadow-md group"
          >
            <span>Read all 329 customer reviews on Booksy</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#c5a059] group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
