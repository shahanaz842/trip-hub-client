import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import SocialLogin from '../SocialLogin/SocialLogin';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { imageUpload } from '../../../Utils';
import UseAxiosSecure from '../../../hooks/UseAxiosSecure';
import toast from 'react-hot-toast';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { registerUser, updateUserProfile, loading } = useAuth();
    const axiosSecure = UseAxiosSecure();

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleRegistration = async (data) => {
        try {
            const profileImg = data.photo[0];

            // 1. Register user
            const result = await registerUser(data.email, data.password);
            console.log(result);

            // 2. Upload image to imgbb
            const uploadedImageURL = await imageUpload(profileImg);
            // 3. create user in the database
            const userInfo = {
                email: data.email,
                displayName: data.name,
                photoURL: uploadedImageURL
            }
            axiosSecure.post('/users', userInfo)
                .then(res => {
                    if (res.data.insertedId) {
                        console.log('user created in the database')
                    }
                })

            // 4. Prepare user profile data
            const userProfile = {
                displayName: data.name,
                photoURL: uploadedImageURL
            };

            // 5. Update Firebase profile
            await updateUserProfile(userProfile);

            // 6. Redirect user
            navigate(location?.state || '/');

        } catch (error) {
            console.error("Registration Error:", error);
            toast.error(error.message)
        }
    };

    return (
        <div className='card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl'>
            <h3 className="md:text-3xl font-bold text-center md:pt-5">Welcome to Trip Hub</h3>
            <p className='text-center'>Please Register</p>

            <form className="card-body" onSubmit={handleSubmit(handleRegistration)}>
                <fieldset className="fieldset">

                    {/* Name */}
                    <label className="label">Name</label>
                    <input
                        type="text"
                        {...register("name", { required: true })}
                        className="input"
                        placeholder="Your name"
                    />
                    {errors.name && <p className="text-red-500">Name is required</p>}

                    {/* Photo */}
                    <label className="label">Photo</label>
                    <input
                        type="file"
                        {...register("photo", { required: true })}
                        className="file-input"
                    />
                    {errors.photo && <p className="text-red-500">Photo is required</p>}

                    {/* Email */}
                    <label className="label">Email</label>
                    <input
                        type="email"
                        {...register("email", { required: true })}
                        className="input"
                        placeholder="Email"
                    />
                    {errors.email && <p className="text-red-500">Email is required</p>}

                    {/* Password */}
                    <label className="label">Password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            {...register("password", {
                                required: true,
                                minLength: 6,
                                pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/
                            })}
                            className="input"
                            placeholder="Password"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="btn btn-xs absolute top-2 right-5"
                        >
                            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                        </button>
                    </div>

                    {errors.password?.type === 'required' && (
                        <p className="text-red-500">Password is required</p>
                    )}
                    {errors.password?.type === 'minLength' && (
                        <p className="text-red-500">Password must be 6 characters or longer</p>
                    )}
                    {errors.password?.type === 'pattern' && (
                        <p className="text-red-500">
                            Password must contain uppercase, lowercase, number & special character
                        </p>
                    )}

                    <button className="btn btn-primary mt-4 hover:bg-blue-600">{loading ? (
                <span className="loading loading-spinner text-white"></span>
              ) : (
                'Register'
              )}</button>

                </fieldset>

                <p>
                    Already have an account?{" "}
                    <Link
                        state={location.state}
                        className="text-blue-500 underline hover:text-blue-800"
                        to="/login"
                    >
                        Login
                    </Link>
                </p>
            </form>

            <SocialLogin />
        </div>
    );
};

export default Register;
