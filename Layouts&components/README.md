# Creating Layouts with Components & Styling with Tailwind 4

A comprehensive guide to building professional layouts using React components and styling them with Tailwind CSS 4 for your Event Management System.

---

## 📚 Table of Contents

1. [Tailwind 4 Overview](#tailwind-4-overview)
2. [Layout Fundamentals](#layout-fundamentals)
3. [Common Layout Patterns](#common-layout-patterns)
4. [Component-Based Layouts](#component-based-layouts)
5. [Responsive Design](#responsive-design)
6. [Advanced Tailwind 4 Features](#advanced-tailwind-4-features)
7. [Event Management System Layouts](#event-management-system-layouts)

---

## 🎨 Tailwind 4 Overview

### What's New in Tailwind 4?

Tailwind CSS 4 introduces several improvements:
- **Lightning-fast Rust-based engine** for better performance
- **Simplified configuration** with CSS-first approach
- **Native CSS variables** support
- **Improved gradient utilities**
- **Better color opacity controls**
- **Enhanced container queries**
- **New dynamic viewport units**

### Setting Up Tailwind 4

```bash
# Install Tailwind CSS 4
npm install tailwindcss@next @tailwindcss/postcss@next

# Or with Vite
npm create vite@latest my-app -- --template react
cd my-app
npm install tailwindcss@next @tailwindcss/postcss@next
```

### Basic Configuration

```css
/* src/index.css */
@import "tailwindcss";

/* Your custom styles */
@theme {
  --color-primary: #3b82f6;
  --color-secondary: #8b5cf6;
  --font-display: 'Inter', sans-serif;
}
```

---

## 🏗️ Layout Fundamentals

### The Box Model in Tailwind

Understanding spacing utilities:

```jsx
function BoxModelExample() {
  return (
    <div className="
      m-4        /* margin: 1rem (16px) all sides */
      p-6        /* padding: 1.5rem (24px) all sides */
      border-2   /* border: 2px */
      rounded-lg /* border-radius: 0.5rem */
    ">
      Content
    </div>
  );
}
```

### Spacing Scale

Tailwind uses a consistent spacing scale:
- `0` = 0px
- `1` = 0.25rem (4px)
- `2` = 0.5rem (8px)
- `4` = 1rem (16px)
- `6` = 1.5rem (24px)
- `8` = 2rem (32px)
- `12` = 3rem (48px)
- `16` = 4rem (64px)

```jsx
// Directional spacing
<div className="
  mt-4      /* margin-top */
  mb-6      /* margin-bottom */
  ml-2      /* margin-left */
  mr-2      /* margin-right */
  mx-auto   /* margin-left & margin-right: auto (center) */
  my-8      /* margin-top & margin-bottom */
  px-4      /* padding-left & padding-right */
  py-6      /* padding-top & padding-bottom */
">
```

---

## 📐 Common Layout Patterns

### 1. Flexbox Layouts

Flexbox is perfect for one-dimensional layouts (rows or columns).

#### Basic Flex Container

```jsx
function FlexBasics() {
  return (
    <div className="flex">
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </div>
  );
}
```

#### Flex Direction

```jsx
// Horizontal (default)
<div className="flex flex-row">...</div>

// Vertical
<div className="flex flex-col">...</div>

// Reverse
<div className="flex flex-row-reverse">...</div>
<div className="flex flex-col-reverse">...</div>
```

#### Justify Content (Main Axis)

```jsx
// Align items horizontally in a row
<div className="flex justify-start">...</div>      // Left
<div className="flex justify-center">...</div>     // Center
<div className="flex justify-end">...</div>        // Right
<div className="flex justify-between">...</div>    // Space between
<div className="flex justify-around">...</div>     // Space around
<div className="flex justify-evenly">...</div>     // Space evenly
```

#### Align Items (Cross Axis)

```jsx
// Align items vertically in a row
<div className="flex items-start">...</div>     // Top
<div className="flex items-center">...</div>    // Middle
<div className="flex items-end">...</div>       // Bottom
<div className="flex items-stretch">...</div>   // Stretch to fill
<div className="flex items-baseline">...</div>  // Baseline alignment
```

#### Complete Flex Example

```jsx
function EventHeader() {
  return (
    <header className="
      flex 
      items-center 
      justify-between 
      p-6 
      bg-white 
      shadow-md
    ">
      <div className="flex items-center gap-4">
        <img src="/logo.svg" alt="Logo" className="h-10 w-10" />
        <h1 className="text-2xl font-bold text-gray-800">
          EventHub
        </h1>
      </div>
      
      <nav className="flex items-center gap-6">
        <a href="#events" className="text-gray-600 hover:text-blue-600">
          Events
        </a>
        <a href="#about" className="text-gray-600 hover:text-blue-600">
          About
        </a>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
          Sign In
        </button>
      </nav>
    </header>
  );
}
```

#### Flex Wrap

```jsx
// Wrap items to next line
<div className="flex flex-wrap gap-4">
  <div className="w-32 h-32 bg-blue-500"></div>
  <div className="w-32 h-32 bg-green-500"></div>
  <div className="w-32 h-32 bg-red-500"></div>
  {/* Items will wrap if container is too narrow */}
</div>
```

#### Flex Grow & Shrink

```jsx
<div className="flex gap-4">
  {/* Takes remaining space */}
  <div className="flex-1 bg-blue-500">Flexible</div>
  
  {/* Fixed width */}
  <div className="w-48 bg-green-500">Fixed</div>
  
  {/* Grows twice as much as flex-1 */}
  <div className="flex-2 bg-red-500">More flexible</div>
</div>
```

### 2. Grid Layouts

Grid is perfect for two-dimensional layouts.

#### Basic Grid

```jsx
function GridBasics() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
      <div>Item 4</div>
      <div>Item 5</div>
      <div>Item 6</div>
    </div>
  );
}
```

#### Grid Columns

```jsx
<div className="grid grid-cols-1">...</div>   // 1 column
<div className="grid grid-cols-2">...</div>   // 2 columns
<div className="grid grid-cols-3">...</div>   // 3 columns
<div className="grid grid-cols-4">...</div>   // 4 columns
<div className="grid grid-cols-12">...</div>  // 12 columns (common)
```

#### Grid Gap

```jsx
<div className="grid grid-cols-3 gap-2">...</div>   // 8px gap
<div className="grid grid-cols-3 gap-4">...</div>   // 16px gap
<div className="grid grid-cols-3 gap-6">...</div>   // 24px gap
<div className="grid grid-cols-3 gap-8">...</div>   // 32px gap

// Different horizontal and vertical gaps
<div className="grid grid-cols-3 gap-x-4 gap-y-8">...</div>
```

#### Spanning Columns

```jsx
function GridSpanning() {
  return (
    <div className="grid grid-cols-6 gap-4">
      {/* Spans 2 columns */}
      <div className="col-span-2 bg-blue-500">Span 2</div>
      
      {/* Spans 4 columns */}
      <div className="col-span-4 bg-green-500">Span 4</div>
      
      {/* Full width */}
      <div className="col-span-6 bg-red-500">Full Width</div>
      
      {/* Starts at column 2, spans 3 */}
      <div className="col-start-2 col-span-3 bg-yellow-500">
        Custom placement
      </div>
    </div>
  );
}
```

#### Event Card Grid Example

```jsx
function EventGrid({ events }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {events.map(event => (
        <div 
          key={event.event_id}
          className="
            bg-white 
            rounded-xl 
            shadow-lg 
            overflow-hidden
            hover:shadow-2xl 
            transition-shadow 
            duration-300
          "
        >
          <img 
            src={event.image} 
            alt={event.event_name}
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {event.event_name}
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              {event.event_description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                {event.event_date}
              </span>
              <span className="text-sm text-blue-600 font-semibold">
                {event.event_location}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
```

### 3. Container & Max Width

```jsx
// Centered container with max width
<div className="container mx-auto px-4">
  {/* Content */}
</div>

// Custom max widths
<div className="max-w-sm mx-auto">...</div>   // 384px
<div className="max-w-md mx-auto">...</div>   // 448px
<div className="max-w-lg mx-auto">...</div>   // 512px
<div className="max-w-xl mx-auto">...</div>   // 576px
<div className="max-w-2xl mx-auto">...</div>  // 672px
<div className="max-w-4xl mx-auto">...</div>  // 896px
<div className="max-w-6xl mx-auto">...</div>  // 1152px
<div className="max-w-7xl mx-auto">...</div>  // 1280px
```

---

## 🧩 Component-Based Layouts

### Layout Components

#### Page Layout Component

```jsx
function PageLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}
```

#### Header Component

```jsx
function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <span className="text-xl font-bold text-gray-800">
              EventHub
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#events" className="text-gray-600 hover:text-blue-600 transition-colors">
              Events
            </a>
            <a href="#create" className="text-gray-600 hover:text-blue-600 transition-colors">
              Create Event
            </a>
            <a href="#my-events" className="text-gray-600 hover:text-blue-600 transition-colors">
              My Events
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              Sign In
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
```

#### Footer Component

```jsx
function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">
              EventHub
            </h3>
            <p className="text-sm text-gray-400">
              Your one-stop platform for discovering and managing amazing events.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm hover:text-white transition-colors">
                  Browse Events
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-white transition-colors">
                  Create Event
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-white transition-colors">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <span>𝕏</span>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <span>in</span>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <span>f</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-500">
            © 2024 EventHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
```

#### Card Component

```jsx
function Card({ children, className = '' }) {
  return (
    <div className={`
      bg-white 
      rounded-xl 
      shadow-md 
      overflow-hidden
      hover:shadow-lg 
      transition-shadow 
      duration-300
      ${className}
    `}>
      {children}
    </div>
  );
}

// Usage
<Card className="p-6">
  <h3>Card Title</h3>
  <p>Card content</p>
</Card>
```

#### Section Component

```jsx
function Section({ title, subtitle, children, className = '' }) {
  return (
    <section className={`py-16 ${className}`}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}
        
        {/* Section Content */}
        {children}
      </div>
    </section>
  );
}
```

---

## 📱 Responsive Design

### Breakpoint System

Tailwind 4 uses mobile-first breakpoints:

```
sm:  640px   (small devices)
md:  768px   (tablets)
lg:  1024px  (laptops)
xl:  1280px  (desktops)
2xl: 1536px  (large screens)
```

### Responsive Patterns

#### Responsive Grid

```jsx
function ResponsiveGrid() {
  return (
    <div className="
      grid 
      grid-cols-1           /* 1 column on mobile */
      sm:grid-cols-2        /* 2 columns on small screens */
      md:grid-cols-3        /* 3 columns on tablets */
      lg:grid-cols-4        /* 4 columns on laptops */
      xl:grid-cols-5        /* 5 columns on desktops */
      gap-4
    ">
      {/* Cards */}
    </div>
  );
}
```

#### Responsive Typography

```jsx
<h1 className="
  text-2xl      /* 24px on mobile */
  md:text-4xl   /* 36px on tablets */
  lg:text-5xl   /* 48px on laptops */
  font-bold
">
  Responsive Heading
</h1>

<p className="
  text-sm       /* 14px on mobile */
  md:text-base  /* 16px on tablets */
  lg:text-lg    /* 18px on laptops */
">
  Responsive paragraph
</p>
```

#### Responsive Spacing

```jsx
<div className="
  p-4           /* 16px padding on mobile */
  md:p-6        /* 24px padding on tablets */
  lg:p-8        /* 32px padding on laptops */
  m-2           /* 8px margin on mobile */
  md:m-4        /* 16px margin on tablets */
  lg:m-6        /* 24px margin on laptops */
">
  Responsive spacing
</div>
```

#### Hide/Show on Different Screens

```jsx
{/* Hidden on mobile, visible on larger screens */}
<div className="hidden md:block">
  Desktop navigation
</div>

{/* Visible on mobile, hidden on larger screens */}
<div className="block md:hidden">
  Mobile menu button
</div>

{/* Different layouts for different screens */}
<div className="flex flex-col md:flex-row gap-4">
  <div>Sidebar</div>
  <div>Content</div>
</div>
```

#### Responsive Event Card

```jsx
function ResponsiveEventCard({ event }) {
  return (
    <div className="
      bg-white 
      rounded-lg 
      shadow-md 
      overflow-hidden
      flex 
      flex-col              /* Stack vertically on mobile */
      sm:flex-row           /* Side-by-side on small screens */
      hover:shadow-xl 
      transition-shadow
    ">
      {/* Image */}
      <img 
        src={event.image}
        alt={event.event_name}
        className="
          w-full              /* Full width on mobile */
          sm:w-48             /* Fixed width on small screens */
          h-48                /* Fixed height on mobile */
          sm:h-auto           /* Auto height on small screens */
          object-cover
        "
      />
      
      {/* Content */}
      <div className="
        p-4 
        sm:p-6              /* More padding on small screens */
        flex-1
      ">
        <h3 className="
          text-lg 
          sm:text-xl        /* Larger on small screens */
          font-bold 
          text-gray-800 
          mb-2
        ">
          {event.event_name}
        </h3>
        
        <p className="
          text-sm 
          sm:text-base      /* Larger on small screens */
          text-gray-600 
          mb-4
          line-clamp-2      /* Show only 2 lines */
          sm:line-clamp-3   /* Show 3 lines on small screens */
        ">
          {event.event_description}
        </p>
        
        <div className="
          flex 
          flex-col          /* Stack on mobile */
          sm:flex-row       /* Side-by-side on small screens */
          sm:items-center 
          sm:justify-between 
          gap-2
        ">
          <span className="text-sm text-gray-500">
            📅 {event.event_date}
          </span>
          <span className="text-sm text-blue-600 font-semibold">
            📍 {event.event_location}
          </span>
        </div>
      </div>
    </div>
  );
}
```

---

## 🎨 Advanced Tailwind 4 Features

### 1. Color System

#### Extended Color Palette

```jsx
// Using Tailwind's color scale (50-950)
<div className="bg-blue-50">Lightest blue</div>
<div className="bg-blue-500">Medium blue</div>
<div className="bg-blue-950">Darkest blue</div>

// Text colors
<p className="text-gray-700">Dark gray text</p>
<p className="text-blue-600">Blue text</p>

// Border colors
<div className="border-2 border-red-500">Red border</div>
```

#### Opacity Modifiers

```jsx
// Background with opacity
<div className="bg-blue-500/50">50% opacity blue</div>
<div className="bg-blue-500/75">75% opacity blue</div>

// Text with opacity
<p className="text-gray-900/80">80% opacity text</p>

// Border with opacity
<div className="border-blue-500/30">30% opacity border</div>
```

#### Gradients

```jsx
// Linear gradients
<div className="bg-gradient-to-r from-blue-500 to-purple-600">
  Left to right gradient
</div>

<div className="bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500">
  Complex gradient
</div>

// Gradient directions
// to-r  (right)
// to-l  (left)
// to-t  (top)
// to-b  (bottom)
// to-br (bottom-right)
// to-bl (bottom-left)
// to-tr (top-right)
// to-tl (top-left)
```

### 2. Effects & Animations

#### Shadows

```jsx
// Box shadows
<div className="shadow-sm">Small shadow</div>
<div className="shadow">Default shadow</div>
<div className="shadow-md">Medium shadow</div>
<div className="shadow-lg">Large shadow</div>
<div className="shadow-xl">Extra large shadow</div>
<div className="shadow-2xl">2X large shadow</div>

// Colored shadows (Tailwind 4)
<div className="shadow-lg shadow-blue-500/50">Blue shadow</div>

// Inner shadow
<div className="shadow-inner">Inner shadow</div>

// No shadow
<div className="shadow-none">No shadow</div>
```

#### Transitions

```jsx
<button className="
  bg-blue-500 
  hover:bg-blue-600 
  transition-colors    /* Smooth color transition */
  duration-300        /* 300ms duration */
">
  Hover me
</button>

// Different transition properties
<div className="transition-all">All properties</div>
<div className="transition-colors">Colors only</div>
<div className="transition-opacity">Opacity only</div>
<div className="transition-transform">Transform only</div>
<div className="transition-shadow">Shadow only</div>

// Transition durations
<div className="transition duration-150">Fast</div>
<div className="transition duration-300">Default</div>
<div className="transition duration-500">Slow</div>
<div className="transition duration-1000">Very slow</div>

// Easing functions
<div className="transition ease-linear">Linear</div>
<div className="transition ease-in">Ease in</div>
<div className="transition ease-out">Ease out</div>
<div className="transition ease-in-out">Ease in-out</div>
```

#### Transforms

```jsx
// Scale
<div className="hover:scale-105 transition-transform">
  Scales up on hover
</div>

// Rotate
<div className="hover:rotate-6 transition-transform">
  Rotates on hover
</div>

// Translate
<div className="hover:translate-y-2 transition-transform">
  Moves down on hover
</div>

// Combined transforms
<div className="hover:scale-110 hover:rotate-3 transition-transform">
  Multiple transforms
</div>
```

#### Animations

```jsx
// Built-in animations
<div className="animate-spin">Spinning</div>
<div className="animate-ping">Pinging</div>
<div className="animate-pulse">Pulsing</div>
<div className="animate-bounce">Bouncing</div>

// Usage example
<button className="relative">
  Loading
  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
</button>
```

### 3. Hover, Focus & Other States

```jsx
function InteractiveButton() {
  return (
    <button className="
      px-6 py-3
      bg-blue-600 
      text-white 
      rounded-lg
      
      /* Hover state */
      hover:bg-blue-700 
      hover:shadow-lg
      
      /* Focus state */
      focus:outline-none 
      focus:ring-4 
      focus:ring-blue-300
      
      /* Active state (when pressed) */
      active:scale-95
      
      /* Disabled state */
      disabled:opacity-50 
      disabled:cursor-not-allowed
      
      /* Transitions */
      transition-all 
      duration-200
    ">
      Click Me
    </button>
  );
}

// Group hover (parent affects children)
<div className="group">
  <h3 className="group-hover:text-blue-600">Title</h3>
  <p className="group-hover:text-gray-700">Description</p>
</div>

// Peer (sibling affects sibling)
<input type="checkbox" className="peer" />
<label className="peer-checked:text-blue-600">Checked label</label>
```

### 4. Dark Mode Support

```jsx
// Add to your components
<div className="
  bg-white 
  dark:bg-gray-900 
  text-gray-900 
  dark:text-white
">
  Content
</div>

// Enable dark mode in config
// tailwind.config.js
module.exports = {
  darkMode: 'class', // or 'media'
}

// Toggle dark mode with a button
function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);
  
  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };
  
  return (
    <button 
      onClick={toggleDarkMode}
      className="
        p-2 
        rounded-lg 
        bg-gray-200 
        dark:bg-gray-700
        hover:bg-gray-300 
        dark:hover:bg-gray-600
      "
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
}
```

### 5. Custom Properties (CSS Variables)

```css
/* In your Tailwind 4 config */
@theme {
  /* Custom colors */
  --color-brand-primary: #3b82f6;
  --color-brand-secondary: #8b5cf6;
  
  /* Custom spacing */
  --spacing-section: 5rem;
  
  /* Custom shadows */
  --shadow-brand: 0 10px 40px rgba(59, 130, 246, 0.2);
}
```

```jsx
// Use in components
<div className="bg-[--color-brand-primary]">
  Custom color
</div>

<div className="shadow-[--shadow-brand]">
  Custom shadow
</div>
```

---

## 🎯 Event Management System Layouts

### Complete Page Examples

#### 1. Events Listing Page

```jsx
function EventsPage() {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState('all');

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="
        bg-gradient-to-br 
        from-blue-600 
        to-purple-700 
        text-white 
        py-20
        rounded-2xl
        mb-12
      ">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Discover Amazing Events
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Connect with people, learn new things, and create unforgettable memories
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="
              px-8 py-4 
              bg-white 
              text-blue-600 
              font-semibold 
              rounded-lg 
              hover:bg-gray-100 
              transition-colors
            ">
              Browse Events
            </button>
            <button className="
              px-8 py-4 
              bg-transparent 
              border-2 
              border-white 
              text-white 
              font-semibold 
              rounded-lg 
              hover:bg-white/10 
              transition-colors
            ">
              Create Event
            </button>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-3 items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">
            Upcoming Events
          </h2>
          
          <div className="flex gap-2">
            <button 
              onClick={() => setFilter('all')}
              className={`
                px-4 py-2 rounded-lg font-medium transition-colors
                ${filter === 'all' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
              `}
            >
              All Events
            </button>
            <button 
              onClick={() => setFilter('today')}
              className={`
                px-4 py-2 rounded-lg font-medium transition-colors
                ${filter === 'today' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
              `}
            >
              Today
            </button>
            <button 
              onClick={() => setFilter('week')}
              className={`
                px-4 py-2 rounded-lg font-medium transition-colors
                ${filter === 'week' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
              `}
            >
              This Week
            </button>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {events.map(event => (
          <EventCard key={event.event_id} event={event} />
        ))}
      </div>
    </PageLayout>
  );
}
```

#### 2. Event Details Page

```jsx
function EventDetailsPage({ event }) {
  return (
    <PageLayout>
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button className="
          mb-6 
          flex items-center gap-2 
          text-gray-600 
          hover:text-gray-900 
          transition-colors
        ">
          <span>←</span>
          <span>Back to Events</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Event Image */}
            <div className="relative h-96 rounded-2xl overflow-hidden mb-6">
              <img 
                src={event.image} 
                alt={event.event_name}
                className="w-full h-full object-cover"
              />
              <div className="
                absolute top-4 right-4 
                px-4 py-2 
                bg-blue-600 
                text-white 
                rounded-full 
                font-semibold
                shadow-lg
              ">
                Featured
              </div>
            </div>

            {/* Event Info */}
            <div className="bg-white rounded-2xl shadow-md p-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {event.event_name}
              </h1>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="text-2xl">📅</span>
                  <span>{event.event_date}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="text-2xl">📍</span>
                  <span>{event.event_location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="text-2xl">👥</span>
                  <span>250 attendees</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  About This Event
                </h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {event.event_description}
                </p>
              </div>

              {/* Organizer */}
              <div className="border-t border-gray-200 pt-6 mt-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Organizer
                </h2>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {event.created_by}
                    </h3>
                    <p className="text-gray-600 text-sm">Event Organizer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Registration */}
          <div className="lg:col-span-1">
            <div className="
              bg-white 
              rounded-2xl 
              shadow-lg 
              p-8 
              sticky 
              top-24
            ">
              <div className="mb-6">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  KSh 2,500
                </div>
                <p className="text-gray-600">per person</p>
              </div>

              <button className="
                w-full 
                py-4 
                bg-blue-600 
                text-white 
                font-semibold 
                rounded-lg 
                hover:bg-blue-700 
                transition-colors
                mb-4
              ">
                Register Now
              </button>

              <button className="
                w-full 
                py-4 
                bg-gray-100 
                text-gray-700 
                font-semibold 
                rounded-lg 
                hover:bg-gray-200 
                transition-colors
              ">
                Save Event
              </button>

              {/* Features */}
              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <div>
                    <p className="font-semibold text-gray-900">Instant Confirmation</p>
                    <p className="text-sm text-gray-600">Get your ticket immediately</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <div>
                    <p className="font-semibold text-gray-900">Secure Payment</p>
                    <p className="text-sm text-gray-600">Multiple payment options</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <div>
                    <p className="font-semibold text-gray-900">Free Cancellation</p>
                    <p className="text-sm text-gray-600">Cancel up to 24 hours before</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
```

#### 3. Registration Form Page

```jsx
function RegistrationPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    ticketType: 'regular',
    quantity: 1
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">
          Complete Your Registration
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-md p-8">
              <form className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Personal Information
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="
                          w-full 
                          px-4 py-3 
                          border border-gray-300 
                          rounded-lg 
                          focus:ring-2 
                          focus:ring-blue-500 
                          focus:border-transparent
                          transition-colors
                        "
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="
                          w-full 
                          px-4 py-3 
                          border border-gray-300 
                          rounded-lg 
                          focus:ring-2 
                          focus:ring-blue-500 
                          focus:border-transparent
                        "
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="
                          w-full 
                          px-4 py-3 
                          border border-gray-300 
                          rounded-lg 
                          focus:ring-2 
                          focus:ring-blue-500 
                          focus:border-transparent
                        "
                        placeholder="+254 700 000000"
                      />
                    </div>
                  </div>
                </div>

                {/* Ticket Selection */}
                <div className="border-t border-gray-200 pt-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Ticket Details
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ticket Type
                      </label>
                      <select
                        name="ticketType"
                        value={formData.ticketType}
                        onChange={handleChange}
                        className="
                          w-full 
                          px-4 py-3 
                          border border-gray-300 
                          rounded-lg 
                          focus:ring-2 
                          focus:ring-blue-500 
                          focus:border-transparent
                        "
                      >
                        <option value="regular">Regular - KSh 2,500</option>
                        <option value="vip">VIP - KSh 5,000</option>
                        <option value="group">Group (5+) - KSh 2,000 each</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Number of Tickets
                      </label>
                      <input
                        type="number"
                        name="quantity"
                        min="1"
                        max="10"
                        value={formData.quantity}
                        onChange={handleChange}
                        className="
                          w-full 
                          px-4 py-3 
                          border border-gray-300 
                          rounded-lg 
                          focus:ring-2 
                          focus:ring-blue-500 
                          focus:border-transparent
                        "
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit"
                  className="
                    w-full 
                    py-4 
                    bg-blue-600 
                    text-white 
                    font-semibold 
                    rounded-lg 
                    hover:bg-blue-700 
                    transition-colors
                    shadow-lg
                    hover:shadow-xl
                  "
                >
                  Proceed to Payment
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="
              bg-gray-50 
              rounded-2xl 
              shadow-md 
              p-6 
              sticky 
              top-24
            ">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Order Summary
              </h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Ticket Price</span>
                  <span>KSh 2,500</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Quantity</span>
                  <span>× {formData.quantity}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Service Fee</span>
                  <span>KSh 200</span>
                </div>
                
                <div className="border-t border-gray-300 pt-4">
                  <div className="flex justify-between text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span>KSh {(2500 * formData.quantity) + 200}</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  💡 <strong>Tip:</strong> Group tickets (5+) save you KSh 500 per ticket!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
```

#### 4. Dashboard Layout

```jsx
function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <Header />

      <div className="flex">
        {/* Sidebar */}
        <aside className="
          hidden 
          lg:block 
          w-64 
          bg-white 
          border-r 
          border-gray-200 
          min-h-screen
        ">
          <nav className="p-6 space-y-2">
            <a href="#" className="
              flex items-center gap-3 
              px-4 py-3 
              bg-blue-50 
              text-blue-600 
              rounded-lg 
              font-medium
            ">
              <span>📊</span>
              <span>Dashboard</span>
            </a>
            <a href="#" className="
              flex items-center gap-3 
              px-4 py-3 
              text-gray-700 
              hover:bg-gray-50 
              rounded-lg 
              transition-colors
            ">
              <span>🎫</span>
              <span>My Events</span>
            </a>
            <a href="#" className="
              flex items-center gap-3 
              px-4 py-3 
              text-gray-700 
              hover:bg-gray-50 
              rounded-lg 
              transition-colors
            ">
              <span>💳</span>
              <span>Payments</span>
            </a>
            <a href="#" className="
              flex items-center gap-3 
              px-4 py-3 
              text-gray-700 
              hover:bg-gray-50 
              rounded-lg 
              transition-colors
            ">
              <span>⚙️</span>
              <span>Settings</span>
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-600 text-sm font-medium">
                  Total Events
                </span>
                <span className="text-3xl">🎉</span>
              </div>
              <div className="text-3xl font-bold text-gray-900">24</div>
              <div className="text-green-600 text-sm font-medium mt-2">
                ↑ 12% from last month
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-600 text-sm font-medium">
                  Registrations
                </span>
                <span className="text-3xl">👥</span>
              </div>
              <div className="text-3xl font-bold text-gray-900">1,234</div>
              <div className="text-green-600 text-sm font-medium mt-2">
                ↑ 8% from last month
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-600 text-sm font-medium">
                  Revenue
                </span>
                <span className="text-3xl">💰</span>
              </div>
              <div className="text-3xl font-bold text-gray-900">
                KSh 3.2M
              </div>
              <div className="text-green-600 text-sm font-medium mt-2">
                ↑ 24% from last month
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-600 text-sm font-medium">
                  Feedback
                </span>
                <span className="text-3xl">⭐</span>
              </div>
              <div className="text-3xl font-bold text-gray-900">4.8</div>
              <div className="text-gray-600 text-sm font-medium mt-2">
                Average rating
              </div>
            </div>
          </div>

          {/* Recent Events Table */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                Recent Events
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Event Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Registrations
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">
                        Tech Conference 2024
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      Dec 15, 2024
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      245
                    </td>
                    <td className="px-6 py-4">
                      <span className="
                        px-3 py-1 
                        bg-green-100 
                        text-green-700 
                        rounded-full 
                        text-sm 
                        font-medium
                      ">
                        Active
                      </span>
                    </td>
                  </tr>
                  {/* More rows... */}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
```

---

## 🎯 Best Practices Checklist

### Layout Best Practices
- ✅ Use semantic HTML elements (`<header>`, `<main>`, `<section>`, `<footer>`)
- ✅ Implement consistent spacing throughout your application
- ✅ Create reusable layout components
- ✅ Use container classes to maintain maximum width
- ✅ Implement sticky headers for better navigation

### Responsive Design Best Practices
- ✅ Always design mobile-first
- ✅ Test on multiple screen sizes
- ✅ Use responsive typography
- ✅ Hide/show elements appropriately on different screens
- ✅ Use flexible grid systems

### Tailwind Best Practices
- ✅ Group related utility classes together
- ✅ Use the `@apply` directive for repeated patterns
- ✅ Extract components when you see duplication
- ✅ Use custom CSS variables for brand colors
- ✅ Leverage Tailwind's built-in utilities before writing custom CSS

### Performance Best Practices
- ✅ Remove unused Tailwind classes in production
- ✅ Use transitions sparingly
- ✅ Optimize images with proper sizing
- ✅ Lazy load images below the fold
- ✅ Use CSS containment when appropriate

---

## 🚀 Project Structure

```
event-management/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── PageLayout.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── ui/
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Input.jsx
│   │   │   └── Select.jsx
│   │   ├── events/
│   │   │   ├── EventCard.jsx
│   │   │   ├── EventGrid.jsx
│   │   │   └── EventDetails.jsx
│   │   └── forms/
│   │       ├── RegistrationForm.jsx
│   │       └── FeedbackForm.jsx
│   ├── pages/
│   │   ├── EventsPage.jsx
│   │   ├── EventDetailsPage.jsx
│   │   ├── RegistrationPage.jsx
│   │   └── Dashboard.jsx
│   ├── styles/
│   │   └── index.css
│   └── App.jsx
└── tailwind.config.js
```

---

## 📚 Additional Resources

- [Tailwind CSS 4 Documentation](https://tailwindcss.com)
- [Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Responsive Design Patterns](https://web.dev/patterns/layout/)
- [Tailwind Play (Online Editor)](https://play.tailwindcss.com)

---

## 💡 Tips for Learning

1. **Start Simple**: Begin with basic layouts and gradually add complexity
2. **Experiment**: Use Tailwind Play to test ideas quickly
3. **Study Examples**: Look at well-designed websites and try to recreate layouts
4. **Build Real Projects**: The best way to learn is by building
5. **Use Dev Tools**: Chrome/Firefox dev tools help you understand how layouts work

Happy coding! 🎨✨