
import UseAxiosSecure from '../../../hooks/UseAxiosSecure';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { FaUserShield, FaStore } from 'react-icons/fa';
import { MdBlock } from 'react-icons/md';

const ManageUsers = () => {
    const axiosSecure = UseAxiosSecure();
    const queryClient = useQueryClient();

    const { refetch, data: users = [], isUpdating } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })
    console.log(users)
    const handleRoleUpdate = (email, role, name) => {
        Swal.fire({
            title: "Change Role?",
            text: "This will grant protected access",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "Yes, change role"
        }).then(async (result) => {
            if (!result.isConfirmed) return;

            //  Optimistic UI update
            queryClient.setQueryData(['users'], (oldUsers = []) =>
                oldUsers.map(user =>
                    user.email === email ? { ...user, role } : user
                )
            );

            try {
                const res = await axiosSecure.patch('/update-role', {
                    email,
                    role,
                    name
                });

                if (!res.data.userModified) {
                    throw new Error('Role update failed');
                }
                queryClient.invalidateQueries(['user-role']);
                queryClient.invalidateQueries(['users']);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Role changed to ${role}`,
                    showConfirmButton: false,
                    timer: 1500
                });

            } catch (error) {
                console.log(error)
                //  rollback if failed
                queryClient.invalidateQueries(['users']);

                Swal.fire("Error", "Failed to update role", "error");
            }
        });
    };

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
                axiosSecure.patch(`/vendors/fraud/${user?.email}`)
                    .then(() => {
                        refetch();
                        Swal.fire("Done!", "Vendor marked as fraud", "success");
                    });
            }
        });
    };


    return (
        <div className='py-5 pl-2'>
            <h2 className="text-4xl">Manage Users : {users?.length}</h2>
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
                                        onClick={() => handleRoleUpdate(user.email, 'admin', user.displayName)}
                                        className="btn btn-sm btn-success"
                                        title="Make Admin"
                                    >
                                        <FaUserShield />
                                    </button>

                                    <button
                                        onClick={() => handleRoleUpdate(user.email, 'vendor', user.displayName)}
                                        className="btn btn-sm btn-info"
                                        title="Make Vendor"
                                        disabled={isUpdating}
                                    >
                                        <FaStore />
                                    </button>
                                </td>

                                <td>
                                    {user.role === 'vendor' && (
                                        <button
                                            disabled={isUpdating}
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