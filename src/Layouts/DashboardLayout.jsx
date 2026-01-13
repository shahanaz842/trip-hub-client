import React, { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import logoImg from '../assets/logo.png'
import { FaBoxOpen, FaChartLine, FaRegCreditCard, FaUsers, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import { BiSolidAddToQueue } from 'react-icons/bi';
import { SiGooglecloudstorage } from "react-icons/si";
import { HiSpeakerphone } from "react-icons/hi";
import UseRole from '../hooks/UseRole';
import { CgProfile } from "react-icons/cg";
import { MdOutlineManageSearch, MdOutlineRateReview } from 'react-icons/md';
import useAuth from '../hooks/useAuth';
import { FaUserTie } from 'react-icons/fa6';

const DashboardLayout = () => {
    const { role } = UseRole();
    const [isExpanded, setIsExpanded] = useState(false);
    const { user } = useAuth();

    const toggleSidebar = () => setIsExpanded(!isExpanded);
    

    // Dynamic Class for Sidebar
    const sidebarWidth = isExpanded ? "w-64" : "w-20";

    const menuItem = ({ isActive }) => `
        flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group
        ${isActive
            ? 'bg-[#383886] text-white shadow-lg shadow-blue-900/20'
            : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}
    `;

    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 font-sans transition-all duration-300">

            {/* --- SIDEBAR --- */}
            <aside className={`${sidebarWidth} bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col fixed h-full z-[60] transition-all duration-300 ease-in-out`}>

                {/* Logo Section */}
                <div className="flex items-center gap-3 px-5 py-6 overflow-hidden h-20">
                    <img src={logoImg} className="w-10 min-w-[40px]" alt="Trip Hub" />
                    {isExpanded && (
                        <div className="whitespace-nowrap animate-in fade-in duration-500">
                            <h2 className="font-black text-slate-800 dark:text-white uppercase tracking-tighter">Trip Hub</h2>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Smart Ticketing</p>
                        </div>
                    )}
                </div>

                {/* Toggle Button */}
                <button
                    onClick={toggleSidebar}
                    className="absolute -right-3 top-20 bg-[#383886] text-white w-6 h-6 rounded-full flex items-center justify-center shadow-xl z-[70] hover:scale-110 transition-transform"
                >
                    {isExpanded ? <FaChevronLeft size={10} /> : <FaChevronRight size={10} />}
                </button>

                {/* Sidebar Links */}
                <div className="flex-grow px-3 space-y-2 mt-4 overflow-y-auto overflow-x-hidden no-scrollbar">

                    <NavLink to="/dashboard" end className={menuItem}>
                        <CgProfile size={22} className="shrink-0" />
                        {isExpanded && <span className="text-sm font-bold tracking-tight whitespace-nowrap">Profile</span>}
                    </NavLink>

                    {/* --- User Section --- */}
                    {role === 'user' && (
                        <>
                            {isExpanded && <p className="px-4 mt-6 mb-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">User</p>}
                            <NavLink to="/dashboard/my-booked-tickets" className={menuItem}>
                                <FaBoxOpen size={22} className="shrink-0" />
                                {isExpanded && <span className="text-sm font-bold tracking-tight whitespace-nowrap">My Bookings</span>}
                            </NavLink>
                            <NavLink to="/dashboard/payment-history" className={menuItem}>
                                <FaRegCreditCard size={22} className="shrink-0" />
                                {isExpanded && <span className="text-sm font-bold tracking-tight whitespace-nowrap">Payments</span>}
                            </NavLink>
                        </>
                    )}

                    {/* --- Vendor Section --- */}
                    {role === 'vendor' && (
                        <>
                            {isExpanded && <p className="px-4 mt-6 mb-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">Vendor</p>}
                            <NavLink to="/dashboard/add-ticket" className={menuItem}>
                                <BiSolidAddToQueue size={22} className="shrink-0" />
                                {isExpanded && <span className="text-sm font-bold tracking-tight whitespace-nowrap">Add Ticket</span>}
                            </NavLink>
                            <NavLink to="/dashboard/my-added-tickets" className={menuItem}>
                                <SiGooglecloudstorage size={22} className="shrink-0" />
                                {isExpanded && <span className="text-sm font-bold tracking-tight whitespace-nowrap">Inventory</span>}
                            </NavLink>
                            <NavLink to="/dashboard/requested-bookings" className={menuItem}>
                                <MdOutlineRateReview size={22} className="shrink-0" />
                                {isExpanded && <span className="text-sm font-bold tracking-tight whitespace-nowrap">Requests</span>}
                            </NavLink>
                            <NavLink to="/dashboard/revenue-overview" className={menuItem}>
                                <FaChartLine size={22} className="shrink-0" />
                                {isExpanded && <span className="text-sm font-bold tracking-tight whitespace-nowrap">Revenue</span>}
                            </NavLink>
                        </>
                    )}

                    {/* --- Admin Section --- */}
                    {role === 'admin' && (
                        <>
                            {isExpanded && <p className="px-4 mt-6 mb-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">Admin</p>}
                            <NavLink to="/dashboard/manage-tickets" className={menuItem}>
                                <MdOutlineManageSearch size={22} className="shrink-0" />
                                {isExpanded && <span className="text-sm font-bold tracking-tight whitespace-nowrap">Tickets</span>}
                            </NavLink>
                            <NavLink to="/dashboard/manage-users" className={menuItem}>
                                <FaUsers size={22} className="shrink-0" />
                                {isExpanded && <span className="text-sm font-bold tracking-tight whitespace-nowrap">Users</span>}
                            </NavLink>
                            <NavLink to="/dashboard/approve-vendors" className={menuItem}>
                                <FaUserTie size={22} className="shrink-0" />
                                {isExpanded && <span className="text-sm font-bold tracking-tight whitespace-nowrap">Vendors</span>}
                            </NavLink>
                            <NavLink to="/dashboard/advertise-tickets" className={menuItem}>
                                <HiSpeakerphone size={22} className="shrink-0" />
                                {isExpanded && <span className="text-sm font-bold tracking-tight whitespace-nowrap">Advertise</span>}
                            </NavLink>
                        </>
                    )}
                </div>

                {/* Footer Link */}
                <div className="p-4 border-t border-slate-100 dark:border-slate-800">
                    <Link to="/" className="flex items-center gap-4 px-2 text-slate-400 hover:text-[#383886] transition-colors">
                        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                            <span className="text-xs font-black">H</span>
                        </div>
                        {isExpanded && <span className="text-xs font-bold uppercase tracking-widest">Home Page</span>}
                    </Link>
                </div>
            </aside>

            {/* --- MAIN CONTENT AREA --- */}
            <main className={`flex-grow transition-all duration-300 ${isExpanded ? "ml-64" : "ml-20"}`}>

                {/* --- Top Navbar --- */}
                <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 h-20 flex items-center px-8">
                    <div className="flex-grow">
                        <h1 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest">
                            Dashboard <span className="mx-2 text-slate-300 font-light">/</span>
                            <span className="text-[#ffaa0f]">{role || 'User'}</span>
                        </h1>
                    </div>

                    {/* User Profile Section */}
                    <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                            <p className="text-[10px] font-black text-slate-400 uppercase leading-none">Logged in as</p>
                            <p className="text-xs font-bold text-slate-800 dark:text-white">
                                {user?.displayName || 'Authorized User'}
                            </p>
                        </div>

                        {/* The Profile Image / Avatar */}
                        <div className="relative group cursor-pointer">
                            <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-slate-100 dark:border-slate-800 p-0.5 group-hover:border-[#ffaa0f] transition-all duration-300">
                                {user?.photoURL ? (
                                    <img
                                        src={user.photoURL}
                                        alt="Profile"
                                        className="w-full h-full object-cover rounded-[14px]"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-[#383886] to-[#4c4ca3] flex items-center justify-center text-white font-black">
                                        {user?.displayName?.charAt(0) || 'U'}
                                    </div>
                                )}
                            </div>

                            {/* Online Status Dot */}
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <div className="p-8 max-w-[1600px] mx-auto">
                    <Outlet />
                </div>
            </main>
        </div >
    );
};

export default DashboardLayout;