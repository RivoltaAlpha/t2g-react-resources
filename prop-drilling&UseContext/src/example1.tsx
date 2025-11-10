import React, { useState, createContext, useContext } from 'react';
import { Sun, Moon, User, Settings, Bell, LogOut, Calendar, Users, AlertCircle } from 'lucide-react';

// ============================================================================
// PART 1: THE PROBLEM - PROP DRILLING EXAMPLE
// ============================================================================

// Type definitions
interface UserProfile {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'organizer' | 'attendee';
  avatar?: string;
}

interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  eventReminders: boolean;
}

// Without Context - Props have to be passed through every level
function PropDrillingExample() {
  const [user] = useState<UserProfile>({
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "organizer"
  });
  
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    pushNotifications: false,
    eventReminders: true
  });

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} p-8`}>
      <div className="max-w-6xl mx-auto">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <h3 className="font-bold text-red-900 mb-2">❌ Prop Drilling Problem</h3>
          <p className="text-red-800 text-sm">
            Notice how user, theme, and notifications are passed through multiple components
            that don't even use them - they just pass them down!
          </p>
        </div>
        
        {/* Level 1: Dashboard - passes props down */}
        <Dashboard 
          user={user} 
          theme={theme} 
          setTheme={setTheme}
          notifications={notifications}
          setNotifications={setNotifications}
        />
      </div>
    </div>
  );
}

// Level 2: Dashboard component - doesn't use most props, just passes them
function Dashboard({ user, theme, setTheme, notifications, setNotifications }: {
  user: UserProfile;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  notifications: NotificationSettings;
  setNotifications: (notifications: NotificationSettings) => void;
}) {
  return (
    <div>
      {/* Header needs user and theme */}
      <Header user={user} theme={theme} setTheme={setTheme} />
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sidebar needs user and notifications */}
        <Sidebar 
          user={user} 
          notifications={notifications}
          setNotifications={setNotifications}
        />
        
        <div className="md:col-span-2">
          <MainContent user={user} theme={theme} />
        </div>
      </div>
    </div>
  );
}

// Level 3: Header - uses some props
function Header({ user, theme, setTheme }: {
  user: UserProfile;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}) {
  return (
    <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-4 flex justify-between items-center`}>
      <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
        Events Dashboard
      </h1>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-gray-700 text-yellow-400' : 'bg-gray-100 text-gray-700'}`}
        >
          {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
        </button>
        {/* UserMenu needs user but has to receive it through props */}
        <UserMenu user={user} theme={theme} />
      </div>
    </div>
  );
}

// Level 4: UserMenu - finally uses the user prop
function UserMenu({ user, theme }: { user: UserProfile; theme: 'light' | 'dark' }) {
  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
      <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
        {user.name.charAt(0)}
      </div>
      <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
        {user.name}
      </span>
    </div>
  );
}

// Level 3: Sidebar - passes props deeper
function Sidebar({ user, notifications, setNotifications }: {
  user: UserProfile;
  notifications: NotificationSettings;
  setNotifications: (notifications: NotificationSettings) => void;
}) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <UserProfile user={user} />
      <NotificationPanel notifications={notifications} setNotifications={setNotifications} />
    </div>
  );
}

// Level 4: Finally uses the props
function UserProfile({ user }: { user: UserProfile }) {
  return (
    <div className="mb-6 pb-6 border-b">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
          {user.name.charAt(0)}
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">{user.name}</h3>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>
      <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
        {user.role}
      </span>
    </div>
  );
}

// Level 4: Finally uses the props
function NotificationPanel({ notifications, setNotifications }: {
  notifications: NotificationSettings;
  setNotifications: (notifications: NotificationSettings) => void;
}) {
  return (
    <div>
      <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
        <Bell className="w-4 h-4" />
        Notifications
      </h3>
      <div className="space-y-2">
        {Object.entries(notifications).map(([key, value]) => (
          <label key={key} className="flex items-center justify-between text-sm">
            <span className="text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
            <input
              type="checkbox"
              checked={value}
              onChange={(e) => setNotifications({
                ...notifications,
                [key]: e.target.checked
              })}
              className="rounded"
            />
          </label>
        ))}
      </div>
    </div>
  );
}

