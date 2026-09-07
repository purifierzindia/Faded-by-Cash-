import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, AlertCircle, Sparkles } from 'lucide-react';
import { bookingService, formatDateKey } from '../../services/bookingService';

interface StepDateSelectProps {
  selectedDate: string;
  onSelectDate: (dateStr: string) => void;
  onProceed: () => void;
  onBack: () => void;
}

export default function StepDateSelect({
  selectedDate,
  onSelectDate,
  onProceed,
  onBack,
}: StepDateSelectProps) {
  const today = useMemo(() => new Date(), []);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth()); // 0-indexed

  // Month navigation
  const handlePrevMonth = () => {
    if (viewYear === today.getFullYear() && viewMonth <= today.getMonth()) {
      return; // Cannot go before current month
    }
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Calendar matrix calculation
  const calendarDays = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1).getDay(); // 0 = Sun
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const todayStr = formatDateKey(today);

    const days: Array<{
      dayNumber: number;
      dateStr: string;
      isPast: boolean;
      isToday: boolean;
      isClosed: boolean;
      isSelected: boolean;
    } | null> = [];

    // Empty cells before day 1
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const dateObj = new Date(viewYear, viewMonth, d);
      const dateStr = formatDateKey(dateObj);
      const isPast = dateStr < todayStr;
      const isToday = dateStr === todayStr;
      const isClosed = dateObj.getDay() === 1; // Monday
      const isSelected = dateStr === selectedDate;

      days.push({
        dayNumber: d,
        dateStr,
        isPast,
        isToday,
        isClosed,
        isSelected,
      });
    }

    return days;
  }, [viewYear, viewMonth, selectedDate, today]);

  // Quick Preset Helper
  const quickPresets = useMemo(() => {
    const list: Array<{ label: string; dateStr: string; disabled: boolean; reason?: string }> = [];
    
    // Today
    const d0 = new Date();
    const d0Str = formatDateKey(d0);
    const d0Closed = d0.getDay() === 1;
    list.push({
      label: 'Today',
      dateStr: d0Str,
      disabled: d0Closed,
      reason: d0Closed ? 'Shop Closed Today (Monday)' : undefined,
    });

    // Tomorrow
    const d1 = new Date();
    d1.setDate(d1.getDate() + 1);
    const d1Str = formatDateKey(d1);
    const d1Closed = d1.getDay() === 1;
    list.push({
      label: 'Tomorrow',
      dateStr: d1Str,
      disabled: d1Closed,
      reason: d1Closed ? 'Closed Tomorrow (Monday)' : undefined,
    });

    // Upcoming Saturday
    const dSat = new Date();
    const distToSat = (6 - dSat.getDay() + 7) % 7 || 7;
    dSat.setDate(dSat.getDate() + distToSat);
    const dSatStr = formatDateKey(dSat);
    list.push({
      label: 'This Saturday',
      dateStr: dSatStr,
      disabled: false,
    });

    return list;
  }, []);

  const isCurrentMonth = viewYear === today.getFullYear() && viewMonth === today.getMonth();

  // Selected date formatted title
  const selectedDateReadable = useMemo(() => {
    if (!selectedDate) return null;
    const [y, m, d] = selectedDate.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }, [selectedDate]);

  return (
    <div className="space-y-6">
      {/* Quick Select Presets */}
      <div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#c5a059] block mb-2">
          Fast Selection
        </span>
        <div className="grid grid-cols-3 gap-2">
          {quickPresets.map((preset) => (
            <button
              key={preset.label}
              type="button"
              disabled={preset.disabled}
              onClick={() => onSelectDate(preset.dateStr)}
              className={`py-2 px-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                preset.disabled
                  ? 'bg-white/5 text-white/20 border border-white/5 cursor-not-allowed'
                  : selectedDate === preset.dateStr
                  ? 'bg-[#c5a059] text-black font-bold shadow-md'
                  : 'bg-[#141414] text-white/70 hover:text-white border border-white/5 hover:border-white/20'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Calendar */}
      <div className="p-5 bg-[#141414] border border-white/10 rounded-xl shadow-xl">
        {/* Month Header Navigation */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-[#c5a059]" />
            <h3 className="serif font-bold text-lg text-white">
              {monthNames[viewMonth]} {viewYear}
            </h3>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={isCurrentMonth}
              onClick={handlePrevMonth}
              className={`p-1.5 rounded-lg border transition-colors ${
                isCurrentMonth
                  ? 'text-white/20 border-white/5 cursor-not-allowed'
                  : 'text-white/70 hover:text-white hover:bg-white/10 border-white/10 cursor-pointer'
              }`}
              aria-label="Previous Month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNextMonth}
              className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
              aria-label="Next Month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Days of Week */}
        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((dw, i) => (
            <div
              key={dw}
              className={`text-[10px] font-bold uppercase tracking-wider py-1 ${
                i === 1 ? 'text-rose-400/80' : 'text-white/40'
              }`}
            >
              {dw}
            </div>
          ))}
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((item, idx) => {
            if (!item) {
              return <div key={`empty-${idx}`} className="h-10 sm:h-12" />;
            }

            const isDisabled = item.isPast || item.isClosed;

            return (
              <button
                key={item.dateStr}
                type="button"
                disabled={isDisabled}
                onClick={() => onSelectDate(item.dateStr)}
                className={`h-10 sm:h-12 rounded-lg flex flex-col items-center justify-center relative transition-all text-xs font-semibold ${
                  item.isSelected
                    ? 'bg-[#c5a059] text-black font-extrabold shadow-lg ring-2 ring-[#c5a059] scale-[1.02]'
                    : isDisabled
                    ? 'text-white/20 bg-black/30 cursor-not-allowed'
                    : 'text-white/80 hover:text-white hover:bg-white/10 bg-[#18181c] border border-white/5 cursor-pointer'
                }`}
              >
                <span>{item.dayNumber}</span>

                {item.isClosed && (
                  <span className="text-[8px] uppercase tracking-tighter text-rose-400/70 font-bold">
                    Closed
                  </span>
                )}

                {item.isToday && !item.isSelected && !item.isClosed && (
                  <span className="w-1 h-1 rounded-full bg-[#c5a059] absolute bottom-1.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Calendar Legend */}
        <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap items-center justify-between text-[10px] text-white/50 gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#c5a059]" /> Selected
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded bg-white/10" /> Open
            </span>
            <span className="flex items-center gap-1.5 text-rose-400/80">
              <span className="w-2 h-2 rounded bg-rose-900/40" /> Closed (Mondays)
            </span>
          </div>
          <span>Garland, TX (CST)</span>
        </div>
      </div>

      {/* Selected Date Summary & Actions */}
      <div className="p-4 bg-[#0d0d0f] border border-white/10 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#c5a059]">
            Chosen Appointment Date
          </span>
          <p className="serif text-lg font-bold text-white mt-0.5">
            {selectedDateReadable || 'Please tap a date above'}
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
            disabled={!selectedDate}
            onClick={onProceed}
            className={`w-1/2 sm:w-auto px-6 py-2.5 rounded-lg font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
              selectedDate
                ? 'bg-[#c5a059] hover:bg-white text-black shadow-lg cursor-pointer'
                : 'bg-white/10 text-white/30 cursor-not-allowed'
            }`}
          >
            <span>Choose Time</span>
            <Sparkles className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
