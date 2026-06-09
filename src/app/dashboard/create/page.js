"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function CreateShipment() {
  const { user, isLoaded } = useUser();

  const [form, setForm] = useState({
    title: "",
    pickup: "",
    dropoff: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((p) => ({
      ...p,
      [e.target.name]: e.target.value,
    }));
  };

  const createShipment = async () => {
    if (!user?.id) return toast.error("Login required");

    if (!form.title || !form.pickup || !form.dropoff) {
      return toast.error("Complete all fields");
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${API_BASE}/api/payments/create-checkout-session`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: form.title,
            pickup: form.pickup,
            dropoff: form.dropoff,
            createdBy: user.id,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Checkout failed");
        return;
      }

      window.location.href = data.url;
    } catch {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-900 font-medium">
        Loading system...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">

      <div className="w-full max-w-xl space-y-8">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
            Create Shipment
          </h1>

          <p className="text-slate-700 mt-2 text-sm font-medium">
            Secure payment required before dispatch
          </p>
        </motion.div>

        {/* INFO */}
        <div className="bg-slate-900 text-white rounded-2xl p-4 text-sm font-medium">
          Payment activates live tracking and assigns a rider instantly
        </div>

        {/* FORM */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl p-6 shadow-md border border-slate-100 space-y-5"
        >

          <Field
            label="Package name"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="MacBook Pro delivery"
          />

          <Field
            label="Pickup location"
            name="pickup"
            value={form.pickup}
            onChange={handleChange}
            placeholder="Pickup address"
          />

          <Field
            label="Dropoff location"
            name="dropoff"
            value={form.dropoff}
            onChange={handleChange}
            placeholder="Destination address"
          />

          {/* CTA */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={createShipment}
            disabled={loading}
            className="w-full py-3.5 rounded-2xl bg-black text-white font-semibold hover:bg-neutral-800 transition flex items-center justify-center gap-2"
          >
            {loading ? "Redirecting to Stripe..." : "Continue to payment"}
          </motion.button>

          <p className="text-center text-xs text-slate-600 font-medium">
            You will complete secure checkout on Stripe
          </p>

        </motion.div>

        {/* FOOTER */}
        <div className="text-center text-xs text-slate-700 font-medium">
          Encrypted payments • Real-time tracking • Verified delivery system
        </div>

      </div>
    </div>
  );
}

/* FIELD */
function Field({ label, ...props }) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-semibold text-slate-900">
        {label}
      </label>

      <input
        {...props}
        className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-black outline-none transition"
      />
    </div>
  );
}