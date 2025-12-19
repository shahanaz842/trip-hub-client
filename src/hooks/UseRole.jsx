import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import UseAxiosSecure from './UseAxiosSecure';


const UseRole = () => {
    const { user, loading } = useAuth();
    const axiosSecure = UseAxiosSecure();

    const {
        data,
        isLoading: roleLoading,
        refetch
    } = useQuery({
        queryKey: ['user-role', user?.email],
        enabled: !loading && !!user?.email,   // wait for auth
        queryFn: async () => {
            const res = await axiosSecure.get('/users/role');
            return res.data.role;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes (prevents frequent refetch)
    });

    return {
        role: data || 'user',
        roleLoading,
        refetchRole: refetch
    };
};


export default UseRole;
