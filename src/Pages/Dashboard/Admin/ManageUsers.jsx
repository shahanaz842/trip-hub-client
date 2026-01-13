import React, { useState } from 'react';
import UseAxiosSecure from '../../../hooks/UseAxiosSecure';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { FaUserShield, FaStore, FaUsers, FaUserCheck, FaBan, FaSearch } from 'react-icons/fa';
import { MdBlock, MdEmail } from 'react-icons/md';
import LoadingSpinner from '../../../Components/LoadingSpinner/LoadingSpinner';

const ManageUsers = () => {
    const axiosSecure = UseAxiosSecure();
    const queryClient = useQueryClient();
    const [searchTerm, setSearchTerm] = useState("");

    const { refetch, data: users = [], isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    // Handle Role Update with Professional Alerts
    const handleRoleUpdate = (email, role, name) => {
        Swal.fire({
            title: `<span style="font-family: inherit">Update Role for ${name}?</span>`,
            text: `This will change permissions to ${role.toUpperCase()}`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#4F46E5", // Indigo-600
            cancelButtonColor: "#94a3b8",
            confirmButtonText: "Confirm Change"
        }).then(async (result) => {
            if (!result.isConfirmed) return;

            // Optimistic UI update
            queryClient.setQueryData(['users'], (oldUsers = []) =>
                oldUsers.map(user => user.email === email ? { ...user, role } : user)
            );

            try {
                const res = await axiosSecure.patch('/update-role', { email, role, name });
                if (!res.data.userModified) throw new Error('Update failed');
                
                queryClient.invalidateQueries(['users']);
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: 'System permissions updated',
                    showConfirmButton: false,
                    timer: 2000
                });
            } catch (error) {
                queryClient.invalidateQueries(['users']);
                Swal.fire("Error", "System could not process role change", "error");
            }
        });
    };

    const handleMarkFraud = (user) => {
        Swal.fire({
            title: "Restrict Access?",
            text: "This vendor will be flagged and suspended.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#e11d48",
            confirmButtonText: "Yes, suspend vendor"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/vendors/fraud/${user?.email}`)
                    .then(() => {
                        refetch();
                        Swal.fire("Suspended", "Vendor has been flagged as fraud.", "success");
                    });
            }
        });
    };

    // Filter Logic
    const filteredUsers = users.filter(user => 
        user.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Stats Logic
    const stats = {
        total: users.length,
        admins: users.filter(u => u.role === 'admin').length,
        vendors: users.filter(u => u.role === 'vendor').length,
    };

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="p-6 bg-slate-50 min-h-screen font-sans">
            {/* 1. Header & Stats Section */}
            <div className="mb-8 flex flex-col md:flex-row justify-between items-end gap-4">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tight">User Directory</h2>
                    <p className="text-slate-500 font-medium">Manage permissions and monitor platform access</p>
                </div>
                
                <div className="flex gap-4">
                    <StatCard icon={<FaUsers />} label="Total" value={stats.total} color="text-indigo-600" />
                    <StatCard icon={<FaUserShield />} label="Admins" value={stats.admins} color="text-emerald-600" />
                    <StatCard icon={<FaStore />} label="Vendors" value={stats.vendors} color="text-amber-600" />
                </div>
            </div>

            {/* 2. Control Bar */}
            <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="relative w-full md:w-96">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="Search by name or email..." 
                        className="input input-bordered w-full pl-12 rounded-xl bg-slate-50 border-none focus:ring-2 ring-indigo-500"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                    Showing {filteredUsers.length} users
                </div>
            </div>

            {/* 3. Main Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full border-separate border-spacing-0">
                        <thead>
                            <tr className="bg-slate-50 text-slate-500 font-bold text-[11px] uppercase tracking-wider">
                                <th className="py-4 pl-6">Member</th>
                                <th>Contact</th>
                                <th>Current Role</th>
                                <th>Permissions</th>
                                <th className="text-right pr-6">Management</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredUsers.map((user, index) => (
                                <tr key={user._id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="py-4 pl-6">
                                        <div className="flex items-center gap-4">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-11 w-11 shadow-sm border-2 border-white">
                                                    <img src={user.photoURL || 'https://via.placeholder.com/150'} alt={user.displayName} />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-700">{user.displayName}</div>
                                                <div className="text-[10px] font-black text-indigo-500 uppercase tracking-tighter">ID: {user._id.slice(-6)}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-2 text-slate-500 font-medium text-sm">
                                            <MdEmail className="text-slate-400" /> {user.email}
                                        </div>
                                    </td>
                                    <td>
                                        <RoleBadge role={user.role} />
                                    </td>
                                    <td>
                                        <div className="flex gap-2">
                                            <ActionButton 
                                                onClick={() => handleRoleUpdate(user.email, 'admin', user.displayName)}
                                                icon={<FaUserShield />}
                                                tooltip="Promote Admin"
                                                activeColor="hover:bg-emerald-500"
                                            />
                                            <ActionButton 
                                                onClick={() => handleRoleUpdate(user.email, 'vendor', user.displayName)}
                                                icon={<FaStore />}
                                                tooltip="Set Vendor"
                                                activeColor="hover:bg-amber-500"
                                            />
                                        </div>
                                    </td>
                                    <td className="text-right pr-6">
                                        {user.role === 'vendor' ? (
                                            <button
                                                onClick={() => handleMarkFraud(user)}
                                                className="btn btn-sm bg-rose-50 text-rose-600 border-none hover:bg-rose-600 hover:text-white rounded-lg font-bold transition-all"
                                            >
                                                <MdBlock /> Suspend
                                            </button>
                                        ) : (
                                            <span className="text-[10px] font-bold text-slate-300 uppercase italic">No Flag Available</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

// --- Helper Components for Professional Look ---

const StatCard = ({ icon, label, value, color }) => (
    <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
        <div className={`p-3 rounded-xl bg-slate-50 ${color} text-lg`}>{icon}</div>
        <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-tighter">{label}</div>
            <div className="text-xl font-black text-slate-800 leading-tight">{value}</div>
        </div>
    </div>
);

const RoleBadge = ({ role }) => {
    const styles = {
        admin: "bg-emerald-50 text-emerald-700 border-emerald-100",
        vendor: "bg-amber-50 text-amber-700 border-amber-100",
        blocked: "bg-rose-50 text-rose-700 border-rose-100",
        user: "bg-slate-50 text-slate-600 border-slate-200",
    };
    return (
        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${styles[role] || styles.user}`}>
            {role}
        </span>
    );
};

const ActionButton = ({ onClick, icon, tooltip, activeColor }) => (
    <div className="tooltip tooltip-top" data-tip={tooltip}>
        <button
            onClick={onClick}
            className={`w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition-all ${activeColor} hover:text-white`}
        >
            {icon}
        </button>
    </div>
);

export default ManageUsers;