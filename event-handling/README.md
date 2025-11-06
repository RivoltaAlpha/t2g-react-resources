# React Event Handling with TypeScript - Complete Guide

## 📚 Project Overview

This Event Management System demonstrates comprehensive event handling patterns in React with TypeScript. It showcases real-world scenarios using JSON data and reusable card components.

## 🎯 Learning Objectives

By studying this project, you'll understand:
- Typing event handlers in TypeScript
- Mouse events (click, double-click, hover)
- Keyboard events
- Input change events
- Event propagation and stopPropagation
- Passing event handlers as props
- Component composition with events

---

## 🏗️ Project Structure

### Components

1. **EventCard** - Displays event information with edit/delete actions
2. **UserCard** - Shows user profiles with selection capability
3. **App** - Main component managing state and orchestrating events

### Data Models (TypeScript Interfaces)

```typescript
interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  attendees: number;
  status: 'upcoming' | 'ongoing' | 'completed';
}

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  eventsAttended: number;
}
```

---

## 🔥 Event Handling Patterns Demonstrated

### 1. **onClick Events**

**Location:** Tab navigation, Add Event button, User selection

**Example:**
```typescript
<button
  onClick={() => setActiveTab('events')}
  className="px-6 py-2 rounded-lg"
>
  Events
</button>
```

**TypeScript Type:** `MouseEvent<HTMLButtonElement>`

**Key Concepts:**
- Simplest event handler
- Updates state on user interaction
- Can use inline arrow functions or named handlers

---

### 2. **onChange Events for Inputs**

**Location:** Search input, Add Event form inputs

**Example:**
```typescript
const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
  setSearchTerm(e.target.value);
};

<input
  type="text"
  value={searchTerm}
  onChange={handleSearchChange}
  placeholder="Search events..."
/>
```

**TypeScript Type:** `ChangeEvent<HTMLInputElement>`

**Key Concepts:**
- Controlled components pattern
- Accessing input values via `e.target.value`
- Real-time state updates

---

### 3. **onMouseEnter & onMouseLeave Events**

**Location:** EventCard hover effects

**Example:**
```typescript
const [isHovered, setIsHovered] = useState(false);

const handleMouseEnter = () => setIsHovered(true);
const handleMouseLeave = () => setIsHovered(false);

<div
  onMouseEnter={handleMouseEnter}
  onMouseLeave={handleMouseLeave}
  className={isHovered ? 'shadow-lg scale-105' : 'shadow'}
>
```

**Key Concepts:**
- Visual feedback on hover
- Used for enhanced UX
- No TypeScript event parameter needed for simple state toggles

---

### 4. **onDoubleClick Events**

**Location:** UserCard component

**Example:**
```typescript
const handleDoubleClick = () => {
  alert(`User Email: ${user.email}`);
};

<div onDoubleClick={handleDoubleClick}>
```

**Key Concepts:**
- Distinguishes between single and double clicks
- Useful for "quick actions"
- Both onClick and onDoubleClick can coexist

---

### 5. **onKeyDown Events**

**Location:** Search input (ESC to clear)

**Example:**
```typescript
const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'Escape') {
    setSearchTerm('');
  }
};

<input onKeyDown={handleKeyDown} />
```

**TypeScript Type:** `KeyboardEvent<HTMLInputElement>`

**Key Concepts:**
- Respond to specific keys
- Check `e.key` for key identification
- Common keys: 'Enter', 'Escape', 'ArrowUp', etc.

---

### 6. **Event Propagation with stopPropagation()**

**Location:** EventCard Edit/Delete buttons

**Example:**
```typescript
const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
  e.stopPropagation();
  if (confirm(`Delete "${event.title}"?`)) {
    onDelete(event.id);
  }
};

<button onClick={handleDelete}>Delete</button>
```

**Key Concepts:**
- Prevents event bubbling to parent elements
- Necessary when nested clickable elements exist
- Without it, both button and card click handlers would fire

---

### 7. **Passing Event Handlers as Props**

**Location:** EventCard and UserCard receive handlers from parent

**Example:**
```typescript
// In Parent Component
<EventCard
  event={event}
  onDelete={handleDeleteEvent}
  onEdit={handleEditEvent}
/>

// In EventCard Component
const EventCard: React.FC<{
  event: Event;
  onDelete: (id: number) => void;
  onEdit: (event: Event) => void;
}> = ({ event, onDelete, onEdit }) => {
  return (
    <button onClick={() => onDelete(event.id)}>Delete</button>
  );
};
```

**Key Concepts:**
- Lifts state management to parent
- Makes components reusable
- Type-safe prop definitions

---

## 📖 How to Study This Project

### Step 1: Understanding the Data Flow
1. Examine the initial JSON data (`initialEvents`, `initialUsers`)
2. Notice how it's loaded into state with `useState`
3. Track how state updates trigger re-renders

