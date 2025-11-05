# Event Management System - React Lists Tutorial

## 📚 Learning Objectives

This project teaches you how to:
- Render lists in React using the `map()` function
- Use proper `key` props for list items
- Create reusable component cards
- Work with JSON data structures
- Pass props between components
- Handle relational data

---

## 🔑 Key Concepts Explained

### 1. Using `map()` to Render Lists

The `map()` function transforms an array into an array of React elements:

```javascript
{mockData.users.map((user) => (
  <UserCard key={user.user_id} user={user} />
))}
```

**Why map()?**
- Creates a new element for each item in the array
- Returns JSX that React can render
- Maintains immutability (doesn't modify original array)

### 2. The Importance of Keys

**Keys help React identify which items have changed, been added, or removed.**

```javascript
// ✅ GOOD - Using unique ID
<UserCard key={user.user_id} user={user} />

// ❌ BAD - Using array index (avoid when possible)
<UserCard key={index} user={user} />

// ❌ TERRIBLE - No key at all
<UserCard user={user} />
```

**Best Practices for Keys:**
- Use stable, unique identifiers (like database IDs)
- Don't use array indices if the list can be reordered or filtered
- Keys only need to be unique among siblings, not globally
- Keys should not change between renders

### 3. Component Props

Props allow parent components to pass data to children:

```javascript
// Parent passing props
<UserCard key={user.user_id} user={user} />

// Child receiving props
const UserCard = ({ user }) => {
  return <div>{user.name}</div>;
};
```

### 4. Working with Relational Data

The project demonstrates how to link related data:

```javascript
// Helper function to resolve foreign keys
const getUserName = (userId) => {
  const user = mockData.users.find(u => u.user_id === userId);
  return user ? user.name : 'Unknown';
};

// Using it in a component
<EventCard 
  event={event} 
  creatorName={getUserName(event.created_by)}
/>
```

---

## 🛠️ How Each Component Works

### UserCard Component
Displays individual user information with role-based styling.

**Key Features:**
- Avatar with initials
- Role badge (organizer vs attendee)
- Contact information
- Conditional styling based on role

### EventCard Component
Shows event details with visual hierarchy.

**Key Features:**
- Gradient header with icon
- Event metadata (date, location)
- Creator information via foreign key lookup
- Hover effects for interactivity

### RegistrationCard Component
Displays registration and payment information.

**Key Features:**
- Links user and event data
- Payment status indicators
- Conditional icons (completed/pending)
- Currency formatting

### FeedbackCard Component
Shows user reviews and ratings.

**Key Features:**
- Star rating visualization
- Dynamic star rendering using array mapping
- User and event relationship display
- Comment display

---

## 🎨 Styling Approach

The project uses **Tailwind CSS** utility classes:

```javascript
// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// Conditional styling
const statusColor = registration.payment_status === 'completed' 
  ? 'bg-green-100 text-green-800' 
  : 'bg-yellow-100 text-yellow-800';
```

---

## ❓ Common Mistakes to Avoid

### 1. Forgetting Keys
```javascript
// ❌ React will warn you
{users.map(user => <UserCard user={user} />)}

// ✅ Always include keys
{users.map(user => <UserCard key={user.user_id} user={user} />)}
```

### 2. Using Index as Key When List Changes
```javascript
// ❌ Bad if items can be reordered or deleted
{users.map((user, index) => <UserCard key={index} user={user} />)}

// ✅ Use unique IDs instead
{users.map(user => <UserCard key={user.user_id} user={user} />)}
```

### 3. Modifying State Directly
```javascript
// ❌ Never mutate state
mockData.users.push(newUser);

// ✅ Create new array
setUsers([...users, newUser]);
```

### 4. Not Handling Missing Data
```javascript
// ❌ Will crash if user doesn't exist
const userName = users.find(u => u.id === userId).name;

// ✅ Handle undefined case
const user = users.find(u => u.id === userId);
const userName = user ? user.name : 'Unknown';
```

---

## 🔍 Key Takeaways

1. **Map is Essential**: Use `map()` to transform arrays into React elements
2. **Keys are Required**: Always provide unique keys for list items
3. **Components are Reusable**: Create card components for consistent UI
4. **Props Flow Down**: Pass data from parent to child via props
5. **Data Relationships**: Use helper functions to resolve foreign keys
6. **Conditional Rendering**: Adapt UI based on data values

---

## 📖 Further Reading

- [React Lists and Keys Documentation](https://react.dev/learn/rendering-lists)
- [Understanding the map() Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [Component Composition in React](https://react.dev/learn/passing-props-to-a-component)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---`

## 🎓 Assignment Ideas

1. **Simple**: Display a list of your favorite books with title, author, and year
2. **Medium**: Create a todo list with add/delete functionality
3. **Complex**: Build a mini e-commerce product catalog with filtering and sorting

---
