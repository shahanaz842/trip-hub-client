import React, { useEffect, useState } from "react";
import { FaBus, FaTrain, FaPlane, FaShip } from "react-icons/fa";
import SearchForm from "../../SearchForm/SearchForm";
import { useNavigate } from "react-router";

import train from "../../../assets/train_video.mp4";
import plan from "../../../assets/plane.mp4";
import bus from "../../../assets/Bus.mp4";
import ferry from "../../../assets/ferry .mp4";

const Hero = () => {
  const [mode, setMode] = useState("bus");
  const [isSticky, setIsSticky] = useState(false);
  const navigate = useNavigate();

  const modes = [
    { id: "bus", icon: <FaBus /> },
    { id: "train", icon: <FaTrain /> },
    { id: "flight", icon: <FaPlane /> },
    { id: "launch", icon: <FaShip /> },
  ];

  const heroContent = {
    bus: { title: "Bus Journey", sub: "Verified operators for your safe road trips.", video: bus },
    train: { title: "Train Travels", sub: "Scenic tracks and reliable railway schedules.", video: train },
    flight: { title: "Sky Routes", sub: "Fastest domestic and international connections.", video: plan },
    launch: { title: "River Cruises", sub: "Traditional travel with modern comfort.", video: ferry },
  };

  const handleHeroSearch = (data) => {
    navigate("/all-tickets", { state: { searchData: data } });
  };

  // Handle Scroll Logic - Only for md screens and up (>= 768px)
  useEffect(() => {
    const handleScroll = () => {
      // Check if screen is md or larger AND scrolled past 300px
      if (window.innerWidth >= 768 && window.scrollY > 300) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll); // Check on resize too

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-100 via-slate-200 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 min-h-[65vh] md:min-h-[75vh] md:flex items-center pt-24 pb-10 md:pb-36">

      {/* Decorative Background Image */}


      {/* <img
    src={heroContent[mode].img}
    alt=""
    className="absolute inset-0 w-full h-full object-cover opacity-50 dark:opacity-30 pointer-events-none"
  /> */}
      {heroContent[mode].video && (
        <video
          key={mode}               // forces reload when mode changes
          src={heroContent[mode].video}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60 dark:opacity-40 pointer-events-none"
        />
      )}
      {/* Main Container */}
      <div className="relative mx-auto px-4 w-full lg:w-9/12">
        <div className="max-w-3xl  lg:text-left">

          {/* Headline */}
          <h1 className="text-3xl  md:text-6xl font-extrabold text-slate-700 dark:text-slate-50 leading-tight tracking-tight ">
            Travel Safe & Save <br />
            <span className="text-secondary dark:text-[#383886/30]">
              {heroContent[mode].title}
            </span>
          </h1>
          {/* Subtext */}
          <p className="text-start md:text-lg text-slate-800 dark:text-slate-200  mx-auto lg:mx-0 font-medium">
            {heroContent[mode].sub}
          </p>
          {/* Mode Switcher */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-5 mt-8 ">
            {modes.map((m) => (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={`group active:scale-95 shadow-lg hover:border-secondary  flex items-center gap-2 rounded-full border px-4 py-2 md:px-6 md:py-3 text-xs font-semibold uppercase tracking-wide transition-all duration-200
              ${mode === m.id
                    ? "bg-[#383886] border-primary   text-white shadow-lg scale-105"
                    : "bg-white/80 dark:bg-slate-900/70 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-[#383886] hover:text-[#383886] dark:hover:text-blue-400"
                  }`}
              >
                <span className="text-lg md:text-base">{m.icon}</span>
                <span className="hidden md:inline">{m.id}</span>
              </button>
            ))}
          </div>


        </div>
      </div>

      {/* Floating Search Bar */}
      <div className={`px-4 opacity-85 md:opacity-100 z-40 transition-all duration-300 ${isSticky
          ? "md:fixed md:top-17 md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-5xl"
          : "md:absolute mt-1 md:left-1/2 md:bottom-20 md:-translate-x-1/2 md:translate-y-1/2 md:w-full md:max-w-5xl"
        }`}>
        <div className="rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg shadow-xl border border-slate-200 dark:border-slate-800">
          <SearchForm
            initialMode={mode}
            showTabs={false}
            onSearch={handleHeroSearch}
          />
        </div>
      </div>
    </section>

  );
};

export default Hero;