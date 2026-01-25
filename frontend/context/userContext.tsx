// context/UserContext.tsx
import { createContext, useState, ReactNode } from "react";
import { setAccessToken, setRefreshToken, clearTokens } from "@/lib/token";

const API_URL = "http://192.168.1.5:8080/api/"; // Replace with your actual IP

type User = {
  email: string;
};

type UserContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (fullName: string, email: string, barangay: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
});

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  async function login(email: string, password: string) {
  try{
     const res = await fetch(`${API_URL}auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "ReactNative", // IMPORTANT for backend to detect
      },
      body: JSON.stringify({
        email: email,      // ✅ Changed from 'email'
        password: password, // ✅ Changed from 'password'
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Invalid credentials");
    }

    // Store tokens
    await setAccessToken(data.accessToken);
    await setRefreshToken(data.refreshToken);

    setUser({ email });
  }catch(error){
     if (error instanceof Error) {
        throw new Error(error.message)
      }
      throw new Error("Registration failed")
  }
  }

  async function register(fullName: string, email: string, barangay: string, password: string) {
   try{
     const res = await fetch(`${API_URL}auth/register`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "User-Agent": "ReactNative",
      },
      body: JSON.stringify({
        fullName: fullName,        // ✅ Use fullName instead of email.split
        email: email,          // ✅ Correct field name
        password: password,    // ✅ Correct field name
        barangay:barangay,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Registration failed");
    }

    // Auto-login after registration
    await login(email, password);

   }catch(error){
   if (error instanceof Error) {
        throw new Error(error.message)
      }
      throw new Error("Login failed")
   }
  }

  async function logout() {
    try {
      // Optional: Call backend logout endpoint
      await fetch(`${API_URL}auth/logout`, {
        method: "POST",
        headers: {
          "User-Agent": "ReactNative",
        },
      });
    } catch (error) {
      console.log("Logout error:", error);
    } finally {
      // Clear tokens and user state regardless
      await clearTokens();
      setUser(null);
    }
  }

  return (
    <UserContext.Provider value={{ user, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
}