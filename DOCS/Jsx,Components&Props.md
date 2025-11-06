
# Introduction to ReactJS, JSX, Components & Props

## What You'll Learn
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