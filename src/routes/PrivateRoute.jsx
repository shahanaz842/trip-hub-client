import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router';
import LoadingSpinner from '../Components/LoadingSpinner/LoadingSpinner';

const PrivateRoute = ({ children }) => {
     const {user, loading} = useAuth();
    const location = useLocation();

    if(loading){
        return <div>
            <LoadingSpinner/>
        </div>
    }
    if(!user){
        return <Navigate state={location.pathname} to='/login'></Navigate>
    }
    return children;
};

export default PrivateRoute;