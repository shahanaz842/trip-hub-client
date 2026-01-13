import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import SocialLogin from '../SocialLogin/SocialLogin';
import useAuth from '../../../hooks/useAuth';
import { FiEye, FiEyeOff, FiLoader, FiUser, FiMail, FiLock, FiCamera, FiCheckCircle } from 'react-icons/fi';
import { imageUpload } from '../../../Utils';
import UseAxiosSecure from '../../../hooks/UseAxiosSecure';
import Swal from 'sweetalert2';
import { Link, useLocation, useNavigate } from 'react-router';

const Register = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const { registerUser, updateUserProfile } = useAuth();
    const axiosSecure = UseAxiosSecure();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    
    const navigate = useNavigate();
    const location = useLocation();

    // Custom Error Mapper
    const getFriendlyErrorMessage = (error) => {
        const code = error.code || error.message;
        if (code.includes('auth/email-already-in-use')) return "This email is already registered with us.";
        if (code.includes('auth/invalid-email')) return "Please enter a valid corporate email address.";
        if (code.includes('auth/weak-password')) return "The security key is too simple.";
        if (code.includes('auth/network-request-failed')) return "Connection lost. Please check your internet.";
        return "Registration failed. Please verify your details and try again.";
    };

    const handleRegistration = async (data) => {
        setIsSubmitting(true);
        try {
            const profileImg = data.photo[0];

            // 1. Upload image to cloud
            const uploadedImageURL = await imageUpload(profileImg);

            // 2. Register user in Firebase
            await registerUser(data.email, data.password);

            // 3. Create user in backend database
            const userInfo = {
                email: data.email,
                displayName: data.name,
                photoURL: uploadedImageURL,
                role: 'user', // Default role
                createdAt: new Date()
            };
            
            await axiosSecure.post('/users', userInfo);

            // 4. Update Firebase profile
            await updateUserProfile({
                displayName: data.name,
                photoURL: uploadedImageURL
            });

            Swal.fire({
                icon: 'success',
                title: 'Account Created',
                text: 'Welcome to the Trip Hub corporate network.',
                showConfirmButton: false,
                timer: 2000
            });

            navigate(location?.state || '/');

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Registration Declined',
                text: getFriendlyErrorMessage(error),
                confirmButtonColor: '#0f172a'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className=" flex flex-col justify-center items-center  py-12">
            <div className="w-full max-w-lg  rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                
                {/* Header */}
                <div className="bg-slate-900 px-8 py-4 text-center">
                    <h3 className="text-2xl font-black text-white tracking-tight">Create Account</h3>
                    <p className="text-slate-400 text-xs uppercase tracking-[0.3em] font-bold">Join Trip Hub Professional</p>
                </div>

                <form className="p-8 space-y-2" onSubmit={handleSubmit(handleRegistration)}>
                    
                    {/* Grid for Name and Photo */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Name */}
                        <div className="form-control">
                            <label className="text-[10px]  font-black text-slate-500 uppercase tracking-widest ml-1 mb-2">Full Name</label>
                            <div className="relative">
                                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    {...register("name", { required: "Name is required" })}
                                    className="input dark:bg-slate-800 input-bordered w-full pl-11 rounded-xl bg-slate-50 border-slate-200 focus:ring-2 ring-indigo-500 transition-all text-sm"
                                    placeholder="John Doe"
                                />
                            </div>
                            {errors.name && <p className="text-rose-500 text-[10px] font-bold mt-1 uppercase">{errors.name.message}</p>}
                        </div>

                        {/* Photo Upload */}
                        <div className="form-control">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-2">Profile Image</label>
                            <label className="flex items-center justify-center gap-2 w-full h-[48px] rounded-xl bg-slate-50 border-2 border-dashed border-slate-200 hover:border-indigo-400 hover:bg-indigo-50 transition-all cursor-pointer">
                                <FiCamera className="text-slate-400" />
                                <span className="text-xs font-bold text-slate-500">
                                    {watch('photo')?.[0]?.name ? <span className="text-indigo-600 truncate max-w-[100px]">{watch('photo')[0].name}</span> : "Select File"}
                                </span>
                                <input
                                    type="file"
                                    {...register("photo", { required: "Photo required" })}
                                    className="hidden "
                                    accept="image/*"
                                />
                            </label>
                            {errors.photo && <p className="text-rose-500 text-[10px] font-bold mt-1 uppercase">{errors.photo.message}</p>}
                        </div>
                    </div>

                    {/* Email */}
                    <div className="form-control">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-2">Corporate Email</label>
                        <div className="relative">
                            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="email"
                                {...register("email", { required: "Email required" })}
                                className="input input-bordered w-full pl-11 rounded-xl bg-slate-50 border-slate-200 focus:ring-2 ring-indigo-500 transition-all text-sm"
                                placeholder="name@company.com"
                            />
                        </div>
                        {errors.email && <p className="text-rose-500 text-[10px] font-bold mt-1 uppercase">{errors.email.message}</p>}
                    </div>

                    {/* Password */}
                    <div className="form-control">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-2">Security Key</label>
                        <div className="relative">
                            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type={showPassword ? "text" : "password"}
                                {...register("password", {
                                    required: "Password required",
                                    minLength: { value: 6, message: "Min 6 characters" },
                                    pattern: {
                                        value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
                                        message: "Must include A-Z, a-z, 123, and symbols"
                                    }
                                })}
                                className="input input-bordered w-full px-11 rounded-xl bg-slate-50 border-slate-200 focus:ring-2 ring-indigo-500 transition-all text-sm"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors"
                            >
                                {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                            </button>
                        </div>
                        {errors.password && <p className="text-rose-500 text-[10px] font-bold mt-1 uppercase leading-tight">{errors.password.message}</p>}
                    </div>

                    {/* Terms */}
                    <div className="flex items-center gap-2 px-1">
                        <div className="p-1 bg-emerald-50 rounded text-emerald-600">
                            <FiCheckCircle size={12} />
                        </div>
                        <p className="text-[10px] text-slate-400 font-medium">By registering, you agree to our Enterprise Terms of Service.</p>
                    </div>

                    {/* Submit Button */}
                    <button 
                        disabled={isSubmitting}
                        className="btn w-full bg-slate-900 hover:bg-indigo-600 text-white border-none rounded-xl h-12 shadow-sm shadow-indigo-100 transition-all font-bold uppercase tracking-widest flex items-center justify-center gap-2 disabled:bg-slate-300"
                    >
                        {isSubmitting ? (
                            <><FiLoader className="animate-spin" size={18} /> Provisioning Account...</>
                        ) : (
                            'Registration'
                        )}
                    </button>

                     <div className="my-2 flex items-center gap-4">
                        <div className="h-px bg-slate-100 flex-1"></div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">or continue with</span>
                        <div className="h-px bg-slate-100 flex-1"></div>
                    </div>

                    <SocialLogin />

                    <p className="text-center text-sm text-slate-500 font-medium">
                        Already authorized? 
                        <Link
                            state={location.state}
                            className="text-indigo-600 font-bold ml-1 hover:underline"
                            to="/login"
                        >
                            Sign In
                        </Link>
                    </p>
                </form>
            </div>
            <p className="mt-8 text-slate-400 text-[10px] font-black uppercase tracking-[0.4em]">
                Trip Hub Systems &copy; 2026
            </p>
        </div>
    );
};

export default Register;