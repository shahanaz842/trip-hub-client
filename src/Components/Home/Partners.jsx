import React from "react";
import { motion } from "framer-motion";

import amazon from '../../assets/800w-02tR1j.jpg';
import amazon_vector from '../../assets/800w-qiS3fCFyYkg.jpg';
import casio from '../../assets/go.jpg';
import moonStar from '../../assets/OIP.jpg';
import randstad from '../../assets/logo1.jpg';
import star from '../../assets/bus-travel-logo.jpg';
import start_people from '../../assets/b882a5122221685.60d4ede8d2ad6.png';

const brandLogos = [
  star,
  moonStar,
  randstad,
  amazon,
  start_people,
  amazon_vector,
  casio,
];

const Partners = () => {
  return (
    <section className="mt-20 overflow-hidden">
      <div className="mb-10 text-center">
        <h2 className="text-3xl text-[#383886] font-bold">Our Trusted Partners</h2>
        <p className="text-gray-500 mt-2">
          Working with verified transport providers across the country
        </p>
      </div>

      {/* Fade Edges */}
      <div className="relative">
        <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-white to-transparent dark:from-slate-950 to-transparent z-10"></div>
        <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l dark:from-slate-950 to-transparent  z-10"></div>

        <div className="overflow-hidden">
          <motion.div
            className="flex gap-12"
            animate={{ x: ["0%", "-100%"] }}
            transition={{
              ease: "linear",
              duration: 25,
              repeat: Infinity,
            }}
          >
            {[...brandLogos, ...brandLogos].map((logo, index) => (
              <div
                key={index}
                className="flex items-center justify-center min-w-[160px] h-24"
              >
                <img
                  src={logo}
                  alt="Partner Logo"
                  className="max-h-16 md:max-h-20 object-contain opacity-70 hover:opacity-100 transition duration-300 hover:scale-105"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
