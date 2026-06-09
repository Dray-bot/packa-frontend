"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "Do I need to pay to start?",
    a: "No. You can create an account and start free. Payment happens only when you initiate a shipment.",
  },
  {
    q: "Can I track deliveries in real time?",
    a: "Yes. Every shipment includes live tracking powered by Socket.IO updates.",
  },
  {
    q: "Is this system built for scale?",
    a: "Yes. It supports riders, admins, and high-volume logistics operations.",
  },
  {
    q: "What happens after I create a shipment?",
    a: "It gets processed instantly, assigned, and tracked inside your dashboard.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState(null);

  return (
    <section className="bg-white py-24 md:py-32 border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 md:px-6">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          className="text-center mb-14"
        >
          <p className="text-xs tracking-[0.3em] text-green-600 uppercase">
            FAQ
          </p>

          <h2 className="mt-5 text-5xl md:text-6xl text-slate-900">
            Questions, answered
          </h2>

          <p className="text-slate-500 mt-4">
            Everything you need to know before getting started.
          </p>
        </motion.div>

        {/* FAQ LIST */}
        <div className="space-y-3">
          {faqs.map((item, i) => (
            <div
              key={i}
              className="border border-slate-100 rounded-2xl overflow-hidden"
            >
              {/* QUESTION */}
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left px-5 py-4 flex justify-between items-center hover:bg-slate-50 transition"
              >
                <span className="font-medium text-slate-900">
                  {item.q}
                </span>

                <span className="text-slate-400 text-lg">
                  {open === i ? "−" : "+"}
                </span>
              </button>

              {/* ANSWER */}
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="px-5 pb-4 text-slate-500 text-sm leading-relaxed"
                  >
                    {item.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}