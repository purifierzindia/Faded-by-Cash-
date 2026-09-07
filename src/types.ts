export interface ServiceItem {
  id: string;
  name: string;
  price: number;
  duration: string;
  category: 'haircuts' | 'beard' | 'packages' | 'kids-teens';
  description: string;
  included: string[];
  popular?: boolean;
  image: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'fades' | 'lineups' | 'beard' | 'modern' | 'all';
  styleName: string;
  description: string;
  image: string;
  featured?: boolean;
  details: {
    cutType: string;
    finishing: string;
    recommendedProduct: string;
  };
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  date: string;
  service: string;
  comment: string;
  verifiedBooksy: boolean;
}

export interface BusinessInfo {
  name: string;
  owner: string;
  tagline: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    full: string;
  };
  phone: string;
  phoneRaw: string;
  booksyUrl: string;
  instagramUrl: string;
  instagramHandle?: string;
  rating: number;
  reviewsCount: number;
  hours: {
    day: string;
    time: string;
    isClosed?: boolean;
  }[];
  payments: string[];
}

export type BookingStatus = 'confirmed' | 'completed' | 'cancelled' | 'rescheduled';

export interface CustomerDetails {
  fullName: string;
  phone: string;
  email: string;
  notes?: string;
  optInNotifications: boolean;
}

export interface Appointment {
  id: string;
  serviceIds: string[];
  services: ServiceItem[];
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "10:30 AM"
  totalPrice: number;
  totalDuration: string;
  customer: CustomerDetails;
  status: BookingStatus;
  paymentMethod: 'pay_at_appointment';
  createdAt: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
  reason?: string;
}

export interface NotificationLog {
  id: string;
  timestamp: string;
  type: 'email' | 'sms' | 'owner_alert';
  recipient: string;
  subject: string;
  status: 'queued' | 'simulated';
  preview: string;
}
