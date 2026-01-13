import React from 'react';
import useAuth from '../../../hooks/useAuth';
import UseAxiosSecure from '../../../hooks/UseAxiosSecure';
import LoadingSpinner from '../../../Components/LoadingSpinner/LoadingSpinner';
import ErrorPage from '../../ErrorPage/ErrorPage';
import { useQuery } from '@tanstack/react-query';
import { FaHistory, FaReceipt, FaCalendarAlt } from 'react-icons/fa';

const PaymentHistory = () => {
    const { user, loading } = useAuth();
    const axiosSecure = UseAxiosSecure();

    const { data: payments = [], isLoading, error } = useQuery({
        queryKey: ['payments', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user?.email}`)
            return res.data;
        }
    });

    if (isLoading) return <LoadingSpinner />;
    if (error) return <ErrorPage />;

    return (
        <div className="p-6 bg-slate-50 dark:bg-slate-950 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-tight flex items-center gap-3">
                            <FaHistory className="text-[#383886]" /> Payment History
                        </h1>
                        <p className="text-sm text-slate-500">Total Transactions: {payments.length}</p>
                    </div>
                </div>

                {payments.length === 0 ? (
                    <div className="bg-white dark:bg-slate-900 rounded-3xl p-20 text-center border border-dashed border-slate-200 dark:border-slate-800">
                        <FaReceipt className="mx-auto text-5xl text-slate-200 mb-4" />
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">No transactions found yet.</p>
                    </div>
                ) : (
                    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">
                                    <th className="px-6 py-4">#</th>
                                    <th className="px-6 py-4">Transaction ID</th>
                                    <th className="px-6 py-4">Ticket Details</th>
                                    <th className="px-6 py-4">Amount</th>
                                    <th className="px-6 py-4">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                                {payments.map((payment, index) => (
                                    <tr key={payment._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                        <td className="px-6 py-5 text-slate-400 font-bold text-xs">{index + 1}</td>
                                        <td className="px-6 py-5">
                                            <code className="text-[11px] font-mono font-bold text-[#383886] dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded">
                                                {payment.transactionId}
                                            </code>
                                        </td>
                                        <td className="px-6 py-5">
                                            <p className="text-sm font-black text-slate-800 dark:text-white leading-tight">
                                                {payment.ticketTitle}
                                            </p>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="text-sm font-black text-green-600 dark:text-green-400">
                                                ৳{payment.amount}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs">
                                                <FaCalendarAlt size={10} />
                                                {new Date(payment.paidAt).toLocaleDateString(undefined, {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentHistory;