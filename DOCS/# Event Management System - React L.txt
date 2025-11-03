# Event Management System - React Learning Guide

A comprehensive guide to learning React fundamentals by building an event management system with user registration, payments, and feedback functionality.

## Project Overview

This week-long tutorial will guide you through building a complete event management system that includes:
- Event creation and management
- User registration and authentication
- Payment processing
- Feedback collection
- User dashboard

## Database Schema

Based on your ERD, the system includes:
- **users**: User accounts with authentication
- **events**: Event details and management
- **registrations**: User event registrations
- **payments**: Payment tracking
- **feedbacks**: Event feedback and ratings

---

## 📅 Day 1: Monday - Introduction to React, JSX, Components & Props

### Learning Objectives
- Understand React fundamentals
- Learn JSX syntax
- Create functional components
- Work with props

### Topics Covered

#### 1. What is React?
React is a JavaScript library for building user interfaces using reusable components.

#### 2. JSX (JavaScript XML)
JSX allows you to write HTML-like code in JavaScript:
```jsx
const greeting = <h1>Hello, Event Manager!</h1>;
```

#### 3. Components
Components are the building blocks of React applications. They can be functional or class-based (we'll focus on functional).

```jsx
// Simple functional component
function EventCard() {
  return <div>Event Card</div>;
}
```

#### 4. Props (Properties)
Props allow you to pass data from parent to child components.

```jsx
function EventCard(props) {
  return (
    <div>
      <h3>{props.eventName}</h3>
      <p>{props.eventDate}</p>
    </div>
  );
}

// Usage
<EventCard eventName="React Workshop" eventDate="2024-11-05" />
```

### Practical Exercise

Create these components for your event management system:

1. **EventCard Component**
```jsx
function EventCard({ eventName, eventDate, eventLocation, description }) {
  return (
    <div>
      <h2>{eventName}</h2>
      <p>Date: {eventDate}</p>
      <p>Location: {eventLocation}</p>
      <p>{description}</p>
    </div>
  );
}
```

2. **UserProfile Component**
```jsx
function UserProfile({ name, email, role }) {
  return (
    <div>
      <h3>{name}</h3>
      <p>{email}</p>
      <span>{role}</span>
    </div>
  );
}
```

3. **RegistrationCard Component**
```jsx
function RegistrationCard({ eventName, registrationDate, paymentStatus }) {
  return (
    <div>
      <h4>{eventName}</h4>
      <p>Registered: {registrationDate}</p>
      <p>Payment: {paymentStatus}</p>
    </div>
  );
}
```

### Key Concepts to Remember
- Components must return a single parent element
- Props are read-only (immutable)
- Component names should start with a capital letter
- Use curly braces `{}` to embed JavaScript expressions in JSX

---

## 📅 Day 2: Tuesday - Styling with Tailwind & Creating Layouts

### Learning Objectives
- Set up Tailwind CSS in React
- Use Tailwind utility classes
- Create responsive layouts
- Build reusable styled components

### Topics Covered

#### 1. Tailwind CSS Setup
Tailwind is a utility-first CSS framework. In React projects:
```bash
npm install -D tailwindcss
npx tailwindcss init
```

#### 2. Tailwind Utility Classes
Instead of writing custom CSS, you use pre-defined classes:
```jsx
<div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
  Styled with Tailwind
</div>
```

#### 3. Common Tailwind Patterns
- **Spacing**: `p-4` (padding), `m-2` (margin), `space-y-4` (vertical spacing)
- **Colors**: `bg-blue-500`, `text-gray-700`, `border-red-300`
- **Flexbox**: `flex`, `flex-col`, `justify-center`, `items-center`
- **Grid**: `grid`, `grid-cols-3`, `gap-4`
- **Responsive**: `sm:`, `md:`, `lg:`, `xl:` prefixes

### Practical Exercise

Redesign your components with Tailwind:

1. **Styled EventCard**
```jsx
function EventCard({ eventName, eventDate, eventLocation, description }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{eventName}</h2>
      <div className="flex items-center text-gray-600 mb-2">
        <span className="mr-4">📅 {eventDate}</span>
        <span>📍 {eventLocation}</span>
      </div>
      <p className="text-gray-700 mb-4">{description}</p>
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Register Now
      </button>
    </div>
  );
}
```

2. **Event List Layout**
```jsx
function EventList() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Upcoming Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* EventCard components here */}
      </div>
    </div>
  );
}
```

3. **Navigation Bar**
```jsx
function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Event Manager</h1>
        <ul className="flex space-x-6">
          <li><a href="#" className="hover:text-blue-400">Events</a></li>
          <li><a href="#" className="hover:text-blue-400">My Registrations</a></li>
          <li><a href="#" className="hover:text-blue-400">Profile</a></li>
        </ul>
      </div>
    </nav>
  );
}
```

### Layout Patterns

**Dashboard Layout**
```jsx
function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex">
        <aside className="w-64 bg-white shadow-md p-6">
          {/* Sidebar content */}
        </aside>
        <main className="flex-1 p-8">
          {/* Main content */}
        </main>
      </div>
    </div>
  );
}
```

---

## 📅 Day 3: Wednesday - State Management & Rendering Lists

### Learning Objectives
- Understand local component state
- Use useState hook
- Use useReducer for complex state
- Render lists with map
- Understand keys in React

### Topics Covered

#### 1. useState Hook
`useState` allows you to add state to functional components.

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

#### 2. useState with Objects and Arrays
```jsx
function EventForm() {
  const [event, setEvent] = useState({
    name: '',
    date: '',
    location: ''
  });
  
  const updateField = (field, value) => {
    setEvent({ ...event, [field]: value });
  };
  
  return (
    <input 
      value={event.name}
      onChange={(e) => updateField('name', e.target.value)}
    />
  );
}
```

#### 3. useReducer Hook
For complex state logic, `useReducer` is more suitable.

```jsx
import { useReducer } from 'react';

const initialState = { events: [], loading: false };

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_EVENT':
      return { ...state, events: [...state.events, action.payload] };
    case 'DELETE_EVENT':
      return { 
        ...state, 
        events: state.events.filter(e => e.id !== action.payload) 
      };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}

function EventManager() {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  const addEvent = (event) => {
    dispatch({ type: 'ADD_EVENT', payload: event });
  };
  
  return <div>{/* component JSX */}</div>;
}
```

#### 4. Rendering Lists with map()
```jsx
function EventList({ events }) {
  return (
    <div>
      {events.map(event => (
        <EventCard 
          key={event.event_id}
          eventName={event.event_name}
          eventDate={event.event_date}
          eventLocation={event.event_location}
        />
      ))}
    </div>
  );
}
```

#### 5. Keys in React
Keys help React identify which items have changed, been added, or removed.

**Good**: `key={event.event_id}` (unique identifier)
**Bad**: `key={index}` (avoid using array index)

### Practical Exercise

Build a complete event management system:

```jsx
import { useState } from 'react';

function EventManagementSystem() {
  const [events, setEvents] = useState([
    {
      event_id: 1,
      event_name: 'React Workshop',
      event_date: '2024-11-10',
      event_location: 'Online',
      event_description: 'Learn React from scratch'
    },
    {
      event_id: 2,
      event_name: 'JavaScript Masterclass',
      event_date: '2024-11-15',
      event_location: 'Nairobi',
      event_description: 'Advanced JavaScript concepts'
    }
  ]);
  
  const [newEvent, setNewEvent] = useState({
    event_name: '',
    event_date: '',
    event_location: '',
    event_description: ''
  });
  
  const addEvent = () => {
    const event = {
      ...newEvent,
      event_id: Date.now()
    };
    setEvents([...events, event]);
    setNewEvent({ event_name: '', event_date: '', event_location: '', event_description: '' });
  };
  
  const deleteEvent = (id) => {
    setEvents(events.filter(e => e.event_id !== id));
  };
  
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Event Management</h1>
      
      {/* Event List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(event => (
          <div key={event.event_id} className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold">{event.event_name}</h3>
            <p>{event.event_date}</p>
            <p>{event.event_location}</p>
            <button 
              onClick={() => deleteEvent(event.event_id)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## 📅 Day 4: Thursday - Event Handling & State Hooks Deep Dive

### Learning Objectives
- Handle user interactions
- Work with forms
- Understand event handling in React
- Master useState and useReducer
- Build interactive features

### Topics Covered

#### 1. Event Handling Basics
React events are named using camelCase and pass functions as handlers.

```jsx
function Button() {
  const handleClick = () => {
    console.log('Button clicked!');
  };
  
  return <button onClick={handleClick}>Click Me</button>;
}
```

#### 2. Event Object
React wraps native browser events in SyntheticEvent.

```jsx
function Input() {
  const handleChange = (e) => {
    console.log(e.target.value);
  };
  
  return <input onChange={handleChange} />;
}
```

#### 3. Form Handling
```jsx
function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        className="border p-2 rounded w-full"
      />
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className="border p-2 rounded w-full"
      />
      <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded">
        Register
      </button>
    </form>
  );
}
```

#### 4. Conditional Rendering
```jsx
function EventCard({ event, isRegistered }) {
  return (
    <div>
      <h3>{event.event_name}</h3>
      {isRegistered ? (
        <span className="text-green-600">✓ Registered</span>
      ) : (
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Register
        </button>
      )}
    </div>
  );
}
```

### Practical Exercise: Complete Event Management System

Build a full-featured system with:
- Event creation
- User registration
- Payment tracking
- Feedback collection

```jsx
import { useReducer } from 'react';

