import React, { useEffect, useState, } from 'react';
import { useSearchParams } from 'react-router';
import UseAxiosSecure from '../../../hooks/UseAxiosSecure';


const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const [paymentInfo, setPaymentInfo] = useState({});
    const sessionId = searchParams.get('session_id')
    const axiosSecure = UseAxiosSecure();

    console.log(sessionId);

    useEffect(() => {
        if(sessionId){
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
            .then(res => {
                console.log(res.data)
                setPaymentInfo({
                    transactionId: res.data.transactionId,
                })
            })
        }
    },[sessionId, axiosSecure])

    return (
        <div>
            <h2 className="text-4xl text-center">Payment Successful</h2>
            <p>Your TransactionId: {paymentInfo.transactionId}</p>
        </div>
    );
};

export default PaymentSuccess;