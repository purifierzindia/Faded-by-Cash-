import { useState, FormEvent } from 'react';
import { User, Phone, Mail, FileText, Bell, Sparkles, AlertCircle } from 'lucide-react';
import { CustomerDetails } from '../../types';

interface StepCustomerDetailsProps {
  details: CustomerDetails;
  onChangeDetails: (details: CustomerDetails) => void;
  onProceed: () => void;
  onBack: () => void;
}

export default function StepCustomerDetails({
  details,
  onChangeDetails,
  onProceed,
  onBack,
}: StepCustomerDetailsProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Full Name validation
    if (!details.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.';
    } else if (details.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters.';
    }

    // Phone validation
    const digitsOnly = details.phone.replace(/\D/g, '');
    if (!details.phone.trim()) {
      newErrors.phone = 'Please enter your phone number for appointment confirmation.';
    } else if (digitsOnly.length < 10) {
      newErrors.phone = 'Please enter a valid 10-digit phone number.';
    }

    // Email validation (optional, but validated if supplied)
    if (details.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(details.email.trim())) {
        newErrors.email = 'Please enter a valid email address (or leave empty).';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validate();
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setTouched({
      fullName: true,
      phone: true,
      email: true,
    });

    if (validate()) {
      onProceed();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-6 bg-[#141414] border border-white/10 rounded-xl shadow-xl space-y-5">
        <div className="border-b border-white/5 pb-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#c5a059] block">
            Step 4 of 5
          </span>
          <h3 className="serif font-bold text-xl text-white mt-0.5">
            Who is in the Chair?
          </h3>
          <p className="text-xs text-white/60 font-light mt-1">
            Cash uses this information to manage your appointment and text confirmation updates.
          </p>
        </div>

        {/* Full Name Field */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-1.5 flex items-center justify-between">
            <span>Full Name <span className="text-[#c5a059]">*</span></span>
            {touched.fullName && errors.fullName && (
              <span className="text-[11px] text-rose-400 font-normal flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.fullName}
              </span>
            )}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
              <User className="w-4 h-4 text-[#c5a059]" />
            </div>
            <input
              type="text"
              required
              placeholder="e.g. Marcus Vance"
              value={details.fullName}
              onChange={(e) => {
                onChangeDetails({ ...details, fullName: e.target.value });
                if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: '' }));
              }}
              onBlur={() => handleBlur('fullName')}
              className={`w-full pl-10 pr-4 py-3 bg-[#0a0a0a] rounded-lg border text-sm text-white placeholder:text-white/30 focus:outline-none transition-colors ${
                touched.fullName && errors.fullName
                  ? 'border-rose-500/80 focus:border-rose-500'
                  : 'border-white/10 focus:border-[#c5a059]'
              }`}
            />
          </div>
        </div>

        {/* Phone Number Field */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-1.5 flex items-center justify-between">
            <span>Phone Number <span className="text-[#c5a059]">*</span></span>
            {touched.phone && errors.phone && (
              <span className="text-[11px] text-rose-400 font-normal flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.phone}
              </span>
            )}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
              <Phone className="w-4 h-4 text-[#c5a059]" />
            </div>
            <input
              type="tel"
              required
              placeholder="(214) 555-0192"
              value={details.phone}
              onChange={(e) => {
                onChangeDetails({ ...details, phone: e.target.value });
                if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
              }}
              onBlur={() => handleBlur('phone')}
              className={`w-full pl-10 pr-4 py-3 bg-[#0a0a0a] rounded-lg border text-sm text-white placeholder:text-white/30 focus:outline-none transition-colors ${
                touched.phone && errors.phone
                  ? 'border-rose-500/80 focus:border-rose-500'
                  : 'border-white/10 focus:border-[#c5a059]'
              }`}
            />
          </div>
          <p className="text-[11px] text-white/40 mt-1">
            We will text your appointment confirmation and reminder.
          </p>
        </div>

        {/* Email Address Field */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-1.5 flex items-center justify-between">
            <span>Email Address <span className="text-white/40 font-normal lowercase">(optional)</span></span>
            {touched.email && errors.email && (
              <span className="text-[11px] text-rose-400 font-normal flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.email}
              </span>
            )}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
              <Mail className="w-4 h-4 text-[#c5a059]" />
            </div>
            <input
              type="email"
              placeholder="marcus@example.com"
              value={details.email}
              onChange={(e) => {
                onChangeDetails({ ...details, email: e.target.value });
                if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
              }}
              onBlur={() => handleBlur('email')}
              className={`w-full pl-10 pr-4 py-3 bg-[#0a0a0a] rounded-lg border text-sm text-white placeholder:text-white/30 focus:outline-none transition-colors ${
                touched.email && errors.email
                  ? 'border-rose-500/80 focus:border-rose-500'
                  : 'border-white/10 focus:border-[#c5a059]'
              }`}
            />
          </div>
        </div>

        {/* Notes / Special Request */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-1.5 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Notes / Special Request <span className="text-white/40 font-normal lowercase">(optional)</span></span>
          </label>
          <textarea
            rows={3}
            placeholder="e.g. Skin fade with razor sharp lineup, or high crown taper preference..."
            value={details.notes || ''}
            onChange={(e) => onChangeDetails({ ...details, notes: e.target.value })}
            className="w-full p-3 bg-[#0a0a0a] rounded-lg border border-white/10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#c5a059] transition-colors resize-none"
          />
        </div>

        {/* Notifications Opt-in Checkbox */}
        <div className="pt-2">
          <label className="flex items-start gap-3 cursor-pointer select-none group">
            <input
              type="checkbox"
              checked={details.optInNotifications}
              onChange={(e) =>
                onChangeDetails({ ...details, optInNotifications: e.target.checked })
              }
              className="mt-1 w-4 h-4 rounded border-white/20 text-[#c5a059] focus:ring-0 focus:ring-offset-0 bg-[#0a0a0a] cursor-pointer"
            />
            <span className="text-xs text-white/70 group-hover:text-white transition-colors leading-relaxed">
              I agree to receive appointment-related notifications and schedule updates via SMS and email.
            </span>
          </label>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="p-4 bg-[#0d0d0f] border border-white/10 rounded-xl flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-2.5 rounded-lg border border-white/10 hover:border-white/30 text-xs uppercase tracking-wider font-semibold text-white/70 hover:text-white transition-colors cursor-pointer"
        >
          Back
        </button>

        <button
          type="submit"
          className="px-6 py-2.5 rounded-lg bg-[#c5a059] hover:bg-white text-black font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
        >
          <span>Review & Confirm</span>
          <Sparkles className="w-3.5 h-3.5" />
        </button>
      </div>
    </form>
  );
}
