import { motion } from 'motion/react';
import { Check, ArrowUpRight } from 'lucide-react';
import { BUSINESS_INFO } from '../data/barberData';

interface VisualIntroProps {
  onOpenBooking: () => void;
}

export default function VisualIntro({ onOpenBooking }: VisualIntroProps) {
  return (
    <section
      id="visual-intro"
      className="py-24 sm:py-32 bg-[#0a0a0a] relative overflow-hidden border-t border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Visual Column - Takes 7 of 12 columns for a dominant 70% visual weight */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 relative"
          >
            {/* Primary Large Image */}
            <div className="relative overflow-hidden border border-white/10 bg-[#141414] shadow-2xl group">
              <img
                src="/assets/cuts/modern-cut.jpg"
                alt="Precision fade detail work by Cash"
                onError={(e) => {
                  e.currentTarget.src = '/assets/cuts/classic-cut.jpg';
                }}
                className="w-full h-[480px] sm:h-[560px] object-cover object-top group-hover:scale-[1.02] transition-transform duration-700 filter brightness-[0.92] contrast-[1.08]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />

              {/* Floating Signature Badge */}
              <div className="absolute bottom-6 left-6 right-6 sm:right-auto bg-[#141414]/95 backdrop-blur-md border border-[#c5a059]/40 p-4 shadow-2xl flex items-center gap-4">
                <div className="w-12 h-12 bg-[#0a0a0a] border border-[#c5a059]/50 flex items-center justify-center shrink-0">
                  <span className="serif font-bold text-[#c5a059] text-xl">FC</span>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#c5a059] font-bold">
                    Signature Barber Technique
                  </p>
                  <p className="text-xs text-white/80 font-light mt-0.5">
                    Individual head shape analysis & bespoke blade finishes.
                  </p>
                </div>
              </div>
            </div>

            {/* Subtle decorative background glow */}
            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-[#c5a059]/5 rounded-full blur-3xl pointer-events-none" />
          </motion.div>

          {/* Text Column - 5 of 12 columns, short, confident, editorial */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col justify-center"
          >
            <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#c5a059] mb-4">
              <span className="w-6 h-[1px] bg-[#c5a059]" />
              <span>The Craft</span>
            </div>

            <h2 className="serif text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.0]">
              YOUR LOOK.<br />
              <span className="italic text-[#c5a059]">OUR CRAFT.</span>
            </h2>

            <p className="mt-6 text-sm sm:text-base text-white/80 font-normal leading-relaxed">
              At <strong className="text-white font-semibold">Faded By Cash</strong>, a haircut is never just a routine appointment. Cash focuses on precision, surgical detail, and personalized grooming crafted around your facial architecture and personal style.
            </p>

            <p className="mt-4 text-xs sm:text-sm text-white/60 font-light leading-relaxed">
              From millimetric skin fades to straight-razor beard sculpting and revitalizing hot towel treatments, every cut is executed with uncompromised focus.
            </p>

            {/* Fast Benefit Checklist */}
            <div className="mt-8 space-y-3 border-t border-white/5 pt-6">
              {[
                'Tailored hairline & symmetry evaluation',
                'Straight razor perimeter detailing included',
                'Premium hot towel & beard conditioning treatments',
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 text-xs text-white/90 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <button
                id="intro-book-btn"
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest font-bold text-[#c5a059] hover:text-white border-b border-[#c5a059] pb-1 hover:border-white transition-colors cursor-pointer group"
              >
                <span>Schedule an Appointment with Cash</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