// State management with useReducer
const initialState = {
  events: [],
  registrations: [],
  payments: [],
  feedbacks: [],
  currentUser: { user_id: 1, name: 'John Doe', email: 'john@example.com' }
};

function appReducer(state, action) {
  switch (action.type) {
    case 'ADD_EVENT':
      return { ...state, events: [...state.events, action.payload] };
    
    case 'REGISTER_EVENT':
      return { 
        ...state, 
        registrations: [...state.registrations, action.payload] 
      };
    
    case 'ADD_PAYMENT':
      return { 
        ...state, 
        payments: [...state.payments, action.payload] 
      };
    
    case 'ADD_FEEDBACK':
      return { 
        ...state, 
        feedbacks: [...state.feedbacks, action.payload] 
      };
    
    default:
      return state;
  }
}

function EventManagementApp() {
  const [state, dispatch] = useReducer(appReducer, initialState);
  
  const createEvent = (eventData) => {
    const event = {
      event_id: Date.now(),
      ...eventData,
      created_at: new Date().toISOString(),
      created_by: state.currentUser.user_id
    };
    dispatch({ type: 'ADD_EVENT', payload: event });
  };
  
  const registerForEvent = (eventId) => {
    const registration = {
      registration_id: Date.now(),
      event_id: eventId,
      user_id: state.currentUser.user_id,
      registration_date: new Date().toISOString(),
      payment_status: 'pending'
    };
    dispatch({ type: 'REGISTER_EVENT', payload: registration });
  };
  
  const submitPayment = (registrationId, amount) => {
    const payment = {
      payment_id: Date.now(),
      registration_id: registrationId,
      amount: amount,
      payment_date: new Date().toISOString(),
      payment_status: 'completed',
      payment_method: 'credit_card'
    };
    dispatch({ type: 'ADD_PAYMENT', payload: payment });
  };
  
  const submitFeedback = (eventId, rating, comments) => {
    const feedback = {
      feedback_id: Date.now(),
      event_id: eventId,
      user_id: state.currentUser.user_id,
      rating: rating,
      comments: comments,
      created_at: new Date().toISOString()
    };
    dispatch({ type: 'ADD_FEEDBACK', payload: feedback });
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Your app components */}
    </div>
  );
}
```

---

## 🎯 Final Project: Complete Event Management System

### Features to Implement

1. **Event Creation & Management**
   - Create new events
   - View all events
   - Edit/delete events
   - Filter events by date/location

2. **User Registration**
   - Register for events
   - View registration history
   - Cancel registrations

3. **Payment Processing**
   - Process payments
   - View payment history
   - Track payment status

4. **Feedback System**
   - Submit event feedback
   - Rate events (1-5 stars)
   - View all feedback

### Project Structure
```
src/
├── components/
│   ├── EventCard.jsx
│   ├── EventForm.jsx
│   ├── RegistrationList.jsx
│   ├── PaymentForm.jsx
│   ├── FeedbackForm.jsx
│   └── Navbar.jsx
├── App.jsx
└── index.css
```

---

## 📚 Additional Resources

- [React Official Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Hooks Reference](https://react.dev/reference/react)

## 🎓 Learning Tips

1. **Practice Daily**: Build small components every day
2. **Read Error Messages**: They often tell you exactly what's wrong
3. **Use Console.log**: Debug your state and props
4. **Component Thinking**: Break UI into small, reusable pieces
5. **State Management**: Start simple with useState, move to useReducer when needed

## ✅ Daily Checklist

- [ ] Day 1: Understand JSX and create basic components
- [ ] Day 2: Style components with Tailwind and create layouts
- [ ] Day 3: Implement state management and render lists
- [ ] Day 4: Add event handling and build interactive features
- [ ] Build complete event management system

---

**Happy Coding! 🚀**