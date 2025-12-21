import React from 'react';
import logo from '../../assets/logo.png'
import { Link } from 'react-router';

const Logo = () => {
    return (
        <Link to='/' className='flex items-center'>
            <img src={logo} className='w-24' alt="" />
            <h3 className='text-3xl font-bold -ms-4 text-primary'>trip<span className='text-secondary'>H</span>ub</h3>
        </Link>
    );
};

export default Logo;