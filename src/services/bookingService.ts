import { Appointment, BookingStatus, CustomerDetails, NotificationLog, ServiceItem, TimeSlot } from '../types';
import { SERVICES_DATA } from '../data/barberData';

const STORAGE_KEY_APPOINTMENTS = 'faded_by_cash_appointments_v1';
const STORAGE_KEY_BLOCKED_SLOTS = 'faded_by_cash_blocked_slots_v1';
const STORAGE_KEY_NOTIFICATIONS = 'faded_by_cash_notifications_v1';

// Format helper: YYYY-MM-DD
export function formatDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

// Generate future date helper
function getFutureDate(daysAhead: number): string {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  return formatDateKey(d);
}

// Initial realistic appointments seed
const INITIAL_MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: 'FBC-81042',
    serviceIds: ['classic-cut'],
    services: [SERVICES_DATA[1]], // Classic Cut
    date: getFutureDate(1), // Tomorrow
    timeSlot: '11:00 AM',
    totalPrice: 45,
    totalDuration: '50 min',
    customer: {
      fullName: 'Marcus Vance',
      phone: '(214) 790-2184',
      email: 'm.vance@example.com',
      notes: 'Low skin fade with beard line up.',
      optInNotifications: true,
    },
    status: 'confirmed',
    paymentMethod: 'pay_at_appointment',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'FBC-49215',
    serviceIds: ['modern-cut', 'deluxe-beard'],
    services: [SERVICES_DATA[0], SERVICES_DATA[3]], // Modern Cut + Deluxe Beard
    date: getFutureDate(1), // Tomorrow
    timeSlot: '2:30 PM',
    totalPrice: 95,
    totalDuration: '90 min',
    customer: {
      fullName: 'Devon Reed',
      phone: '(972) 341-9920',
      email: 'devon.reed@example.com',
      notes: 'Hot towel steam before beard sculpt please.',
      optInNotifications: true,
    },
    status: 'confirmed',
    paymentMethod: 'pay_at_appointment',
    createdAt: new Date(Date.now() - 72000000).toISOString(),
  },
  {
    id: 'FBC-30981',
    serviceIds: ['crispy-lineup'],
    services: [SERVICES_DATA[4]], // Crispy Line Up
    date: getFutureDate(2), // Day after tomorrow
    timeSlot: '10:30 AM',
    totalPrice: 35,
    totalDuration: '35 min',
    customer: {
      fullName: 'Trevon Harris',
      phone: '(469) 812-4019',
      email: 'trevon.h@example.com',
      notes: 'Sharp razor finish on the temples.',
      optInNotifications: true,
    },
    status: 'confirmed',
    paymentMethod: 'pay_at_appointment',
    createdAt: new Date(Date.now() - 36000000).toISOString(),
  },
  {
    id: 'FBC-67210',
    serviceIds: ['straight-razor-head-shave'],
    services: [SERVICES_DATA[5]], // Straight Razor Head Shave
    date: getFutureDate(3),
    timeSlot: '1:00 PM',
    totalPrice: 40,
    totalDuration: '45 min',
    customer: {
      fullName: 'Carlos Mendez',
      phone: '(214) 635-1882',
      email: 'carlos.m@example.com',
      notes: 'Sensitive scalp, cold towel finish appreciated.',
      optInNotifications: true,
    },
    status: 'confirmed',
    paymentMethod: 'pay_at_appointment',
    createdAt: new Date(Date.now() - 20000000).toISOString(),
  },
];

