"use client";

import { motion } from "framer-motion";

const reviews = [
  {
    name: "Ayo Logistics",
    role: "Business User",
    text: "Delivery time dropped from 3 days to same-day dispatch.",
    tag: "Efficiency +220%",
  },
  {
    name: "Chinedu Store",
    role: "Merchant",
    text: "Tracking system is clean. Customers trust my store more now.",
    tag: "Trust boost",
  },
  {
    name: "Rider Unit 07",
    role: "Courier",
    text: "Assignments are clear. No confusion, no missed deliveries.",
    tag: "Operations stable",
  },
];

export default function TrustSection() {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-4 md:px-6">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 md:mb-20"
        >
          <p className="text-xs tracking-[0.35em] text-green-600 uppercase">
            System Validation Layer
          </p>

          <h2 className="mt-4 text-5xl md:text-7xl leading-[0.9] text-slate-900">
            Real users. Real system output.
          </h2>

          <p className="text-slate-500 mt-5 max-w-2xl">
            Every signal below comes from active logistics operations. No fake feedback. Just system performance.
          </p>
        </motion.div>

        {/* STREAM LAYOUT */}
        <div className="space-y-10">

          {reviews.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-10"
            >

              {/* LEFT SIGNAL */}
              <div className="flex items-center gap-3 min-w-55">
                <div className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></div>

                <div>
                  <p className="text-sm font-medium text-slate-900">
                    {item.name}
                  </p>
                  <p className="text-xs text-slate-400">
                    {item.role}
                  </p>
                </div>
              </div>

              {/* MAIN TEXT */}
              <div className="flex-1">
                <p className="text-slate-700 text-base md:text-lg leading-relaxed">
                  {item.text}
                </p>
              </div>

              {/* TAG */}
              <div className="text-xs text-green-600 tracking-wide whitespace-nowrap">
                {item.tag}
              </div>

            </motion.div>
          ))}

        </div>

        {/* FOOT NOTE */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-xs text-slate-400 tracking-widest"
        >
          LIVE SYSTEM FEEDBACK • VERIFIED OPERATIONS • REAL DELIVERY DATA
        </motion.div>

      </div>
    </section>
  );
}