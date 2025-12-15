import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import UseAxiosSecure from '../../hooks/UseAxiosSecure';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';


const BookingModal = ({ ticket, closeModal }) => {
    const queryClient = useQueryClient();
    const { user } = useAuth();
    const axiosSecure = UseAxiosSecure();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const quantity = watch("quantity") || 0;
    const totalPrice = quantity * ticket.price;

    const { mutate, isPending } = useMutation({
        mutationFn: async (payload) => {
            const res = await axiosSecure.post("/bookings", payload);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['ticket', ticket._id]);
            closeModal();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Ticket has been booked successfully",
                showConfirmButton: false,
                timer: 1500
            });
        },
    });

    const handleTicketBooking = (data) => {
        const bookingInfo = {
            ticketId: ticket._id,
            ticketTitle: ticket.ticketTitle,
            image: ticket.image,
            quantity: Number(data.quantity),
            pricePerUnit: ticket.price,
            totalPrice,
            userEmail: user.email,
            from: ticket.from,
            to: ticket.to,
            departureDate: ticket.departureDate,
            departureTime: ticket.departureTime,
            bookingDate: new Date(),
            bookingStatus: 'pending'
        };
        mutate(bookingInfo);
    };


    return (
        <div

            className="fixed inset-0 bg-black/40 flex justify-center items-center z-50"

        >
            <div className="bg-white rounded-xl w-96 p-6 shadow-xl space-y-4">
                <h3 className="font-bold text-lg mb-3">Book Tickets</h3>

                <form onSubmit={handleSubmit(handleTicketBooking)} className="space-y-4">

                    <p className="text-sm text-gray-600">
                        Price per ticket: <strong>৳ {ticket.price}</strong>
                    </p>

                    <p className="text-sm text-gray-600">
                        Available: <strong>{ticket.quantity} Tickets</strong>
                    </p>

                    {/* Quantity */}
                    <div>
                        <label className="label-text">Quantity</label>
                        <input
                            type="number"
                            className="input input-bordered w-full"
                            {...register("quantity", {
                                required: "Quantity required",
                                min: 1,
                                max: {
                                    value: ticket.quantity,
                                    message: "Exceeds available tickets",
                                },
                            })}
                        />
                        {errors.quantity && (
                            <p className="text-red-500 text-sm">
                                {errors.quantity.message}
                            </p>
                        )}
                    </div>

                    {/* Total */}
                    <p className="font-semibold">
                        Total Price: ৳ {totalPrice}
                    </p>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="btn btn-ghost"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={isPending}
                        >
                            {isPending ? "Booking..." : "Confirm Booking"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookingModal;

