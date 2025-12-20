import React from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import logoImg from '../assets/logo.png'
import { FaBoxOpen, FaChartLine,  FaRegCreditCard, FaUsers, FaUserTie } from 'react-icons/fa';
import { BiSolidAddToQueue } from 'react-icons/bi';
import { SiGooglecloudstorage } from "react-icons/si";
import { HiSpeakerphone } from "react-icons/hi";



import UseRole from '../hooks/UseRole';
import { CgProfile } from "react-icons/cg";
import { MdOutlineManageSearch, MdOutlineRateReview } from 'react-icons/md';


const DashboardLayout = () => {
    const menuItem =
        "flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-primary/10 transition";
    const { role } = UseRole();
    console.log(role);
    
    return (
        <div className="drawer lg:drawer-open max-w-7xl mx-auto">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Navbar */}
                <nav className="navbar fixed top-0 left-0 right-0 z-50 bg-base-100 border-b px-4">
                    <label htmlFor="my-drawer-4" className="btn btn-ghost lg:hidden">
                        ☰
                    </label>

                    <div className="flex items-center gap-3">
                        <Link to='/'>
                        <img
                            src={logoImg}
                            alt="Trip Hub"
                            className="w-9 h-9 rounded"
                        />
                        </Link>
                        <div>
                            <h1 className="font-semibold text-lg">Trip Hub Dashboard</h1>
                            <p className="text-xs text-gray-500 capitalize">
                                {role || 'user'} panel
                            </p>
                        </div>
                    </div>
                </nav>


                {/* Page content here */}
                <div className="drawer-content pt-16 bg-base-100 min-h-screen">
                    <Outlet />
                </div>
            </div>

            <div className="drawer-side">
                <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

                <aside className="w-64 bg-base-200 min-h-full flex flex-col">
                    <div className="flex items-center gap-3 px-4 py-4 border-b">
                        <img src={logoImg} className="w-10" alt="Trip Hub" />
                        <Link to='/'>
                            <h2 className="font-bold text-primary">Trip Hub</h2>
                            <p className="text-xs text-gray-500">Smart Ticketing</p>
                        </Link>
                    </div>

                    {/* Sidebar content here */}
                    {/* our dashboard links */}

                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `${menuItem} ${isActive ? 'bg-primary/20 text-primary font-semibold' : ''}`
                        }
                    >
                        <CgProfile />
                        <span>Profile</span>
                    </NavLink>

                    {/* user only route */}

                    {role === 'user' && (
                        <>
                            <p className="px-4 mt-4 text-xs text-gray-400 uppercase">User</p>
                            <NavLink to="/dashboard/my-booked-tickets" className={menuItem}>
                                <FaBoxOpen /> My Bookings
                            </NavLink>
                            <NavLink to="/dashboard/payment-history" className={menuItem}>
                                <FaRegCreditCard /> Payments
                            </NavLink>
                        </>
                    )}

                    {/* vendor only links */}
                    {role === 'vendor' && (
                        <>
                            <p className="px-4 mt-4 text-xs text-gray-400 uppercase">Vendor</p>
                            <NavLink to="/dashboard/add-ticket" className={menuItem}>
                                <BiSolidAddToQueue /> Add Ticket
                            </NavLink>
                            <NavLink to="/dashboard/my-added-tickets" className={menuItem}>
                                <SiGooglecloudstorage /> Added Tickets
                            </NavLink>
                            <NavLink to="/dashboard/requested-bookings" className={menuItem}>
                                <MdOutlineRateReview /> Booking Requests
                            </NavLink>
                            <NavLink to="/dashboard/revenue-overview" className={menuItem}>
                                <FaChartLine /> Revenue
                            </NavLink>
                        </>
                    )}

                    {/* admin only links */}
                    {role === 'admin' && (
                        <>
                            <p className="px-4 mt-4 text-xs text-gray-400 uppercase">Admin</p>
                            <NavLink to="/dashboard/manage-tickets" className={menuItem}>
                                <MdOutlineManageSearch /> Manage Tickets
                            </NavLink>
                            <NavLink to="/dashboard/manage-users" className={menuItem}>
                                <FaUsers /> Manage Users
                            </NavLink>
                            <NavLink to="/dashboard/approve-vendors" className={menuItem}>
                                <FaUserTie /> Vendors
                            </NavLink>
                            <NavLink to="/dashboard/advertise-tickets" className={menuItem}>
                                <HiSpeakerphone /> Advertise
                            </NavLink>
                        </>
                    )}

                </aside>
            </div>
        </div >
    );
};

export default DashboardLayout;