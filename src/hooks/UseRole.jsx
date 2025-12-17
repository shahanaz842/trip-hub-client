import React from 'react';
import useAuth from './useAuth';
import UseAxiosSecure from './UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const UseRole = () => {
     const { user } = useAuth();
    const axiosSecure = UseAxiosSecure();

    const {isLoading: roleLoading, data: role = 'user'} = useQuery({
        queryKey: ['user-role', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}/role`)
            return res.data?.role || 'user';
        }
    })
    return { role, roleLoading };
};

export default UseRole;