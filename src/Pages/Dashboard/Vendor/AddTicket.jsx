import React from "react";
import { useForm } from "react-hook-form";
import { districts } from "../../../Utils/districts";
import useAuth from "../../../hooks/useAuth";
import { imageUpload } from "../../../Utils";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";

const AddTicket = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const { user } = useAuth();
    const axiosSecure = UseAxiosSecure();

    const { isPending, isError, mutateAsync, reset: mutationReset } = useMutation({
        mutationFn: async (payload) =>
            await axiosSecure.post('/tickets', payload),
        onSuccess: data => {
            console.log(data)
            // show toast
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Ticket has been added successfully",
                showConfirmButton: false,
                timer: 1500
            });
            mutationReset()
        },
        onError: error => {
            console.log(error)
        },
        onMutate: payload => {
            console.log('the data after mutate', payload)
        },
        onSettled: (data, error) => {
            console.log(data);
            if (error) console.log(error)
        },
        retry: 3
    })

    const handleAddTicket = async (data) => {
        console.log("Ticket Data:", data);
        const { ticketTitle, from, to, transportType, price, quantity, departureDate, departureTime, perks, image
        } = data;
        const imageFile = image[0];

        try {
            const imageURL = await imageUpload(imageFile);
            const ticketData = {
                ticketTitle,
                from,
                to,
                transportType,
                price: Number(price),
                quantity: Number(quantity),
                departureDate,
                departureTime,
                perks,
                image: imageURL,
                vendor: {
                    image: user?.photoURL,
                    name: user?.displayName,
                    email: user?.email
                },
                createdAt: new Date(),
                status: 'pending'
            }
            await mutateAsync(ticketData);
            reset();
        } catch (err) {
            console.log(err)
        }
    };
    if (isError) return <h2>Error</h2>
    return (
        <div className="w-full min-h-[calc(100vh-40px)] flex justify-center items-center bg-gray-50 py-10">
            <form
                onSubmit={handleSubmit(handleAddTicket)}
                className="bg-white p-8 rounded-xl shadow-xl w-full max-w-5xl"
            >
                <h2 className="text-3xl font-bold text-center mb-6 text-primary">
                    Add New Ticket
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                    {/* LEFT SIDE */}
                    <div className="space-y-6">

                        {/* Title */}
                        <div>
                            <label className="label-text">Title</label>
                            <input
                                {...register("ticketTitle", { required: true })}
                                type="text"
                                placeholder="Ticket Title"
                                className="input input-bordered w-full"
                            />
                            {errors.ticketTitle && (
                                <p className="text-red-500 text-sm">Title is required</p>
                            )}
                        </div>

                        {/* From / To */}
                        {/* Location Section */}
                        <h2 className="text-xl font-semibold mb-3">Location</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            {/* From */}
                            <div>
                                <label className="block font-medium mb-1">From</label>
                                <select
                                    {...register("from", { required: true })}
                                    className="select select-bordered w-full"
                                    defaultValue=""
                                >
                                    <option value="" disabled>
                                        From
                                    </option>
                                    {
                                        districts.map((district, index) => <option key={index}>{district}</option>)
                                    }
                                </select>
                                {errors.from && (
                                    <p className="text-red-500 text-sm mt-1">Location is required</p>
                                )}
                            </div>

                            {/* To */}
                            <div>
                                <label className="block font-medium mb-1">To</label>

                                <select
                                    {...register("to", { required: true })}
                                    className="select select-bordered w-full"
                                    defaultValue=""
                                >
                                    <option value="" disabled>
                                        To
                                    </option>
                                    {
                                        districts.map((district, index) => <option key={index}>{district}</option>)
                                    }
                                </select>
                                {errors.to && (
                                    <p className="text-red-500 text-sm mt-1">Destination is required</p>
                                )}
                            </div>
                        </div>

                        {/* Transport Type */}
                        <div>
                            <label className="label-text">Transport Type</label>
                            <select
                                {...register("transportType", { required: true })}
                                className="select select-bordered w-full"
                            >
                                <option value="">Choose Transport Type</option>
                                <option>Plane</option>
                                <option>Bus</option>
                                <option>Train</option>
                                <option>Launch</option>
                            </select>
                            {errors.transportType && (
                                <p className="text-red-500 text-sm mt-1">Choose a transport</p>
                            )}
                        </div>

                        {/* Price & Quantity */}
                        <div className="flex gap-4">
                            <div className="w-full">
                                <label className="label-text">Price</label>
                                <input
                                    {...register("price", { required: true })}
                                    type="number"
                                    placeholder="Price per ticket"
                                    className="input input-bordered w-full"
                                />
                            </div>

                            <div className="w-full">
                                <label className="label-text">Quantity</label>
                                <input
                                    {...register("quantity", { required: true })}
                                    type="number"
                                    placeholder="Available quantity"
                                    className="input input-bordered w-full"
                                />
                            </div>
                        </div>

                        {/* Departure Section */}
                        <h2 className="text-xl font-semibold mt-6 mb-3">Departure</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Date */}
                            <div>
                                <label className="block font-medium mb-1">Departure Date</label>
                                <input
                                    type="date"
                                    className="input input-bordered w-full"
                                    {...register("departureDate", { required: "Date is required" })}
                                />
                                {errors.departureDate && (
                                    <p className="text-red-500 text-sm mt-1">{errors.departureDate.message}</p>
                                )}
                            </div>

                            {/* Time */}
                            <div>
                                <label className="block font-medium mb-1">Departure Time</label>
                                <input
                                    type="time"
                                    className="input input-bordered w-full"
                                    {...register("departureTime", { required: "Time is required" })}
                                />
                                {errors.departureTime && (
                                    <p className="text-red-500 text-sm mt-1">{errors.departureTime.message}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="space-y-6">

                        {/* Perks */}
                        <fieldset className="fieldset border border-gray-300 p-4 rounded-lg">
                            <legend className="font-semibold text-primary">Perks</legend>

                            <div className="flex flex-col space-y-2">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        {...register("perks")}
                                        value="AC"
                                        className="checkbox"
                                    />
                                    AC
                                </label>

                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        {...register("perks")}
                                        value="Breakfast"
                                        className="checkbox"
                                    />
                                    Lunch
                                </label>

                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        {...register("perks")}
                                        value="Snacks"
                                        className="checkbox"
                                    />
                                    Snacks
                                </label>
                            </div>
                        </fieldset>

                        {/* Image Upload */}
                        <div className="w-full">
                            <label className="label-text">Ticket Image</label>

                            <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-blue-400 rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100 transition">
                                <span className="text-primary font-semibold">Click to Upload</span>

                                <input
                                    {...register("image", { required: true })}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                />
                            </label>

                            {errors.image && (
                                <p className="text-red-500 text-sm">Image is required</p>
                            )}
                        </div>

                        {/* Vendor Name */}
                        <div>
                            <label className="label-text">Vendor Name</label>
                            <input
                                {...register("vendorName", { required: true })}
                                type="text"
                                defaultValue={user?.displayName}
                                readOnly
                                placeholder="Vendor Name"
                                className="input input-bordered w-full"
                            />
                        </div>

                        {/* Vendor Email */}
                        <div>
                            <label className="label-text">Vendor Email</label>
                            <input
                                {...register("vendorEmail", { required: true })}
                                type="email"
                                defaultValue={user?.email}
                                readOnly
                                placeholder="Vendor Email"
                                className="input input-bordered w-full"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="btn btn-primary w-full mt-5 text-white"
                        >
                            {
                                isPending ? <span className="loading loading-spinner text-white"></span>
                                    : 'Add Ticket'
                            }

                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddTicket;
