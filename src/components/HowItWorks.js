"use client";

import { motion } from "framer-motion";
import { Bebas_Neue } from "next/font/google";
import {
  Package,
  CreditCard,
  Bike,
  MapPin,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});

const steps = [
  {
    icon: Package,
    title: "Create",
    desc: "Enter pickup and destination details in seconds.",
  },
  {
    icon: CreditCard,
    title: "Pay",
    desc: "Secure checkout before dispatch begins.",
  },
  {
    icon: Bike,
    title: "Assign",
    desc: "A rider receives the delivery request instantly.",
  },
  {
    icon: MapPin,
    title: "Track",
    desc: "Follow every movement in real time.",
  },
  {
    icon: CheckCircle2,
    title: "Delivered",
    desc: "Receive confirmation when delivery is complete.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-white py-32 overflow-hidden">

      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-4xl mx-auto"
        >

          <p className="uppercase tracking-[0.25em] text-green-600 text-sm font-medium">
            How It Works
          </p>

          <h2
            className={`${bebas.className} mt-4 text-6xl md:text-8xl lg:text-9xl leading-none text-slate-900`}
          >
            How <span className="text-green-600">PACKA</span> Moves
          </h2>

          <p className="mt-8 text-lg md:text-xl text-slate-600 leading-relaxed">
            Every shipment follows a streamlined delivery route
            designed for speed, visibility, and reliability.
          </p>

        </motion.div>

        {/* DESKTOP FLOW */}

        <div className="hidden lg:flex items-start justify-between mt-24">

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="flex items-start"
              >

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 40,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                  }}
                  className="w-45 text-center group"
                >

                  <div
                    className="
                    mx-auto
                    w-20
                    h-20
                    rounded-3xl
                    bg-slate-50
                    flex
                    items-center
                    justify-center
                    transition-all
                    duration-500
                    group-hover:-translate-y-1
                  "
                  >
                    <Icon
                      size={34}
                      className="text-slate-900"
                    />
                  </div>

                  <h3 className="mt-6 text-xl font-semibold text-slate-900">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm text-slate-500 leading-relaxed">
                    {step.desc}
                  </p>

                </motion.div>

                {index < steps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: index * 0.1,
                    }}
                    className="pt-8 px-3"
                  >
                    <ArrowRight
                      className="
                      text-slate-300
                      animate-pulse
                    "
                      size={28}
                    />
                  </motion.div>
                )}

              </div>
            );
          })}
        </div>

        {/* MOBILE FLOW */}

        <div className="lg:hidden mt-20">

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.title}
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.08,
                }}
                className="relative"
              >

                <div className="flex gap-5">

                  <div className="flex flex-col items-center">

                    <div
                      className="
                      w-14
                      h-14
                      rounded-2xl
                      bg-slate-50
                      flex
                      items-center
                      justify-center
                    "
                    >
                      <Icon
                        size={24}
                        className="text-slate-900"
                      />
                    </div>

                    {index < steps.length - 1 && (
                      <div
                        className="
                        w-px
                        h-16
                        bg-slate-200
                        mt-2
                      "
                      />
                    )}

                  </div>

                  <div className="pb-10">

                    <h3 className="text-lg font-semibold text-slate-900">
                      {step.title}
                    </h3>

                    <p className="mt-2 text-slate-600 text-sm leading-relaxed">
                      {step.desc}
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