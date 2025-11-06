export interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  attendees: number;
  status: 'upcoming' | 'ongoing' | 'completed';
}

export interface User {
  id: number;
  name: string;
  email: string;
  role?: string;
  eventsAttended?: number;
}