// Level 3: MainContent
function MainContent({ user, theme }: { user: UserProfile; theme: 'light' | 'dark' }) {
  return (
    <div className={`${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'} rounded-lg shadow p-6`}>
      <h2 className="text-xl font-bold mb-4">Welcome back, {user.name}!</h2>
      <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
        This component received user and theme through props from 3 levels up!
      </p>
    </div>
  );
}

// ============================================================================
// PART 2: THE SOLUTION - CONTEXT API
// ============================================================================

// Create Contexts
const UserContext = createContext<UserProfile | null>(null);
const ThemeContext = createContext<{
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
} | null>(null);
const NotificationContext = createContext<{
  notifications: NotificationSettings;
  setNotifications: (notifications: NotificationSettings) => void;
} | null>(null);

// Custom hooks for easy context access
function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
}

function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}

function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotifications must be used within NotificationProvider');
  return context;
}

// Context version - clean and simple!
function ContextExample() {
  const [user] = useState<UserProfile>({
    id: 1,
    name: "Bob Smith",
    email: "bob@example.com",
    role: "admin"
  });
  
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    pushNotifications: false,
    eventReminders: true
  });

  return (
    <UserContext.Provider value={user}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <NotificationContext.Provider value={{ notifications, setNotifications }}>
          <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} p-8`}>
            <div className="max-w-6xl mx-auto">
              <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
                <h3 className="font-bold text-green-900 mb-2">✅ Context Solution</h3>
                <p className="text-green-800 text-sm">
                  Components can access user, theme, and notifications directly using useContext -
                  no prop drilling needed!
                </p>
              </div>
              
              <DashboardWithContext />
            </div>
          </div>
        </NotificationContext.Provider>
      </ThemeContext.Provider>
    </UserContext.Provider>
  );
}

// No props needed - everything comes from context!
function DashboardWithContext() {
  return (
    <div>
      <HeaderWithContext />
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <SidebarWithContext />
        <div className="md:col-span-2">
          <MainContentWithContext />
        </div>
      </div>
    </div>
  );
}

function HeaderWithContext() {
  const user = useUser();
  const { theme, setTheme } = useTheme();
  
  return (
    <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-4 flex justify-between items-center`}>
      <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
        Events Dashboard
      </h1>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-gray-700 text-yellow-400' : 'bg-gray-100 text-gray-700'}`}
        >
          {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
        </button>
        <UserMenuWithContext />
      </div>
    </div>
  );
}

function UserMenuWithContext() {
  const user = useUser();
  const { theme } = useTheme();
  
  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
        {user.name.charAt(0)}
      </div>
      <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
        {user.name}
      </span>
    </div>
  );
}

function SidebarWithContext() {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <UserProfileWithContext />
      <NotificationPanelWithContext />
    </div>
  );
}

function UserProfileWithContext() {
  const user = useUser();
  
  return (
    <div className="mb-6 pb-6 border-b">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
          {user.name.charAt(0)}
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">{user.name}</h3>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>
      <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
        {user.role}
      </span>
    </div>
  );
}

function NotificationPanelWithContext() {
  const { notifications, setNotifications } = useNotifications();
  
  return (
    <div>
      <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
        <Bell className="w-4 h-4" />
        Notifications
      </h3>
      <div className="space-y-2">
        {Object.entries(notifications).map(([key, value]) => (
          <label key={key} className="flex items-center justify-between text-sm">
            <span className="text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
            <input
              type="checkbox"
              checked={value}
              onChange={(e) => setNotifications({
                ...notifications,
                [key]: e.target.checked
              })}
              className="rounded"
            />
          </label>
        ))}
      </div>
    </div>
  );
}

function MainContentWithContext() {
  const user = useUser();
  const { theme } = useTheme();
  
  return (
    <div className={`${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'} rounded-lg shadow p-6`}>
      <h2 className="text-xl font-bold mb-4">Welcome back, {user.name}!</h2>
      <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
        This component gets user and theme directly from context - no props needed!
      </p>
    </div>
  );
}

// ============================================================================
// MAIN APP WITH TOGGLE
// ============================================================================

export default function App() {
  const [showPropDrilling, setShowPropDrilling] = useState(true);

  return (
    <div>
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setShowPropDrilling(!showPropDrilling)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg shadow-lg font-semibold transition-colors"
        >
          {showPropDrilling ? 'Show Context Solution ✅' : 'Show Prop Drilling Problem ❌'}
        </button>
      </div>
      
      {showPropDrilling ? <PropDrillingExample /> : <ContextExample />}
    </div>
  );
}