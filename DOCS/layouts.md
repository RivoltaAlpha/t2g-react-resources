# Styling Components & Creating Layouts

## What You'll Learn
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
