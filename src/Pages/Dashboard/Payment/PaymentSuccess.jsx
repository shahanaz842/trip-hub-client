import React, { useEffect, useState, } from 'react';
import { Link, useSearchParams } from 'react-router';
import UseAxiosSecure from '../../../hooks/UseAxiosSecure';
import { FaCheckCircle } from 'react-icons/fa';
import { QueryClient, useQueryClient } from '@tanstack/react-query';


const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const [paymentInfo, setPaymentInfo] = useState({ transactionId: "Verifying..." });
    const sessionId = searchParams.get('session_id')
    const axiosSecure = UseAxiosSecure();
    const queryClient = useQueryClient();;

    // console.log(sessionId);

    // Inside PaymentSuccess.jsx
    useEffect(() => {
        const sessionId = searchParams.get('session_id');

        if (sessionId) {
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
                .then(res => {
                    // console.log("Database Sync Successful", res.data);

                    // 1. Update the UI state so the Transaction ID shows up
                    setPaymentInfo({
                        transactionId: res.data.transactionId || "SUCCESS_CONFIRMED"
                    });

                    // 2. Refresh the actual global cache
                    queryClient.invalidateQueries(['payments']);
                    queryClient.invalidateQueries(['bookings']); // Refresh bookings too!
                })
                .catch(err => {
                    console.error("Database Sync Failed", err);
                    setPaymentInfo({ transactionId: "Error Syncing" });
                });
        }
    }, [sessionId, axiosSecure, queryClient, searchParams]);

    // useEffect(() => {
    //     if (sessionId) {
    //         axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
    //             .then(res => {
    //                 console.log(res.data)
    //                 setPaymentInfo({
    //                     transactionId: res.data.transactionId,
    //                 })
    //             })
    //     }
    // }, [sessionId, axiosSecure])

    return (

        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-xl text-center border border-slate-100 dark:border-slate-800">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaCheckCircle className="text-5xl text-green-500" />
            </div>
            <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-2">Payment Successful</h2>
            <p className="text-slate-500 text-sm mb-6 uppercase tracking-widest font-bold">Your journey is officially confirmed!</p>

            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl mb-8 border border-slate-200 dark:border-slate-700">
                <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Transaction ID</p>
                <code className="text-[#383886] dark:text-blue-400 font-mono font-bold">{paymentInfo.transactionId}</code>
            </div>

            <Link to="/dashboard/payment-history" className="block w-full py-4 bg-[#383886] text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-[#ffaa0f] transition-all shadow-lg shadow-blue-500/20">
                View History & Receipts
            </Link>
        </div>
    );
};

export default PaymentSuccess;