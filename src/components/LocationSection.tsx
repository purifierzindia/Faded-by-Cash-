import { MapPin, Navigation, Clock, Phone, ExternalLink, Car } from 'lucide-react';
import { BUSINESS_INFO } from '../data/barberData';

interface LocationSectionProps {
  onOpenBooking?: () => void;
}

export default function LocationSection({ onOpenBooking }: LocationSectionProps) {
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(BUSINESS_INFO.address.full)}`;

  return (
    <section
      id="location"
      className="py-24 sm:py-32 bg-[#0a0a0a] relative text-white border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#c5a059] mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Garland, Texas</span>
          </div>

          <h2 className="serif text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-white">
            THE LOCATION
          </h2>

          <p className="mt-4 text-sm sm:text-base text-white/60 font-light max-w-xl mx-auto">
            Conveniently situated on E Northwest Highway with easy parking and direct highway access.
          </p>
        </div>

        {/* Location & Map 2-Column Grid */}
        <div className="mt-16 grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Shop Details & Operating Hours (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between p-8 bg-[#141414] border border-white/5 shadow-2xl space-y-8">
            {/* Address Card */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#c5a059]">
                Shop Headquarters
              </span>
              <h3 className="serif text-2xl font-bold uppercase tracking-tight text-white mt-1">
                {BUSINESS_INFO.name}
              </h3>
              <p className="mt-3 text-sm text-white/80 font-normal leading-relaxed">
                {BUSINESS_INFO.address.street}<br />
                {BUSINESS_INFO.address.city}, {BUSINESS_INFO.address.state} {BUSINESS_INFO.address.zip}
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  id="get-directions-btn"
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-[#c5a059] hover:bg-white text-black font-bold text-[11px] uppercase tracking-widest shadow-md transition-all inline-flex items-center gap-2 cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>GET DIRECTIONS</span>
                </a>

                {onOpenBooking && (
                  <button
                    type="button"
                    onClick={onOpenBooking}
                    className="px-4 py-2.5 bg-white/10 hover:bg-white text-white hover:text-black font-bold text-[11px] uppercase tracking-widest border border-white/20 transition-all inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>BOOK CHAIR</span>
                  </button>
                )}

                <a
                  href={`tel:${BUSINESS_INFO.phoneRaw}`}
                  className="px-4 py-2.5 bg-[#0a0a0a] border border-white/10 hover:border-[#c5a059] text-white hover:text-[#c5a059] text-[11px] font-bold uppercase tracking-widest inline-flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>{BUSINESS_INFO.phone}</span>
                </a>
              </div>
            </div>

            {/* Operating Hours Table */}
            <div className="border-t border-white/5 pt-6">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#c5a059] mb-4">
                <Clock className="w-4 h-4" />
                <span>Shop Hours</span>
              </div>

              <div className="space-y-2 text-xs">
                {BUSINESS_INFO.hours.map((h, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-between py-1.5 px-2 border-b border-white/5 ${
                      h.isClosed ? 'text-white/30' : 'text-white/80'
                    }`}
                  >
                    <span className="font-medium">{h.day}</span>
                    <span className={h.isClosed ? 'font-semibold text-white/30' : 'font-mono text-white'}>
                      {h.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Parking & Arrival */}
            <div className="border-t border-white/5 pt-4 flex items-center gap-3 text-xs text-white/50">
              <Car className="w-4 h-4 text-[#c5a059] shrink-0" />
              <span>Complimentary parking available directly in front of the shop.</span>
            </div>
          </div>

          {/* Embedded Map Visual (7 cols) */}
          <div className="lg:col-span-7 overflow-hidden border border-white/10 shadow-2xl relative min-h-[420px] bg-black">
            <iframe
              title="Faded By Cash Location Map"
              width="100%"
              height="100%"
              className="w-full h-full min-h-[420px] border-0 filter invert-[0.9] hue-rotate-[180deg] contrast-[1.1] grayscale-[0.3]"
              src="https://maps.google.com/maps?q=1226%20E%20Northwest%20Highway,%20Garland,%20TX%2075041&t=&z=15&ie=UTF8&iwloc=&output=embed"
              loading="lazy"
              allowFullScreen
            />

            {/* Map Overlay Badge */}
            <div className="absolute top-4 left-4 bg-[#141414]/95 backdrop-blur-md border border-[#c5a059]/40 p-3 shadow-xl pointer-events-none">
              <p className="serif text-xs font-bold uppercase text-[#c5a059]">
                Faded By Cash
              </p>
              <p className="text-[10px] text-white/60 font-light">
                Garland, Texas 75041
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
