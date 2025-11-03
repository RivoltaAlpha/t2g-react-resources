# Event Management System - React Learning Guide

A comprehensive guide to building an event management system while learning React fundamentals, from basic components to state management.

---

## 📅 Monday: Introduction to ReactJS, JSX, Components & Props

### What You'll Learn
- React fundamentals and JSX syntax
- Creating functional components
- Understanding and using props
- Component composition

### Concepts

#### JSX (JavaScript XML)
JSX allows you to write HTML-like code in JavaScript. It gets compiled to regular JavaScript.

```jsx
// JSX Example
const element = <h1>Hello, React!</h1>;

// JSX with expressions
const name = "Event Manager";
const greeting = <h1>Welcome to {name}</h1>;
```

#### Functional Components
Components are reusable pieces of UI. They accept props and return JSX.

```jsx
// Basic Component
function EventCard() {
  return (
    <div>
      <h2>Tech Conference 2024</h2>
      <p>Join us for an amazing tech event!</p>
    </div>
  );
}
```

#### Props (Properties)
Props allow you to pass data from parent to child components.

```jsx
// Component with Props
function EventCard({ eventName, eventDate, location }) {
  return (
    <div>
      <h2>{eventName}</h2>
      <p>Date: {eventDate}</p>
      <p>Location: {location}</p>
    </div>
  );
}

// Using the component
<EventCard 
  eventName="Tech Conference 2024"
  eventDate="2024-12-15"
  location="Nairobi, Kenya"
/>
```

### Practice Exercise: Event Management Components

Create the following components for your event management system:

1. **EventCard Component**
```jsx
function EventCard({ event }) {
  return (
    <div>
      <h3>{event.event_name}</h3>
      <p>{event.event_description}</p>
      <span>{event.event_date}</span>
      <span>{event.event_location}</span>
    </div>
  );
}
```

2. **UserProfile Component**
```jsx
function UserProfile({ user }) {
  return (
    <div>
      <h4>{user.name}</h4>
      <p>{user.email}</p>
      <span>Role: {user.role}</span>
    </div>
  );
}
```

3. **FeedbackCard Component**
```jsx
function FeedbackCard({ feedback }) {
  return (
    <div>
      <div>Rating: {feedback.rating}/5</div>
      <p>{feedback.comments}</p>
    </div>
  );
}
```

### Key Takeaways
- JSX combines HTML and JavaScript
- Components are reusable building blocks
- Props pass data from parent to child (one-way data flow)
- Props are read-only (immutable)

---

## 🎨 Tuesday: Styling Components & Creating Layouts

### What You'll Learn
- Using Tailwind CSS utility classes
- Creating responsive layouts
- Styling components effectively
- Building a cohesive design system

### Tailwind CSS Basics

#### Utility Classes
Tailwind provides pre-built CSS classes for styling.

```jsx
// Background and Text Colors
<div className="bg-blue-500 text-white">Colored Box</div>

// Padding and Margin
<div className="p-4 m-2">Spaced Content</div>

// Flexbox
<div className="flex items-center justify-between">
  <span>Left</span>
  <span>Right</span>
</div>
```

#### Common Tailwind Patterns

**Spacing:**
- `p-4` (padding), `m-4` (margin)
- `px-4` (horizontal padding), `py-4` (vertical padding)
- `mt-4` (margin-top), `mb-4` (margin-bottom)

**Colors:**
- `bg-blue-500`, `text-gray-700`
- `hover:bg-blue-600`, `focus:ring-2`

**Layout:**
- `flex`, `grid`, `block`, `inline-block`
- `items-center`, `justify-center`
- `gap-4`, `space-x-4`, `space-y-4`

**Borders & Shadows:**
- `border`, `border-2`, `border-gray-300`
- `rounded`, `rounded-lg`, `rounded-full`
- `shadow`, `shadow-md`, `shadow-lg`

### Practice Exercise: Styled Event Management UI

1. **Styled EventCard Component**
```jsx
function EventCard({ event }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-2xl font-bold text-gray-800 mb-2">
        {event.event_name}
      </h3>
      <p className="text-gray-600 mb-4">
        {event.event_description}
      </p>
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span className="flex items-center gap-2">
          📅 {event.event_date}
        </span>
        <span className="flex items-center gap-2">
          📍 {event.event_location}
        </span>
      </div>
    </div>
  );
}
```

2. **EventList Layout**
```jsx
function EventList({ events }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Upcoming Events
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(event => (
          <EventCard key={event.event_id} event={event} />
        ))}
      </div>
    </div>
  );
}
```

