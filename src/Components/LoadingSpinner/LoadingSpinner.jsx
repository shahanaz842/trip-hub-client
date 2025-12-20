import React from 'react';


const LoadingSpinner = () => {
    return (
        <div className='h-lvh items-center'>
            <div className='w-30 mx-auto mt-20'>
                <span className="loading loading-bars loading-xl"></span>
            </div>
        </div>
    );
};

export default LoadingSpinner;