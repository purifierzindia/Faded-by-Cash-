import { useState, useRef, useCallback, TouchEvent, MouseEvent } from 'react';
import { BEFORE_AFTER_PAIR } from '../data/barberData';
import { Sparkles, MoveHorizontal } from 'lucide-react';

export default function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <div className="mt-16 overflow-hidden border border-white/5 bg-[#141414] p-6 sm:p-8 shadow-2xl">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-white/5">
        <div>
          <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#c5a059] mb-1">
            <Sparkles className="w-3 h-3 text-[#c5a059]" />
            <span>Signature Transformation</span>
          </div>
          <h3 className="serif text-xl sm:text-2xl font-bold uppercase text-white tracking-tight">
            {BEFORE_AFTER_PAIR.title}
          </h3>
          <p className="text-xs text-white/60 mt-1 font-light">
            {BEFORE_AFTER_PAIR.client} • {BEFORE_AFTER_PAIR.description}
          </p>
        </div>

        <div className="text-[11px] uppercase tracking-widest text-white/60 flex items-center gap-2 bg-[#0a0a0a] px-3.5 py-1.5 border border-white/10 shrink-0">
          <MoveHorizontal className="w-3.5 h-3.5 text-[#c5a059]" />
          <span>Drag slider to compare</span>
        </div>
      </div>

      {/* Comparison Stage */}
      <div
        ref={containerRef}
        className="relative w-full h-[360px] sm:h-[480px] mt-6 overflow-hidden select-none cursor-ew-resize bg-black"
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
        onTouchMove={handleTouchMove}
      >
        {/* AFTER Image (Full background) */}
        <img
          src={BEFORE_AFTER_PAIR.afterImg}
          alt="After Faded By Cash cut"
          onError={(e) => {
            e.currentTarget.src = '/assets/cuts/modern-cut.jpg';
          }}
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none filter brightness-[0.95]"
        />
        <div className="absolute top-4 right-4 px-3 py-1 bg-[#c5a059] text-black font-bold text-[10px] uppercase tracking-widest shadow-lg pointer-events-none">
          AFTER • Faded By Cash
        </div>

        {/* BEFORE Image (Clipped overlay) */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={BEFORE_AFTER_PAIR.beforeImg}
            alt="Before cut"
            onError={(e) => {
              e.currentTarget.src = '/assets/cuts/before-cut.jpg';
            }}
            className="absolute inset-0 w-full h-full object-cover object-center max-w-none filter brightness-[0.85] contrast-[1.05]"
            style={{
              width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
              height: '100%',
            }}
          />
          <div className="absolute top-4 left-4 px-3 py-1 bg-black/85 border border-white/10 text-white/80 font-bold text-[10px] uppercase tracking-widest shadow-lg pointer-events-none">
            BEFORE
          </div>
        </div>

        {/* Draggable Divider Line & Knob */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-[#c5a059] pointer-events-none shadow-[0_0_12px_rgba(197,160,89,0.8)]"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#0a0a0a] border-2 border-[#c5a059] shadow-2xl flex items-center justify-center text-[#c5a059]">
            <MoveHorizontal className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
}
