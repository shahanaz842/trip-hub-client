import React from 'react';
import { Link } from 'react-router';
import { FaTimesCircle, FaExclamationTriangle, FaArrowLeft } from 'react-icons/fa';

const PaymentCancel = () => {
    return (
        <div className="max-w-md mx-auto mt-10">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-xl text-center border border-slate-100 dark:border-slate-800 relative overflow-hidden">
                
                <div className="absolute top-0 left-0 w-full h-2 bg-red-500/20" />

                <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaTimesCircle className="text-5xl text-red-500" />
                </div>

                <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-2">
                    Payment Cancelled
                </h2>
                
                <p className="text-slate-500 text-sm mb-8 uppercase tracking-widest font-bold">
                    No charges were made to your account.
                </p>

                <div className="bg-amber-50 dark:bg-amber-900/10 p-4 rounded-2xl mb-8 border border-amber-100 dark:border-amber-900/30 flex items-start gap-3 text-left">
                    <FaExclamationTriangle className="text-amber-500 mt-1 shrink-0" />
                    <div>
                        <p className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase mb-1">
                            Common Reasons:
                        </p>
                        <ul className="text-[11px] text-amber-600/80 dark:text-amber-500/70 list-disc ml-4 space-y-1">
                            <li>Checkout window was closed manually</li>
                            <li>Payment method was declined by the bank</li>
                            <li>Session expired due to inactivity</li>
                        </ul>
                    </div>
                </div>

                <div className="space-y-3">
                    <Link 
                        to="/dashboard/my-booked-tickets" 
                        className="block w-full py-4 bg-[#383886] text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-[#ffaa0f] transition-all shadow-lg active:scale-95"
                    >
                        Try Again
                    </Link>
                    
                    <Link 
                        to="/dashboard/user-home" 
                        className="flex items-center justify-center gap-2 w-full py-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold uppercase text-[10px] tracking-widest transition-colors"
                    >
                        <FaArrowLeft /> Back to Dashboard
                    </Link>
                </div>
            </div>
            <div className="hidden sm:block absolute left-1/2 -bottom-2 -translate-x-1/2 w-4 h-4 bg-slate-50 dark:bg-slate-950 rounded-full" />
        </div>
    );
};

export default PaymentCancel;