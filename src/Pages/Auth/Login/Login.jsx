
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import Swal from 'sweetalert2';
import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const Login = () => {
    const { register, handleSubmit, formState: { errors }, getValues } = useForm();
    const { signInUser, resetPassword } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = (data) => {
        console.log('form data', data);
        signInUser(data.email, data.password)
            .then(result => {
                console.log(result.user)
                navigate(location?.state || '/')
            })
            .catch(error => {
                Swal.fire(`error,${error.message},error`)
            })
    }

    const handleResetPassword = () => {
        const email = getValues('email');

        resetPassword(email)
            .then(() => {
                alert('Check your email for password reset')
                window.open('http://www.gmail.com')
            }).cath(error => {
                Swal.fire(`error,${error.message},error`)
            })
    }

    return (

        <div>
            <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl text-primary">
                <h3 className="text-3xl font-bold text-center pt-5">Welcome Back</h3>
                <p className='text-center'>Please Login</p>
                <form onSubmit={handleSubmit(handleLogin)} className="card-body">
                    <fieldset className="fieldset">
                        {/* email field */}
                        <label className="label">Email</label>
                        <input type="email" {...register('email', { required: true })}
                            className="input" placeholder="Email" />
                        {
                            errors.email?.type === 'required' && <p className='text-red-500'>Email is required</p>
                        }
                        {/* password field */}
                        <label className="label">Password</label>
                        <div className='relative'> 
                            <input type={showPassword ? "text" : "password"} 
                            {...register('password', { required: true, minLength: 6 })} className="input" placeholder="Password" />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="btn btn-xs absolute top-2 right-5"
                            >
                                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                            </button>
                        </div>
                        {
                            errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>
                        }
                        {
                            errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be 6 characters or longer</p>
                        }
                        <div><a onClick={handleResetPassword} className="link link-hover">Forgot password?</a></div>
                        <button className="btn btn-primary mt-4 hover:bg-blue-600">Login</button>
                    </fieldset>
                    <p>New to Trip Hub? <Link
                        state={location.state}
                        className='text-blue-500 underline hover:text-blue-800'
                        to='/Register'>Register</Link></p>
                </form>
                <SocialLogin></SocialLogin>
            </div>
        </div>
    );
};

export default Login;