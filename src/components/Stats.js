"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function useCountUp(target, trigger) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    let start = 0;
    const duration = 1800;
    const step = target / (duration / 16);

    const id = setInterval(() => {
      start += step;

      if (start >= target) {
        setValue(target);
        clearInterval(id);
      } else {
        setValue(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(id);
  }, [trigger, target]);

  return value;
}

function Metric({ value, suffix = "", label, trigger }) {
  const count = useCountUp(value, trigger);

  return (
    <div className="space-y-2">
      <div className="text-6xl md:text-8xl font-semibold tracking-tight text-slate-900">
        {count}
        {suffix}
      </div>

      <div className="text-sm md:text-base text-slate-500 tracking-wide">
        {label}
      </div>
    </div>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section ref={ref} className="bg-white py-32 md:py-44">
      <div className="max-w-6xl mx-auto px-6">

        {/* INTRO */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <p className="text-xs tracking-[0.3em] text-slate-400 uppercase">
            Operational Scale
          </p>

          <h2 className="mt-4 text-5xl md:text-7xl leading-[0.9] text-slate-900">
            Built to move
            <br />
            without friction
          </h2>

          <p className="mt-6 text-base md:text-lg text-slate-500 leading-relaxed">
            Every number here represents real movement across cities,
            riders, and deliveries happening in real time.
          </p>
        </motion.div>

        {/* MAIN METRICS */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-y-20 gap-x-32">

          <Metric
            value={50000}
            suffix="+"
            label="Packages delivered across active routes"
            trigger={inView}
          />

          <Metric
            value={98}
            suffix="%"
            label="Successful deliveries completed on time"
            trigger={inView}
          />

          <Metric
            value={1200}
            suffix="+"
            label="Riders actively moving shipments daily"
            trigger={inView}
          />

          <Metric
            value={24}
            suffix="/7"
            label="Tracking system availability"
            trigger={inView}
          />

        </div>

        {/* FLOW LINE (subtle visual structure) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          className="mt-28 h-px bg-slate-100"
        />

      </div>
    </section>
  );
}