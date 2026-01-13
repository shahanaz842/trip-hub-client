import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import UseAxiosSecure from '../../hooks/UseAxiosSecure';
import Swal from 'sweetalert2';
import { 
    FiUser, FiMail, FiMapPin, FiPhone, 
    FiTruck, FiFileText, FiCreditCard, FiSend, FiLoader 
} from 'react-icons/fi';
import { useNavigate } from 'react-router';

const BecomeVendor = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const { user } = useAuth();
    const axiosSecure = UseAxiosSecure();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleVendorApplication = async (data) => {
        setLoading(true);
        try {
            const vendorData = {
                ...data,
                status: 'pending',
                appliedAt: new Date(),
                userEmail: user?.email
            };

            const res = await axiosSecure.post('/vendors', vendorData);
            if (res.data.insertedId) {
                Swal.fire({
                    icon: 'success',
                    title: 'Application Received',
                    text: 'Our compliance team will review your credentials and contact you via email within 10 business days.',
                    confirmButtonColor: '#0f172a', // Matching Business Class Slate
                    background: '#ffffff',
                    customClass: {
                        title: 'text-2xl font-black text-slate-800',
                        htmlContainer: 'text-slate-500 font-medium'
                    }
                });
                navigate('/')
            }
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Submission Failed',
                text: err.response?.data?.message || 'Server error. Please verify your data and try again.',
                confirmButtonColor: '#0f172a'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-16 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Section Header */}
                <div className="mb-12 text-center">
                    <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em] bg-indigo-50 px-4 py-2 rounded-full mb-4 inline-block">
                        Partnership Program
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
                        Become a Certified Vendor
                    </h2>
                    <p className="text-slate-500 max-w-xl mx-auto font-medium">
                        Join Trip Hub's global network of transport providers. Complete your business verification to start listing your services.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit(handleVendorApplication)}
                    className="bg-white shadow-2xl shadow-slate-200/60 rounded-[2rem] border border-slate-100 overflow-hidden"
                >
                    <div className="grid grid-cols-1 md:grid-cols-12">
                        
                        {/* Sidebar Info - Visible on Desktop */}
                        <div className="md:col-span-4 bg-slate-900 p-8 md:p-12 text-white">
                            <h3 className="text-xl font-bold mb-6">Why Partner With Us?</h3>
                            <ul className="space-y-6">
                                {[
                                    { title: "Global Reach", desc: "Access thousands of daily travelers." },
                                    { title: "Secure Payments", desc: "Automated weekly settlements." },
                                    { title: "Vendor Tools", desc: "Advanced dashboard & analytics." }
                                ].map((item, idx) => (
                                    <li key={idx} className="flex gap-4">
                                        <div className="h-6 w-6 rounded-full bg-indigo-500 flex items-center justify-center shrink-0">
                                            <FiSend size={12} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm">{item.title}</p>
                                            <p className="text-xs text-slate-400 mt-1">{item.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Form Body */}
                        <div className="md:col-span-8 p-8 md:p-12">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                                {/* Personal Information Section */}
                                <div className="space-y-6 md:col-span-2">
                                    <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                                        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><FiUser /></div>
                                        <h3 className="font-black text-slate-800 uppercase text-xs tracking-widest">Representative Information</h3>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="form-control">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Full Name</label>
                                            <input
                                                {...register('name', { required: "Name is required" })}
                                                defaultValue={user?.displayName}
                                                className="input input-bordered w-full rounded-xl bg-slate-50 border-slate-200 focus:ring-2 ring-indigo-500 transition-all font-bold text-slate-700"
                                            />
                                            {errors.name && <p className="text-rose-500 text-[10px] font-bold mt-1 uppercase">{errors.name.message}</p>}
                                        </div>

                                        <div className="form-control">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Registered Email</label>
                                            <div className="relative">
                                                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                                <input
                                                    defaultValue={user?.email}
                                                    className="input input-bordered w-full pl-11 rounded-xl bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed"
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Contact & Logistics Section */}
                                <div className="space-y-6 md:col-span-1">
                                    <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                                        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><FiMapPin /></div>
                                        <h3 className="font-black text-slate-800 uppercase text-xs tracking-widest">Logistics</h3>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="form-control">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Business Address</label>
                                            <input
                                                {...register('address', { required: "Address required" })}
                                                className="input input-bordered w-full rounded-xl bg-slate-50 border-slate-200 text-sm"
                                                placeholder="Street, City, Country"
                                            />
                                        </div>
                                        <div className="form-control">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Contact Number</label>
                                            <div className="relative">
                                                <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                                <input
                                                    {...register('phoneNo', { required: "Phone required" })}
                                                    className="input input-bordered w-full pl-11 rounded-xl bg-slate-50 border-slate-200 text-sm"
                                                    placeholder="+880..."
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Legal Section */}
                                <div className="space-y-6 md:col-span-1">
                                    <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                                        <div className="p-2 bg-amber-50 text-amber-600 rounded-lg"><FiFileText /></div>
                                        <h3 className="font-black text-slate-800 uppercase text-xs tracking-widest">Legal & Type</h3>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="form-control">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Fleet Type</label>
                                            <select 
                                                {...register('transportType', { required: true })}
                                                className="select select-bordered w-full rounded-xl bg-slate-50 border-slate-200 font-bold text-slate-600"
                                            >
                                                <option value="">Select Transport</option>
                                                <option value="Plane">Airways (Plane)</option>
                                                <option value="Bus">Coach (Bus)</option>
                                                <option value="Train">Railways (Train)</option>
                                                <option value="Launch">Maritime (Launch)</option>
                                            </select>
                                        </div>
                                        <div className="form-control">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Business License / NID</label>
                                            <div className="relative">
                                                <FiCreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                                <input
                                                    {...register('license', { required: "Legal ID required" })}
                                                    className="input input-bordered w-full pl-11 rounded-xl bg-slate-50 border-slate-200 text-sm font-mono"
                                                    placeholder="LCN-XXXX-XXXX"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="md:col-span-2 pt-6">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="btn w-full bg-slate-900 hover:bg-indigo-600 text-white border-none rounded-2xl h-14 shadow-xl shadow-indigo-100 transition-all font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 disabled:bg-slate-300"
                                    >
                                        {loading ? (
                                            <><FiLoader className="animate-spin" size={20} /> Processing Application...</>
                                        ) : (
                                            <>Submit Verification <FiSend /></>
                                        )}
                                    </button>
                                    <p className="text-center text-[10px] text-slate-400 font-medium mt-4">
                                        By submitting, you agree to Trip Hub's Vendor Compliance Policy and Data Handling.
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BecomeVendor;