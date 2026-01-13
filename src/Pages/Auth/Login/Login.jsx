import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import SocialLogin from '../SocialLogin/SocialLogin';
import Swal from 'sweetalert2';
import { useState } from 'react';
import { FiEye, FiEyeOff, FiLoader, FiUser, FiShield, FiBriefcase, FiRefreshCw } from 'react-icons/fi';
import { Link, useLocation, useNavigate } from 'react-router';

const Login = () => {
    const { register, handleSubmit, formState: { errors }, getValues, setValue, reset } = useForm();
    const { signInUser, resetPassword } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    // 1. Error Mapper
    const getFriendlyErrorMessage = (error) => {
        const code = error.code || error.message;
        if (code.includes('auth/invalid-credential') || code.includes('invalid-email')) {
            return "The email or password you entered is incorrect.";
        }
        if (code.includes('auth/user-not-found')) {
            return "No account found with this email address.";
        }
        if (code.includes('auth/wrong-password')) {
            return "Incorrect password. Please try again.";
        }
        if (code.includes('auth/too-many-requests')) {
            return "Account temporarily locked due to many failed attempts. Try later.";
        }
        if (code.includes('auth/popup-closed-by-user')) {
            return "Cancelled login ";
        }
        return "System error: Unable to authorize at this time.";
    };

    const autoFill = (email, password) => {
        setValue('email', email);
        setValue('password', password);
    };

    // 2. Clear Form Function
    const handleClearForm = () => {
        reset(); // Resets all fields
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'info',
            title: 'Form cleared',
            showConfirmButton: false,
            timer: 1500
        });
    };

    const handleLogin = (data) => {
        setLoading(true);
        signInUser(data.email, data.password)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Welcome Back!',
                    text: 'Authorization successful.',
                    timer: 1500,
                    showConfirmButton: false
                });
                navigate(location?.state || '/');
            })
            .catch(error => {
                // Use the custom error mapper here
                Swal.fire({
                    icon: 'error',
                    title: 'Authentication Error',
                    text: getFriendlyErrorMessage(error),
                    confirmButtonColor: '#0f172a'
                });
            })
            .finally(() => setLoading(false));
    };

    const handleResetPassword = () => {
        const email = getValues('email');
        if (!email) {
            return Swal.fire("Input Required", "Please enter your email first", "info");
        }
        resetPassword(email)
            .then(() =>{ Swal.fire("Email Sent", "Check your inbox for reset instructions", "success")
                window.open('https://mail.google.com/mail/u/0/?hl=en#inbox')
            })
            .catch(error => Swal.fire("Error", getFriendlyErrorMessage(error), "error"));
    };

    return (
        <div className="  flex flex-col justify-center items-center p-6">
            <div className="w-full max-w-md rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
                
                {/* Header */}
                <div className="bg-slate-900 px-8 py-4 text-center relative">
                    <h3 className="text-2xl font-black text-white tracking-tight">Trip Hub</h3>
                    <p className="text-slate-400 text-xs mt-1 uppercase tracking-[0.2em] font-bold">Secure Gateway</p>
                    
                    {/* Floating Reset Button */}
                    <button 
                        type="button"
                        onClick={handleClearForm}
                        className="absolute top-4 right-4 p-2 bg-slate-800 text-slate-400 rounded-lg hover:text-white hover:bg-slate-700 transition-all border border-slate-700"
                        title="Clear all fields"
                    >
                        <FiRefreshCw size={14} />
                    </button>
                </div>

                <div className="px-8 py-4">
                    {/* Role Quick Switcher */}
                    <div className="mb-1">
                        <div className="grid grid-cols-3 gap-1 bg-slate-100 px-1.5 py-1 rounded-2xl">
                            <button onClick={() => autoFill('admin@vai.com', 'Admin@1')} className="flex flex-col items-center gap-1 py-2 px-1 rounded-xl hover:bg-white text-slate-600 hover:text-indigo-600 hover:shadow-sm transition-all text-[11px] font-bold uppercase tracking-tighter">
                                <FiShield size={16} /> Admin
                            </button>
                            <button onClick={() => autoFill('red@line.com', 'Redline@1')} className="flex flex-col items-center gap-1 py-2 px-1 rounded-xl hover:bg-white text-slate-600 hover:text-indigo-600 hover:shadow-sm transition-all text-[11px] font-bold uppercase tracking-tighter">
                                <FiBriefcase size={16} /> Vendor
                            </button>
                            <button onClick={() => autoFill('far@hana.com', 'Farhana@1')} className="flex flex-col items-center gap-1 py-2 px-1 rounded-xl hover:bg-white text-slate-600 hover:text-indigo-600 hover:shadow-sm transition-all text-[11px] font-bold uppercase tracking-tighter">
                                <FiUser size={16} /> User
                            </button>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(handleLogin)} className="space-y-2">
                        <div className="form-control">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2">Corporate ID</label>
                            <input 
                                type="email" 
                                {...register('email', { required: 'Email is required' })}
                                className="input input-bordered w-full rounded-xl bg-slate-50 border-slate-200 focus:ring-2 ring-indigo-500 transition-all" 
                                placeholder="name@company.com" 
                            />
                        </div>

                        <div className="form-control">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2">Security Key</label>
                            <div className='relative'> 
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    {...register('password', { required: 'Password is required' })} 
                                    className="input input-bordered w-full rounded-xl bg-slate-50 border-slate-200 focus:ring-2 ring-indigo-500 transition-all" 
                                    placeholder="••••••••" 
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-4 flex items-center text-slate-400 hover:text-indigo-600"
                                >
                                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-between items-center px-1">
                            <button type="button" onClick={handleClearForm} className="text-[10px] font-bold text-slate-400 hover:text-rose-500 uppercase transition-colors">
                                Reset
                            </button>
                            <button type="button" onClick={handleResetPassword} className="text-[10px] font-black text-[#383886] uppercase hover:underline">
                                Forget Password?
                            </button>
                        </div>

                        <button 
                            disabled={loading}
                            className="btn w-full bg-slate-900 hover:bg-[#383886] text-white border-none rounded-xl h-12 shadow-sm shadow-indigo-100 transition-all font-bold uppercase tracking-widest flex items-center justify-center gap-2"
                        >
                            {loading ? <FiLoader className="animate-spin" size={20} /> : 'Login'}
                        </button>
                    </form>

                    <div className="my-2 flex items-center gap-4">
                        <div className="h-px bg-slate-100 flex-1"></div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">or continue with</span>
                        <div className="h-px bg-slate-100 flex-1"></div>
                    </div>

                    <SocialLogin />

                    <p className="text-center  text-sm text-slate-500 font-medium">
                        Need a corporate account? 
                        <Link state={location.state} className='text-[#383886] font-bold ml-1 hover:underline' to='/Register'>Register</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;