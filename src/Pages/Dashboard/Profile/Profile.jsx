import React from 'react';
import useAuth from '../../../hooks/useAuth';
import UseRole from '../../../hooks/UseRole';
import coverImg from '../../../assets/coverImg.jpg';
import LoadingSpinner from '../../../Components/LoadingSpinner/LoadingSpinner';


const Profile = () => {
    const { user } = useAuth();
    const { role, roleLoading } = UseRole();

    if (roleLoading) return <LoadingSpinner />;

    if (!role) {
        return <Error message="User role not found" />;
    }
    console.log(role)
    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="mx-auto max-w-4xl bg-white shadow-xl rounded-2xl overflow-hidden">

                {/* Cover */}
                <div className="relative h-56">
                    <img
                        src={coverImg}
                        alt="Cover"
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30"></div>
                </div>

                {/* Profile Info */}
                <div className="relative px-6 pb-6">

                    {/* Avatar */}
                    <div className="flex justify-center -mt-16">
                        <img
                            src={user?.photoURL}
                            alt="Profile"
                            className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-md"
                        />
                    </div>

                    {/* Name & Role */}
                    <div className="mt-4 text-center">
                        <h2 className="text-2xl font-semibold text-gray-800">
                            {user?.displayName}
                        </h2>

                        <span
                            className={`inline-block mt-2 px-4 py-1 text-sm rounded-full text-white
            ${role === 'admin' && 'bg-red-500'}
            ${role === 'vendor' && 'bg-green-500'}
            ${role === 'user' && 'bg-blue-500'}
          `}
                        >
                            {role}
                        </span>

                        <p className="mt-2 text-sm text-gray-500">
                            User ID: {user?.uid}
                        </p>
                    </div>

                    {/* Details */}
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                        <div>
                            <p className="text-gray-500">Email</p>
                            <p className="font-medium text-gray-700">{user?.email}</p>
                        </div>

                        <div>
                            <p className="text-gray-500">Account Type</p>
                            <p className="font-medium text-gray-700 capitalize">{role}</p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="btn btn-primary hover:bg-blue-700 px-6">
                            Update Profile
                        </button>
                        <button className="btn btn-outline px-6">
                            Change Password
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Profile;