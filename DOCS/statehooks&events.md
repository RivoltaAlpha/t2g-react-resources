
# 🎯 Thursday: Event Handling & Advanced State Hooks

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