### Step 2: Follow Event Chains
Pick one feature and trace it completely:

**Example: Deleting an Event**
1. User clicks Delete button → triggers `handleDelete` in EventCard
2. `e.stopPropagation()` prevents card click
3. Confirmation dialog appears
4. `onDelete(event.id)` calls parent's `handleDeleteEvent`
5. Parent updates state: `setEvents(events.filter(e => e.id !== id))`
6. Component re-renders without deleted event

### Step 3: Experiment with Modifications

Try these exercises:

**Beginner:**
- Change the hover color of EventCard
- Add a "Select All" button for users
- Add a counter showing total events

**Intermediate:**
- Add a filter dropdown for event status
- Implement sorting by date or attendees
- Add a "favorite" toggle to events

**Advanced:**
- Add drag-and-drop to reorder events
- Implement keyboard navigation (arrow keys)
- Add form validation with error messages

---

## 🎨 Component Architecture

### EventCard
**Purpose:** Display individual event with actions

**Props:**
- `event`: Event object
- `onDelete`: Handler for deletion
- `onEdit`: Handler for editing
- `onStatusChange`: Handler for status updates

**Events Used:**
- `onMouseEnter/onMouseLeave` - Hover effects
- `onClick` - Edit and delete actions
- `stopPropagation` - Prevent event bubbling

---

### UserCard
**Purpose:** Display user information with selection

**Props:**
- `user`: User object
- `onSelect`: Toggle selection handler
- `isSelected`: Boolean for selected state

**Events Used:**
- `onClick` - Selection toggle
- `onDoubleClick` - Show email alert

---

## 🔍 TypeScript Event Types Reference

```typescript
// Mouse Events
MouseEvent<HTMLButtonElement>
MouseEvent<HTMLDivElement>

// Input Events
ChangeEvent<HTMLInputElement>
ChangeEvent<HTMLTextAreaElement>
ChangeEvent<HTMLSelectElement>

// Keyboard Events
KeyboardEvent<HTMLInputElement>

// Form Events
FormEvent<HTMLFormElement>

// Focus Events
FocusEvent<HTMLInputElement>
```

---

## 🚀 Running the Project

This is a React component that can be used in any React + TypeScript project:

1. **Create a new React + TypeScript project:**
   ```bash
   npx create-react-app event-management --template typescript
   cd event-management
   ```

2. **Install dependencies:**
   ```bash
   npm install lucide-react
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

3. **Configure Tailwind** (add to `tailwind.config.js`):
   ```javascript
   content: ["./src/**/*.{js,jsx,ts,tsx}"]
   ```

4. **Add to `src/index.css`:**
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

5. **Replace `src/App.tsx`** with the provided code

6. **Run:**
   ```bash
   npm start
   ```

---

## 💡 Key Takeaways

### Event Handler Naming Convention
- Prefix with `handle`: `handleClick`, `handleChange`
- Or use `on` prefix for props: `onClick`, `onChange`

### TypeScript Benefits
- Prevents typos in event properties
- Auto-completion for event methods
- Compile-time error checking

### Performance Tip
- Define event handlers outside JSX when possible
- Use `useCallback` for handlers passed to child components (optimization)

### Common Pitfalls
❌ Forgetting `e.preventDefault()` on form submission
❌ Not using `stopPropagation()` with nested clickable elements
❌ Calling handlers directly instead of passing function reference
   ```typescript
   // Wrong
   <button onClick={handleClick()}>
   
   // Right
   <button onClick={handleClick}>
   <button onClick={() => handleClick(id)}>
   ```

---

## 🎓 Practice Exercises

1. **Add Event Context Menu**
   - Implement `onContextMenu` (right-click)
   - Show custom menu with options

2. **Implement Drag and Drop**
   - Use `onDragStart`, `onDragOver`, `onDrop`
   - Allow reordering events

3. **Add Keyboard Shortcuts**
   - Use `onKeyDown` on document level
   - Implement shortcuts (Ctrl+N for new event)

4. **Add Touch Events**
   - Implement `onTouchStart`, `onTouchEnd`
   - Add swipe-to-delete on mobile

---

## 📚 Additional Resources

- [React Events Documentation](https://react.dev/learn/responding-to-events)
- [TypeScript React Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [MDN Event Reference](https://developer.mozilla.org/en-US/docs/Web/Events)

---

## ✅ Checklist for Understanding

- [ ] I can explain what `e.target.value` returns
- [ ] I know when to use `stopPropagation()`
- [ ] I can type event handlers in TypeScript
- [ ] I understand controlled vs uncontrolled components
- [ ] I can pass event handlers as props
- [ ] I know the difference between onClick and onDoubleClick
- [ ] I can handle keyboard events
- [ ] I understand event propagation (bubbling)

---

**Happy Learning! 🎉**

Feel free to modify this project and experiment with different event types!