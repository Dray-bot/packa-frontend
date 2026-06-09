"use client";

import { useCallback, useEffect, useState } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Link from "next/link";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();

  const [loading, setLoading] = useState(false);
  const [trackingId, setTrackingId] = useState("");
  const [shipments, setShipments] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  /* =========================
     SYNC USER
  ========================== */
  useEffect(() => {
    const syncUser = async () => {
      if (!isLoaded || !user?.id) return;

      await fetch(`${API_BASE}/api/auth/sync`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clerkId: user.id,
          email: user.primaryEmailAddress?.emailAddress,
        }),
      }).catch(() => {});
    };

    syncUser();
  }, [isLoaded, user?.id, user?.primaryEmailAddress?.emailAddress]);

  /* =========================
     FETCH SHIPMENTS
  ========================== */
  const fetchShipments = useCallback(async () => {
    if (!user?.id) return;

    try {
      setHistoryLoading(true);

      const res = await fetch(
        `${API_BASE}/api/shipments/user/${user.id}`
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error("Failed to load shipments");
        return;
      }

      setShipments(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Network error");
    } finally {
      setHistoryLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!isLoaded || !user?.id) return;
    void Promise.resolve().then(fetchShipments);
  }, [isLoaded, user?.id, fetchShipments]);

  /* =========================
     APPLY RIDER
  ========================== */
  const applyRider = async () => {
    if (!user?.id) return;

    try {
      setLoading(true);

      const res = await fetch(
        `${API_BASE}/api/auth/apply-rider`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ clerkId: user.id }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed");
        return;
      }

      toast.success("Request sent");
    } catch {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     TRACK
  ========================== */
  const track = async () => {
    if (!trackingId) return toast.error("Enter tracking ID");

    try {
      const res = await fetch(
        `${API_BASE}/api/shipments/track/${trackingId}`
      );

      const data = await res.json();

      if (!res.ok) return toast.error("Not found");

      toast.success(`Status: ${data.status}`);
    } catch {
      toast.error("Network error");
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 via-white to-slate-50 text-slate-900">

      {/* HEADER */}
      <div className="sticky top-0 z-10 backdrop-blur-xl bg-white/70">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-2xl md:text-3xl font-semibold">
              Dashboard
            </h1>
            <p className="text-slate-500 text-sm">
              Welcome back, {user?.fullName}
            </p>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">

            <Link href="/dashboard/create">
              <button className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-green-600 text-white hover:bg-green-700 transition shadow-sm">
                New Shipment
              </button>
            </Link>

            <button
              onClick={() => signOut(() => (window.location.href = "/"))}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 text-white hover:opacity-90 transition"
            >
              Logout
            </button>

          </div>

        </div>
      </div>

      {/* BODY */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 space-y-10">

        {/* TRACKING */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-xl shadow-sm rounded-3xl p-5 md:p-6"
        >
          <h2 className="text-lg font-semibold">Track Shipment</h2>

          <p className="text-slate-500 text-sm mt-1">
            Live tracking system
          </p>

          <div className="flex flex-col md:flex-row gap-3 mt-4">

            <input
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              placeholder="Tracking ID"
              className="flex-1 px-4 py-3 rounded-xl bg-slate-50 outline-none focus:ring-2 focus:ring-green-500"
            />

            <button
              onClick={track}
              className="px-6 py-3 rounded-xl bg-green-600 text-white hover:bg-green-700 transition"
            >
              Track
            </button>

          </div>
        </motion.div>

        {/* ACTIONS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <Card
            title="Ship Package"
            desc="Send deliveries instantly"
            action="Create Shipment"
            href="/dashboard/create"
          />

          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-sm p-5 md:p-6">
            <h2 className="text-lg font-semibold">Become Rider</h2>
            <p className="text-slate-500 text-sm mt-1">
              Earn from deliveries
            </p>

            <button
              onClick={applyRider}
              disabled={loading}
              className="mt-4 w-full md:w-auto px-5 py-3 rounded-xl bg-black text-white hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Sending..." : "Apply Now"}
            </button>
          </div>

        </div>

        {/* HISTORY */}
        <div className="space-y-4">

          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Recent Shipments</h2>

            <button
              onClick={fetchShipments}
              className="text-sm text-green-600 hover:underline"
            >
              Refresh
            </button>
          </div>

          {historyLoading ? (
            <p className="text-slate-500">Loading...</p>
          ) : shipments.length === 0 ? (
            <p className="text-slate-500">No shipments yet</p>
          ) : (
            <div className="grid gap-3">

              {shipments.map((s, i) => (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="bg-white/80 backdrop-blur-xl shadow-sm rounded-2xl p-4"
                >
                  <div className="flex justify-between items-start gap-3">

                    <div>
                      <p className="font-medium">{s.title}</p>
                      <p className="text-sm text-slate-500">
                        {s.pickup} → {s.dropoff}
                      </p>
                      <p className="text-xs text-slate-400 mt-2 font-mono">
                        {s.tracking_id}
                      </p>
                    </div>

                    <Status status={s.status} />

                  </div>
                </motion.div>
              ))}

            </div>
          )}

        </div>

      </div>
    </div>
  );
}

/* CARD */
function Card({ title, desc, action, href }) {
  return (
    <div className="bg-white/80 backdrop-blur-xl shadow-sm rounded-3xl p-5 md:p-6 hover:shadow-md transition">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-slate-500 text-sm mt-1">{desc}</p>

      <Link href={href}>
        <button className="mt-4 px-5 py-3 rounded-xl bg-green-600 text-white hover:bg-green-700 transition w-full md:w-auto">
          {action}
        </button>
      </Link>
    </div>
  );
}

/* STATUS */
function Status({ status }) {
  const styles = {
    pending: "bg-yellow-100 text-yellow-700",
    assigned: "bg-blue-100 text-blue-700",
    delivered: "bg-green-100 text-green-700",
  };

  return (
    <span className={`text-xs px-3 py-1 rounded-full ${styles[status] || "bg-slate-100 text-slate-600"}`}>
      {status}
    </span>
  );
}