import { useTheme } from "./ThemeContext";

export default function Footer() {
  const { theme } = useTheme();
  
  return (
    <footer style={{ color: theme === 'light' ? '#000' : '#fff' }}>
      Current theme: {theme}
    </footer>
  );
}