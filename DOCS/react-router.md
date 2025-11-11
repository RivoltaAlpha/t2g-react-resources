# React Router & React Router DOM with TypeScript

## Lesson Overview
This lesson covers client-side routing in React applications using React Router v6 with TypeScript. Students will learn how to create multi-page applications with navigation, dynamic routes, and protected routes.

## Prerequisites
- Basic React knowledge (components, hooks, props)
- TypeScript fundamentals
- Understanding of single-page applications (SPAs)

## Learning Objectives
By the end of this lesson, students will be able to:
- Understand the difference between server-side and client-side routing
- Set up React Router in a TypeScript project
- Create routes and navigate between pages
- Work with dynamic routes and URL parameters
- Implement nested routes and layouts
- Create protected routes with authentication
- Use programmatic navigation

## Installation

```bash
npm install react-router-dom
# Types are included in v6+
```

## Core Concepts

### 1. What is React Router?
React Router is a standard library for routing in React applications. It enables navigation between different views/components without full page reloads, maintaining the SPA experience.

**Key Package: `react-router-dom`** - The web version of React Router

### 2. Basic Setup

```typescript
// main.tsx or index.tsx
import { BrowserRouter } from 'react-router-dom';
import App from './App';

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

### 3. Essential Components & Hooks

#### Routes and Route
Define your application's route structure:

```typescript
// App.tsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
```

#### Link and NavLink
Navigate without page reloads:

```typescript
import { Link, NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      {/* Basic link */}
      <Link to="/">Home</Link>
      
      {/* NavLink with active styling */}
      <NavLink 
        to="/about"
        className={({ isActive }) => isActive ? 'active' : ''}
      >
        About
      </NavLink>
    </nav>
  );
}
```

### 4. Dynamic Routes with URL Parameters

```typescript
// Route definition
<Route path="/users/:userId" element={<UserProfile />} />

// UserProfile.tsx
import { useParams } from 'react-router-dom';

interface UserParams {
  userId: string;
}

function UserProfile() {
  const { userId } = useParams<UserParams>();
  
  return <div>User ID: {userId}</div>;
}
```

### 5. Programmatic Navigation

```typescript
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();
  
  const handleSubmit = () => {
    // After successful login
    navigate('/dashboard');
    // Or go back: navigate(-1);
  };
  
  return <button onClick={handleSubmit}>Login</button>;
}
```

### 6. Nested Routes & Layouts

```typescript
// App.tsx
<Routes>
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="about" element={<About />} />
    <Route path="contact" element={<Contact />} />
  </Route>
</Routes>

// Layout.tsx
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div>
      <Navigation />
      <main>
        <Outlet /> {/* Child routes render here */}
      </main>
      <Footer />
    </div>
  );
}
```

### 7. Search Params (Query Parameters)

```typescript
import { useSearchParams } from 'react-router-dom';

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const query = searchParams.get('q');
  const filter = searchParams.get('filter');
  
  const updateSearch = (newQuery: string) => {
    setSearchParams({ q: newQuery });
  };
  
  return <div>Search: {query}</div>;
}
```

### 8. Protected Routes Pattern

```typescript
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
}

function ProtectedRoute({ children, isAuthenticated }: ProtectedRouteProps) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

// Usage
<Route 
  path="/dashboard" 
  element={
    <ProtectedRoute isAuthenticated={isLoggedIn}>
      <Dashboard />
    </ProtectedRoute>
  } 
/>
```

## Practical Exercise: Build a Multi-Page Blog App

### Requirements
1. Home page with list of posts
2. Individual post page with dynamic routing
3. About page
4. Navigation bar on all pages
5. 404 page for invalid routes

### Suggested Structure
```
src/
├── components/
│   └── Navigation.tsx
├── pages/
│   ├── Home.tsx
│   ├── Post.tsx
│   ├── About.tsx
│   └── NotFound.tsx
├── types/
│   └── index.ts
├── App.tsx
└── main.tsx
```

## Common TypeScript Patterns

### Typing useParams
```typescript
import { useParams } from 'react-router-dom';

// Define params interface
interface PostParams {
  postId: string;
  [key: string]: string | undefined;
}

const { postId } = useParams<PostParams>();
```

### Typing useNavigate with state
```typescript
interface LocationState {
  from: string;
}

navigate('/dashboard', { 
  state: { from: '/login' } as LocationState 
});

// Receiving state
import { useLocation } from 'react-router-dom';
const location = useLocation();
const state = location.state as LocationState;
```

## Best Practices

1. **Use index routes** for default child routes
2. **Organize routes** in a separate routes configuration file for large apps
3. **Always include a 404 route** with `path="*"`
4. **Use relative paths** in nested routes for better maintainability
5. **Leverage layouts** to avoid repeating navigation/footer code
6. **Use `replace` prop** when you don't want history entries (e.g., redirects)

## Common Pitfalls

- Forgetting to wrap App in `<BrowserRouter>`
- Not using `*` for catch-all 404 routes
- Using `<a>` tags instead of `<Link>` (causes full page reload)
- Forgetting `<Outlet />` in parent routes

## Additional Resources

- [React Router Documentation](https://reactrouter.com/)
- [TypeScript Cheatsheet for React Router](https://github.com/typescript-cheatsheets/react)

## Assessment Ideas

1. Build a multi-page portfolio website with routing
2. Create a product catalog with category filtering using search params
3. Implement authentication flow with protected routes
4. Build a blog with nested routes for categories and posts

---

## Quick Reference Cheat Sheet

| Hook/Component | Purpose |
|---------------|---------|
| `<BrowserRouter>` | Wraps app to enable routing |
| `<Routes>` | Container for Route definitions |
| `<Route>` | Defines a route path and component |
| `<Link>` | Navigation without reload |
| `<NavLink>` | Link with active state styling |
| `<Navigate>` | Programmatic redirect component |
| `<Outlet>` | Renders child routes |
| `useNavigate()` | Hook for programmatic navigation |
| `useParams()` | Access URL parameters |
| `useLocation()` | Access current location object |
| `useSearchParams()` | Read/write query parameters |