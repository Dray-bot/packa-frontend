"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { motion } from "framer-motion";

export default function AdminAnalytics() {
  const { user } = useUser();

  const [stats, setStats] = useState(null);
  const [riders, setRiders] = useState([]);
  const [loading, setLoading] = useState(true);

  const isAdmin = user?.id === process.env.NEXT_PUBLIC_ADMIN_ID;

  useEffect(() => {
    if (!user?.id) return;

    const load = async () => {
      setLoading(true);

      try {
        const [s, r] = await Promise.all([
          fetch("http://localhost:5000/api/admin/stats").then((r) => r.json()),
          fetch("http://localhost:5000/api/admin/riders").then((r) => r.json()),
        ]);

        setStats(s);
        setRiders(r);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [user?.id]);

  if (!isAdmin) {
    return (
      <div className="min-h-screen grid place-items-center text-red-500">
        Access denied
      </div>
    );
  }

  if (loading || !stats) {
    return (
      <div className="min-h-screen grid place-items-center text-slate-500">
        Loading analytics...
      </div>
    );
  }

  const pieData = [
    { name: "Pending", value: stats.pending },
    { name: "Delivered", value: stats.delivered },
  ];

  const COLORS = ["#f59e0b", "#22c55e"];

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white text-slate-900">

      {/* HEADER */}
      <div className="sticky top-0 z-10 backdrop-blur-xl bg-white/70 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-5 flex items-center justify-between">

          <div>
            <h1 className="text-2xl md:text-3xl font-semibold">
              Control Center
            </h1>
            <p className="text-slate-500 text-sm">
              Live system intelligence
            </p>
          </div>

          <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700">
            LIVE
          </span>

        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 space-y-8">

        {/* KPI */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          <Kpi title="Shipments" value={stats.totalShipments} />
          <Kpi title="Pending" value={stats.pending} />
          <Kpi title="Delivered" value={stats.delivered} />
          <Kpi title="Revenue" value={`₦${stats.earnings}`} />

        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/70 backdrop-blur-xl rounded-2xl p-5 shadow-sm"
          >
            <h2 className="text-sm text-slate-600 mb-4">
              Delivery Flow
            </h2>

            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  outerRadius={90}
                >
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-white/70 backdrop-blur-xl rounded-2xl p-5 shadow-sm"
          >
            <h2 className="text-sm text-slate-600 mb-4">
              Rider Efficiency
            </h2>

            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={riders}>
                <XAxis dataKey="email" hide />
                <YAxis />
                <Tooltip />
                <Bar dataKey="successRate" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

        </div>

        {/* RIDERS */}
        <div className="space-y-3">

          <h2 className="text-sm text-slate-600">
            Active Riders
          </h2>

          <div className="grid gap-3">

            {riders.map((r, i) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="bg-white/70 backdrop-blur-xl rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
              >

                <div>
                  <p className="font-medium break-all">
                    {r.email}
                  </p>

                  <p className="text-xs text-slate-500">
                    Success rate {r.successRate}%
                  </p>
                </div>

                <div className="flex items-center gap-3">

                  <div className="text-sm font-semibold text-slate-700">
                    {r.delivered}/{r.totalAssigned}
                  </div>

                  <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500"
                      style={{ width: `${r.successRate}%` }}
                    />
                  </div>

                </div>

              </motion.div>
            ))}

          </div>

        </div>

      </div>
    </div>
  );
}

/* KPI CARD */
function Kpi({ title, value }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-white/70 backdrop-blur-xl rounded-2xl p-4 shadow-sm"
    >
      <p className="text-xs text-slate-500">{title}</p>
      <p className="text-xl font-semibold mt-1">{value}</p>
    </motion.div>
  );
}