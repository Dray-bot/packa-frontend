"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

export default function useRole() {
  const { user, isLoaded } = useUser();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRole = async () => {
      if (!isLoaded || !user) return;

      try {
        const res = await fetch(
          "http://localhost:5000/api/auth/sync",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              clerkId: user.id,
              email: user.emailAddresses?.[0]?.emailAddress,
            }),
          }
        );

        const data = await res.json();

        setRole(data.role);
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