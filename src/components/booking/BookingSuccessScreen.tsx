import { useState } from 'react';
import { Appointment } from '../../types';
import { Check, Calendar, Download, ExternalLink, MapPin, Phone, Home, Sparkles, Copy, CheckCheck } from 'lucide-react';
import { BUSINESS_INFO } from '../../data/barberData';
import { generateGoogleCalendarUrl, downloadIcsFile } from '../../utils/calendarUtils';

interface BookingSuccessScreenProps {
  appointment: Appointment;
  onClose: () => void;
}

export default function BookingSuccessScreen({
  appointment,
  onClose,
}: BookingSuccessScreenProps) {
  const [copiedRef, setCopiedRef] = useState(false);
  const [showCalendarOptions, setShowCalendarOptions] = useState(false);

  const handleCopyRef = () => {
    navigator.clipboard.writeText(appointment.id);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2500);
  };

  const googleCalUrl = generateGoogleCalendarUrl(appointment);

  const readableDate = (() => {
    try {
      const [y, m, d] = appointment.date.split('-').map(Number);
      const dateObj = new Date(y, m - 1, d);
      return dateObj.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return appointment.date;
    }
  })();

  return (
    <div className="text-center py-6 px-2 sm:px-6 space-y-6 max-h-[85vh] overflow-y-auto">
      {/* Success Icon */}
      <div className="relative inline-flex items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-[#c5a059]/10 border-2 border-[#c5a059] flex items-center justify-center shadow-2xl shadow-[#c5a059]/20">
          <Check className="w-10 h-10 text-[#c5a059] stroke-[2.5]" />
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#c5a059] text-black flex items-center justify-center text-xs">
          <Sparkles className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Main Heading */}
      <div className="space-y-2">
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c5a059] block">
          Appointment Verified
        </span>
        <h2 className="serif text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
          YOUR APPOINTMENT IS CONFIRMED
        </h2>
        <p className="serif italic text-lg text-[#c5a059] tracking-wide mt-1">
          "We'll see you at Faded By Cash."
        </p>
      </div>

      {/* Reference Number Pill */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#141414] border border-[#c5a059]/40 text-xs text-white">
        <span className="text-white/50 uppercase tracking-widest text-[10px]">Reference:</span>
        <span className="font-mono font-bold text-[#c5a059] text-sm">{appointment.id}</span>
        <button
          type="button"
          onClick={handleCopyRef}
          className="ml-1 text-white/50 hover:text-white transition-colors cursor-pointer p-1"
          title="Copy Reference Number"
        >
          {copiedRef ? <CheckCheck className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Confirmed Details Card */}
      <div className="max-w-xl mx-auto p-6 bg-[#141414] border border-white/10 rounded-xl text-left space-y-4 shadow-2xl">
        <div className="grid sm:grid-cols-2 gap-4 pb-4 border-b border-white/5 text-xs">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-white/40 block">
              Customer Name
            </span>
            <span className="font-bold text-white text-sm mt-0.5 block">
              {appointment.customer.fullName}
            </span>
          </div>

          <div>
            <span className="text-[10px] uppercase tracking-wider text-white/40 block">
              Contact Phone
            </span>
            <span className="font-mono text-white/90 text-sm mt-0.5 block">
              {appointment.customer.phone}
            </span>
          </div>
        </div>

        <div className="space-y-3 text-xs">
          <div className="flex items-start justify-between">
            <span className="text-white/50">Services:</span>
            <span className="font-bold text-white text-right">
              {appointment.services.map((s) => s.name).join(', ')}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-white/50">Date:</span>
            <span className="font-bold text-[#c5a059]">{readableDate}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-white/50">Time:</span>
            <span className="font-bold text-[#c5a059] text-sm font-mono">{appointment.timeSlot}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-white/50">Barber:</span>
            <span className="font-semibold text-white">Cash</span>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/5">
            <span className="text-white/70 font-semibold">Total Price:</span>
            <span className="serif text-xl font-bold text-white">
              ${appointment.totalPrice} <span className="text-[10px] text-white/40 font-sans font-normal">(Pay at appointment)</span>
            </span>
          </div>
        </div>

        <div className="pt-3 border-t border-white/5 flex items-start gap-2 text-xs text-white/60">
          <MapPin className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
          <span>{BUSINESS_INFO.address.full} • Garland, TX</span>
        </div>
      </div>

      {/* Action Buttons: Add to Calendar & Back to Home */}
      <div className="max-w-xl mx-auto space-y-3">
        <div className="grid sm:grid-cols-2 gap-3">
          {/* Add to Calendar Button */}
          <div className="relative">
            <button
              type="button"
              id="add-to-calendar-btn"
              onClick={() => setShowCalendarOptions((prev) => !prev)}
              className="w-full py-3 px-4 rounded-lg bg-[#c5a059] hover:bg-white text-black font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <Calendar className="w-4 h-4" />
              <span>ADD TO CALENDAR</span>
            </button>

            {/* Calendar Options Dropdown */}
            {showCalendarOptions && (
              <div className="absolute bottom-full mb-2 left-0 right-0 bg-[#0a0a0a] border border-[#c5a059]/40 rounded-xl p-2 shadow-2xl space-y-1 z-30">
                <a
                  href={googleCalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setShowCalendarOptions(false)}
                  className="w-full p-2.5 rounded-lg hover:bg-white/10 text-white text-xs font-semibold flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <ExternalLink className="w-3.5 h-3.5 text-[#c5a059]" />
                    Google Calendar
                  </span>
                  <span className="text-[10px] text-white/40">Web</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    downloadIcsFile(appointment);
                    setShowCalendarOptions(false);
                  }}
                  className="w-full p-2.5 rounded-lg hover:bg-white/10 text-white text-xs font-semibold flex items-center justify-between transition-colors text-left cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Download className="w-3.5 h-3.5 text-[#c5a059]" />
                    Apple / Outlook (.ICS)
                  </span>
                  <span className="text-[10px] text-white/40">Download</span>
                </button>
              </div>
            )}
          </div>

          {/* Back to Home Button */}
          <button
            type="button"
            id="back-to-home-btn"
            onClick={onClose}
            className="w-full py-3 px-4 rounded-lg bg-[#0a0a0a] hover:bg-white/10 border border-white/10 text-white font-bold text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Home className="w-4 h-4 text-[#c5a059]" />
            <span>BACK TO HOME</span>
          </button>
        </div>

        <div className="pt-2 text-[11px] text-white/40 flex items-center justify-center gap-2">
          <span>Need to reschedule or contact Cash? Call</span>
          <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="text-[#c5a059] font-semibold hover:underline">
            {BUSINESS_INFO.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
