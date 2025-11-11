import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Auth Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// AuthProvider Component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<void> => {
    // Simulate API call
    if (email === "demo@kenyantea.com" && password === "password123") {
      const demoUser: User = {
        id: "1",
        name: "Demo User",
        email: "demo@kenyantea.com",
      };
      setUser(demoUser);
      localStorage.setItem("user", JSON.stringify(demoUser));
    } else {
      throw new Error("Invalid email or password");
    }
  };

  const register = async (name: string, email: string, _password: string): Promise<void> => {
    // Simulate API call - password validation would happen here in a real app
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
    };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Load user from localStorage on mount
  useState(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  });

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};