import { useEffect, useReducer} from 'react';
import { Calendar, MapPin, Users, DollarSign, AlertCircle, Loader2 } from 'lucide-react';

interface Event {
  event_id: number;
  event_name: string;
  event_date: string;
  event_location: string;
  event_description: string;
  created_by: number;
}

interface Registration {
  registration_id: number;
  registration_date: string;
  payment_status: string;
  payment_amount: number;
  user_id: number;
  event_id: number;
}

interface User {
  user_id: number;
  name: string;
  email: string;
}

interface State {
  events: Event[];
  registrations: Registration[];
  users: User[];
  loading: boolean;
  error: string | null;
}

// Define action types for useReducer
type Action =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_EVENTS_SUCCESS'; payload: Event[] }
  | { type: 'FETCH_REGISTRATIONS_SUCCESS'; payload: Registration[] }
  | { type: 'FETCH_USERS_SUCCESS'; payload: User[] }
  | { type: 'FETCH_ERROR'; payload: string };

// Initial state
const initialState: State = {
  events: [],
  registrations: [],
  users: [],
  loading: false,
  error: null,
};

// Reducer function - manages state transitions
function dataReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    
    case 'FETCH_EVENTS_SUCCESS':
      return { ...state, events: action.payload };
    
    case 'FETCH_REGISTRATIONS_SUCCESS':
      return { ...state, registrations: action.payload };
    
    case 'FETCH_USERS_SUCCESS':
      return { ...state, users: action.payload, loading: false };
    
    case 'FETCH_ERROR':
      return { ...state, error: action.payload, loading: false };
    
    default:
      return state;
  }
}

// Mock API functions you would replace these with your actual backend calls
const mockAPI = {
  fetchEvents: async (): Promise<Event[]> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return [
      {
        event_id: 1,
        event_name: "React Conference 2025",
        event_date: "2025-12-15",
        event_location: "San Francisco, CA",
        event_description: "Annual React developers conference",
        created_by: 1
      },
      {
        event_id: 2,
        event_name: "TypeScript Workshop",
        event_date: "2025-11-20",
        event_location: "Online",
        event_description: "Advanced TypeScript patterns and best practices",
        created_by: 2
      },
      {
        event_id: 3,
        event_name: "Web Dev Bootcamp",
        event_date: "2025-11-25",
        event_location: "New York, NY",
        event_description: "Intensive 3-day web development bootcamp",
        created_by: 1
      }
    ];
  },
  
  fetchRegistrations: async (): Promise<Registration[]> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return [
      { registration_id: 1, registration_date: "2025-11-01", payment_status: "completed", payment_amount: 299, user_id: 1, event_id: 1 },
      { registration_id: 2, registration_date: "2025-11-02", payment_status: "pending", payment_amount: 199, user_id: 2, event_id: 2 },
      { registration_id: 3, registration_date: "2025-11-03", payment_status: "completed", payment_amount: 499, user_id: 3, event_id: 3 },
      { registration_id: 4, registration_date: "2025-11-04", payment_status: "completed", payment_amount: 299, user_id: 3, event_id: 1 }
    ];
  },
  
  fetchUsers: async (): Promise<User[]> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return [
      { user_id: 1, name: "Alice Johnson", email: "alice@example.com" },
      { user_id: 2, name: "Bob Smith", email: "bob@example.com" },
      { user_id: 3, name: "Carol Williams", email: "carol@example.com" }
    ];
  }
};

export default function EventsDashboard() {
  // useReducer hook - manages complex state logic
  const [state, dispatch] = useReducer(dataReducer, initialState);
  
  // useEffect hook - handles side effects (data fetching)
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_START' });
      
      try {
        // Fetch all data in parallel
        const [events, registrations, users] = await Promise.all([
          mockAPI.fetchEvents(),
          mockAPI.fetchRegistrations(),
          mockAPI.fetchUsers()
        ]);
        
        // Dispatch success actions
        dispatch({ type: 'FETCH_EVENTS_SUCCESS', payload: events });
        dispatch({ type: 'FETCH_REGISTRATIONS_SUCCESS', payload: registrations });
        dispatch({ type: 'FETCH_USERS_SUCCESS', payload: users });
        
      } catch (error) {
        dispatch({ 
          type: 'FETCH_ERROR', 
          payload: error instanceof Error ? error.message : 'An error occurred' 
        });
      }
    };
    
    fetchData();
    
    // Empty dependency array means this runs once on mount
  }, []);
  
  // Derived data - calculate statistics
  const stats = {
    totalEvents: state.events.length,
    totalRegistrations: state.registrations.length,
    totalRevenue: state.registrations
      .filter(r => r.payment_status === 'completed')
      .reduce((sum, r) => sum + r.payment_amount, 0),
    pendingPayments: state.registrations.filter(r => r.payment_status === 'pending').length
  };
  
  // Helper function to get user name by ID
  const getUserName = (userId: number): string => {
    const user = state.users.find(u => u.user_id === userId);
    return user ? user.name : 'Unknown User';
  };
  
  // Helper function to get event registrations count
  const getEventRegistrations = (eventId: number): number => {
    return state.registrations.filter(r => r.event_id === eventId).length;
  };

  if (state.loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-indigo-600 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading events data...</p>
        </div>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-red-50 to-pink-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-800 mb-2 text-center">Error Loading Data</h2>
          <p className="text-gray-600 text-center">{state.error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Events Dashboard</h1>
          <p className="text-gray-600">useEffect & useReducer Tutorial Example</p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Events</p>
                <p className="text-3xl font-bold text-indigo-600">{stats.totalEvents}</p>
              </div>
              <Calendar className="w-12 h-12 text-indigo-200" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Registrations</p>
                <p className="text-3xl font-bold text-green-600">{stats.totalRegistrations}</p>
              </div>
              <Users className="w-12 h-12 text-green-200" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Revenue</p>
                <p className="text-3xl font-bold text-blue-600">${stats.totalRevenue}</p>
              </div>
              <DollarSign className="w-12 h-12 text-blue-200" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Pending Payments</p>
                <p className="text-3xl font-bold text-orange-600">{stats.pendingPayments}</p>
              </div>
              <AlertCircle className="w-12 h-12 text-orange-200" />
            </div>
          </div>
        </div>
        
        
        {/* Events List */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Upcoming Events</h2>
          <div className="space-y-4">
            {state.events.map(event => (
              <div 
                key={event.event_id} 
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">{event.event_name}</h3>
                  <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                    {getEventRegistrations(event.event_id)} registered
                  </span>
                </div>
                <p className="text-gray-600 mb-3">{event.event_description}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(event.event_date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{event.event_location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>Created by {getUserName(event.created_by)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Recent Registrations */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Registrations</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">User</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Event</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {state.registrations.map(reg => {
                  const event = state.events.find(e => e.event_id === reg.event_id);
                  return (
                    <tr key={reg.registration_id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">{getUserName(reg.user_id)}</td>
                      <td className="py-3 px-4">{event?.event_name || 'Unknown Event'}</td>
                      <td className="py-3 px-4">{new Date(reg.registration_date).toLocaleDateString()}</td>
                      <td className="py-3 px-4 font-semibold">${reg.payment_amount}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          reg.payment_status === 'completed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-orange-100 text-orange-800'
                        }`}>
                          {reg.payment_status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}