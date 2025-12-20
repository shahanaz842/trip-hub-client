import React from 'react';
import useAuth from '../hooks/useAuth';
import UseRole from '../hooks/UseRole';
import LoadingSpinner from '../Components/LoadingSpinner/LoadingSpinner';
import { Navigate } from 'react-router';


const AdminRoute = ({children}) => {
    const { loading } = useAuth();
    const { role, roleLoading} = UseRole();

    if(loading || roleLoading){
        return <LoadingSpinner/>
    }

    if(role !== 'admin'){
        return <Navigate to='/' replace='true' />
    }
    return children;
};

export default AdminRoute;