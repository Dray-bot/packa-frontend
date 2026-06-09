"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Bebas_Neue } from "next/font/google";

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
});

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.06,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

export default function Footer() {
  return (
    <footer className="bg-white border-t border-green-100 w-full overflow-x-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">

        {/* BRAND */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="text-center mb-14"
        >
          <motion.h1
            custom={0}
            variants={fadeUp}
            className={`${bebas.className} text-5xl sm:text-6xl text-green-600 tracking-wide`}
          >
            PACKA
          </motion.h1>

          <motion.p
            custom={1}
            variants={fadeUp}
            className="text-slate-600 mt-3 text-sm sm:text-base max-w-xl mx-auto px-2"
          >
            Real-time logistics engine built for speed, clarity, and control.
          </motion.p>
        </motion.div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 sm:gap-12">

          {/* PRODUCT */}
          <div className="space-y-3">
            <p className="text-green-600 font-semibold">Product</p>
            <FooterLink label="Features" />
            <FooterLink label="How it works" />
            <FooterLink label="Dashboard" />
          </div>

          {/* COMPANY */}
          <div className="space-y-3">
            <p className="text-green-600 font-semibold">Company</p>
            <FooterLink label="About" />
            <FooterLink label="Careers" />
            <FooterLink label="Contact" />
          </div>

          {/* LEGAL */}
          <div className="space-y-3">
            <p className="text-green-600 font-semibold">Legal</p>
            <FooterLink label="Privacy" />
            <FooterLink label="Terms" />
            <FooterLink label="Security" />
          </div>

          {/* CTA */}
          <div className="space-y-3">
            <p className="text-green-600 font-semibold">Start shipping</p>

            <p className="text-slate-600 text-sm">
              Build and track deliveries in real time.
            </p>

            <Link href="/sign-up">
              <button className="w-full sm:w-auto px-5 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition">
                Get Started
              </button>
            </Link>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="mt-14 pt-6 border-t border-green-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-slate-500">

          <p className="text-center sm:text-left w-full sm:w-auto">
            © {new Date().getFullYear()} PACKA. Built for real logistics.
          </p>

          <div className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6 w-full sm:w-auto">
            <Link className="hover:text-green-600 transition" href="#">
              Privacy
            </Link>
            <Link className="hover:text-green-600 transition" href="#">
              Terms
            </Link>
            <Link className="hover:text-green-600 transition" href="#">
              Security
            </Link>
          </div>

        </div>

      </div>
    </footer>
  );
}

/* LINK */
function FooterLink({ label }) {
  return (
    <Link
      href="#"
      className="block text-slate-600 hover:text-green-600 transition text-sm"
    >
      {label}
    </Link>
  );
}