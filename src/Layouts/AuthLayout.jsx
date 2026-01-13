import React from 'react';
import Logo from '../Components/Logo/Logo';
import { Outlet } from 'react-router';
import authImg from '../assets/Authentication.gif'

const AuthLayout = () => {
    return (
        <div className=''>
            <Logo></Logo>
            <div className='flex items-center justify-center w-11/12 mx-auto'>
                <div className=''>
                    <Outlet></Outlet>
                </div>
                <div className='hidden md:block  '>
                    <img className='cover' src={authImg} alt="" />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;