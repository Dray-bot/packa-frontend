"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CTASection() {
  const scrollToFeatures = () => {
    const el = document.getElementById("features");
    if (!el) return;

    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section className="bg-white py-28 md:py-40 border-t border-slate-100">
      <div className="max-w-5xl mx-auto px-4 md:px-8 text-center">

        {/* LABEL */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-green-600 tracking-[0.3em] text-xs uppercase"
        >
          Start Here
        </motion.p>

        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mt-4 text-5xl md:text-7xl leading-[0.9] text-slate-900"
        >
          Your logistics<br />starts here
        </motion.h1>

        {/* TEXT */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 text-slate-500 text-base md:text-lg max-w-2xl mx-auto"
        >
          Create an account to send packages, track deliveries, and manage riders in real time.
        </motion.p>

        {/* CTA BUTTONS */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >

          {/* PRIMARY */}
          <Link href="/sign-up">
            <button className="w-full sm:w-auto px-10 py-4 bg-green-600 text-white rounded-2xl hover:bg-green-700 transition text-sm md:text-base">
              Get Started
            </button>
          </Link>

          {/* SMOOTH SCROLL BUTTON */}
          <button
            onClick={scrollToFeatures}
            className="w-full sm:w-auto px-10 py-4 bg-white text-slate-900 border border-slate-200 rounded-2xl hover:bg-slate-50 transition text-sm md:text-base"
          >
            See How It Works
          </button>

        </motion.div>

        {/* TRUST LINE */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.2 }}
          className="mt-14 text-xs text-slate-400"
        >
          No credit card required. Start free. Upgrade when you scale.
        </motion.p>

      </div>
    </section>
  );
}