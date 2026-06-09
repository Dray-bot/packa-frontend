"use client";

import { motion } from "framer-motion";
import { Bebas_Neue } from "next/font/google";

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
});

const comparisons = [
  {
    old: "Manual delivery coordination",
    new: "Live shipment management",
  },
  {
    old: "No visibility after dispatch",
    new: "Real-time tracking",
  },
  {
    old: "Customers keep asking for updates",
    new: "Automatic tracking access",
  },
  {
    old: "Slow rider assignment",
    new: "Instant dispatch workflow",
  },
  {
    old: "Scattered delivery records",
    new: "Centralized logistics dashboard",
  },
];

export default function WhySwitch() {
  return (
    <section id="whyswitch" className="py-28 md:py-40 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-8">

        {/* Header */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl"
        >
          <p
            className={`${bebas.className} text-green-600 text-xl tracking-[0.15em]`}
          >
            WHY BUSINESSES SWITCH
          </p>

          <h2 className="mt-4 text-5xl md:text-7xl leading-[0.9] text-slate-900">
            Stop managing deliveries.
            <br />
            Start controlling them.
          </h2>

          <p className="mt-6 text-lg text-slate-500 max-w-2xl">
            Most logistics problems come from poor visibility.
            Packa gives businesses a clear view of every shipment,
            rider and delivery status in one place.
          </p>
        </motion.div>

        {/* Comparison */}

        <div className="mt-20">

          {/* Desktop */}

          <div className="hidden lg:block relative">

            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-200" />

            <div className="grid grid-cols-2 gap-20 mb-10">

              <div>
                <h3 className="text-red-500 text-sm tracking-[0.2em] uppercase">
                  Without Packa
                </h3>
              </div>

              <div>
                <h3 className="text-green-600 text-sm tracking-[0.2em] uppercase">
                  With Packa
                </h3>
              </div>

            </div>

            <div className="space-y-8">

              {comparisons.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-2 gap-20 items-center"
                >
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                  >
                    <p className="text-slate-400 text-2xl">
                      {item.old}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                  >
                    <p className="text-slate-900 text-2xl font-medium">
                      {item.new}
                    </p>
                  </motion.div>
                </div>
              ))}

            </div>

          </div>

          {/* Mobile */}

          <div className="lg:hidden space-y-6">

            {comparisons.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="py-6 border-b border-slate-100"
              >
                <p className="text-sm text-red-500 mb-2">
                  Before
                </p>

                <p className="text-slate-400">
                  {item.old}
                </p>

                <div className="my-4 text-green-600">
                  ↓
                </div>

                <p className="text-sm text-green-600 mb-2">
                  After
                </p>

                <p className="text-slate-900 font-medium">
                  {item.new}
                </p>
              </motion.div>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
}