"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

export default function useRole() {
  const { user, isLoaded } = useUser();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRole = async () => {
      try {
        if (!isLoaded || !user) {
          setLoading(false);
          return;
        }

        const API_URL = process.env.NEXT_PUBLIC_API_URL;

        if (!API_URL) {
          throw new Error("NEXT_PUBLIC_API_URL is not defined");
        }

        const res = await fetch(`${API_URL}/api/auth/sync`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            clerkId: user.id,
            email: user.emailAddresses?.[0]?.emailAddress,
          }),
        });

        if (!res.ok) {
          throw new Error("Failed to sync user role");
        }

        const data = await res.json();

        setRole(data.role || null);
      } catch (err) {
        console.error("ROLE FETCH ERROR:", err);
        setRole(null);
      } finally {
        setLoading(false);
      }
    };

    getRole();
  }, [isLoaded, user]);

  return { role, loading };
}