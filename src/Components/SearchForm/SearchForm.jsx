import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { HiArrowsRightLeft } from "react-icons/hi2"; // Install react-icons
import { districts } from "../../Utils/districts";
import { FaMapMarkerAlt } from "react-icons/fa";

const SearchForm = ({ onSearch, isCompact, loading, showTabs = true, initialMode = "bus" }) => {
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: { mode: initialMode, from: "", to: "", date: "" }
  });

  const [suggestions, setSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const containerRef = useRef(null);

  const currentFrom = watch("from");
  const currentTo = watch("to");
  const currentMode = watch("mode");

  // Swap Function
  const handleSwap = () => {
    setValue("from", currentTo);
    setValue("to", currentFrom);
  };

  useEffect(() => {
    setValue("mode", initialMode);
  }, [initialMode, setValue]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) setActiveField(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFilter = (e, fieldName) => {
    const value = e.target.value;
    setActiveField(fieldName);
    if (value.length > 0) {
      const filtered = districts.filter(d => d.toLowerCase().includes(value.toLowerCase())).slice(0, 6);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`bg-white  dark:bg-slate-900 dark:border dark:border-slate-500 transition-all duration-500 overflow-visible
        ${isCompact ? "rounded-full" : "rounded-2xl"}
        ${activeField ? "scale-[1.01] md:scale-[1.02] ring-4 ring-primary/5" : "scale-100"} 
      `}
    >
      {/* Mode Tabs */}
      {showTabs && !isCompact && (
        <div className="flex px-6 border-b bg-[#ffaa0f] rounded-t-full  border-slate-100 dark:border-slate-800">
          {['bus', 'train', 'flight', 'launch'].map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setValue("mode", m)}
              className={`py-3 px-4 text-[10px] font-black uppercase border-b-2 transition-all 
                ${currentMode === m ? "text-[#383886] border-[#8787db]" : "text-border-transparent hover:text-[#383886]"}`}
            >
              {m}
            </button>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit(onSearch)} className={`flex flex-col md:flex-row items-center gap-2 md:gap-0 p-2 border-[#ffaa0f] rounded-2xl border-b-8 border-l-2 border-r-2 ${isCompact ? "md:h-14" : "md:h-16"}`}>

        {/* Departure */}
        <div className={`search-input-wrapper md:flex-[1.5] rounded-xl md:rounded-l-xl ${activeField === 'from' ? 'search-input-active' : 'search-input-hover'}`}>
          <input
            {...register("from", { required: true })}
            onFocus={() => setActiveField('from')}
            onChange={(e) => { register("from").onChange(e); handleFilter(e, "from"); }}
            placeholder="From"
            className="search-input-field bg-slate-100  dark:bg-slate-700 rounded-xl md:mr-1"
          />
          {activeField === "from" && suggestions.length > 0 && (
            <SuggestionList items={suggestions} onSelect={(c) => { setValue("from", c); setSuggestions([]); setActiveField(null); }} />
          )}
        </div>

        {/* Swap Button - Absolute on mobile, Relative on desktop */}
        <div className="relative z-10 w-full h-0 md:w-0 flex justify-center items-center">
          <button
            type="button"
            onClick={handleSwap}
            className="bg-white dark:bg-slate-800 border border-slate-700 dark:border-slate-200 p-2 rounded-full shadow-md text-primary hover:text-secondary hover:rotate-180 transition-all duration-500 active:scale-90"
          >
            <HiArrowsRightLeft className="text-sm md:text-base" />
          </button>
        </div>

        {/* Arrival */}
        <div className={`search-input-wrapper rounded-xl md:rounded-l-xl md:flex-[1.5] ${activeField === 'to' ? 'search-input-active' : 'search-input-hover'}`}>
          <input
            {...register("to", { required: true })}
            onFocus={() => setActiveField('to')}
            onChange={(e) => { register("to").onChange(e); handleFilter(e, "to"); }}
            placeholder="To"
            className="search-input-field bg-slate-100 dark:bg-slate-700 rounded-xl md:ml-1"
          />
          {activeField === "to" && suggestions.length > 0 && (
            <SuggestionList items={suggestions} onSelect={(c) => { setValue("to", c); setSuggestions([]); setActiveField(null); }} />
          )}
        </div>

        <div className="hidden md:block h-8 w-[1px] bg-slate-100 dark:bg-slate-800"></div>

        {/* Date */}
        <div className={`search-input-wrapper md:flex-1 ${activeField === 'date' ? 'search-input-active' : 'search-input-hover'}`}>
          <div className="absolute left-4 text-primary pointer-events-none">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          </div>
          <input
            type="date"
            {...register("date", { required: true })}
            onFocus={() => setActiveField('date')}
            className="search-input-field bg-slate-100 dark:bg-slate-700 rounded-xl md:rounded-r-xs pl-12 md:ml-2 pr-4 text-xs cursor-pointer"
          />
        </div>

        {/* tripHub Orange Search Button */}
        <button
          type="submit"
          disabled={!currentFrom || !currentTo || loading}
          className={`bg-[#383886] dark:bg-[#ffaa0f] dark:hover:bg-[#fd8801] hover:bg-[#ffaa0f] text-white flex items-center justify-center transition-all duration-300 w-full md:w-auto h-12 shadow-lg active:scale-95
            ${isCompact ? "md:w-11 md:h-11 md:rounded-full p-3 md:mx-2" : "px-10 rounded-xl md:rounded-none md:rounded-r-xl"}
          `}
        >
          <svg className="w-5 h-5 hidden md:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <span className="font-black text-xs uppercase md:hidden tracking-widest">{loading ? "..." : "Search Tickets"}</span>
        </button>
      </form>
    </div>
  );
};

/* Internal Suggestion List Component */
const SuggestionList = ({ items, onSelect }) => (
  <div className="absolute z-[100] w-full top-full left-0 mt-2 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-xl shadow-2xl p-2 animate-in fade-in slide-in-from-top-2">
    {items.map(city => (
      <div
        key={city}
        onClick={() => onSelect(city)}
        className="p-3 flex gap-1 hover:bg-primary hover:text-white cursor-pointer text-sm font-bold rounded-lg dark:text-slate-200 transition-colors"
      >
        <FaMapMarkerAlt/> {city}
      </div>
    ))}
  </div>
);

export default SearchForm;