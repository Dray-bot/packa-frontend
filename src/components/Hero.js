"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Bebas_Neue } from "next/font/google";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";

const cursive = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
});

const heroContent = [
  {
    badge: "Smarter logistics",
    title: "Manage deliveries",
    accent: "with less stress",
    desc:
      "Track shipments, assign riders, and stay updated in one clean system.",
  },
  {
    badge: "Real-time tracking",
    title: "Know where packages are",
    accent: "at every step",
    desc:
      "Stay updated from pickup to drop-off without confusion.",
  },
  {
    badge: "Built for operations",
    title: "Keep deliveries moving",
    accent: "without delays",
    desc:
      "Simple tools for customers, riders, and admins.",
  },
];

const shredAnimation = {
  initial: {
    opacity: 0,
    y: 25,
    filter: "blur(8px)",
    scale: 0.98,
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      duration: 0.55,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    filter: "blur(8px)",
    scale: 0.98,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
};

export default function Hero() {
  const [animationData, setAnimationData] =
    useState(null);

  const [currentIndex, setCurrentIndex] =
    useState(0);

  useEffect(() => {
    const loadLottie = async () => {
      const response = await fetch(
        "/lottie/delivery.json"
      );

      const data = await response.json();
      setAnimationData(data);
    };

    loadLottie();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === heroContent.length - 1
          ? 0
          : prev + 1
      );
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const current = heroContent[currentIndex];

  return (
    <section className="min-h-screen overflow-hidden bg-white">

      <div className="max-w-7xl mx-auto px-5 md:px-8 pt-20 md:pt-28 pb-10">

        <div className="grid lg:grid-cols-2 items-center gap-10 lg:gap-16">

          {/* LEFT */}
          <div className="order-2 lg:order-1">

            <AnimatePresence mode="wait">

              <motion.div
                key={current.badge}
                variants={shredAnimation}
                initial="initial"
                animate="animate"
                exit="exit"
                className="inline-flex items-center rounded-full border border-green-200 bg-green-50 px-4 py-2"
              >
                <span className="text-sm font-medium text-green-700">
                  {current.badge}
                </span>
              </motion.div>

            </AnimatePresence>

            <div className="mt-5">

              <AnimatePresence mode="wait">

                <motion.h1
                  key={current.title}
                  variants={shredAnimation}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="mt-4 text-5xl md:text-7xl leading-[0.9] text-slate-900"
                >
                  {current.title}
                </motion.h1>

              </AnimatePresence>

              <AnimatePresence mode="wait">

                <motion.h2
                  key={current.accent}
                  variants={shredAnimation}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className={`${cursive.className} text-green-600 text-4xl sm:text-5xl lg:text-6xl mt-2`}
                >
                  {current.accent}
                </motion.h2>

              </AnimatePresence>

            </div>

            <AnimatePresence mode="wait">

              <motion.p
                key={current.desc}
                variants={shredAnimation}
                initial="initial"
                animate="animate"
                exit="exit"
                className="mt-5 text-neutral-600 text-base md:text-lg max-w-lg leading-relaxed"
              >
                {current.desc}
              </motion.p>

            </AnimatePresence>

            {/* BUTTONS */}
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.3,
              }}
              className="mt-7 flex items-center gap-3"
            >
              <Link href="/sign-up">
                <motion.button
                  whileHover={{
                    y: -2,
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  className="h-11 px-5 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition"
                >
                  Get Started
                </motion.button>
              </Link>

              <Link href="/track">
                <motion.button
                  whileHover={{
                    y: -2,
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  className="h-11 px-5 rounded-xl border border-neutral-300 text-black font-medium hover:border-green-600 hover:text-green-600 transition"
                >
                  Track
                </motion.button>
              </Link>
            </motion.div>

          </div>

          {/* RIGHT LOTTIE */}
          <motion.div
            initial={{
              opacity: 0,
              x: 40,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.7,
            }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-full max-w-sm md:max-w-lg"
            >
              {animationData && (
                <Lottie
                  animationData={animationData}
                  loop
                />
              )}
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}