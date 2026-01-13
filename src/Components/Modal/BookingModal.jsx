import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import UseAxiosSecure from '../../hooks/UseAxiosSecure';
import { FaChair } from 'react-icons/fa';

const BookingModal = ({ ticket, closeModal }) => {
    const queryClient = useQueryClient();
    const { user } = useAuth();
    const axiosSecure = UseAxiosSecure();
    const navigate = useNavigate();

    // Local state for seat selection
    const [selectedSeats, setSelectedSeats] = useState([]);

    // Generate a mock seat layout (e.g., 40 seats)
    // In a real app, you might fetch 'bookedSeats' from your DB to disable them
    const totalSeats = 40;
    const seats = Array.from({ length: totalSeats }, (_, i) => ({
        id: `${Math.floor(i / 4) + 1}${String.fromCharCode(65 + (i % 4))}`,
        isBooked: Math.random() < 0.1, // Randomly disabled for visual effect
    }));

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: { quantity: 0 }
    });

    const toggleSeat = (seatId) => {
        if (selectedSeats.includes(seatId)) {
            const updated = selectedSeats.filter(s => s !== seatId);
            setSelectedSeats(updated);
            setValue("quantity", updated.length); // Sync quantity with selected seats
        } else {
            if (selectedSeats.length < ticket.quantity) {
                const updated = [...selectedSeats, seatId];
                setSelectedSeats(updated);
                setValue("quantity", updated.length);
            } else {
                Swal.fire("Limit Reached", "You cannot select more than available tickets", "warning");
            }
        }
    };

    const totalPrice = selectedSeats.length * ticket.price;

    const { mutate, isPending } = useMutation({
        mutationFn: async (payload) => {
            const res = await axiosSecure.post("/bookings", payload);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['ticket', ticket._id]);
            closeModal();
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Ticket Booked!",
                text: `Seats: ${selectedSeats.join(', ')}`,
                showConfirmButton: true,
            });
            navigate('/dashboard/my-booked-tickets');
        },
    });

    const handleTicketBooking = (data) => {
        if (selectedSeats.length === 0) {
            return Swal.fire("Error", "Please select at least one seat", "error");
        }

        const bookingInfo = {
            ticketId: ticket._id,
            ticketTitle: ticket.ticketTitle,
            image: ticket.image,
            quantity: selectedSeats.length,
            selectedSeats: selectedSeats, // Added seat IDs to data
            pricePerUnit: ticket.price,
            totalPrice,
            userEmail: user.email,
            from: ticket.from,
            to: ticket.to,
            departureDate: ticket.departureDate,
            departureTime: ticket.departureTime,
            bookingDate: new Date(),
            bookingStatus: 'pending',
            vendorEmail: ticket.vendor.email
        };
        mutate(bookingInfo);
    };

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 transition-all">
            <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col md:flex-row border border-slate-200 dark:border-slate-800">
                
                {/* Left Side: Seat Plan */}
                <div className="flex-1 p-6 bg-slate-50 dark:bg-slate-950/50 overflow-y-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-black text-xl text-slate-800 dark:text-white uppercase tracking-tight">Select Seats</h3>
                        <div className="flex gap-4 text-[10px] font-bold uppercase">
                            <div className="flex items-center gap-1"><div className="w-3 h-3 bg-white border border-slate-300 rounded"></div> Available</div>
                            <div className="flex items-center gap-1"><div className="w-3 h-3 bg-[#383886] rounded"></div> Selected</div>
                            <div className="flex items-center gap-1"><div className="w-3 h-3 bg-slate-300 rounded"></div> Booked</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-3 max-w-xs mx-auto bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-inner border border-slate-200 dark:border-slate-800">
                        {/* Driver Seat Placeholder */}
                        <div className="col-span-4 flex justify-end mb-4">
                            <div className="w-10 h-10 border-2 border-slate-200 rounded-lg flex items-center justify-center text-slate-300"><FaChair /></div>
                        </div>

                        {seats.map((seat) => (
                            <button
                                key={seat.id}
                                disabled={seat.isBooked}
                                onClick={() => toggleSeat(seat.id)}
                                className={`h-10 rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-200 
                                    ${seat.isBooked ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 
                                      selectedSeats.includes(seat.id) ? 'bg-[#383886] text-white shadow-lg shadow-blue-200' : 
                                      'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 hover:border-[#383886]'}`}
                            >
                                {seat.id}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right Side: Summary & Form */}
                <div className="w-full md:w-[350px] p-8 border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-800 flex flex-col justify-between">
                    <div className="space-y-6">
                        <div>
                            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Journey Summary</h4>
                            <p className="font-bold text-slate-800 dark:text-white">{ticket.from} to {ticket.to}</p>
                            <p className="text-xs text-slate-500">{ticket.departureDate} at {ticket.departureTime}</p>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Price per seat</span>
                                <span className="font-bold text-slate-800 dark:text-white">৳{ticket.price}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Selected Seats</span>
                                <span className="font-bold text-[#383886] dark:text-blue-400">{selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}</span>
                            </div>
                            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                                <span className="font-bold text-slate-800 dark:text-white">Total Amount</span>
                                <span className="text-2xl font-black text-[#383886] dark:text-white">৳{totalPrice}</span>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(handleTicketBooking)} className="mt-8 space-y-4">
                        {/* Hidden quantity input to maintain your form logic */}
                        <input type="hidden" {...register("quantity")} />

                        <div className="flex flex-col gap-2">
                            <button
                                type="submit"
                                disabled={isPending || selectedSeats.length === 0}
                                className="w-full py-4 bg-[#383886] hover:bg-[#ffaa0f] text-white font-black rounded-xl transition-all shadow-lg active:scale-95 disabled:bg-slate-200 disabled:text-slate-400"
                            >
                                {isPending ? "Processing..." : "Confirm Reservation"}
                            </button>
                            <button
                                type="button"
                                onClick={closeModal}
                                className="w-full py-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs font-bold uppercase tracking-widest"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;