import { useMemo, ReactNode } from 'react';
import { Clock, Check, AlertCircle, Sparkles, Sun, Sunset, Moon } from 'lucide-react';
import { bookingService } from '../../services/bookingService';
import { TimeSlot } from '../../types';

interface StepTimeSelectProps {
  selectedDate: string;
  selectedTimeSlot: string;
  onSelectTimeSlot: (time: string) => void;
  onProceed: () => void;
  onBack: () => void;
}

export default function StepTimeSelect({
  selectedDate,
  selectedTimeSlot,
  onSelectTimeSlot,
  onProceed,
  onBack,
}: StepTimeSelectProps) {
  // Query available slots through the centralized service
  const slots: TimeSlot[] = useMemo(() => {
    if (!selectedDate) return [];
    return bookingService.getAvailableSlots(selectedDate);
  }, [selectedDate]);

  // Categorize slots by time of day
  const { morningSlots, afternoonSlots, eveningSlots } = useMemo(() => {
    const morning: TimeSlot[] = [];
    const afternoon: TimeSlot[] = [];
    const evening: TimeSlot[] = [];

    slots.forEach((s) => {
      const match = s.time.match(/(\d+):(\d+)\s*(AM|PM)/i);
      if (!match) {
        morning.push(s);
        return;
      }

      let h = parseInt(match[1], 10);
      const ampm = match[3].toUpperCase();
      if (ampm === 'PM' && h < 12) h += 12;
      if (ampm === 'AM' && h === 12) h = 0;

      if (h < 12) {
        morning.push(s);
      } else if (h < 17) {
        afternoon.push(s);
      } else {
        evening.push(s);
      }
    });

    return { morningSlots: morning, afternoonSlots: afternoon, eveningSlots: evening };
  }, [slots]);

  const availableCount = slots.filter((s) => s.available).length;

  const renderSlotGroup = (title: string, icon: ReactNode, groupSlots: TimeSlot[]) => {
    if (groupSlots.length === 0) return null;

    return (
      <div className="space-y-2.5">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#c5a059]">
          {icon}
          <span>{title}</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {groupSlots.map((slot) => {
            const isSelected = selectedTimeSlot === slot.time;
            const isAvailable = slot.available;

            return (
              <button
                key={slot.time}
                type="button"
                disabled={!isAvailable}
                onClick={() => onSelectTimeSlot(slot.time)}
                className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center relative ${
                  isSelected
                    ? 'bg-[#c5a059] text-black border-[#c5a059] shadow-lg font-bold scale-[1.02]'
                    : !isAvailable
                    ? 'bg-black/40 border-white/5 text-white/20 cursor-not-allowed'
                    : 'bg-[#141414] border-white/10 text-white/80 hover:text-white hover:border-[#c5a059] hover:bg-[#18181c] cursor-pointer'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-mono font-semibold">{slot.time}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-black" />}
                </div>

                {!isAvailable && (
                  <span className="text-[9px] uppercase tracking-wider text-white/30 font-medium mt-0.5">
                    {slot.reason || 'Booked'}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Availability Status Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#c5a059]" />
          <span className="text-xs font-medium text-white/70">
            Available Slots on <strong className="text-white">{selectedDate}</strong>
          </span>
        </div>

        <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#c5a059]/15 border border-[#c5a059]/30 text-[#c5a059] font-bold">
          {availableCount} {availableCount === 1 ? 'Slot' : 'Slots'} Open
        </span>
      </div>

      {/* Slots Matrix */}
      {slots.length === 0 ? (
        <div className="p-8 bg-[#141414] border border-white/10 rounded-xl text-center space-y-3">
          <AlertCircle className="w-8 h-8 text-[#c5a059] mx-auto" />
          <h4 className="serif font-bold text-lg text-white">No Slots Available for this Date</h4>
          <p className="text-xs text-white/60 max-w-sm mx-auto">
            The shop may be closed (Mondays) or all appointments have filled up. Please choose an alternate date.
          </p>
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
          >
            Select Another Date
          </button>
        </div>
      ) : (
        <div className="space-y-6 max-h-[460px] overflow-y-auto pr-1">
          {renderSlotGroup('Morning Sessions', <Sun className="w-3.5 h-3.5 text-[#c5a059]" />, morningSlots)}
          {renderSlotGroup('Afternoon Sessions', <Sunset className="w-3.5 h-3.5 text-[#c5a059]" />, afternoonSlots)}
          {renderSlotGroup('Evening Sessions', <Moon className="w-3.5 h-3.5 text-[#c5a059]" />, eveningSlots)}
        </div>
      )}

      {/* Footer Navigation */}
      <div className="p-4 bg-[#0d0d0f] border border-white/10 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#c5a059]">
            Chosen Time Slot
          </span>
          <p className="serif text-lg font-bold text-white mt-0.5">
            {selectedTimeSlot ? `${selectedDate} at ${selectedTimeSlot}` : 'Please tap a time slot above'}
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={onBack}
            className="w-1/2 sm:w-auto px-5 py-2.5 rounded-lg border border-white/10 hover:border-white/30 text-xs uppercase tracking-wider font-semibold text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            Back
          </button>

          <button
            type="button"
            disabled={!selectedTimeSlot}
            onClick={onProceed}
            className={`w-1/2 sm:w-auto px-6 py-2.5 rounded-lg font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
              selectedTimeSlot
                ? 'bg-[#c5a059] hover:bg-white text-black shadow-lg cursor-pointer'
                : 'bg-white/10 text-white/30 cursor-not-allowed'
            }`}
          >
            <span>Customer Details</span>
            <Sparkles className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
