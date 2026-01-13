import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { districts } from "../../../Utils/districts";
import useAuth from "../../../hooks/useAuth";
import { imageUpload } from "../../../Utils";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import ErrorPage from "../../ErrorPage/ErrorPage";
import { FaCloudUploadAlt, FaTicketAlt, FaMapMarkerAlt, FaCogs } from "react-icons/fa";

const AddTicket = () => {
    const navigate = useNavigate();
    const [uploadingImage, setUploadingImage] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    
    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();
    const { user } = useAuth();
    const axiosSecure = UseAxiosSecure();

    // Watch image field to show preview
    const selectedImage = watch("image");
    React.useEffect(() => {
        if (selectedImage && selectedImage[0]) {
            setImagePreview(URL.createObjectURL(selectedImage[0]));
        }
    }, [selectedImage]);

    const { isPending, isError, mutateAsync } = useMutation({
        mutationFn: async (payload) => await axiosSecure.post('/tickets', payload),
        onSuccess: () => {
            Swal.fire({
                icon: "success",
                title: "Ticket Added!",
                text: "Your ticket is now pending for approval.",
                showConfirmButton: false,
                timer: 2000
            });
            reset();
            setImagePreview(null);
            navigate('/dashboard/my-added-tickets');
        },
    });

    const handleAddTicket = async (data) => {
        const imageFile = data.image[0];
        setUploadingImage(true); // Start image upload loading

        try {
            // 1. Upload Image
            const imageURL = await imageUpload(imageFile);
            setUploadingImage(false); // End image upload loading

            // 2. Prepare Data
            const ticketData = {
                ...data,
                price: Number(data.price),
                quantity: Number(data.quantity),
                totalQuantity: Number(data.totalQuantity),
                image: imageURL,
                vendor: {
                    image: user?.photoURL,
                    name: user?.displayName,
                    email: user?.email
                },
                createdAt: new Date(),
                status: 'pending',
                isVisible: true
            };

            // 3. Save to DB
            await mutateAsync(ticketData);
        } catch (err) {
            setUploadingImage(false);
            Swal.fire("Error", "Something went wrong during upload", "error");
        }
    };

    if (isError) return <ErrorPage />;

    return (
        <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-950 p-4 lg:p-10">
            <form
                onSubmit={handleSubmit(handleAddTicket)}
                className="bg-white dark:bg-slate-900 mx-auto rounded-[2.5rem] shadow-2xl shadow-blue-900/10 border border-slate-100 dark:border-slate-800 w-full max-w-6xl overflow-hidden"
            >
                {/* Header Section */}
                <div className="bg-[#383886] p-8 text-white flex items-center gap-4">
                    <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md">
                        <FaTicketAlt size={30} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black uppercase tracking-tight">Create New Entry</h2>
                        <p className="text-blue-200 text-xs font-bold uppercase tracking-widest">Inventory Management System</p>
                    </div>
                </div>

                <div className="p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    {/* LEFT COLUMN: Basic Info */}
                    <div className="lg:col-span-7 space-y-8">
                        <section>
                            <div className="flex items-center gap-2 mb-4 text-[#383886] dark:text-blue-400">
                                <FaCogs />
                                <h3 className="font-black uppercase text-sm tracking-widest">General Details</h3>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="form-control">
                                    <label className="label-text font-bold mb-2 ml-1">Ticket Title</label>
                                    <input
                                        {...register("ticketTitle", { required: "Title is required" })}
                                        type="text"
                                        placeholder="e.g. Premium Business Class - Dhaka to Cox's Bazar"
                                        className="input input-bordered bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 ring-[#383886] h-14"
                                    />
                                    {errors.ticketTitle && <span className="text-red-500 text-xs mt-1 font-bold">{errors.ticketTitle.message}</span>}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="form-control">
                                        <label className="label-text font-bold mb-2 ml-1">Transport Category</label>
                                        <select {...register("transportType", { required: true })} className="select select-bordered bg-slate-50 dark:bg-slate-800 border-none rounded-2xl h-14">
                                            <option value="">Select Type</option>
                                            <option>Plane</option><option>Bus</option><option>Train</option><option>Launch</option>
                                        </select>
                                    </div>
                                    <div className="form-control">
                                        <label className="label-text font-bold mb-2 ml-1">Price (BDT)</label>
                                        <input {...register("price", { required: true })} type="number" placeholder="0.00" className="input input-bordered bg-slate-50 dark:bg-slate-800 border-none rounded-2xl h-14" />
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section>
                            <div className="flex items-center gap-2 mb-4 text-[#383886] dark:text-blue-400">
                                <FaMapMarkerAlt />
                                <h3 className="font-black uppercase text-sm tracking-widest">Route & Schedule</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <select {...register("from", { required: true })} className="select select-bordered bg-slate-50 dark:bg-slate-800 border-none rounded-2xl h-14" defaultValue="">
                                    <option value="" disabled>Origin Station</option>
                                    {districts.map((d, i) => <option key={i}>{d}</option>)}
                                </select>
                                <select {...register("to", { required: true })} className="select select-bordered bg-slate-50 dark:bg-slate-800 border-none rounded-2xl h-14" defaultValue="">
                                    <option value="" disabled>Destination</option>
                                    {districts.map((d, i) => <option key={i}>{d}</option>)}
                                </select>
                                <input type="date" {...register("departureDate", { required: true })} className="input input-bordered bg-slate-50 dark:bg-slate-800 border-none rounded-2xl h-14" />
                                <input type="time" {...register("departureTime", { required: true })} className="input input-bordered bg-slate-50 dark:bg-slate-800 border-none rounded-2xl h-14" />
                            </div>
                        </section>
                    </div>

                    {/* RIGHT COLUMN: Media & Submission */}
                    <div className="lg:col-span-5 space-y-8">
                        
                        {/* Image Upload Area */}
                        <div className="form-control">
                            <label className="label-text font-bold mb-2 ml-1 text-slate-500 uppercase text-[10px] tracking-widest">Visual Asset</label>
                            <div className="relative group">
                                <label className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-[2rem] cursor-pointer transition-all duration-300 ${imagePreview ? 'border-transparent' : 'border-blue-200 bg-blue-50/50 dark:bg-slate-800 dark:border-slate-700 hover:bg-blue-50'}`}>
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-[2rem]" />
                                    ) : (
                                        <div className="flex flex-col items-center">
                                            <FaCloudUploadAlt className="text-4xl text-[#383886] mb-2" />
                                            <span className="text-sm font-black text-[#383886] uppercase tracking-tighter">Upload Ticket Photo</span>
                                        </div>
                                    )}
                                    <input {...register("image", { required: true })} type="file" accept="image/*" className="hidden" />
                                </label>
                                {imagePreview && (
                                    <div className="absolute inset-0 bg-black/40 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <p className="text-white font-bold text-xs uppercase tracking-widest">Click to change photo</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Perks Checkboxes */}
                        <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800">
                            <p className="text-[10px] font-black uppercase text-slate-400 mb-4 tracking-widest">Included Amenities</p>
                            <div className="grid grid-cols-2 gap-3">
                                {["AC", "Wi-Fi", "Breakfast", "Snacks", "Water"].map(perk => (
                                    <label key={perk} className="flex items-center gap-3 cursor-pointer">
                                        <input type="checkbox" {...register("perks")} value={perk} className="checkbox checkbox-primary checkbox-sm rounded-lg" />
                                        <span className="text-sm font-bold text-slate-600 dark:text-slate-400">{perk}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Inventory Toggles */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label-text font-bold text-[10px] uppercase mb-1 ml-1">Stock</label>
                                <input {...register("totalQuantity", { required: true })} type="number" placeholder="Total" className="input input-bordered bg-white dark:bg-slate-800 rounded-2xl" />
                            </div>
                            <div className="form-control">
                                <label className="label-text font-bold text-[10px] uppercase mb-1 ml-1">Current</label>
                                <input {...register("quantity", { required: true })} type="number" placeholder="Available" className="input input-bordered bg-white dark:bg-slate-800 rounded-2xl" />
                            </div>
                        </div>

                        {/* Action Button */}
                        <button
                            type="submit"
                            disabled={uploadingImage || isPending}
                            className={`w-full py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] text-sm transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3
                                ${uploadingImage || isPending 
                                    ? 'bg-slate-200 text-slate-500 cursor-not-allowed' 
                                    : 'bg-[#ffaa0f] hover:bg-[#e6990d] text-slate-900 shadow-[#ffaa0f]/20'}`}
                        >
                            {uploadingImage ? (
                                <>
                                    <span className="loading loading-spinner loading-sm"></span>
                                    Uploading Asset...
                                </>
                            ) : isPending ? (
                                <>
                                    <span className="loading loading-spinner loading-sm"></span>
                                    Securing Data...
                                </>
                            ) : (
                                "Confirm & Publish"
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddTicket;