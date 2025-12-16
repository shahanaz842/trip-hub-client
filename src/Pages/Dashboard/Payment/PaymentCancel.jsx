import React from 'react';
import { Link } from 'react-router';

const PaymentCancel = () => {
    return (
        <div>
            <h2>Payment is Cancelled. Please try again</h2>
            <Link to='/dashboard/my-booked-tickets'
                className='btn btn-secondary text-black'>Try Again</Link>
        </div>
    );
};

export default PaymentCancel;