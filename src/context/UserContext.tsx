"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type User = {
  isActive: boolean;
  plan: string;
  shopId: string;
  shopName: string;
};

type UserContextType = {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({
  children,
  initialUser,
}: {
  children: ReactNode;
  initialUser?: User | null;
}) {
  const [user, setUser] = useState<User | null>(initialUser || null);
  const [loading, setLoading] = useState(true);

  // 🔁 Restore user after refresh
useEffect(() => {
  const storedUser = sessionStorage.getItem("user");

  if (storedUser && storedUser !== "undefined") {
    setUser(JSON.parse(storedUser));
  }

  setLoading(false);
}, []);


  return (
    <UserContext.Provider value={{ user, loading, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
}
