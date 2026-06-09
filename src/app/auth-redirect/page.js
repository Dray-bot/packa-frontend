"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function AuthRedirect() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded || !user) return;

    const syncAndRedirect = async () => {
      const res = await fetch(
        `${API_BASE}/api/auth/sync`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            clerkId: user.id,
            email: user.primaryEmailAddress?.emailAddress,
          }),
        }
      );

      const data = await res.json();

      if (data.role === "admin") {
        router.replace("/admin");
      } else if (data.role === "rider") {
        router.replace("/rider");
      } else {
        router.replace("/dashboard");
      }
    };

    syncAndRedirect();
  }, [isLoaded, user, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      Loading...
    </div>
  );
}