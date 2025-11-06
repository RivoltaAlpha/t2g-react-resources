import { useState, type ChangeEvent, type FormEvent } from 'react';
import { EventCard } from './components/EventCard';
import type { User } from './types/types';
import type { Event } from './types/types';
import { UserCard } from './components/UserCard';
import './App.css'

const initialEvents: Event[] = [
  { id: 1, title: "React Workshop", date: "2024-12-15", location: "Tech Hub", attendees: 25, status: "upcoming" },
  { id: 2, title: "TypeScript Masterclass", date: "2024-12-20", location: "Online", attendees: 50, status: "upcoming" },
  { id: 3, title: "Web Dev Conference", date: "2024-11-01", location: "Convention Center", attendees: 200, status: "completed" },
  { id: 4, title: "UI/UX Meetup", date: "2024-12-05", location: "Design Studio", attendees: 30, status: "ongoing" },
  { id: 5, title: "JavaScript Bootcamp", date: "2024-10-25", location: "Code Academy", attendees: 40, status: "completed" },
  { id: 6, title: "Frontend Frameworks", date: "2024-12-10", location: "Tech Park", attendees: 60, status: "upcoming" }
];

const initialUsers: User[] = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Developer", eventsAttended: 5 },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Designer", eventsAttended: 3 },
  { id: 3, name: "Carol White", email: "carol@example.com", role: "Manager", eventsAttended: 8 },
  { id: 4, name: "David Brown", email: "david@example.com", role: "Developer", eventsAttended: 2 },
  { id: 5, name: "Eva Green", email: "eva@example.com", role: "Designer", eventsAttended: 4 },
  { id: 6, name: "Frank Black", email: "frank@example.com", role: "Manager", eventsAttended: 6 }
];

// Main App Component
export default function App() {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [activeTab, setActiveTab] = useState<'events' | 'users'>('users');

  // Event: Input change handler
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Event: Form submission
  const handleAddEvent = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newEvent: Event = {
      id: Date.now(),
      title: formData.get('title') as string,
      date: formData.get('date') as string,
      location: formData.get('location') as string,
      attendees: Number(formData.get('attendees')),
      status: 'upcoming'
    };
    /// [1.2.3.4] Add new event to state
    setEvents([...events, newEvent]);
    /// [1.2.3.4.5] Reset form = new events array
    e.currentTarget.reset();
  };

  // Event: Delete handler
  const handleDeleteEvent = (id: number) => {
    setEvents(events.filter(e => e.id !== id));
  };
  // [2.3.4.5] Remove event from state

  // Event: Edit handler
  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
  };

  // Event: Save edit
  const handleSaveEdit = () => {
    if (editingEvent) {
      setEvents(events.map(e => e.id === editingEvent.id ? editingEvent : e));
      setEditingEvent(null);
    }
  };

  // Event: User selection
  const handleUserSelect = (userId: number) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  // Event: Keyboard handler
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setSearchTerm('');
    }
  };

  // Filter events based on search
  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Event Management System</h1>
        <p className="text-gray-600 mb-8">React Event Handling with TypeScript</p>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('events')}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              activeTab === 'events'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Events
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              activeTab === 'users'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Users ({selectedUsers.length} selected)
          </button>
        </div>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search events... (Press ESC to clear)"
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          className="w-full p-3 border rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {activeTab === 'events' ? (
          <>
            {/* Add Event Form */}
            <form onSubmit={handleAddEvent} className="bg-white p-6 rounded-lg shadow mb-6">
              <h2 className="text-xl font-semibold mb-4">Add New Event</h2>
              <div className="grid grid-cols-2 gap-4">
                <input
                  name="title"
                  placeholder="Event Title"
                  required
                  className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  name="date"
                  type="date"
                  required
                  className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  name="location"
                  placeholder="Location"
                  required
                  className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  name="attendees"
                  type="number"
                  placeholder="Attendees"
                  required
                  className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="mt-4 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Add Event
              </button>
            </form>

            {/* Edit Modal */}
            {editingEvent && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg p-6 max-w-md w-full">
                  <h2 className="text-xl font-semibold mb-4">Edit Event</h2>
                  <input
                    value={editingEvent.title}
                    onChange={(e) => setEditingEvent({...editingEvent, title: e.target.value})}
                    className="w-full p-2 border rounded mb-3"
                  />
                  <input
                    type="date"
                    value={editingEvent.date}
                    onChange={(e) => setEditingEvent({...editingEvent, date: e.target.value})}
                    className="w-full p-2 border rounded mb-3"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveEdit}
                      className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingEvent(null)}
                      className="flex-1 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Events Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map(event => (
                <EventCard
                  key={event.id} // mapping key
                  event={event} // data prop
                  onDelete={handleDeleteEvent} // delete handler
                  onEdit={handleEditEvent} // edit handler passed as a functional prop
                  onStatusChange={(id, status) => {
                    setEvents(events.map(e => e.id === id ? {...e, status} : e));
                  }}
                />
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Users Grid */}
            <div className="mb-4 text-sm text-gray-600">
              Click to select, double-click to see email
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map(user => (
                <UserCard
                  key={user.id}
                  user={user}
                  onSelect={handleUserSelect}
                  isSelected={selectedUsers.includes(user.id)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
