import React from 'react';
import useAuth from '../hooks/useAuth';
import UseRole from '../hooks/UseRole';

const VendorRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const { role, roleLoading } = UseRole();

    if (loading || !user || roleLoading) {
        return <div>
            <span className="loading loading-infinity loading-xl"></span>
        </div>
    }
    if (role !== 'vendor') {
        return <div>This Page is Forbidden</div>
    }
    return children;
};

export default VendorRoute;