import React from 'react';
import UseAxiosSecure from '../../../hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FiEye, FiCheckCircle, FiXCircle, FiTrash2, FiUsers, FiClock, FiAlertCircle } from 'react-icons/fi';
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

    // Stats calculation
    const pendingCount = vendors.filter(v => v.status === 'pending').length;
    const approvedCount = vendors.filter(v => v.status === 'approved').length;

    const updateVendorsStatus = (vendor, status) => {
        axiosSecure.patch(`/vendors/${vendor._id}`, {
            status,
            email: vendor.email
        }).then(res => {
            if (res.data.modifiedCount) {
                refetch();
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: `Vendor has been ${status}`,
                    showConfirmButton: false,
                    timer: 2000,
                    background: '#0f172a',
                    color: '#fff'
                });
            }
        });
    };

    const handleVendorDelete = (id) => {
        Swal.fire({
            title: "Permanent Removal?",
            text: "This vendor profile and all associated data will be erased.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Confirm Deletion",
            confirmButtonColor: "#be123c",
            cancelButtonColor: "#64748b",
            customClass: {
                title: 'text-xl font-bold',
                popup: 'rounded-3xl'
            }
        }).then(result => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/vendors/${id}`).then(res => {
                    if (res.data.deletedCount) {
                        refetch();
                        Swal.fire("Action Complete", "Vendor removed from registry.", "success");
                    }
                });
            }
        });
    };

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="min-h-screen bg-slate-50/50 p-4 md:p-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Vendor Management</h2>
                    <p className="text-slate-500 text-sm font-medium">Audit and authorize service provider applications</p>
                </div>
                
                {/* Mini Stats Panel */}
                <div className="flex gap-3">
                    <div className="bg-white border border-slate-200 px-4 py-2 rounded-2xl flex items-center gap-3 shadow-sm">
                        <div className="p-2 bg-amber-50 text-amber-600 rounded-lg"><FiClock size={16}/></div>
                        <div>
                            <p className="text-[10px] uppercase font-black text-slate-400 leading-none">Pending</p>
                            <p className="text-lg font-bold text-slate-700">{pendingCount}</p>
                        </div>
                    </div>
                    <div className="bg-white border border-slate-200 px-4 py-2 rounded-2xl flex items-center gap-3 shadow-sm">
                        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><FiCheckCircle size={16}/></div>
                        <div>
                            <p className="text-[10px] uppercase font-black text-slate-400 leading-none">Active</p>
                            <p className="text-lg font-bold text-slate-700">{approvedCount}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Table Content */}
            <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">
                {vendors.length === 0 ? (
                    <div className="py-20 flex flex-col items-center opacity-40">
                        <FiUsers size={64} className="mb-4" />
                        <p className="font-bold uppercase tracking-widest text-xs">Registry is empty</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="table w-full border-separate border-spacing-0">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="py-5 pl-8 text-[10px] font-black uppercase text-slate-400 tracking-widest border-b border-slate-100">Provider</th>
                                    <th className="py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest border-b border-slate-100">Logistics</th>
                                    <th className="py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest border-b border-slate-100">Status</th>
                                    <th className="py-5 pr-8 text-center text-[10px] font-black uppercase text-slate-400 tracking-widest border-b border-slate-100">Administrative Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {vendors.map((vendor) => (
                                    <tr key={vendor._id} className="hover:bg-slate-50/30 transition-colors">
                                        <td className="py-5 pl-8">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-slate-900 flex items-center justify-center text-white font-black text-xs">
                                                    {vendor.name.substring(0, 2).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-700">{vendor.name}</p>
                                                    <p className="text-xs text-slate-400 font-medium">{vendor.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-5">
                                            <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-[11px] font-bold uppercase tracking-wider">
                                                {vendor.transportType}
                                            </span>
                                        </td>
                                        <td className="py-5">
                                            <div className={`flex items-center gap-2 text-[11px] font-black uppercase tracking-tighter
                                                ${vendor.status === 'approved' ? 'text-emerald-500' : 
                                                  vendor.status === 'rejected' ? 'text-rose-500' : 'text-amber-500'}
                                            `}>
                                                <span className={`h-2 w-2 rounded-full animate-pulse
                                                    ${vendor.status === 'approved' ? 'bg-emerald-500' : 
                                                      vendor.status === 'rejected' ? 'bg-rose-500' : 'bg-amber-500'}
                                                `}></span>
                                                {vendor.status}
                                            </div>
                                        </td>
                                        <td className="py-5 pr-8 text-center">
                                            <div className="flex justify-center gap-2">
                                                {/* View Detail */}
                                                {/* <button className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all" title="View Dossier">
                                                    <FiEye size={18} />
                                                </button> */}

                                                {vendor.status === 'pending' && (
                                                    <div className="flex gap-2 border-x border-slate-100 px-2 mx-2">
                                                        <button
                                                            onClick={() => updateVendorsStatus(vendor, 'approved')}
                                                            className="p-2.5 text-emerald-500 hover:bg-emerald-50 rounded-xl transition-all"
                                                            title="Authorize"
                                                        >
                                                            <FiCheckCircle size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() => updateVendorsStatus(vendor, 'rejected')}
                                                            className="p-2.5 text-rose-400 hover:bg-rose-50 rounded-xl transition-all"
                                                            title="Decline"
                                                        >
                                                            <FiXCircle size={18} />
                                                        </button>
                                                    </div>
                                                )}

                                                <button
                                                    onClick={() => handleVendorDelete(vendor._id)}
                                                    className="p-2.5 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                                                    title="Erase Record"
                                                >
                                                    <FiTrash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Compliance Footer */}
            <div className="mt-8 flex items-center justify-center gap-2 text-slate-400">
                <FiAlertCircle size={14}/>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em]">Administrative Audit Log Active</p>
            </div>
        </div>
    );
};

export default ApproveVendors;