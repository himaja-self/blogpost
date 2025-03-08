import { createContext, useContext, useState, ReactNode } from "react";
import { login as apiLogin, register as apiRegister } from "@/api/auth";
import { useNavigate } from "react-router-dom";

type User = {
  _id: string;
  email: string;
  role: 'user' | 'author' | 'admin';
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, role: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem("accessToken");
  });
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    try {
      const response = await apiLogin(email, password) as { user: User; accessToken: string; refreshToken: string };
      if (response?.user && response?.accessToken) {
        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem("refreshToken", response.refreshToken);
        localStorage.setItem("user", JSON.stringify(response.user));
        setUser(response.user);
        setIsAuthenticated(true);
      } else {
        throw new Error("Login failed");
      }
    } catch (error: any) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      setUser(null);
      setIsAuthenticated(false);
      if (error.message?.toLowerCase().includes('blocked')) {
        navigate('/blocked');
      }
      throw error;
    }
  };

  const register = async (email: string, password: string, role: string) => {
    try {
      await apiRegister(email, password, role);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}