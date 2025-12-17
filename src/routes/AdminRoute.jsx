import React from 'react';
import useAuth from '../hooks/useAuth';
import UseRole from '../hooks/UseRole';


const AdminRoute = ({children}) => {
    const { loading } = useAuth();
    const { role, roleLoading} = UseRole();

    if(loading || roleLoading){
        return <div>
            <span className="loading loading-infinity loading-xl"></span>
        </div>
    }

    if(role !== 'admin'){
        return <div>This Page is Forbidden</div>
    }
    return children;
};

export default AdminRoute;