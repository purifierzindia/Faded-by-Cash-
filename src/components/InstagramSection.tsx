import { Instagram, ExternalLink, Heart, MessageCircle } from 'lucide-react';
import { BUSINESS_INFO, INSTAGRAM_POSTS } from '../data/barberData';

interface InstagramSectionProps {
  onOpenBooking?: () => void;
}

export default function InstagramSection({ onOpenBooking }: InstagramSectionProps) {
  return (
    <section
      id="instagram"
      className="py-20 bg-[#0c0c0e] relative text-white border-t border-b border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Instagram Branding */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#c5a059] mb-3">
              <Instagram className="w-4 h-4 text-[#c5a059]" />
              <span>Official Instagram Gallery</span>
            </div>
            <h2 className="serif text-3xl sm:text-5xl uppercase tracking-tight text-white">
              FOLLOW @FADEDBYCASH
            </h2>
            <p className="mt-2 text-sm text-white/60 font-light max-w-xl">
              Fresh chair transformations, daily fade walk-ins, and behind-the-scenes grooming in Garland, TX.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              id="instagram-profile-link-btn"
              href={BUSINESS_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-90 text-white font-bold text-[11px] uppercase tracking-widest transition-all inline-flex items-center gap-2 shadow-lg cursor-pointer"
            >
              <Instagram className="w-4 h-4" />
              <span>Follow {BUSINESS_INFO.instagramHandle}</span>
              <ExternalLink className="w-3.5 h-3.5 ml-0.5 opacity-80" />
            </a>

            {onOpenBooking && (
              <button
                onClick={onOpenBooking}
                className="px-6 py-3 bg-[#18181c] hover:bg-white text-white hover:text-black border border-white/10 text-[11px] font-bold uppercase tracking-widest transition-all cursor-pointer"
              >
                Book An Appointment
              </button>
            )}
          </div>
        </div>

        {/* 4-Column Instagram Visual Grid */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {INSTAGRAM_POSTS.map((post) => (
            <a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square bg-[#141414] overflow-hidden border border-white/10 hover:border-[#c5a059]/60 shadow-xl transition-all cursor-pointer block"
            >
              {/* Photo */}
              <img
                src={post.image}
                alt={post.caption}
                onError={(e) => {
                  e.currentTarget.src = '/assets/cuts/modern-cut.jpg';
                }}
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500 filter brightness-[0.92]"
              />

              {/* Hover Dark Overlay with Stats & Instagram Icon */}
              <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 sm:p-5">
                <div className="flex items-center justify-between text-white/90">
                  <span className="p-1.5 rounded-full bg-white/10 backdrop-blur-md">
                    <Instagram className="w-3.5 h-3.5 text-[#c5a059]" />
                  </span>
                  <span className="text-[10px] font-mono text-[#c5a059] uppercase tracking-wider">
                    View Post ↗
                  </span>
                </div>

                <div>
                  <p className="text-xs text-white/90 line-clamp-2 font-light leading-snug">
                    {post.caption}
                  </p>
                  <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center gap-4 text-[11px] text-white/70 font-mono">
                    <span className="flex items-center gap-1">
                      <Heart className="w-3 h-3 fill-red-500 text-red-500" />
                      <span>{post.likes}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-3 h-3 text-white/60" />
                      <span>Comment</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Corner Tag */}
              <div className="absolute bottom-2 right-2 p-1 bg-black/70 backdrop-blur-md border border-white/10 group-hover:opacity-0 transition-opacity">
                <Instagram className="w-3 h-3 text-white/80" />
              </div>
            </a>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-xs text-white/40 font-light">
            Tag <span className="text-[#c5a059] font-medium">{BUSINESS_INFO.instagramHandle}</span> on Instagram to be featured on our client wall.
          </p>
        </div>
      </div>
    </section>
  );
}
