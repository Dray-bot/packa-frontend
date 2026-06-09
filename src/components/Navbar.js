"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bebas_Neue } from "next/font/google";

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
});

const sections = ["features", "whyswitch"];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  const menu = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.25 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };

  /* 🔥 ACTIVE SECTION TRACKER */
  useEffect(() => {
    const handleScroll = () => {
      let current = "";

      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;

        const rect = el.getBoundingClientRect();

        if (rect.top <= 120 && rect.bottom >= 120) {
          current = id;
        }
      });

      setActive(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50">

      {/* GLASS HEADER */}
      <div className="backdrop-blur-xl bg-white/70 border-b border-white/40 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between">

          {/* BRAND */}
          <Link href="/" className="flex items-center gap-3">
            <div className={`text-3xl text-green-600 ${bebas.className}`}>
              PACKA
            </div>

            <span className="text-xs text-slate-500 hidden sm:block">
              Logistics System
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-10 text-sm text-slate-700 relative">

            {sections.map((id) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="relative cursor-pointer"
              >
                <span className={active === id ? "text-green-600" : ""}>
                  {id === "features" ? "Features" : "Why Switch"}
                </span>

                {/* ACTIVE UNDERLINE */}
                {active === id && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 -bottom-1 w-full h-0.5 bg-green-600"
                  />
                )}
              </button>
            ))}

          </div>

          {/* AUTH */}
          <div className="hidden md:flex gap-3 items-center">

            <Link href="/sign-in">
              <button className="text-slate-700 hover:text-green-600 transition cursor-pointer">
                Sign in
              </button>
            </Link>

            <Link href="/sign-up">
              <button className="px-5 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 transition cursor-pointer">
                Get started
              </button>
            </Link>

          </div>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden w-10 h-10 flex flex-col justify-center gap-1.5 cursor-pointer"
          >
            <motion.span
              animate={open ? { rotate: 45, y: 6 } : { rotate: 0 }}
              className="w-6 h-0.5 bg-slate-900"
            />
            <motion.span
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 h-0.5 bg-slate-900"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -6 } : { rotate: 0 }}
              className="w-6 h-0.5 bg-slate-900"
            />
          </button>

        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            variants={menu}
            initial="hidden"
            animate="show"
            exit="exit"
            className="md:hidden backdrop-blur-xl bg-white/90 px-4 pb-6"
          >

            <div className="flex flex-col gap-4 mt-4 text-slate-700">

              {sections.map((id) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="text-left py-2"
                >
                  {id === "features" ? "Features" : "Why Switch"}
                </button>
              ))}

              <Link href="/sign-in" onClick={() => setOpen(false)}>
                <button className="w-full py-3 border rounded-xl">
                  Sign in
                </button>
              </Link>

              <Link href="/sign-up" onClick={() => setOpen(false)}>
                <button className="w-full py-3 rounded-xl bg-green-600 text-white">
                  Get started
                </button>
              </Link>

            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </nav>
  );
}