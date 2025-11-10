import { useState, createContext, useContext } from 'react';
import { User, Sun, Moon } from 'lucide-react';

// ============================================================================
// PART 1: PROP DRILLING - THE PROBLEM
// ============================================================================

function PropDrillingExample() {
  const [username, setUsername] = useState("Tiffany");
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <div className={`min-h-screen p-20 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <h1 className={`text-4xl mb-10 ${theme === 'dark'? 'text-white' : 'text-black'}`}>Main Container</h1>
      <div className="max-w-8xl mx-auto">
        {/* We pass props down to Level1 */}
        <Level1 username={username} theme={theme} setTheme={setTheme} />
      </div>
    </div>
  );
}

// Level 1: Doesn't use username or theme, just passes them down
function Level1({ username, theme, setTheme }: { 
  username: string; 
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}) {
   
  return (
    <div className={`border-4 border-red-300 rounded-lg p-8 mb-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
      <h3 className={`font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
        📦 Level 1 - Just passing props down...
      </h3>
      {/* We pass props down to Level2 */}
      <Level2 username={username} theme={theme} setTheme={setTheme} />
    </div>
  );
}

// Level 2: Still doesn't use them, keeps passing down
function Level2({ username, theme, setTheme }: { 
  username: string; 
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}) {
  return (
    <div className={`border-4 border-red-400 rounded-lg p-8 mb-6 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
      <h3 className={`font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
        📦 Level 2 - Still just passing props...
      </h3>
      
      {/* We pass props down to Level3 */}
      <Level3 username={username} theme={theme} setTheme={setTheme} />
    </div>
  );
}

// Level 3: FINALLY uses the props!
function Level3({ username, theme, setTheme }: { 
  username: string; 
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}) {
  return (
    <div className={`border-4 border-red-500 rounded-lg p-8 ${theme === 'dark' ? 'bg-gray-600' : 'bg-white'}`}>
      <h3 className={`font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
        🎯 Level 3 - Finally using the props!
      </h3>
      
      <div className="flex items-center gap-4 mb-6">
        <User className={`w-6 h-6 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`} />
        <span className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
          Hello, {username}!
        </span>
      </div>
      
      <button
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        className="flex items-center gap-3 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600"
      >
        {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        Toggle Theme
      </button>
      
      <p className={`mt-6 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
        😫 We had to pass username and theme through 3 components to get here!
      </p>
    </div>
  );
}

// ============================================================================
// PART 2: CONTEXT - THE SOLUTION
// ============================================================================

// Step 1: Create a Context
const UserContext = createContext<string>('');
const ThemeContext = createContext<{
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}>({ theme: 'light', setTheme: () => {} });

function ContextExample() {
  const [username, setUsername] = useState("Bob");
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    // Step 2: Wrap your app with Providers
    <UserContext.Provider value={username}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <div className={`min-h-screen p-8 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <div className="max-w-2xl mx-auto">
            <div className="bg-green-100 border-2 border-green-400 rounded-lg p-8 mb-10">
              <h2 className="text-xl font-bold text-green-900 mb-4">✅ Solution: Context</h2>
              <p className="text-green-800">
                No prop drilling! Any component can access username and theme directly 
                using useContext!
              </p>
            </div>

            {/* No props needed! */}
            <Level1WithContext />
          </div>
        </div>
      </ThemeContext.Provider>
    </UserContext.Provider>
  );
}

// Level 1: No props needed!
function Level1WithContext() {
  const { theme } = useContext(ThemeContext);
  
  return (
    <div className={`border-4 border-green-300 rounded-lg p-8 mb-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
      <h3 className={`font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
        📦 Level 1 - No props needed!
      </h3>
      
      <Level2WithContext />
    </div>
  );
}

// Level 2: No props needed!
function Level2WithContext() {
  const { theme } = useContext(ThemeContext);
  
  return (
    <div className={`border-4 border-green-400 rounded-lg p-8 mb-6 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
      <h3 className={`font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
        📦 Level 2 - No props needed!
      </h3>
      
      <Level3WithContext />
    </div>
  );
}

// Level 3: Uses useContext to get the data directly!
function Level3WithContext() {
  // Step 3: Use useContext to access the values
  const username = useContext(UserContext);
  const { theme, setTheme } = useContext(ThemeContext);
  
  return (
    <div className={`border-4 border-green-500 rounded-lg p-8 ${theme === 'dark' ? 'bg-gray-600' : 'bg-white'}`}>
      <h3 className={`font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
        🎯 Level 3 - Using context directly!
      </h3>
      
      <div className="flex items-center gap-4 mb-6">
        <User className={`w-6 h-6 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`} />
        <span className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
          Hello, {username}!
        </span>
      </div>
      
      <button
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        className="flex items-center gap-3 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
      >
        {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        Toggle Theme
      </button>
      
      <p className={`mt-6 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
        😊 We got username and theme directly with useContext - no prop drilling!
      </p>
    </div>
  );
}

// ============================================================================
// MAIN APP
// ============================================================================

export default function App() {
  const [showContext, setShowContext] = useState(false);

  return (
    <div>
      {/* Toggle Button */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setShowContext(!showContext)}
          className={`px-6 py-3 rounded-lg shadow-lg font-bold text-white transition-all ${
            showContext 
              ? 'bg-red-500 hover:bg-red-600' 
              : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          {showContext ? '❌ Show Prop Drilling' : '✅ Show Context Solution'}
        </button>
      </div>

      {/* Show either example */}
      {showContext ? <ContextExample /> : <PropDrillingExample />}
    </div>
  );
}