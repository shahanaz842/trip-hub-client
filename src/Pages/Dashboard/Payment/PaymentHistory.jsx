import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import UseAxiosSecure from '../../../hooks/UseAxiosSecure';
import LoadingSpinner from '../../../Components/LoadingSpinner/LoadingSpinner';
import ErrorPage from '../../ErrorPage/ErrorPage';

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
    })

    if (isLoading) return <LoadingSpinner />;
    if (error) return <ErrorPage />

    return (
        <div>
            <h2 className='text-3xl font-bold text-center py-3'>Payment History: {payments.length}</h2>
            {
                payments.length === 0 ? <p className='text-gray-500 pt-2 text-center'>No Transaction Done .</p> :
                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Transaction Id</th>
                                    <th>Amount</th>
                                    <th>Ticket Title</th>
                                    <th>Paid Time</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    payments.map((payment, index) => <tr key={payment._id}>
                                        <th>{index + 1}</th>
                                        <td>{payment.transactionId}</td>
                                        <td>${payment.amount}</td>
                                        <td>{payment.ticketTitle}</td>
                                        <td>{new Date(payment.paidAt).toLocaleString()}</td>

                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
            }
        </div>
    );
};

export default PaymentHistory;