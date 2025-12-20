import React from 'react';
import { Link } from 'react-router';

const PaymentCancel = () => {
    return (
        <div>
            <h2 className=' text-xl py-5'>Payment is Cancelled. Please try again</h2>
            <Link to='/dashboard/my-booked-tickets'
                className='btn btn-secondary '>Try Again</Link>
        </div>
    );
};

export default PaymentCancel;