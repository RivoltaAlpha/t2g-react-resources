// ============== USER TYPES ==============
export interface RUser {
  name: string;
  phone: string;
  email: string;
  password: string;
  role: string;
}

export interface User {
  name: string;
  phone: string;
  email: string;
  password: string;
  role: string;
}

export interface Luser {
  password: string;
  role: string;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  role?: string;
}

export interface LoginResponse {
  foundUser: {
    user_id: number;
    email: string;
    password: string;
    role: string;
  };
  accessToken: string;
  refreshToken: string;
  isAuthenticated: boolean;
}

export type TUser = {
  user_id: number;
  name: string;
  email: string;
  phone: string;
  password: string;
  hashedRefreshToken?: string;
  role: string;
  created_at: string;
  updated_at: string;
  token?: string;
};

export interface TIUser {
  user_id: number;
  name: string;
  email: string;
  phone: string;
}

export interface UserAuthenticatedState {
    user:{
        user_id: number
        name: string
        email: string
        phone: string
        role: string
    } | null
    token: string | null
    isAuthenticated: boolean
    loading: boolean
    error: string | null
  }
  
  export interface UserState {
    user: TUser | null;
    loading: boolean;
    error: string | null;
  }

// ============== EVENT TYPES ==============
export interface Event {
  event_id: number;
  event_name: string;
  event_date: string;
  event_location: string;
  event_description: string;
  created_at: string;
  updated_at: string;
  created_by: number;
}

export interface CreateEvent {
  event_name: string;
  event_date: string;
  event_location: string;
  event_description: string;
  created_by: number;
}

export interface UpdateEvent {
  event_name?: string;
  event_date?: string;
  event_location?: string;
  event_description?: string;
}

// ============== REGISTRATION TYPES ==============
export interface Registration {
  registration_id: number;
  registration_date: string;
  payment_status: 'pending' | 'completed' | 'failed';
  payment_amount: number;
  created_at: string;
  updated_at: string;
  event_id: number;
  user_id: number;
}

export interface CreateRegistration {
  registration_date: string;
  payment_status: 'pending' | 'completed' | 'failed';
  payment_amount: number;
  event_id: number;
  user_id: number;
}

export interface UpdateRegistration {
  registration_date?: string;
  payment_status?: 'pending' | 'completed' | 'failed';
  payment_amount?: number;
}

// ============== PAYMENT TYPES ==============
export interface Payment {
  payment_id: number;
  payment_date: string;
  payment_status: 'pending' | 'completed' | 'failed';
  amount: number;
  payment_method: string;
  created_at: string;
  updated_at: string;
  registration_id: number;
}

export interface CreatePayment {
  payment_date: string;
  payment_status: 'pending' | 'completed' | 'failed';
  amount: number;
  payment_method: string;
  registration_id: number;
}

export interface UpdatePayment {
  payment_date?: string;
  payment_status?: 'pending' | 'completed' | 'failed';
  amount?: number;
  payment_method?: string;
}

// ============== FEEDBACK TYPES ==============
export interface Feedback {
  feedback_id: number;
  rating: number;
  comments: string;
  created_at: string;
  updated_at: string;
  user_id: number;
  event_id: number;
}

export interface CreateFeedback {
  rating: number;
  comments: string;
  user_id: number;
  event_id: number;
}

export interface UpdateFeedback {
  rating?: number;
  comments?: string;
}

// ============== COMBINED TYPES FOR VIEWS ==============
export interface EventWithDetails extends Event {
  registrations?: Registration[];
  feedbacks?: Feedback[];
  creator?: TUser;
}

export interface RegistrationWithDetails extends Registration {
  event?: Event;
  user?: TUser;
  payment?: Payment;
}

export interface UserWithEvents extends TUser {
  created_events?: Event[];
  registrations?: Registration[];
  feedbacks?: Feedback[];
}
