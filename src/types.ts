export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface TimeSlot {
  id: string;
  time: string;
  isBooked: boolean;
}

export interface Reservation {
  id: string;
  date: string;
  timeSlotId: string;
  teamName: string;
  status: 'pending' | 'confirmed';
}
