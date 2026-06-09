"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    toast.success("Payment successful");

    setTimeout(() => {
      router.push("/dashboard");
    }, 1500);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-xl font-semibold">Payment Success 🚀</h1>
    </div>
  );
}