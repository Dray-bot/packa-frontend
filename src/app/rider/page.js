"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function RiderPage() {
  const { user, isLoaded } = useUser();

  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [deliveries, setDeliveries] = useState([]);

  const fetchRole = useCallback(async () => {
    if (!user?.id) return;

    try {
      const res = await fetch(`${API_BASE}/api/auth/users`);
      const data = await res.json();

      if (!Array.isArray(data)) return;

      const me = data.find((u) => u.clerk_id === user.id);
      setRole(me?.role || null);
    } catch {
      toast.error("Network error");
    }
  }, [user]);

  const fetchDeliveries = useCallback(async () => {
    if (!user?.id) return;

    try {
      setRefreshing(true);

      const res = await fetch(`${API_BASE}/api/shipments/rider`, {
        headers: { "x-clerk-id": user.id },
      });

      const data = await res.json();

      if (!res.ok) return toast.error("Failed to load jobs");

      setDeliveries(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Network error");
    } finally {
      setRefreshing(false);
    }
  }, [user]);

  const updateStatus = async (shipmentId, status) => {
    try {
      setLoading(true);

      const res = await fetch(
        `${API_BASE}/api/shipments/update-status`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-clerk-id": user.id,
          },
          body: JSON.stringify({ shipmentId, status }),
        }
      );

      const data = await res.json();

      if (!res.ok) return toast.error(data.message || "Update failed");

      toast.success("Updated");

      fetchDeliveries();
    } catch {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoaded || !user?.id) return;

    const run = async () => {
      try {
        await fetchRole();
      } catch (e) {}
    };

    run();
  }, [isLoaded, user?.id, fetchRole]);

  useEffect(() => {
    if (role !== "rider") return;

    const loadDeliveries = async () => {
      await fetchDeliveries();
    };

    loadDeliveries();
  }, [role, fetchDeliveries]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen grid place-items-center text-slate-500">
        Loading rider hub...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen grid place-items-center text-red-500">
        Sign in required
      </div>
    );
  }

  if (!role) {
    return (
      <div className="min-h-screen grid place-items-center text-red-500">
        Account not found
      </div>
    );
  }

  if (role !== "rider") {
    return (
      <div className="min-h-screen grid place-items-center text-red-500">
        Access locked to riders
      </div>
    );
  }

  const pending = deliveries.filter((d) => d.status === "pending").length;
  const done = deliveries.filter((d) => d.status === "delivered").length;

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white">

      {/* HEADER */}
      <div className="sticky top-0 z-20 backdrop-blur-xl bg-white/70 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">
              Rider Hub
            </h1>
            <p className="text-slate-500 text-sm">
              Live delivery control center
            </p>
          </div>

          <button
            onClick={fetchDeliveries}
            disabled={refreshing}
            className="w-full md:w-auto px-4 py-2.5 rounded-xl bg-slate-900 text-white hover:opacity-90 transition"
          >
            {refreshing ? "Syncing..." : "Refresh"}
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-6 grid grid-cols-1 sm:grid-cols-3 gap-4">

        <Stat label="Total" value={deliveries.length} />
        <Stat label="Pending" value={pending} highlight="amber" />
        <Stat label="Delivered" value={done} highlight="green" />

      </div>

      {/* LIST */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 pb-10 space-y-4">

        {deliveries.length === 0 ? (
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-10 text-center text-slate-500">
            No deliveries assigned yet
          </div>
        ) : (
          deliveries.map((job, i) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="bg-white/70 backdrop-blur-xl rounded-2xl p-5 shadow-sm"
            >

              <div className="flex flex-col lg:flex-row lg:justify-between gap-4">

                <div className="space-y-1">
                  <h3 className="font-semibold text-lg text-slate-900">
                    {job.title || "Delivery Job"}
                  </h3>

                  <p className="text-sm text-slate-500 font-mono">
                    {job.tracking_id}
                  </p>

                  <p className="text-sm text-slate-600">
                    {job.pickup} → {job.dropoff}
                  </p>

                  <Status status={job.status} />
                </div>

                <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">

                  <button
                    onClick={() => updateStatus(job.id, "picked")}
                    disabled={loading}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
                  >
                    Picked
                  </button>

                  <button
                    onClick={() => updateStatus(job.id, "delivered")}
                    disabled={loading}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 transition"
                  >
                    Done
                  </button>

                </div>

              </div>

            </motion.div>
          ))
        )}

      </div>
    </div>
  );
}

/* STAT CARD */
function Stat({ label, value, highlight }) {
  const colors = {
    amber: "text-amber-600",
    green: "text-green-600",
  };

  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-5 shadow-sm">
      <p className="text-slate-500 text-sm">{label}</p>
      <h2 className={`text-2xl font-bold mt-2 ${colors[highlight] || "text-slate-900"}`}>
        {value}
      </h2>
    </div>
  );
}

/* STATUS CHIP */
function Status({ status }) {
  const map = {
    pending: "bg-amber-100 text-amber-700",
    picked: "bg-blue-100 text-blue-700",
    delivered: "bg-green-100 text-green-700",
  };

  return (
    <span
      className={`inline-block mt-2 text-xs px-3 py-1 rounded-full ${
        map[status] || "bg-slate-100 text-slate-600"
      }`}
    >
      {status}
    </span>
  );
}