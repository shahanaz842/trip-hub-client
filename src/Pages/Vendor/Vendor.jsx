import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import UseAxiosSecure from '../../hooks/UseAxiosSecure';
import Swal from 'sweetalert2';

const Vendor = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const { user } = useAuth();
    const axiosSecure = UseAxiosSecure();

    const handleVendorApplication = async (data) => {
        try {
            const res = await axiosSecure.post('/vendors', data);
            if (res.data.insertedId) {
                Swal.fire({
                    icon: 'success',
                    title: 'Application Submitted',
                    text: 'We will review your application and contact you within two weeks.',
                    confirmButtonColor: '#2563eb'
                });
            }
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Submission Failed',
                text: 'Please try again later.'
            });
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <div className="mb-10 text-center">
                <h2 className="text-4xl font-bold mb-2">Become a Vendor</h2>
                <p className="text-gray-500">
                    Fill out the form below to apply as a vendor on our platform
                </p>
            </div>

            <form
                onSubmit={handleSubmit(handleVendorApplication)}
                className="bg-base-100 shadow-xl rounded-2xl p-8"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                    {/* Vendor Info */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4 border-b pb-2">
                            Vendor Information
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <label className="label font-medium">Vendor Name</label>
                                <input
                                    {...register('name', { required: true })}
                                    defaultValue={user?.displayName}
                                    className="input input-bordered w-full"
                                    placeholder="Your full name"
                                />
                                {errors.name && <p className="text-error text-sm">Name is required</p>}
                            </div>

                            <div>
                                <label className="label font-medium">Email</label>
                                <input
                                    {...register('email')}
                                    defaultValue={user?.email}
                                    className="input input-bordered w-full bg-gray-100"
                                    disabled
                                />
                            </div>

                            <div>
                                <label className="label font-medium">Address</label>
                                <input
                                    {...register('address', { required: true })}
                                    className="input input-bordered w-full"
                                    placeholder="Your full address"
                                />
                            </div>

                            <div>
                                <label className="label font-medium">Phone Number</label>
                                <input
                                    {...register('phoneNo', { required: true })}
                                    className="input input-bordered w-full"
                                    placeholder="+880XXXXXXXXXX"
                                />
                            </div>
                        </div>
                    </div>

                    {/* More Info */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4 border-b pb-2">
                            Business Details
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <label className="label font-medium">Transport Type</label>
                                <input
                                    {...register('transportType', { required: true })}
                                    className="input input-bordered w-full"
                                    placeholder="Plane / Bus / Train / Launch"
                                />
                            </div>

                            <div>
                                <label className="label font-medium">Business License No</label>
                                <input
                                    {...register('license', { required: true })}
                                    className="input input-bordered w-full"
                                    placeholder="License number"
                                />
                            </div>

                            <div>
                                <label className="label font-medium">National ID (NID)</label>
                                <input
                                    {...register('NID', { required: true })}
                                    className="input input-bordered w-full"
                                    placeholder="NID number"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Submit */}
                <div className="mt-10 text-center">
                    <button
                        type="submit"
                        className="btn btn-primary px-10 text-white text-lg"
                    >
                        Apply as Vendor
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Vendor;
