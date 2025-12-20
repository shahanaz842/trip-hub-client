import React from 'react';
import useAuth from '../hooks/useAuth';
import UseRole from '../hooks/UseRole';
import LoadingSpinner from '../Components/LoadingSpinner/LoadingSpinner';
import { Navigate } from 'react-router';

const VendorRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const { role, roleLoading } = UseRole();

    if (loading || !user || roleLoading) {
        return <LoadingSpinner/>
    }
    if (role !== 'vendor') {
        return  <Navigate to='/' replace='true' />
    }
    return children;
};

export default VendorRoute;