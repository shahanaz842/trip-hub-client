import React from 'react';
import logo from '../../assets/logo.png'

const Logo = () => {
    return (
        <div className='flex items-center'>
            <img src={logo} className='w-24' alt="" />
            <h3 className='text-3xl font-bold -ms-4 text-primary'>trip<span className='text-secondary'>H</span>ub</h3>
        </div>
    );
};

export default Logo;