export interface Booking {
  id: string;
  name: string;
  email: string;
  date: string;
  timeSlot: string;
  websiteUrl?: string;
  notes?: string;
  createdAt: string;
}

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}
