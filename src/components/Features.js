"use client";

import { motion } from "framer-motion";
import {
  MapPinned,
  Bike,
  PackageCheck,
} from "lucide-react";

import { Bebas_Neue } from "next/font/google";

const standout = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
});

const features = [
  {
    icon: MapPinned,
    title: "Live shipment tracking",
    description:
      "Follow deliveries from pickup to drop-off with real-time updates.",
  },
  {
    icon: Bike,
    title: "Rider coordination",
    description:
      "Assign riders and manage delivery flow without delays.",
  },
  {
    icon: PackageCheck,
    title: "Delivery confirmation",
    description:
      "Keep customers updated with proof of completed deliveries.",
  },
];

const reveal = {
  hidden: {
    opacity: 0,
    y: 50,
    filter: "blur(8px)",
  },
  visible: (delay) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function Features() {
  return (
    <section
      id="features"
      className="bg-white py-24 md:py-32 px-5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <h2 className="mt-4 text-5xl md:text-7xl leading-[0.9] text-slate-900">
            Built to manage your{" "}
            <span
              className={`${standout.className} text-green-600 text-5xl md:text-7xl tracking-wide inline-block`}
            >
              deliveries
            </span>
          </h2>

          <p className="mt-5 text-neutral-600 text-base md:text-lg leading-relaxed max-w-xl">
            Track shipments, manage riders, and keep operations organized in one place.
          </p>
        </motion.div>

        {/* LIST */}
        <div className="mt-16 md:mt-20 max-w-5xl">

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: true,
                  amount: 0.25,
                }}
                custom={0.2 + index * 0.12}
                whileHover={{
                  x: 8,
                }}
                className="group py-7 md:py-9 border-b border-neutral-200"
              >
                <div className="flex items-start gap-5">

                  {/* ICON */}
                  <motion.div
                    whileHover={{
                      scale: 1.08,
                      rotate: 4,
                    }}
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green-50 border border-green-100"
                  >
                    <Icon
                      size={26}
                      className="text-green-600"
                    />
                  </motion.div>

                  {/* TEXT */}
                  <div className="flex-1">

                    <div className="flex items-center gap-3">

                      <span className="text-sm text-neutral-400">
                        0{index + 1}
                      </span>

                      <h3 className="text-2xl md:text-[28px] font-semibold text-slate-900">
                        {feature.title}
                      </h3>

                    </div>

                    <p className="mt-3 text-neutral-600 leading-relaxed max-w-lg">
                      {feature.description}
                    </p>

                  </div>

                </div>
              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
}