import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import VisualIntro from './components/VisualIntro';
import ServicesSection from './components/ServicesSection';
import PortfolioSection from './components/PortfolioSection';
import VideoCraftSection from './components/VideoCraftSection';
import InstagramSection from './components/InstagramSection';
import WhyCashSection from './components/WhyCashSection';
import ReviewsSection from './components/ReviewsSection';
import BookingCtaSection from './components/BookingCtaSection';
import LocationSection from './components/LocationSection';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import LightboxModal from './components/LightboxModal';
import OwnerPortalModal from './components/booking/OwnerPortalModal';
import { PortfolioItem, ServiceItem } from './types';
import { PORTFOLIO_ITEMS } from './data/barberData';
import { Calendar } from 'lucide-react';

export default function App() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [ownerPortalOpen, setOwnerPortalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [lightboxItem, setLightboxItem] = useState<PortfolioItem | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const handleOpenBooking = () => {
    setSelectedService(null);
    setBookingModalOpen(true);
  };

  const handleSelectService = (service: ServiceItem) => {
    setSelectedService(service);
    setBookingModalOpen(true);
  };

  const handleViewServices = () => {
    const servicesEl = document.getElementById('services');
    if (servicesEl) {
      servicesEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0b0e] text-[#ededed] font-sans selection:bg-[#c5a059] selection:text-black">
      {/* Sticky Luxury Navbar */}
      <Navbar onOpenBooking={handleOpenBooking} />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero Section */}
        <Hero
          onOpenBooking={handleOpenBooking}
          onViewServices={handleViewServices}
        />

        {/* 2. Visual Intro ("YOUR LOOK. OUR CRAFT.") */}
        <VisualIntro onOpenBooking={handleOpenBooking} />

        {/* 3. Services Section */}
        <ServicesSection onSelectService={handleSelectService} />

        {/* 4. Haircut Portfolio ("THE WORK" + Before/After Slider) */}
        <PortfolioSection
          onOpenLightbox={(item, idx) => {
            setLightboxItem(item);
            setLightboxIndex(idx);
          }}
          onOpenBooking={handleOpenBooking}
        />

        {/* 5. Video Section ("SEE THE CRAFT") */}
        <VideoCraftSection onOpenBooking={handleOpenBooking} />

        {/* 6. Instagram Gallery ("FOLLOW @FADEDBYCASH") */}
        <InstagramSection onOpenBooking={handleOpenBooking} />

        {/* 7. Why Faded By Cash (Precision, Style, Grooming, Experience) */}
        <WhyCashSection />

        {/* 8. Reviews Section (4.9 ★, 329 Reviews) */}
        <ReviewsSection />

        {/* 9. Booking CTA ("READY FOR A FRESH CUT?") */}
        <BookingCtaSection onOpenBooking={handleOpenBooking} />

        {/* 10. Location Section (1226 E Northwest Hwy, Garland, TX) */}
        <LocationSection onOpenBooking={handleOpenBooking} />
      </main>

      {/* 11. Footer */}
      <Footer
        onOpenBooking={handleOpenBooking}
        onOpenOwnerPortal={() => setOwnerPortalOpen(true)}
      />

      {/* Interactive Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        preSelectedService={selectedService}
      />

      {/* Barber / Owner Portal Modal */}
      <OwnerPortalModal
        isOpen={ownerPortalOpen}
        onClose={() => setOwnerPortalOpen(false)}
      />

      {/* Portfolio Lightbox Modal */}
      <LightboxModal
        item={lightboxItem}
        currentIndex={lightboxIndex}
        totalItems={PORTFOLIO_ITEMS.length}
        onNext={() => {
          const nextIdx = (lightboxIndex + 1) % PORTFOLIO_ITEMS.length;
          setLightboxIndex(nextIdx);
          setLightboxItem(PORTFOLIO_ITEMS[nextIdx]);
        }}
        onPrev={() => {
          const prevIdx = (lightboxIndex - 1 + PORTFOLIO_ITEMS.length) % PORTFOLIO_ITEMS.length;
          setLightboxIndex(prevIdx);
          setLightboxItem(PORTFOLIO_ITEMS[prevIdx]);
        }}
        onClose={() => setLightboxItem(null)}
        onBookStyle={handleOpenBooking}
      />

      {/* Floating Quick Action Button on Mobile */}
      <div className="fixed bottom-5 right-5 z-30 sm:hidden">
        <button
          id="floating-mobile-book-btn"
          onClick={handleOpenBooking}
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-[#c5a059] to-[#d4af37] text-black font-extrabold text-xs uppercase tracking-wider shadow-2xl shadow-black/80 hover:brightness-110 active:scale-95 transition-all"
        >
          <Calendar className="w-4 h-4" />
          <span>Book Cut</span>
        </button>
      </div>
    </div>
  );
}
