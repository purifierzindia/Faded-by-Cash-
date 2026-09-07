import { useState, useEffect } from 'react';
import {
  X,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  Shield,
  CheckCircle2,
  XCircle,
  Clock3,
  CalendarDays,
  Bell,
  RefreshCw,
  Ban,
  Scissors,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { Appointment, BookingStatus, NotificationLog } from '../../types';
import { bookingService, formatDateKey } from '../../services/bookingService';
import { SERVICES_DATA } from '../../data/barberData';

interface OwnerPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OwnerPortalModal({ isOpen, onClose }: OwnerPortalModalProps) {
  const [activeTab, setActiveTab] = useState<'appointments' | 'schedule' | 'notifications' | 'services'>('appointments');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [notifications, setNotifications] = useState<NotificationLog[]>([]);
  const [statusFilter, setStatusFilter] = useState<'all' | 'confirmed' | 'completed' | 'cancelled'>('all');

  // Reschedule state
  const [reschedulingAppt, setReschedulingAppt] = useState<Appointment | null>(null);
  const [rescheduleDate, setRescheduleDate] = useState<string>('');
  const [rescheduleSlot, setRescheduleSlot] = useState<string>('');

  // Block slot state
  const [blockDate, setBlockDate] = useState<string>(formatDateKey(new Date()));

  // Subscribe to booking service changes
  useEffect(() => {
    const updateData = () => {
      setAppointments(bookingService.getAppointments());
      setNotifications(bookingService.getNotificationLogs());
    };

    updateData();
    const unsubscribe = bookingService.subscribe(updateData);
    return () => unsubscribe();
  }, [isOpen]);

  if (!isOpen) return null;

  const handleStatusChange = (id: string, newStatus: BookingStatus) => {
    bookingService.updateAppointmentStatus(id, newStatus);
  };

  const handleOpenReschedule = (appt: Appointment) => {
    setReschedulingAppt(appt);
    setRescheduleDate(appt.date);
    setRescheduleSlot(appt.timeSlot);
  };

  const handleSaveReschedule = () => {
    if (reschedulingAppt && rescheduleDate && rescheduleSlot) {
      bookingService.rescheduleAppointment(reschedulingAppt.id, rescheduleDate, rescheduleSlot);
      setReschedulingAppt(null);
    }
  };

  const filteredAppointments = appointments.filter((a) => {
    if (statusFilter === 'all') return true;
    return a.status === statusFilter;
  });

  const availableSlotsForBlock = bookingService.getDaySchedule(blockDate);

  return (
    <div
      id="owner-portal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="owner-portal-panel"
        className="relative w-full max-w-4xl bg-[#0f0f13] border border-[#c5a059]/40 shadow-2xl rounded-2xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-[#141419] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#c5a059]/15 border border-[#c5a059]/40 flex items-center justify-center">
              <Shield className="w-4 h-4 text-[#c5a059]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="serif font-bold text-lg text-white uppercase">
                  Faded By Cash • Owner Portal
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#c5a059] text-black font-bold uppercase">
                  Admin Ready
                </span>
              </div>
              <p className="text-[11px] text-white/50">
                Manage chair bookings, schedule blocks, client notifications, and service architecture.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-[#0a0a0d] px-6 border-b border-white/5 flex items-center gap-2 overflow-x-auto scrollbar-none text-xs">
          {[
            { id: 'appointments', label: `Appointments (${appointments.length})`, icon: Calendar },
            { id: 'schedule', label: 'Block Schedule & Slots', icon: Clock3 },
            { id: 'notifications', label: `Dispatched Hooks (${notifications.length})`, icon: Bell },
            { id: 'services', label: 'Services & Pricing', icon: Scissors },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 px-3.5 border-b-2 font-bold uppercase tracking-wider text-[11px] flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-[#c5a059] text-[#c5a059]'
                  : 'border-transparent text-white/50 hover:text-white'
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: APPOINTMENTS */}
          {activeTab === 'appointments' && (
            <div className="space-y-4">
              {/* Filter Row */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-white/40 uppercase tracking-widest text-[10px] mr-1">Status:</span>
                  {(['all', 'confirmed', 'completed', 'cancelled'] as const).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setStatusFilter(st)}
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                        statusFilter === st
                          ? 'bg-[#c5a059] text-black font-bold'
                          : 'bg-white/5 text-white/60 hover:text-white'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => bookingService.clearAllData()}
                  className="text-[10px] text-white/40 hover:text-rose-400 font-medium flex items-center gap-1 transition-colors cursor-pointer"
                  title="Reset to default mock appointments"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reset Demo Data</span>
                </button>
              </div>

              {/* Appointments List */}
              <div className="space-y-3">
                {filteredAppointments.length === 0 ? (
                  <div className="p-12 text-center text-white/40 bg-[#141418] rounded-xl border border-white/5">
                    No appointments matching this status filter.
                  </div>
                ) : (
                  filteredAppointments.map((appt) => {
                    const isCancelled = appt.status === 'cancelled';
                    const isCompleted = appt.status === 'completed';

                    return (
                      <div
                        key={appt.id}
                        className={`p-4 rounded-xl border transition-all ${
                          isCancelled
                            ? 'bg-[#121215]/50 border-white/5 opacity-60'
                            : isCompleted
                            ? 'bg-[#121217] border-white/10'
                            : 'bg-[#16161c] border-white/10 hover:border-[#c5a059]/40'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/5">
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-xs font-bold text-[#c5a059] bg-[#c5a059]/10 px-2 py-0.5 rounded border border-[#c5a059]/30">
                              {appt.id}
                            </span>
                            <span
                              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                                appt.status === 'confirmed'
                                  ? 'bg-emerald-900/40 text-emerald-400 border border-emerald-500/30'
                                  : appt.status === 'completed'
                                  ? 'bg-sky-900/40 text-sky-400 border border-sky-500/30'
                                  : appt.status === 'rescheduled'
                                  ? 'bg-amber-900/40 text-amber-400 border border-amber-500/30'
                                  : 'bg-rose-900/40 text-rose-400 border border-rose-500/30'
                              }`}
                            >
                              {appt.status}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-xs text-white/50 flex items-center gap-1 font-mono">
                              <Calendar className="w-3.5 h-3.5 text-[#c5a059]" />
                              {appt.date}
                            </span>
                            <span className="text-xs text-white font-bold font-mono px-2 py-0.5 rounded bg-white/5">
                              {appt.timeSlot}
                            </span>
                          </div>
                        </div>

                        {/* Middle Info */}
                        <div className="py-3 grid sm:grid-cols-2 gap-3 text-xs">
                          <div>
                            <span className="text-white/40 text-[10px] uppercase tracking-wider block">Customer</span>
                            <p className="font-bold text-white text-sm mt-0.5">{appt.customer.fullName}</p>
                            <div className="flex items-center gap-3 mt-1 text-white/60 text-[11px]">
                              <a href={`tel:${appt.customer.phone}`} className="hover:text-[#c5a059] flex items-center gap-1">
                                <Phone className="w-3 h-3 text-[#c5a059]" /> {appt.customer.phone}
                              </a>
                              {appt.customer.email && (
                                <span className="truncate flex items-center gap-1 text-white/40">
                                  <Mail className="w-3 h-3" /> {appt.customer.email}
                                </span>
                              )}
                            </div>
                            {appt.customer.notes && (
                              <p className="text-[11px] text-white/50 italic mt-1.5">
                                "{appt.customer.notes}"
                              </p>
                            )}
                          </div>

                          <div className="sm:text-right flex flex-col justify-between">
                            <div>
                              <span className="text-white/40 text-[10px] uppercase tracking-wider block">Services</span>
                              <p className="font-medium text-white/90 mt-0.5">
                                {appt.services.map((s) => s.name).join(', ')}
                              </p>
                              <span className="serif text-lg font-bold text-[#c5a059] block mt-0.5">
                                ${appt.totalPrice}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Owner Actions */}
                        <div className="pt-2 border-t border-white/5 flex flex-wrap items-center justify-end gap-2 text-xs">
                          {appt.status !== 'completed' && appt.status !== 'cancelled' && (
                            <>
                              <button
                                type="button"
                                onClick={() => handleStatusChange(appt.id, 'completed')}
                                className="px-3 py-1 rounded bg-sky-950 hover:bg-sky-900 text-sky-300 border border-sky-700/40 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                              >
                                <CheckCircle2 className="w-3 h-3" />
                                Mark Completed
                              </button>

                              <button
                                type="button"
                                onClick={() => handleOpenReschedule(appt)}
                                className="px-3 py-1 rounded bg-amber-950/60 hover:bg-amber-900/60 text-amber-300 border border-amber-700/40 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                              >
                                <Clock3 className="w-3 h-3" />
                                Reschedule
                              </button>

                              <button
                                type="button"
                                onClick={() => handleStatusChange(appt.id, 'cancelled')}
                                className="px-3 py-1 rounded bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 border border-rose-700/40 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                              >
                                <XCircle className="w-3 h-3" />
                                Cancel
                              </button>
                            </>
                          )}

                          {appt.status === 'cancelled' && (
                            <button
                              type="button"
                              onClick={() => handleStatusChange(appt.id, 'confirmed')}
                              className="px-3 py-1 rounded bg-white/5 hover:bg-white/10 text-white/70 text-[10px] font-bold uppercase tracking-wider cursor-pointer"
                            >
                              Restore / Confirm
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* TAB 2: SCHEDULE & BLOCKED SLOTS */}
          {activeTab === 'schedule' && (
            <div className="space-y-6">
              <div className="p-4 bg-[#141418] border border-white/5 rounded-xl text-xs space-y-2">
                <h4 className="serif font-bold text-sm text-white">Block Hours & Manage Slot Availability</h4>
                <p className="text-white/60">
                  Select any date to instantly lock or unlock time slots for personal breaks, mobile appointments, or VIP hours. Blocked slots will automatically appear disabled on the client booking screen.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-2">
                  Select Date to Manage
                </label>
                <input
                  type="date"
                  value={blockDate}
                  onChange={(e) => setBlockDate(e.target.value)}
                  className="px-4 py-2.5 bg-[#0a0a0c] border border-white/10 rounded-lg text-white text-xs font-mono focus:border-[#c5a059] outline-none cursor-pointer"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold uppercase tracking-wider text-white/60">
                    Slots for {blockDate}
                  </span>
                  <span className="text-[10px] text-white/40">
                    Click to toggle Blocked / Available
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
                  {availableSlotsForBlock.map((slotTime) => {
                    const isBlocked = bookingService.isSlotBlocked(blockDate, slotTime);

                    return (
                      <button
                        key={slotTime}
                        type="button"
                        onClick={() => {
                          if (isBlocked) {
                            bookingService.unblockSlot(blockDate, slotTime);
                          } else {
                            bookingService.blockSlot(blockDate, slotTime);
                          }
                        }}
                        className={`p-2.5 rounded-lg border text-center transition-all text-xs font-mono font-semibold cursor-pointer ${
                          isBlocked
                            ? 'bg-rose-950/70 border-rose-500/60 text-rose-200'
                            : 'bg-[#141418] border-white/10 text-white/80 hover:border-[#c5a059]'
                        }`}
                      >
                        <div>{slotTime}</div>
                        <span className="text-[9px] uppercase tracking-wider block mt-0.5">
                          {isBlocked ? 'Blocked' : 'Available'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DISPATCHED HOOKS & NOTIFICATIONS */}
          {activeTab === 'notifications' && (
            <div className="space-y-4">
              <div className="p-4 bg-[#141418] border border-white/5 rounded-xl text-xs space-y-1">
                <div className="flex items-center gap-2 text-[#c5a059] font-bold uppercase tracking-wider">
                  <Bell className="w-3.5 h-3.5" />
                  <span>Webhook & Notification Pipeline</span>
                </div>
                <p className="text-white/60 leading-relaxed">
                  Every confirmed booking automatically fires mock client confirmation emails, SMS dispatch hooks, and barber alerts. These hooks can connect seamlessly to Twilio, SendGrid, or Firebase Cloud Functions in production.
                </p>
              </div>

              <div className="space-y-2.5 max-h-[460px] overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-12 text-center text-white/40 bg-[#141418] rounded-xl border border-white/5">
                    No notification logs generated yet. Make a booking to trigger the pipeline.
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className="p-3.5 bg-[#141418] border border-white/5 rounded-lg text-xs space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded ${
                              notif.type === 'sms'
                                ? 'bg-amber-900/40 text-amber-300'
                                : notif.type === 'email'
                                ? 'bg-sky-900/40 text-sky-300'
                                : 'bg-purple-900/40 text-purple-300'
                            }`}
                          >
                            {notif.type.toUpperCase()}
                          </span>
                          <span className="font-bold text-white">{notif.recipient}</span>
                        </div>
                        <span className="text-[10px] text-white/40 font-mono">{notif.timestamp}</span>
                      </div>

                      <p className="font-medium text-white/80">{notif.subject}</p>
                      <p className="text-[11px] text-white/50 bg-[#0a0a0d] p-2 rounded border border-white/5 font-mono">
                        {notif.preview}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 4: SERVICES & PRICING */}
          {activeTab === 'services' && (
            <div className="space-y-4">
              <div className="p-4 bg-[#141418] border border-white/5 rounded-xl text-xs space-y-1">
                <span className="font-bold uppercase tracking-wider text-[#c5a059] block">
                  Service Architecture & Catalog
                </span>
                <p className="text-white/60">
                  Services are centrally managed in <code className="text-[#c5a059]">src/data/barberData.ts</code> and dynamically rendered throughout the booking modal and home page.
                </p>
              </div>

              <div className="divide-y divide-white/5 bg-[#141418] rounded-xl border border-white/5 overflow-hidden">
                {SERVICES_DATA.map((service) => (
                  <div key={service.id} className="p-4 flex items-center justify-between gap-4 text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{service.name}</span>
                        {service.popular && (
                          <span className="text-[9px] bg-[#c5a059] text-black font-extrabold uppercase px-1.5 rounded">
                            Popular
                          </span>
                        )}
                      </div>
                      <p className="text-white/50 text-[11px] mt-0.5">{service.duration} • {service.category}</p>
                    </div>

                    <div className="text-right">
                      <span className="serif text-lg font-bold text-[#c5a059]">${service.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Reschedule Modal Overlay */}
        {reschedulingAppt && (
          <div className="absolute inset-0 z-30 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-[#141419] border border-[#c5a059] p-6 rounded-2xl shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h4 className="serif font-bold text-lg text-white">
                  Reschedule Appointment {reschedulingAppt.id}
                </h4>
                <button
                  type="button"
                  onClick={() => setReschedulingAppt(null)}
                  className="p-1 text-white/50 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="text-xs space-y-3">
                <p className="text-white/70">
                  Client: <strong className="text-white">{reschedulingAppt.customer.fullName}</strong>
                </p>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-bold text-white/60 mb-1">
                    New Date
                  </label>
                  <input
                    type="date"
                    value={rescheduleDate}
                    onChange={(e) => setRescheduleDate(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0a0a0d] border border-white/10 rounded text-white text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-bold text-white/60 mb-1">
                    New Time Slot
                  </label>
                  <select
                    value={rescheduleSlot}
                    onChange={(e) => setRescheduleSlot(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0a0a0d] border border-white/10 rounded text-white text-xs font-mono"
                  >
                    {bookingService.getDaySchedule(rescheduleDate).map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setReschedulingAppt(null)}
                  className="px-4 py-2 rounded text-xs font-semibold text-white/60 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveReschedule}
                  className="px-4 py-2 bg-[#c5a059] text-black font-bold text-xs uppercase tracking-wider rounded"
                >
                  Save Reschedule
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
