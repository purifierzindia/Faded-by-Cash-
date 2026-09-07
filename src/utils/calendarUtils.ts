import { Appointment } from '../types';

/**
 * Parses appointment date (YYYY-MM-DD) and time (e.g. "10:30 AM") into start and end Date objects.
 */
export function getAppointmentDateRange(appointment: Appointment): { start: Date; end: Date } {
  const [year, month, day] = appointment.date.split('-').map(Number);
  
  // Parse time e.g. "10:30 AM" or "2:00 PM"
  const timeParts = appointment.timeSlot.match(/(\d+):(\d+)\s*(AM|PM)/i);
  let hours = 10;
  let minutes = 0;
  
  if (timeParts) {
    let parsedHours = parseInt(timeParts[1], 10);
    const parsedMinutes = parseInt(timeParts[2], 10);
    const ampm = timeParts[3].toUpperCase();
    
    if (ampm === 'PM' && parsedHours < 12) parsedHours += 12;
    if (ampm === 'AM' && parsedHours === 12) parsedHours = 0;
    
    hours = parsedHours;
    minutes = parsedMinutes;
  }
  
  const start = new Date(year, month - 1, day, hours, minutes);
  
  // Calculate duration in minutes from totalDuration (e.g. "60 min", "90 min")
  const durationMatch = appointment.totalDuration.match(/(\d+)/);
  const durationMinutes = durationMatch ? parseInt(durationMatch[1], 10) : 45;
  
  const end = new Date(start.getTime() + durationMinutes * 60 * 1000);
  
  return { start, end };
}

/**
 * Formats a Date object to iCalendar UTC string format: YYYYMMDDTHHmmssZ
 */
function formatIcsDate(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

/**
 * Generates a Google Calendar Web Event URL.
 */
export function generateGoogleCalendarUrl(appointment: Appointment): string {
  const { start, end } = getAppointmentDateRange(appointment);
  const startStr = formatIcsDate(start);
  const endStr = formatIcsDate(end);
  
  const title = encodeURIComponent(`Haircut Appointment — Faded By Cash (${appointment.services.map(s => s.name).join(', ')})`);
  const details = encodeURIComponent(
    `Barber Appointment with Cash at Faded By Cash\n\n` +
    `Ref #: ${appointment.id}\n` +
    `Services: ${appointment.services.map(s => `${s.name} ($${s.price})`).join(', ')}\n` +
    `Total: $${appointment.totalPrice}\n` +
    `Customer: ${appointment.customer.fullName} (${appointment.customer.phone})\n` +
    `Payment: Pay at appointment (Cash, Zelle, Card accepted)\n\n` +
    `Location: 1226 E Northwest Highway, Garland, TX 75041\n` +
    `Phone: +1 214-586-8484`
  );
  const location = encodeURIComponent('1226 E Northwest Highway, Garland, TX 75041');
  
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startStr}/${endStr}&details=${details}&location=${location}`;
}

/**
 * Generates and triggers download of an .ics calendar file for Apple Calendar, Outlook, etc.
 */
export function downloadIcsFile(appointment: Appointment): void {
  const { start, end } = getAppointmentDateRange(appointment);
  const startStr = formatIcsDate(start);
  const endStr = formatIcsDate(end);
  const nowStr = formatIcsDate(new Date());
  
  const serviceNames = appointment.services.map(s => s.name).join(', ');
  
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Faded By Cash//Barber Appointments//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${appointment.id}-${Date.now()}@fadedbycash.com`,
    `DTSTAMP:${nowStr}`,
    `DTSTART:${startStr}`,
    `DTEND:${endStr}`,
    `SUMMARY:Faded By Cash — ${serviceNames}`,
    `DESCRIPTION:Barber appointment with Cash at Faded By Cash.\\nRef: ${appointment.id}\\nServices: ${serviceNames}\\nTotal: $${appointment.totalPrice}\\nCustomer: ${appointment.customer.fullName}\\nLocation: 1226 E Northwest Highway\\, Garland\\, TX 75041\\nPhone: +1 214-586-8484`,
    `LOCATION:1226 E Northwest Highway\\, Garland\\, TX 75041`,
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-PT2H',
    'DESCRIPTION:Reminder: Haircut appointment at Faded By Cash in 2 hours',
    'ACTION:DISPLAY',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `Faded-By-Cash-${appointment.id}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}
