import { useEffect, useState, TouchEvent } from 'react';
import { X, Calendar, ChevronLeft, ChevronRight, Tag } from 'lucide-react';
import { PortfolioItem } from '../types';

interface LightboxModalProps {
  item: PortfolioItem | null;
  currentIndex?: number | null;
  totalItems?: number;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  onBookStyle: () => void;
}

export default function LightboxModal({
  item,
  currentIndex,
  totalItems,
  onClose,
  onNext,
  onPrev,
  onBookStyle,
}: LightboxModalProps) {
  const [imgSrc, setImgSrc] = useState<string>('');
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  useEffect(() => {
    if (item?.image) {
      setImgSrc(item.image);
    }
  }, [item?.image]);

  // Keyboard navigation: Escape, Left Arrow, Right Arrow
  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' && onNext) {
        onNext();
      } else if (e.key === 'ArrowLeft' && onPrev) {
        onPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, onClose, onNext, onPrev]);

  if (!item) return null;

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 50 && onNext) {
      onNext();
    } else if (diff < -50 && onPrev) {
      onPrev();
    }
    setTouchStartX(null);
  };

  const hasMultiple = totalItems && totalItems > 1;

  return (
    <div
      id="lightbox-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        id="lightbox-content-panel"
        className="relative w-full max-w-4xl bg-[#141414] border border-white/10 shadow-2xl overflow-hidden grid lg:grid-cols-12 max-h-[94vh] rounded-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar with Close & Counter */}
        <div className="absolute top-3 right-3 z-30 flex items-center gap-2">
          {hasMultiple && currentIndex !== undefined && currentIndex !== null && (
            <span className="px-2.5 py-1 bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-mono font-bold tracking-widest text-white/70">
              {currentIndex + 1} / {totalItems}
            </span>
          )}
          <button
            onClick={onClose}
            className="w-10 h-10 bg-black/80 hover:bg-[#c5a059] text-white/80 hover:text-black border border-white/10 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Left Side: Large Photo (7 cols) */}
        <div className="lg:col-span-7 bg-black flex items-center justify-center relative min-h-[320px] sm:min-h-[480px] overflow-hidden group">
          <img
            src={imgSrc || '/assets/cuts/modern-cut.jpg'}
            alt={item.title}
            onError={() => setImgSrc('/assets/cuts/modern-cut.jpg')}
            className="w-full h-full object-cover object-center max-h-[60vh] lg:max-h-[85vh]"
          />

          {/* Desktop Navigation Arrows on Image */}
          {hasMultiple && onPrev && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/70 hover:bg-[#c5a059] text-white hover:text-black border border-white/10 flex items-center justify-center transition-all cursor-pointer opacity-80 group-hover:opacity-100"
              aria-label="Previous haircut"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {hasMultiple && onNext && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/70 hover:bg-[#c5a059] text-white hover:text-black border border-white/10 flex items-center justify-center transition-all cursor-pointer opacity-80 group-hover:opacity-100"
              aria-label="Next haircut"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Right Side: Cut Breakdown & Book (5 cols) */}
        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto space-y-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 bg-[#c5a059]/15 border border-[#c5a059]/30 text-[9px] font-bold uppercase tracking-widest text-[#c5a059]">
                {item.category}
              </span>
              <span className="text-[11px] text-white/40 font-mono">• Faded By Cash</span>
            </div>

            <p className="text-[10px] uppercase tracking-widest text-[#c5a059] font-bold mt-4">
              {item.styleName}
            </p>

            <h3 className="serif text-2xl font-bold uppercase tracking-tight text-white mt-1">
              {item.title}
            </h3>

            <p className="mt-3 text-xs sm:text-sm text-white/70 font-light leading-relaxed">
              {item.description}
            </p>

            {/* Technical Breakdown */}
            <div className="mt-6 pt-5 border-t border-white/5 space-y-3 text-xs">
              <div className="flex items-start justify-between gap-2">
                <span className="text-white/40 uppercase tracking-wider text-[10px] font-bold">Cut Architecture:</span>
                <span className="text-white/80 font-medium text-right">{item.details.cutType}</span>
              </div>
              <div className="flex items-start justify-between gap-2">
                <span className="text-white/40 uppercase tracking-wider text-[10px] font-bold">Finishing:</span>
                <span className="text-white/80 font-medium text-right">{item.details.finishing}</span>
              </div>
              <div className="flex items-start justify-between gap-2">
                <span className="text-white/40 uppercase tracking-wider text-[10px] font-bold">Style Lock:</span>
                <span className="text-[#c5a059] font-medium text-right">{item.details.recommendedProduct}</span>
              </div>
            </div>
          </div>

          {/* Bottom Controls: Previous / Next buttons & Book CTA */}
          <div className="pt-4 border-t border-white/5 space-y-3">
            {hasMultiple && (
              <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-white/60">
                <button
                  onClick={onPrev}
                  className="flex items-center gap-1 hover:text-[#c5a059] transition-colors cursor-pointer py-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>
                <span className="text-white/30 font-mono text-[10px]">
                  Swipe or use arrow keys
                </span>
                <button
                  onClick={onNext}
                  className="flex items-center gap-1 hover:text-[#c5a059] transition-colors cursor-pointer py-1"
                >
                  <span>Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <button
              onClick={() => {
                onClose();
                onBookStyle();
              }}
              className="w-full py-3.5 bg-[#c5a059] hover:bg-white text-black font-bold text-[11px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <Calendar className="w-4 h-4" />
              <span>Schedule Appointment for This Look</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
