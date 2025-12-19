import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import UseAxiosSecure from '../../hooks/UseAxiosSecure';

const TicketUpdateModal = ({ ticket, closeModal }) => {
    const queryClient = useQueryClient();
    const axiosSecure = UseAxiosSecure();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            price: ticket.price,
            quantity: ticket.quantity,
            departureDate: ticket.departureDate,
            departureTime: ticket.departureTime,
        }
    });

    const { mutate, isPending } = useMutation({
        mutationFn: async (payload) => {
            const res = await axiosSecure.patch(`/tickets/${ticket._id}`, payload);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['tickets']);
            queryClient.invalidateQueries(['addedTickets']);
            queryClient.invalidateQueries(['ticket', ticket._id]);
            closeModal();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Ticket updated successfully",
                showConfirmButton: false,
                timer: 1500
            });
        },
    });

    const handleTicketUpdate = (data) => {
        const ticketInfo = {
            quantity: Number(data.quantity),
            price: data.price,
            departureDate: data.departureDate,
            departureTime: data.departureTime,
        };
        mutate(ticketInfo);
    };


    return (
        <div

            className="fixed inset-0 bg-black/40 flex justify-center items-center z-50"

        >
            <div className="bg-white rounded-xl w-96 p-6 shadow-xl space-y-4">
                <h3 className="font-bold text-lg mb-3">Update Tickets</h3>

                <form onSubmit={handleSubmit(handleTicketUpdate)} className="space-y-4">
                    {/* Price */}
                    <div>
                        <label className="label-text">Price per unit</label>
                        <input
                            type="number"
                            className="input input-bordered w-full"
                            {...register("price")}
                        />
                        {errors.price && (
                            <p className="text-red-500 text-sm">
                                {errors.quantity.message}
                            </p>
                        )}
                    </div>

                    {/* Departure */}
                    <div>
                        <label className="label-text">Departure Date</label>
                        <input
                            type="date"
                            className="input input-bordered w-full"
                            {...register("departureDate",)}
                        />
                        {errors.departureDate && (
                            <p className="text-red-500 text-sm">
                                {errors.quantity.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="label-text">Departure time</label>
                        <input
                            type="time"
                            className="input input-bordered w-full"
                            {...register("departureTime",)}
                        />
                        {errors.departureTime && (
                            <p className="text-red-500 text-sm">
                                {errors.quantity.message}
                            </p>
                        )}
                    </div>

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
                            {isPending ? "Updating..." : "Update"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TicketUpdateModal;