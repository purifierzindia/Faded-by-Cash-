import { useState } from 'react';
import { ServiceItem, CustomerDetails } from '../../types';
import { Calendar, Clock, User, Phone, Mail, FileText, CheckCircle2, ShieldCheck, CreditCard, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../../data/barberData';

interface StepReviewConfirmProps {
  services: ServiceItem[];
  date: string;
  timeSlot: string;
  customer: CustomerDetails;
  onConfirm: () => Promise<void>;
  onEditServices: () => void;
  onEditDateTime: () => void;
  onEditCustomer: () => void;
  onBack: () => void;
}

export default function StepReviewConfirm({
  services,
  date,
  timeSlot,
  customer,
  onConfirm,
  onEditServices,
  onEditDateTime,
  onEditCustomer,
  onBack,
}: StepReviewConfirmProps) {
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const totalPrice = services.reduce((sum, s) => sum + s.price, 0);
  const totalMinutes = services.reduce((sum, s) => {
    const m = s.duration.match(/(\d+)/);
    return sum + (m ? parseInt(m[1], 10) : 45);
  }, 0);

  const handleConfirmClick = async () => {
    setSubmitting(true);
    setErrorMessage(null);
    try {
      await onConfirm();
    } catch (err: any) {
      setErrorMessage(err.message || 'Unable to confirm appointment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Format readable date
  const readableDate = (() => {
    try {
      const [y, m, d] = date.split('-').map(Number);
      const dateObj = new Date(y, m - 1, d);
      return dateObj.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return date;
    }
  })();

  return (
    <div className="space-y-6">
      {/* Error Notice if any */}
      {errorMessage && (
        <div className="p-4 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-200 text-xs flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Booking Conflict</p>
            <p className="mt-0.5 text-rose-300">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Main Review Card */}
      <div className="p-6 bg-[#141414] border border-white/10 rounded-xl shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#c5a059] block">
              Step 5 of 5
            </span>
            <h3 className="serif font-bold text-xl text-white mt-0.5">
              Review Appointment Summary
            </h3>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 block">
              Total Amount
            </span>
            <span className="serif text-2xl font-bold text-[#c5a059]">
              ${totalPrice}
            </span>
          </div>
        </div>

        {/* 1. Services Ordered */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-white/60">
              Selected Services ({services.length})
            </span>
            <button
              type="button"
              onClick={onEditServices}
              className="text-[11px] text-[#c5a059] hover:underline font-semibold cursor-pointer"
            >
              Change
            </button>
          </div>

          <div className="bg-[#0a0a0a] border border-white/5 rounded-lg p-3 divide-y divide-white/5">
            {services.map((s) => (
              <div key={s.id} className="py-2 first:pt-0 last:pb-0 flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-white">{s.name}</span>
                  <span className="text-white/40 text-[11px] ml-2">({s.duration})</span>
                </div>
                <span className="font-mono text-white/90 font-bold">${s.price}</span>
              </div>
            ))}
            <div className="pt-2 flex items-center justify-between text-xs font-semibold text-white/70">
              <span>Estimated Duration:</span>
              <span className="text-[#c5a059]">~{totalMinutes} min</span>
            </div>
          </div>
        </div>

        {/* 2. Date & Time */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-white/60">
              Schedule & Location
            </span>
            <button
              type="button"
              onClick={onEditDateTime}
              className="text-[11px] text-[#c5a059] hover:underline font-semibold cursor-pointer"
            >
              Change
            </button>
          </div>

          <div className="bg-[#0a0a0a] border border-white/5 rounded-lg p-4 grid sm:grid-cols-2 gap-3 text-xs">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-white/50">
                <Calendar className="w-3.5 h-3.5 text-[#c5a059]" />
                <span className="font-medium">Date</span>
              </div>
              <p className="font-bold text-white text-sm">{readableDate}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-white/50">
                <Clock className="w-3.5 h-3.5 text-[#c5a059]" />
                <span className="font-medium">Appointment Time</span>
              </div>
              <p className="font-bold text-[#c5a059] text-sm">{timeSlot}</p>
            </div>

            <div className="sm:col-span-2 pt-2 border-t border-white/5 flex items-start gap-2 text-white/70 text-[11px]">
              <span className="text-[#c5a059] font-bold">Barber:</span>
              <span>Cash at {BUSINESS_INFO.address.full}</span>
            </div>
          </div>
        </div>

        {/* 3. Customer Info */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-white/60">
              Client Details
            </span>
            <button
              type="button"
              onClick={onEditCustomer}
              className="text-[11px] text-[#c5a059] hover:underline font-semibold cursor-pointer"
            >
              Change
            </button>
          </div>

          <div className="bg-[#0a0a0a] border border-white/5 rounded-lg p-4 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-white/50 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#c5a059]" /> Name:
              </span>
              <span className="font-semibold text-white">{customer.fullName}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-white/50 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#c5a059]" /> Phone:
              </span>
              <span className="font-semibold text-white">{customer.phone}</span>
            </div>

            {customer.email && (
              <div className="flex items-center justify-between">
                <span className="text-white/50 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#c5a059]" /> Email:
                </span>
                <span className="font-medium text-white/80">{customer.email}</span>
              </div>
            )}

            {customer.notes && (
              <div className="pt-2 border-t border-white/5 text-[11px] text-white/60">
                <span className="font-semibold text-white/80">Notes: </span>
                {customer.notes}
              </div>
            )}
          </div>
        </div>

        {/* 4. Payment Terms Notice */}
        <div className="p-4 bg-[#0a0a0a] border border-[#c5a059]/30 rounded-lg flex items-center gap-3">
          <CreditCard className="w-5 h-5 text-[#c5a059] shrink-0" />
          <div className="text-xs">
            <p className="font-bold text-white uppercase tracking-wider">
              Payment: Pay at appointment
            </p>
            <p className="text-white/60 text-[11px] mt-0.5">
              No deposit required. In-shop payments accepted via Zelle, Cash, or Debit Card.
            </p>
          </div>
        </div>
      </div>

      {/* Confirmation CTA Footer */}
      <div className="p-4 bg-[#0d0d0f] border border-white/10 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          type="button"
          disabled={submitting}
          onClick={onBack}
          className="w-full sm:w-auto px-5 py-3 rounded-lg border border-white/10 hover:border-white/30 text-xs uppercase tracking-wider font-semibold text-white/70 hover:text-white transition-colors cursor-pointer"
        >
          Back
        </button>

        <button
          type="button"
          id="confirm-appointment-submit-btn"
          disabled={submitting}
          onClick={handleConfirmClick}
          className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-[#c5a059] hover:bg-white text-black font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-black/80"
        >
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>CONFIRMING APPOINTMENT...</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-4 h-4 text-black" />
              <span>CONFIRM APPOINTMENT</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
