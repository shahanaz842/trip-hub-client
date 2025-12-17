import React, { useState } from 'react';
import UseAxiosSecure from '../../../hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { FaUserShield, FaStore } from 'react-icons/fa';
import { MdBlock } from 'react-icons/md';

const ManageUsers = () => {
    const axiosSecure = UseAxiosSecure();
    const [searchText, setSearchText] = useState('');

    const { refetch, data: users = [] } = useQuery({
        queryKey: ['users', searchText],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?searchText=${searchText}`);
            return res.data;
        }
    })

    const handleUserRole = (user, role) => {
        axiosSecure.patch(`/users/${user._id}/role`)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.displayName} marked as an ${role}`,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
    }

    const handleMarkFraud = (user) => {
        Swal.fire({
            title: "Mark as Fraud?",
            text: "Vendor will lose access immediately",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "Yes, mark fraud"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/vendors/fraud/${user.email}`)
                    .then(() => {
                        refetch();
                        Swal.fire("Done!", "Vendor marked as fraud", "success");
                    });
            }
        });
    };


    return (
        <div className='py-5 pl-2'>
            <h2 className="text-4xl">Manage Users : {users.length}</h2>
            <label className="input my-5">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                    </g>
                </svg>
                <input
                    onChange={(e) => setSearchText(e.target.value)}
                    type="search"
                    className="grow"
                    placeholder="Search users" />
            </label>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>User</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Admin Actions</th>
                            <th>Other Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr key={user._id}>
                                <td>
                                    {index + 1}
                                </td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={user.photoURL}
                                                    alt={user.name} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{user.displayName}</div>
                                            <div className="text-sm opacity-50">{user.role}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {user.email}
                                </td>

                                <td>
                                    <span className={`badge
                                       ${user.role === 'admin' && 'badge-success'}
                                       ${user.role === 'vendor' && 'badge-info'}
                                       ${user.role === 'blocked' && 'badge-error'}
                                       ${user.role === 'user' && 'badge-neutral'}
                                        `}>
                                        {user.role}
                                    </span>
                                </td>

                                <td className="flex gap-2">
                                    <button
                                        onClick={() => handleUserRole(user, 'admin')}
                                        className="btn btn-sm btn-success"
                                        title="Make Admin"
                                    >
                                        <FaUserShield />
                                    </button>

                                    <button
                                        onClick={() => handleUserRole(user, 'vendor')}
                                        className="btn btn-sm btn-info"
                                        title="Make Vendor"
                                    >
                                        <FaStore />
                                    </button>
                                </td>

                                <td>
                                    {user.role === 'vendor' && (
                                        <button
                                            onClick={() => handleMarkFraud(user)}
                                            className="btn btn-sm btn-error"
                                            title="Mark Fraud"
                                        >
                                            <MdBlock /> Fraud
                                        </button>
                                    )}
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;