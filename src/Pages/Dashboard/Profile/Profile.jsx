import React from 'react';
import useAuth from '../../../hooks/useAuth';
import UseRole from '../../../hooks/UseRole';
import coverImg from '../../../assets/coverImg.jpg';
import LoadingSpinner from '../../../Components/LoadingSpinner/LoadingSpinner';
import { FaUserEdit, FaKey, FaEnvelope, FaIdBadge, FaShieldAlt } from 'react-icons/fa';

const Profile = () => {
    const { user } = useAuth();
    const { role, roleLoading } = UseRole();

    if (roleLoading) return <LoadingSpinner />;

    return (
        <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Main Card */}
                <div className="bg-white shadow-2xl shadow-slate-200/60 rounded-3xl overflow-hidden border border-slate-100">
                    
                    {/* Header Section: Cover + Avatar */}
                    <div className="relative h-64 sm:h-80">
                        <img
                            src={coverImg}
                            alt="Cover"
                            className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
                        
                        {/* Avatar Positioning */}
                        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 sm:left-12 sm:translate-x-0">
                            <div className="relative">
                                <img
                                    src={user?.photoURL || "https://i.ibb.co/dmYpB7G/user-placeholder.png"}
                                    alt="Profile"
                                    className="h-32 w-32 sm:h-40 sm:w-40 rounded-3xl border-4 border-white object-cover shadow-2xl rotate-3 hover:rotate-0 transition-all duration-300"
                                />
                                <div className="absolute -bottom-2 -right-2 bg-emerald-500 h-6 w-6 rounded-full border-4 border-white shadow-sm" title="Online"></div>
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="pt-20 pb-10 px-6 sm:px-12">
                        
                        {/* Name & Headline */}
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                            <div className="text-center sm:text-left">
                                <h1 className="text-3xl font-black text-slate-800 tracking-tight">
                                    {user?.displayName}
                                </h1>
                                <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-2">
                                    <span className={`flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-black uppercase tracking-widest border
                                        ${role === 'admin' ? 'bg-rose-50 text-rose-600 border-rose-100' : 
                                          role === 'vendor' ? 'bg-amber-50 text-amber-600 border-amber-100' : 
                                          'bg-indigo-50 text-indigo-600 border-indigo-100'}`}>
                                        <FaShieldAlt className="text-sm" />
                                        {role}
                                    </span>
                                    <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-lg text-xs font-bold uppercase tracking-widest border border-slate-200">
                                        Verified Member
                                    </span>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-sm shadow-lg shadow-slate-900/20 hover:bg-slate-800 transition-all active:scale-95">
                                    <FaUserEdit /> Update Profile
                                </button>
                                <button className="p-2.5 bg-white text-slate-400 border border-slate-200 rounded-xl hover:text-slate-600 hover:border-slate-300 transition-all">
                                    <FaKey />
                                </button>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-slate-100 my-10 w-full"></div>

                        {/* Info Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Contact Information</h3>
                                
                                <div className="group flex items-center gap-4 p-4 rounded-2xl border border-slate-50 bg-slate-50/30 hover:bg-white hover:border-slate-200 hover:shadow-sm transition-all">
                                    <div className="p-3 bg-white rounded-xl shadow-sm text-indigo-500 group-hover:scale-110 transition-transform">
                                        <FaEnvelope />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase">Email Address</p>
                                        <p className="text-sm font-bold text-slate-700">{user?.email}</p>
                                    </div>
                                </div>

                                <div className="group flex items-center gap-4 p-4 rounded-2xl border border-slate-50 bg-slate-50/30 hover:bg-white hover:border-slate-200 hover:shadow-sm transition-all">
                                    <div className="p-3 bg-white rounded-xl shadow-sm text-indigo-500 group-hover:scale-110 transition-transform">
                                        <FaIdBadge />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase">External UID</p>
                                        <p className="text-sm font-bold text-slate-700 font-mono tracking-tighter text-xs opacity-80">{user?.uid}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Platform Stats</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-5 rounded-3xl bg-indigo-600 text-white shadow-xl shadow-indigo-200">
                                        <p className="text-[10px] font-black uppercase opacity-70">Total Bookings</p>
                                        <p className="text-2xl font-black mt-1">12</p>
                                    </div>
                                    <div className="p-5 rounded-3xl bg-white border border-slate-200">
                                        <p className="text-[10px] font-black text-slate-400 uppercase">Join Date</p>
                                        <p className="text-lg font-black text-slate-800 mt-1">Jan 2024</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                
                {/* Secondary Footer Info */}
                <p className="text-center mt-8 text-slate-400 text-xs font-medium">
                    Profile managed by SecureAuth-System. Last login: Today at 10:45 AM
                </p>
            </div>
        </div>
    );
};

export default Profile;