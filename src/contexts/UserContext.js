// src/contexts/UserContext.js
"use client";

import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/getUserDetails");
        const data = await res.json();
        if (res.ok) {
          setUser(data.user);
        } else {
          setError(data.error);
        }
      } catch (err) {
        console.error("Error fetching user details:", err);
        setError("Error fetching user details");
      }
    }
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, error }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
