# State Management & Rendering Lists

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
