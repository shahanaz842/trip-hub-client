import React from 'react';
import { Link } from 'react-router';

const UnauthorizedAccess = () => {
    return (
        <div className='pl-3 flex justify-center mt-20' >
            <div>
                <h2 className='text-3xl text-bold text-primary my-5'>Please login first to access this Content</h2>
                <div className='flex justify-center'>
                    <Link to='/login' className='btn btn-primary
            '>Log in</Link>
                    <Link to='/' className='btn btn-outline mx-3'>Go Back</Link>
                </div>
            </div>
        </div>
    );
};

export default UnauthorizedAccess;