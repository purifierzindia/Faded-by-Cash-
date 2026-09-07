import { useState } from 'react';
import { Play, Sparkles, Film, ExternalLink, Instagram } from 'lucide-react';
import { CRAFT_VIDEOS, BUSINESS_INFO } from '../data/barberData';

interface VideoCraftSectionProps {
  onOpenBooking: () => void;
}

export default function VideoCraftSection({ onOpenBooking }: VideoCraftSectionProps) {
  const [selectedClipIndex, setSelectedClipIndex] = useState(0);

  const activeClip = CRAFT_VIDEOS[selectedClipIndex];

  const handleOpenReel = () => {
    const url = activeClip.reelUrl || BUSINESS_INFO.instagramUrl;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      id="craft"
      className="py-24 sm:py-32 bg-[#0a0a0a] relative text-white border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#c5a059] mb-3">
            <Film className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Live Action Showcase</span>
          </div>

          <h2 className="serif text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-white">
            SEE THE CRAFT
          </h2>

          <p className="mt-4 text-sm sm:text-base text-white/60 font-light max-w-xl mx-auto">
            Haircut transformations, precision fades, and master razor blade control captured in motion.
          </p>
        </div>

        {/* Video Reel Showcase Layout */}
        <div className="mt-16 grid lg:grid-cols-12 gap-10 items-center max-w-6xl mx-auto">
          {/* Vertical Reel Preview Player (6 cols) */}
          <div className="lg:col-span-6 flex justify-center">
            <div
              onClick={handleOpenReel}
              className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-[9/16] overflow-hidden bg-black border border-white/10 shadow-2xl group cursor-pointer"
            >
              {/* High-Resolution Poster Image */}
              <img
                src={activeClip.thumbnail}
                alt={activeClip.title}
                onError={(e) => {
                  e.currentTarget.src = '/assets/cuts/modern-cut.jpg';
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-[0.88] contrast-[1.05]"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/60 pointer-events-none" />

              {/* Top Reel Bar */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
                <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1 border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-[#c5a059] animate-ping" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/90">
                    BARBER REEL
                  </span>
                </div>

                <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2.5 py-1 border border-white/10 text-[10px] text-white/80">
                  <Instagram className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>{BUSINESS_INFO.instagramHandle}</span>
                </div>
              </div>

              {/* Center Play Button Overlay */}
              <div className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-[#c5a059] group-hover:bg-white text-black shadow-2xl flex items-center justify-center transition-transform group-hover:scale-110 active:scale-95 z-20 cursor-pointer">
                <Play className="w-6 h-6 fill-black translate-x-0.5" />
              </div>

              {/* Watch Reel on Instagram Hint */}
              <div className="absolute top-1/2 mt-12 left-0 right-0 text-center z-20 pointer-events-none">
                <span className="px-3 py-1 bg-black/80 backdrop-blur-md text-[#c5a059] text-[10px] font-bold uppercase tracking-widest border border-[#c5a059]/30 inline-flex items-center gap-1.5 shadow-lg">
                  <span>Watch Reel on Instagram</span>
                  <ExternalLink className="w-3 h-3" />
                </span>
              </div>

              {/* Bottom Reel Caption & Info */}
              <div className="absolute bottom-4 left-4 right-4 z-20 text-left">
                <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest bg-[#c5a059] text-black inline-block mb-1.5">
                  Faded By Cash • Garland, TX
                </span>
                <h4 className="serif font-bold text-white text-lg tracking-tight drop-shadow">
                  {activeClip.title}
                </h4>
                <p className="text-xs text-white/80 font-light mt-0.5 drop-shadow line-clamp-2">
                  {activeClip.subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Clip Playlist & Craft Details (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#c5a059]">
                Chair Transformations
              </span>
              <h3 className="serif text-2xl sm:text-3xl font-bold uppercase text-white">
                Mastery Behind The Chair
              </h3>
              <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed">
                Cash demonstrates step-by-step skin graduation, neckline razor detailing, and hot steam towel treatments. Select a session below to view:
              </p>
            </div>

            {/* Playlist Cards */}
            <div className="space-y-3">
              {CRAFT_VIDEOS.map((clip, idx) => (
                <div
                  key={clip.id}
                  onClick={() => setSelectedClipIndex(idx)}
                  className={`p-4 border transition-all cursor-pointer flex items-center gap-4 ${
                    selectedClipIndex === idx
                      ? 'bg-[#141414] border-[#c5a059] shadow-lg shadow-[#c5a059]/10'
                      : 'bg-[#141414] border-white/5 hover:border-white/20'
                  }`}
                >
                  {/* Thumbnail with Play Icon */}
                  <div className="relative w-16 h-20 overflow-hidden bg-[#0a0a0a] shrink-0">
                    <img
                      src={clip.thumbnail}
                      alt={clip.title}
                      onError={(e) => {
                        e.currentTarget.src = '/assets/cuts/modern-cut.jpg';
                      }}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Play className="w-4 h-4 text-[#c5a059]" />
                    </div>
                  </div>

                  {/* Clip Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] uppercase tracking-widest text-[#c5a059] font-bold">
                        Phase {idx + 1}
                      </span>
                      <span className="text-[10px] text-white/40 font-mono">
                        {clip.duration}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white truncate mt-0.5 serif">
                      {clip.title}
                    </h4>
                    <p className="text-xs text-white/60 line-clamp-1 mt-0.5 font-light">
                      {clip.subtitle}
                    </p>
                  </div>

                  {/* Active Indicator */}
                  {selectedClipIndex === idx && (
                    <div className="shrink-0 text-[#c5a059]">
                      <Sparkles className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleOpenReel}
                className="flex-1 py-3.5 bg-transparent hover:bg-white/5 text-white border border-white/20 hover:border-[#c5a059] text-[11px] font-bold uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Instagram className="w-4 h-4 text-[#c5a059]" />
                <span>Watch Reel on Instagram</span>
              </button>

              <button
                onClick={onOpenBooking}
                className="flex-1 py-3.5 bg-[#c5a059] hover:bg-white text-black font-bold text-[11px] uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Book With Cash</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