class BookingService {
  private appointments: Appointment[] = [];
  private blockedSlots: Record<string, string[]> = {}; // date -> array of timeSlots
  private notificationLogs: NotificationLog[] = [];
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.loadState();
  }

  private loadState() {
    try {
      const storedAppts = localStorage.getItem(STORAGE_KEY_APPOINTMENTS);
      if (storedAppts) {
        this.appointments = JSON.parse(storedAppts);
      } else {
        this.appointments = [...INITIAL_MOCK_APPOINTMENTS];
        this.saveAppointments();
      }

      const storedBlocked = localStorage.getItem(STORAGE_KEY_BLOCKED_SLOTS);
      if (storedBlocked) {
        this.blockedSlots = JSON.parse(storedBlocked);
      }

      const storedNotifs = localStorage.getItem(STORAGE_KEY_NOTIFICATIONS);
      if (storedNotifs) {
        this.notificationLogs = JSON.parse(storedNotifs);
      }
    } catch {
      this.appointments = [...INITIAL_MOCK_APPOINTMENTS];
      this.blockedSlots = {};
      this.notificationLogs = [];
    }
  }

  private saveAppointments() {
    try {
      localStorage.setItem(STORAGE_KEY_APPOINTMENTS, JSON.stringify(this.appointments));
    } catch (e) {
      console.warn('Failed to persist appointments to localStorage', e);
    }
    this.notify();
  }

  private saveBlockedSlots() {
    try {
      localStorage.setItem(STORAGE_KEY_BLOCKED_SLOTS, JSON.stringify(this.blockedSlots));
    } catch (e) {
      console.warn('Failed to persist blocked slots to localStorage', e);
    }
    this.notify();
  }

  private saveNotifications() {
    try {
      localStorage.setItem(STORAGE_KEY_NOTIFICATIONS, JSON.stringify(this.notificationLogs));
    } catch (e) {
      console.warn('Failed to persist notifications to localStorage', e);
    }
    this.notify();
  }

  private notify() {
    this.listeners.forEach((listener) => {
      try {
        listener();
      } catch (e) {
        console.error('Error in booking listener', e);
      }
    });
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  /**
   * Check if a given date is valid and not in the past
   */
  public isDatePast(dateStr: string): boolean {
    const todayStr = formatDateKey(new Date());
    return dateStr < todayStr;
  }

  /**
   * Check if the shop is open on the given date (Monday is closed)
   */
  public isShopClosedOnDate(dateStr: string): { closed: boolean; reason?: string } {
    const [y, m, d] = dateStr.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday

    if (dayOfWeek === 1) {
      return { closed: true, reason: 'Shop Closed on Mondays' };
    }

    return { closed: false };
  }

  /**
   * Get all defined time slots for a given day of week
   * Tuesday - Saturday: 10:00 AM - 7:00 PM (every 30 mins)
   * Sunday: 10:00 AM - 6:00 PM
   */
  public getDaySchedule(dateStr: string): string[] {
    const [y, m, d] = dateStr.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    const dayOfWeek = date.getDay();

    if (dayOfWeek === 1) {
      return []; // Monday closed
    }

    if (dayOfWeek === 0) {
      // Sunday: 10:00 AM to 5:30 PM
      return [
        '10:00 AM',
        '10:30 AM',
        '11:00 AM',
        '11:30 AM',
        '12:00 PM',
        '12:30 PM',
        '1:00 PM',
        '1:30 PM',
        '2:00 PM',
        '2:30 PM',
        '3:00 PM',
        '3:30 PM',
        '4:00 PM',
        '4:30 PM',
        '5:00 PM',
        '5:30 PM',
      ];
    }

    // Tuesday - Saturday: 10:00 AM to 6:30 PM
    return [
      '10:00 AM',
      '10:30 AM',
      '11:00 AM',
      '11:30 AM',
      '12:00 PM',
      '12:30 PM',
      '1:00 PM',
      '1:30 PM',
      '2:00 PM',
      '2:30 PM',
      '3:00 PM',
      '3:30 PM',
      '4:00 PM',
      '4:30 PM',
      '5:00 PM',
      '5:30 PM',
      '6:00 PM',
      '6:30 PM',
    ];
  }

  /**
   * Generates slot availability for a date, preventing past slots and double bookings
   */
  public getAvailableSlots(dateStr: string): TimeSlot[] {
    if (this.isDatePast(dateStr)) {
      return [];
    }

    const { closed, reason } = this.isShopClosedOnDate(dateStr);
    if (closed) {
      return [];
    }

    const allSlots = this.getDaySchedule(dateStr);
    const todayStr = formatDateKey(new Date());
    const isToday = dateStr === todayStr;
    const now = new Date();

    // Get all existing active appointments for this date
    const bookedSlotsForDate = new Set(
      this.appointments
        .filter((a) => a.date === dateStr && a.status !== 'cancelled')
        .map((a) => a.timeSlot)
    );

    // Get manually blocked slots by owner
    const blockedSlotsForDate = new Set(this.blockedSlots[dateStr] || []);

    return allSlots.map((time) => {
      // 1. Check if slot is already in the past today
      if (isToday) {
        const timeParts = time.match(/(\d+):(\d+)\s*(AM|PM)/i);
        if (timeParts) {
          let h = parseInt(timeParts[1], 10);
          const m = parseInt(timeParts[2], 10);
          const ampm = timeParts[3].toUpperCase();
          if (ampm === 'PM' && h < 12) h += 12;
          if (ampm === 'AM' && h === 12) h = 0;

          const slotDate = new Date();
          slotDate.setHours(h, m, 0, 0);

          if (slotDate <= now) {
            return {
              time,
              available: false,
              reason: 'Time has passed',
            };
          }
        }
      }

      // 2. Check if already booked
      if (bookedSlotsForDate.has(time)) {
        return {
          time,
          available: false,
          reason: 'Already booked',
        };
      }

      // 3. Check if manually blocked by owner
      if (blockedSlotsForDate.has(time)) {
        return {
          time,
          available: false,
          reason: 'Unavailable (Reserved/Blocked)',
        };
      }

      return {
        time,
        available: true,
      };
    });
  }

  /**
   * Create and confirm an appointment
   */
  public async createAppointment(params: {
    serviceIds: string[];
    services: ServiceItem[];
    date: string;
    timeSlot: string;
    customer: CustomerDetails;
  }): Promise<Appointment> {
    // 1. Verify availability
    const slots = this.getAvailableSlots(params.date);
    const targetSlot = slots.find((s) => s.time === params.timeSlot);

    if (!targetSlot || !targetSlot.available) {
      throw new Error(
        `The ${params.timeSlot} slot on ${params.date} is no longer available. Please select another time.`
      );
    }

    // 2. Calculate total price and combined duration
    const totalPrice = params.services.reduce((acc, s) => acc + s.price, 0);
    const totalMinutes = params.services.reduce((acc, s) => {
      const match = s.duration.match(/(\d+)/);
      return acc + (match ? parseInt(match[1], 10) : 45);
    }, 0);

    // 3. Generate unique appointment reference (e.g. FBC-58912)
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    const appointmentId = `FBC-${randomDigits}`;

    const newAppointment: Appointment = {
      id: appointmentId,
      serviceIds: params.serviceIds,
      services: params.services,
      date: params.date,
      timeSlot: params.timeSlot,
      totalPrice,
      totalDuration: `${totalMinutes} min`,
      customer: params.customer,
      status: 'confirmed',
      paymentMethod: 'pay_at_appointment',
      createdAt: new Date().toISOString(),
    };

    // 4. Save appointment
    this.appointments.unshift(newAppointment);
    this.saveAppointments();

    // 5. Trigger notification hooks (simulated logging)
    this.triggerNotificationHooks(newAppointment);

    return newAppointment;
  }

  /**
   * Notification dispatch placeholders/hooks
   */
  private triggerNotificationHooks(appointment: Appointment) {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const serviceList = appointment.services.map((s) => s.name).join(', ');

    // 1. Customer Confirmation Email
    if (appointment.customer.email) {
      this.notificationLogs.unshift({
        id: `notif-email-${Date.now()}-1`,
        timestamp,
        type: 'email',
        recipient: appointment.customer.email,
        subject: `Appointment Confirmed: ${appointment.id} at Faded By Cash`,
        status: 'simulated',
        preview: `Hello ${appointment.customer.fullName}, your appointment for ${serviceList} on ${appointment.date} at ${appointment.timeSlot} is confirmed with Cash.`,
      });
    }

    // 2. Customer SMS Dispatch
    if (appointment.customer.optInNotifications && appointment.customer.phone) {
      this.notificationLogs.unshift({
        id: `notif-sms-${Date.now()}-2`,
        timestamp,
        type: 'sms',
        recipient: appointment.customer.phone,
        subject: 'SMS Confirmation',
        status: 'simulated',
        preview: `Faded By Cash: Your cut is set for ${appointment.date} at ${appointment.timeSlot}. Ref: ${appointment.id}. 1226 E Northwest Hwy, Garland TX. Reply C to confirm.`,
      });
    }

    // 3. Owner Alert (Cash)
    this.notificationLogs.unshift({
      id: `notif-owner-${Date.now()}-3`,
      timestamp,
      type: 'owner_alert',
      recipient: 'Cash (Owner) / (214) 586-8484',
      subject: `New Booking Alert: ${appointment.customer.fullName}`,
      status: 'simulated',
      preview: `New client: ${appointment.customer.fullName} booked ${serviceList} ($${appointment.totalPrice}) on ${appointment.date} at ${appointment.timeSlot}.`,
    });

    this.saveNotifications();
  }

  /**
   * Admin operations
   */
  public getAppointments(): Appointment[] {
    return [...this.appointments];
  }

  public updateAppointmentStatus(id: string, status: BookingStatus): void {
    const appt = this.appointments.find((a) => a.id === id);
    if (appt) {
      appt.status = status;
      this.saveAppointments();
    }
  }

  public cancelAppointment(id: string): void {
    this.updateAppointmentStatus(id, 'cancelled');
  }

  public rescheduleAppointment(id: string, newDate: string, newTimeSlot: string): boolean {
    const appt = this.appointments.find((a) => a.id === id);
    if (!appt) return false;

    // Check availability
    const slots = this.getAvailableSlots(newDate);
    const slot = slots.find((s) => s.time === newTimeSlot);
    if (!slot || !slot.available) {
      return false;
    }

    appt.date = newDate;
    appt.timeSlot = newTimeSlot;
    appt.status = 'rescheduled';
    this.saveAppointments();

    this.notificationLogs.unshift({
      id: `notif-resched-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'sms',
      recipient: appt.customer.phone,
      subject: 'Appointment Rescheduled',
      status: 'simulated',
      preview: `Faded By Cash: Your appointment ${appt.id} has been moved to ${newDate} at ${newTimeSlot}.`,
    });
    this.saveNotifications();

    return true;
  }

  public blockSlot(dateStr: string, timeSlot: string): void {
    if (!this.blockedSlots[dateStr]) {
      this.blockedSlots[dateStr] = [];
    }
    if (!this.blockedSlots[dateStr].includes(timeSlot)) {
      this.blockedSlots[dateStr].push(timeSlot);
      this.saveBlockedSlots();
    }
  }

  public unblockSlot(dateStr: string, timeSlot: string): void {
    if (this.blockedSlots[dateStr]) {
      this.blockedSlots[dateStr] = this.blockedSlots[dateStr].filter((s) => s !== timeSlot);
      if (this.blockedSlots[dateStr].length === 0) {
        delete this.blockedSlots[dateStr];
      }
      this.saveBlockedSlots();
    }
  }

  public isSlotBlocked(dateStr: string, timeSlot: string): boolean {
    return Boolean(this.blockedSlots[dateStr]?.includes(timeSlot));
  }

  public getNotificationLogs(): NotificationLog[] {
    return [...this.notificationLogs];
  }

  public clearAllData(): void {
    this.appointments = [...INITIAL_MOCK_APPOINTMENTS];
    this.blockedSlots = {};
    this.notificationLogs = [];
    this.saveAppointments();
    this.saveBlockedSlots();
    this.saveNotifications();
  }
}

export const bookingService = new BookingService();
