import React, { useState } from 'react';
import UseAxiosSecure from '../../hooks/UseAxiosSecure';
import { useForm } from 'react-hook-form';
import { imageUpload } from '../../Utils';
import Swal from 'sweetalert2';
import { FiLoader } from 'react-icons/fi'; // Make sure to import this

const ProfileUpdateModal = ({ user, closeModal, updateUserProfile }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const axiosSecure = UseAxiosSecure();
    console.log(user?.email, user.email)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: user?.displayName,
        }
    });

    const handleProfileUpdate = async (data) => {
        setIsSubmitting(true);
        try {
            let uploadedImageURL = user?.photoURL; // Default to existing photo

            // 1. Only upload if a new image is selected
            if (data.photo && data.photo[0]) {
                const profileImg = data.photo[0];
                uploadedImageURL = await imageUpload(profileImg);
            }

            // 2. Prepare update object
            const userInfo = {
                displayName: data.name,
                photoURL: uploadedImageURL,
            };

            // 3. Update user in backend database (Using PATCH for updates)
            await axiosSecure.patch(`/users/${encodeURIComponent(user?.email)}`, userInfo);

            // 4. Update Firebase profile
            await updateUserProfile(userInfo);

            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Profile information updated.',
                showConfirmButton: false,
                timer: 2000
            });
            
            closeModal(); // Close modal on success

        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Update Failed',
                text: error.message,
                confirmButtonColor: '#0f172a'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white rounded w-96 p-6 shadow-xl space-y-4">
                <h3 className="font-bold text-lg mb-3 text-slate-800">Update Profile</h3>

                <form onSubmit={handleSubmit(handleProfileUpdate)} className="space-y-4">
                    {/* Name Input */}
                    <div>
                        <label className="label-text font-semibold">Display Name</label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            className="input input-bordered w-full mt-1"
                            {...register("name", { required: "Name is required" })}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                        )}
                    </div>

                    {/* Photo Upload Input */}
                    <div>
                        <label className="label-text font-semibold">Profile Picture</label>
                        <input
                            type="file"
                            accept='image/*'
                            className="file-input file-input-bordered w-full mt-1"
                            {...register("photo")}
                        />
                        <p className="text-[10px] text-slate-400 mt-1 italic">Leave empty to keep current photo.</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded transition-colors"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-4 py-2 bg-indigo-600 text-white text-sm font-bold rounded shadow-lg shadow-indigo-200 hover:bg-indigo-700 disabled:bg-indigo-300 flex items-center gap-2"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <><FiLoader className="animate-spin" /> Updating...</>
                            ) : (
                                'Update Profile'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfileUpdateModal;