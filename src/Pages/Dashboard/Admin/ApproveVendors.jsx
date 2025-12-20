import React from 'react';
import UseAxiosSecure from '../../../hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaEye, FaUserCheck } from 'react-icons/fa';
import { IoPersonRemove } from "react-icons/io5";
import { FaTrashCan } from "react-icons/fa6";
import Swal from 'sweetalert2';
import LoadingSpinner from '../../../Components/LoadingSpinner/LoadingSpinner';

const ApproveVendors = () => {
    const axiosSecure = UseAxiosSecure();

    const {
        data: vendors = [],
        isLoading,
        refetch
    } = useQuery({
        queryKey: ['vendors'],
        queryFn: async () => {
            const res = await axiosSecure.get('/vendors');
            return res.data;
        }
    });

    const updateVendorsStatus = (vendor, status) => {
        axiosSecure.patch(`/vendors/${vendor._id}`, {
            status,
            email: vendor.email
        }).then(res => {
            if (res.data.modifiedCount) {
                refetch();
                Swal.fire({
                    icon: 'success',
                    title: `Vendor ${status}`,
                    timer: 1500,
                    showConfirmButton: false
                });
            }
        });
    };

    const handleVendorDelete = (id) => {
        Swal.fire({
            title: "Delete vendor?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete",
            confirmButtonColor: "#dc2626"
        }).then(result => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/vendors/${id}`).then(res => {
                    if (res.data.deletedCount) {
                        refetch();
                        Swal.fire("Deleted!", "Vendor removed.", "success");
                    }
                });
            }
        });
    };

    if (isLoading) {
        return <LoadingSpinner/>
    }

    return (
        <div className="p-6">
            <h2 className="text-4xl font-bold mb-6">
                Vendor Applications ({vendors.length})
            </h2>

            {vendors.length === 0 ? (
                <p className="text-gray-500 text-center mt-10">
                    No vendor applications found.
                </p>
            ) : (
                <div className="overflow-x-auto bg-base-100 shadow-xl rounded-xl">
                    <table className="table table-zebra">
                        <thead className="bg-base-200">
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Service</th>
                                <th>Status</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vendors.map((vendor, index) => (
                                <tr key={vendor._id}>
                                    <td>{index + 1}</td>
                                    <td className="font-medium">{vendor.name}</td>
                                    <td>{vendor.email}</td>
                                    <td>{vendor.transportType}</td>
                                    <td>
                                        <span className={`badge
                      ${vendor.status === 'approved' && 'badge-success'}
                      ${vendor.status === 'rejected' && 'badge-error'}
                      ${vendor.status === 'pending' && 'badge-warning'}
                    `}>
                                            {vendor.status}
                                        </span>
                                    </td>
                                    <td className="flex justify-center gap-2">
                                        <button className="btn btn-sm btn-outline" title="View">
                                            <FaEye />
                                        </button>

                                        {vendor.status === 'pending' && (
                                            <>
                                                <button
                                                    onClick={() => updateVendorsStatus(vendor, 'approved')}
                                                    className="btn btn-sm btn-success"
                                                    title="Approve"
                                                >
                                                    <FaUserCheck />
                                                </button>

                                                <button
                                                    onClick={() => updateVendorsStatus(vendor, 'rejected')}
                                                    className="btn btn-sm btn-error"
                                                    title="Reject"
                                                >
                                                    <IoPersonRemove />
                                                </button>
                                            </>
                                        )}

                                        <button
                                            onClick={() => handleVendorDelete(vendor._id)}
                                            className="btn btn-sm btn-outline btn-error"
                                            title="Delete"
                                        >
                                            <FaTrashCan />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ApproveVendors;
