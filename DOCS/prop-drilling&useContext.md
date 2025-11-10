
## Class 2: Prop Drilling & useContext

### 🪜 Prop Drilling - The "Passing Game"

**Prop drilling** is when you pass props through multiple component levels, even when intermediate components don't need them.

#### The Problem:
```typescript
function App() {
  const [user, setUser] = useState({ name: 'Alice' });
  
  return <Dashboard user={user} />;
}

function Dashboard({ user }: { user: User }) {
  // Dashboard doesn't use user, just passes it down
  return <Sidebar user={user} />;
}

function Sidebar({ user }: { user: User }) {
  // Sidebar doesn't use user either
  return <UserProfile user={user} />;
}

function UserProfile({ user }: { user: User }) {
  // Finally! Someone who actually needs user
  return <div>{user.name}</div>;
}
```

**Issues with Prop Drilling:**
- Components in the middle become cluttered
- Hard to refactor
- Difficult to maintain
- Components become tightly coupled

---

### 🌍 useContext - Your "Global Walkie-Talkie"

`useContext` lets you share data across your component tree **without** passing props manually at every level. Think of it as a radio broadcast that any component can tune into.

#### Step 1: Create a Context
```typescript
import { createContext } from 'react';

type User = {
  name: string;
  email: string;
};

// Create the context with a default value
export const UserContext = createContext<User | null>(null);
```

#### Step 2: Provide the Context
Wrap your component tree with a Provider:

```typescript
function App() {
  const [user, setUser] = useState({
    name: 'Alice',
    email: 'alice@example.com'
  });

  return (
    <UserContext.Provider value={user}>
      <Dashboard />
    </UserContext.Provider>
  );
}
```

#### Step 3: Consume the Context
Any child component can access the context:

```typescript
import { useContext } from 'react';
import { UserContext } from './UserContext';

function UserProfile() {
  const user = useContext(UserContext);

  if (!user) return <div>No user</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

Now `Dashboard` and `Sidebar` don't need to know about `user`!

---

### 🎨 Complete Example: Theme Switcher

```typescript
// ThemeContext.tsx
import { createContext, useState, useContext, ReactNode } from 'react';

type Theme = 'light' | 'dark';

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook for easier usage
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
```

```typescript
// App.tsx
function App() {
  return (
    <ThemeProvider>
      <Header />
      <Main />
      <Footer />
    </ThemeProvider>
  );
}

// Any component can now access theme
function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header style={{ background: theme === 'light' ? '#fff' : '#333' }}>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
    </header>
  );
}

function Footer() {
  const { theme } = useTheme();
  
  return (
    <footer style={{ color: theme === 'light' ? '#000' : '#fff' }}>
      Current theme: {theme}
    </footer>
  );
}
```

---

## 📝 Quick Reference

| Hook | Purpose | Common Use Cases |
|------|---------|------------------|
| `useRef` | Store mutable values without re-rendering | DOM access, previous values, timers |
| `useEffect` | Handle side effects after render | Data fetching, subscriptions, DOM updates |
| `useContext` | Share data across component tree | Theme, auth, language, global state |

---

## 🎯 Practice Exercises

### Exercise 1: useRef
Create a component with a text input and a button that clears the input and focuses it.

### Exercise 2: useEffect
Build a component that fetches and displays a random joke when it mounts. Add a "Get New Joke" button.

### Exercise 3: Context
Create an authentication context that stores user login state and provides login/logout functions to all components.

---

## 🚨 Common Mistakes to Avoid

1. **useRef**: Forgetting to access `.current`
2. **useEffect**: Missing dependencies in the dependency array
3. **useEffect**: Not cleaning up subscriptions/timers
4. **useContext**: Forgetting to wrap components in Provider
5. **useContext**: Creating too many contexts (causes "Provider hell")

---

## 💡 Pro Tips

- Always use TypeScript types for context values
- Create custom hooks to encapsulate context logic (like `useTheme()`)
- Don't overuse Context - sometimes prop drilling is fine for 2-3 levels
- Use `useEffect` cleanup for any async operations
- `useRef` is perfect for values that change but don't affect the UI

---

Happy coding! 🚀