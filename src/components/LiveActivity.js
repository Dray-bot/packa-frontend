"use client";

import { motion } from "framer-motion";
import { Bebas_Neue } from "next/font/google";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});

const data = [
  {
    id: "PK-1029",
    status: "In Transit",
    location: "Victoria Island",
    rider: "Assigned",
    time: "2m ago",
  },
  {
    id: "PK-1030",
    status: "Picked Up",
    location: "Ikeja",
    rider: "John D.",
    time: "5m ago",
  },
  {
    id: "PK-1031",
    status: "Delivered",
    location: "Surulere",
    rider: "Mike K.",
    time: "12m ago",
  },
  {
    id: "PK-1032",
    status: "Processing",
    location: "Lekki",
    rider: "Pending",
    time: "Just now",
  },
];

export default function LiveMatrix() {
  return (
    <section className="bg-white py-20 md:py-32">
      <div className="max-w-6xl mx-auto px-4 md:px-6">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-14"
        >
          <p className="text-xs tracking-[0.3em] text-green-600 uppercase">
            System Feed
          </p>

          <h2 className="mt-4 text-5xl md:text-7xl leading-[0.9] text-slate-900">
            Live Shipment Matrix
          </h2>

          <p className="mt-4 text-sm md:text-base text-slate-500 max-w-xl">
            Real-time logistics movement across riders, routes, and deliveries.
          </p>
        </motion.div>

        {/* TABLE WRAPPER */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-100 bg-white/90">

          {/* GRID BACKGROUND */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(59,130,246,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(59,130,246,0.12) 1px, transparent 1px)",
              backgroundSize: "52px 52px",
            }}
          />

          {/* SCROLL WRAPPER FOR MOBILE */}
          <div className="relative overflow-x-auto">

            {/* TABLE HEADER */}
            <div className="min-w-175 grid grid-cols-5 bg-white/80 backdrop-blur-sm text-xs text-slate-400 uppercase tracking-widest border-b border-slate-100 px-4 md:px-6 py-4">
              <div>ID</div>
              <div>Status</div>
              <div>Location</div>
              <div>Rider</div>
              <div>Time</div>
            </div>

            {/* ROWS */}
            <div className="min-w-175 divide-y divide-slate-100">

              {data.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className="grid grid-cols-5 px-4 md:px-6 py-4 md:py-5 items-center hover:bg-green-50/30 transition"
                >

                  {/* ID */}
                  <div className={`${bebas.className} text-base md:text-lg text-slate-900`}>
                    {item.id}
                  </div>

                  {/* STATUS */}
                  <div className={`${bebas.className}`}>
                    <span className="px-2 py-1 rounded-full text-green-700 bg-green-50 text-xs md:text-sm">
                      {item.status}
                    </span>
                  </div>

                  {/* LOCATION */}
                  <div className="text-slate-600 text-xs md:text-sm">
                    {item.location}
                  </div>

                  {/* RIDER */}
                  <div className="text-slate-600 text-xs md:text-sm">
                    {item.rider}
                  </div>

                  {/* TIME */}
                  <div className="text-slate-400 text-xs md:text-sm">
                    {item.time}
                  </div>

                </motion.div>
              ))}

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}