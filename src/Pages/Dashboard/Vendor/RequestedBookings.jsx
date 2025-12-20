import React from 'react';
import UseAxiosSecure from '../../../hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import LoadingSpinner from '../../../Components/LoadingSpinner/LoadingSpinner';

const RequestedBookings = () => {
    const axiosSecure = UseAxiosSecure();

    const { refetch, data: bookings = [], isLoading } = useQuery({
        queryKey: ['bookings'],
        queryFn: async () => {
            const res = await axiosSecure.get('/bookings')
            return res.data;
        }
    })

    const updateBookingStatus = (id, bookingStatus) => {
        const updateInfo = { bookingStatus: bookingStatus }
        axiosSecure.patch(`/bookings/${id}`, updateInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Booking has been ${bookingStatus}`,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
    }

    const handleApproval = id => {
        updateBookingStatus(id, 'accepted')
    }

    const handleRejection = id => {
        updateBookingStatus(id, 'rejected')
    }

    console.log(bookings)
    if (isLoading) return <LoadingSpinner/>

    return (
        <div className="overflow-x-auto">
            <table className="table table-zebra">
                {/* head */}
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Email</th>
                        <th>Ticket Title</th>
                        <th>Booking Quantity</th>
                        <th>Price (per unit)</th>
                        <th>Total Price</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        bookings.map((booking, i) => <tr key={i}>
                            <th>{i + 1}</th>
                            <td>{booking.userEmail}</td>
                            <td>{booking.ticketTitle}</td>
                            <td>{booking.quantity}</td>
                            <td>{booking.pricePerUnit}</td>
                            <td>{booking.totalPrice}</td>
                            <td>{booking.bookingStatus}</td>
                            <td className='flex gap-2'>
                                <button
                                    disabled={booking.bookingStatus !== "pending"}
                                    onClick={() => handleApproval(booking._id)} className='btn btn-success'>Accept</button>
                                <button
                                    disabled={booking.bookingStatus !== "pending"}
                                    onClick={() => handleRejection(booking._id)} className='btn btn-warning'>Reject</button>
                            </td>

                        </tr>)
                    }

                </tbody>
            </table>
        </div>
    );
};

export default RequestedBookings;