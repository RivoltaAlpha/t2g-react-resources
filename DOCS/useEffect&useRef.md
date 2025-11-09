# React Hooks & Context: A Student Guide
## useRef & useEffect

### 🎯 useRef - Your "Remember This!" Hook

Think of `useRef` as a **sticky note** that React keeps for you. Unlike state, changing a ref doesn't cause your component to re-render.

#### When to Use useRef:
- Accessing DOM elements directly (like focusing an input)
- Storing values that don't need to trigger re-renders
- Keeping track of previous values
- Storing timers or intervals

#### Basic Syntax:
```typescript
const myRef = useRef<HTMLInputElement>(null);
```

#### Example 1: Focusing an Input
```typescript
import { useRef } from 'react';

function LoginForm() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    // Access the actual DOM element
    inputRef.current?.focus();
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={handleFocus}>Focus Input</button>
    </div>
  );
}
```

#### Example 2: Tracking Previous Values
```typescript
function Counter() {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef<number>(0);

  useEffect(() => {
    prevCountRef.current = count;
  }, [count]);

  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {prevCountRef.current}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

**Key Point:** `useRef` returns an object with a `current` property. Always access values via `.current`

---

### ⚡ useEffect - Your "Side Effect Manager"

`useEffect` lets you run code **after** your component renders. Think of it as saying: "Hey React, after you finish painting the screen, do this extra thing."

#### What are Side Effects?
- Fetching data from an API
- Setting up subscriptions
- Manually changing the DOM
- Setting timers
- Logging to console

#### Basic Syntax:
```typescript
useEffect(() => {
  // Code to run after render
  
  return () => {
    // Cleanup code (optional)
  };
}, [dependencies]);
```

#### The Three Patterns:

**1. Run Once (on mount)**
```typescript
useEffect(() => {
  console.log('Component mounted!');
}, []); // Empty array = run once
```

**2. Run on Every Render**
```typescript
useEffect(() => {
  console.log('Component rendered!');
}); // No array = run every render
```

**3. Run When Dependencies Change**
```typescript
useEffect(() => {
  console.log(`Count changed to ${count}`);
}, [count]); // Run when count changes
```

#### Example: Data Fetching
```typescript
function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This runs when component mounts or userId changes
    setLoading(true);
    
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, [userId]); // Re-run if userId changes

  if (loading) return <div>Loading...</div>;
  return <div>{user?.name}</div>;
}
```

#### Example: Cleanup
```typescript
function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    // Cleanup function runs when component unmounts
    return () => {
      clearInterval(interval);
      console.log('Timer cleaned up!');
    };
  }, []);

  return <div>Seconds: {seconds}</div>;
}
```

**Key Point:** Always clean up subscriptions, timers, and listeners to prevent memory leaks!

---
