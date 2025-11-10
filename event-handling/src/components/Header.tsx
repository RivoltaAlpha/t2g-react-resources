import { useTheme } from "./ThemeContext";

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header style={{ background: theme === 'light' ? '#fff' : '#333' }}>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
    </header>
  );
}