3. **Registration Form Layout**
```jsx
function RegistrationForm() {
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold mb-6">Event Registration</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input 
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors">
          Register
        </button>
      </form>
    </div>
  );
}
```

### Responsive Design
```jsx
// Mobile-first responsive design
<div className="text-sm md:text-base lg:text-lg">
  Responsive Text
</div>

// Responsive grid
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  {/* Cards */}
</div>
```

### Key Takeaways
- Tailwind uses utility-first approach
- Combine multiple classes for complex styling
- Use responsive prefixes (sm:, md:, lg:) for different screen sizes
- Hover and focus states improve user experience

---

## 🔄 Wednesday: State Management & Rendering Lists

### What You'll Learn
- Managing component state with `useState`
- Complex state with `useReducer`
- Rendering lists with `.map()`
- Understanding keys in React lists

### useState Hook

`useState` allows you to add state to functional components.

```jsx
import { useState } from 'react';

function Counter() {
  // [stateValue, setterFunction] = useState(initialValue)
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

#### State with Objects
```jsx
function EventForm() {
  const [formData, setFormData] = useState({
    event_name: '',
    event_date: '',
    event_location: '',
    event_description: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <input 
      name="event_name"
      value={formData.event_name}
      onChange={handleChange}
    />
  );
}
```

### Rendering Lists with .map()

```jsx
function EventList() {
  const events = [
    { event_id: 1, event_name: 'Tech Conference', event_location: 'Nairobi' },
    { event_id: 2, event_name: 'Design Workshop', event_location: 'Mombasa' },
    { event_id: 3, event_name: 'Startup Meetup', event_location: 'Kisumu' }
  ];

  return (
    <div>
      {events.map(event => (
        <EventCard key={event.event_id} event={event} />
      ))}
    </div>
  );
}
```

### Understanding Keys

Keys help React identify which items have changed, been added, or removed.

```jsx
// ✅ Good - using unique ID
{events.map(event => (
  <EventCard key={event.event_id} event={event} />
))}

// ❌ Bad - using index (avoid unless list never changes)
{events.map((event, index) => (
  <EventCard key={index} event={event} />
))}
```

### useReducer Hook

For complex state logic, `useReducer` is more suitable than `useState`.

```jsx
import { useReducer } from 'react';

// Reducer function
function registrationReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        [action.field]: action.value
      };
    case 'SET_STATUS':
      return {
        ...state,
        payment_status: action.status
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

// Initial state
const initialState = {
  registration_date: '',
  payment_status: 'pending',
  payment_amount: 0,
  event_id: null,
  user_id: null
};

// Component using useReducer
function RegistrationManager() {
  const [state, dispatch] = useReducer(registrationReducer, initialState);

  const handleFieldChange = (field, value) => {
    dispatch({ type: 'SET_FIELD', field, value });
  };

  const handleStatusChange = (status) => {
    dispatch({ type: 'SET_STATUS', status });
  };

  return (
    <div>
      <input 
        value={state.payment_amount}
        onChange={(e) => handleFieldChange('payment_amount', e.target.value)}
      />
      <select 
        value={state.payment_status}
        onChange={(e) => handleStatusChange(e.target.value)}
      >
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
        <option value="failed">Failed</option>
      </select>
    </div>
  );
}
```

### Practice Exercise: Event Management with State

```jsx
function EventManagement() {
  // State for events list
  const [events, setEvents] = useState([]);
  
  // State for new event form
  const [newEvent, setNewEvent] = useState({
    event_name: '',
    event_date: '',
    event_location: '',
    event_description: ''
  });

  // Add new event
  const handleAddEvent = () => {
    setEvents([...events, { 
      ...newEvent, 
      event_id: Date.now(),
      created_at: new Date().toISOString()
    }]);
    // Reset form
    setNewEvent({
      event_name: '',
      event_date: '',
      event_location: '',
      event_description: ''
    });
  };

  // Delete event
  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter(e => e.event_id !== eventId));
  };

  return (
    <div>
      {/* Form to add events */}
      <div>
        <input 
          placeholder="Event Name"
          value={newEvent.event_name}
          onChange={(e) => setNewEvent({...newEvent, event_name: e.target.value})}
        />
        <button onClick={handleAddEvent}>Add Event</button>
      </div>

      {/* List of events */}
      <div>
        {events.map(event => (
          <div key={event.event_id}>
            <EventCard event={event} />
            <button onClick={() => handleDeleteEvent(event.event_id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Key Takeaways
- `useState` for simple state, `useReducer` for complex state logic
- Always use `.map()` to render lists
- Keys must be unique and stable
- Never mutate state directly - always create new objects/arrays

---

## 🎯 Thursday: Event Handling & Advanced State Hooks

### What You'll Learn
- Handling events in React
- Form submission and validation
- Advanced `useState` patterns
- Advanced `useReducer` patterns
- Combining multiple state management techniques

### Event Handling in React

React events are named using camelCase and passed as functions.

```jsx
function EventButton() {
  const handleClick = (e) => {
    e.preventDefault(); // Prevent default behavior
    console.log('Button clicked!');
  };

  return <button onClick={handleClick}>Click Me</button>;
}
```

### Common Event Handlers

```jsx
function EventHandlers() {
  // Click events
  const handleClick = () => console.log('Clicked');
  
  // Change events (inputs)
  const handleChange = (e) => console.log(e.target.value);
  
  // Submit events (forms)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
  };
  
  // Mouse events
  const handleMouseEnter = () => console.log('Mouse entered');
  const handleMouseLeave = () => console.log('Mouse left');

  return (
    <div>
      <button onClick={handleClick}>Click</button>
      <input onChange={handleChange} />
      <form onSubmit={handleSubmit}>
        <button type="submit">Submit</button>
      </form>
      <div 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        Hover me
      </div>
    </div>
  );
}
```

### Form Handling with State

```jsx
function RegistrationForm() {
  const [formData, setFormData] = useState({
    registration_date: '',
    payment_status: 'pending',
    payment_amount: '',
    event_id: '',
    user_id: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form
  const validate = () => {
    const newErrors = {};
    
    if (!formData.payment_amount) {
      newErrors.payment_amount = 'Payment amount is required';
    } else if (formData.payment_amount <= 0) {
      newErrors.payment_amount = 'Amount must be positive';
    }
    
    if (!formData.event_id) {
      newErrors.event_id = 'Please select an event';
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validate();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Registration submitted:', formData);
      setIsSubmitting(false);
      // Reset form
      setFormData({
        registration_date: '',
        payment_status: 'pending',
        payment_amount: '',
        event_id: '',
        user_id: ''
      });
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>Payment Amount</label>
        <input
          type="number"
          name="payment_amount"
          value={formData.payment_amount}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        {errors.payment_amount && (
          <p className="text-red-500 text-sm">{errors.payment_amount}</p>
        )}
      </div>

      <div>
        <label>Payment Status</label>
        <select
          name="payment_status"
          value={formData.payment_status}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Registration'}
      </button>
    </form>
  );
}
```

### Advanced useReducer Pattern

```jsx
// Complex event management with useReducer
const initialState = {
  events: [],
  registrations: [],
  feedbacks: [],
  selectedEvent: null,
  filters: {
    status: 'all',
    location: 'all'
  },
  loading: false,
  error: null
};

function eventManagementReducer(state, action) {
  switch (action.type) {
    case 'ADD_EVENT':
      return {
        ...state,
        events: [...state.events, action.payload]
      };
    
    case 'UPDATE_EVENT':
      return {
        ...state,
        events: state.events.map(event =>
          event.event_id === action.payload.event_id
            ? { ...event, ...action.payload.updates }
            : event
        )
      };
    
    case 'DELETE_EVENT':
      return {
        ...state,
        events: state.events.filter(e => e.event_id !== action.payload)
      };
    
    case 'SET_SELECTED_EVENT':
      return {
        ...state,
        selectedEvent: action.payload
      };
    
    case 'ADD_REGISTRATION':
      return {
        ...state,
        registrations: [...state.registrations, action.payload]
      };
    
    case 'UPDATE_REGISTRATION_STATUS':
      return {
        ...state,
        registrations: state.registrations.map(reg =>
          reg.registration_id === action.payload.id
            ? { ...reg, payment_status: action.payload.status }
            : reg
        )
      };
    
    case 'ADD_FEEDBACK':
      return {
        ...state,
        feedbacks: [...state.feedbacks, action.payload]
      };
    
    case 'SET_FILTER':
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload.filter]: action.payload.value
        }
      };
    
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    
    default:
      return state;
  }
}

function CompleteEventManagement() {
  const [state, dispatch] = useReducer(eventManagementReducer, initialState);

  // Event handlers
  const handleAddEvent = (eventData) => {
    dispatch({
      type: 'ADD_EVENT',
      payload: {
        ...eventData,
        event_id: Date.now(),
        created_at: new Date().toISOString()
      }
    });
  };

  const handleDeleteEvent = (eventId) => {
    dispatch({ type: 'DELETE_EVENT', payload: eventId });
  };

  const handleSelectEvent = (event) => {
    dispatch({ type: 'SET_SELECTED_EVENT', payload: event });
  };

  const handleAddRegistration = (registrationData) => {
    dispatch({
      type: 'ADD_REGISTRATION',
      payload: {
        ...registrationData,
        registration_id: Date.now(),
        created_at: new Date().toISOString()
      }
    });
  };

  const handleUpdateRegistrationStatus = (id, status) => {
    dispatch({
      type: 'UPDATE_REGISTRATION_STATUS',
      payload: { id, status }
    });
  };

  const handleFilterChange = (filter, value) => {
    dispatch({
      type: 'SET_FILTER',
      payload: { filter, value }
    });
  };

  // Filtered events based on current filters
  const filteredEvents = state.events.filter(event => {
    if (state.filters.location !== 'all' && 
        event.event_location !== state.filters.location) {
      return false;
    }
    return true;
  });

  return (
    <div className="container mx-auto p-4">
      {/* Event filters */}
      <div className="mb-4">
        <select 
          value={state.filters.location}
          onChange={(e) => handleFilterChange('location', e.target.value)}
        >
          <option value="all">All Locations</option>
          <option value="Nairobi">Nairobi</option>
          <option value="Mombasa">Mombasa</option>
        </select>
      </div>

      {/* Events list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEvents.map(event => (
          <div 
            key={event.event_id}
            onClick={() => handleSelectEvent(event)}
            className="cursor-pointer"
          >
            <EventCard event={event} />
            <button onClick={(e) => {
              e.stopPropagation();
              handleDeleteEvent(event.event_id);
            }}>
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Selected event details */}
      {state.selectedEvent && (
        <div className="mt-8 p-4 border rounded">
          <h2>Selected Event: {state.selectedEvent.event_name}</h2>
          {/* Registration form for selected event */}
        </div>
      )}
    </div>
  );
}
```

### Combining Multiple useState Hooks

```jsx
function FeedbackSystem() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newFeedback = {
      feedback_id: Date.now(),
      rating,
      comments: comment,
      created_at: new Date().toISOString()
    };

    setTimeout(() => {
      setFeedbacks([...feedbacks, newFeedback]);
      setRating(5);
      setComment('');
      setIsSubmitting(false);
      setShowSuccess(true);
      
      setTimeout(() => setShowSuccess(false), 3000);
    }, 500);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Rating: {rating}/5</label>
          <input
            type="range"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          />
        </div>

        <div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Your feedback..."
          />
        </div>

        <button type="submit" disabled={isSubmitting || !comment}>
          {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </form>

      {showSuccess && (
        <div className="bg-green-100 p-4 rounded">
          Feedback submitted successfully!
        </div>
      )}

      <div className="mt-8">
        <h3>All Feedback ({feedbacks.length})</h3>
        {feedbacks.map(feedback => (
          <FeedbackCard key={feedback.feedback_id} feedback={feedback} />
        ))}
      </div>
    </div>
  );
}
```

### Key Takeaways
- Always use `e.preventDefault()` for form submissions
- Event handlers receive the event object as first parameter
- Validate form data before submission
- Use multiple state hooks for different concerns
- `useReducer` is better for complex, interconnected state
- Provide user feedback (loading states, success messages, errors)

---

## 🎓 Complete Project Structure

```
event-management-system/
├── src/
│   ├── components/
│   │   ├── EventCard.jsx
│   │   ├── EventList.jsx
│   │   ├── EventForm.jsx
│   │   ├── RegistrationForm.jsx
│   │   ├── FeedbackCard.jsx
│   │   ├── FeedbackList.jsx
│   │   └── UserProfile.jsx
│   ├── App.jsx
│   └── main.jsx
└── package.json
```

## 🚀 Next Steps

After completing this week's content, you'll have:
- Built reusable React components
- Styled a modern UI with Tailwind CSS
- Managed state effectively with hooks
- Handled user interactions and events
- Created a functional event management system

Continue practicing by:
1. Adding more features (search, filtering, sorting)
2. Implementing user authentication
3. Connecting to a backend API
4. Adding form validation libraries
5. Implementing routing between pages

---

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [JavaScript Array Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [React Hooks Reference](https://react.dev/reference/react)

Happy coding! 🎉