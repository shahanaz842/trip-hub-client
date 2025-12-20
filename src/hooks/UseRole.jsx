import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import UseAxiosSecure from './UseAxiosSecure';


const UseRole = () => {
    const { user, loading } = useAuth();
    const axiosSecure = UseAxiosSecure();

    const {
        data,
        isLoading: roleLoading,
    } = useQuery({
        enabled: !loading && !!user?.email,   
        queryKey: ['user-role', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get('/users/role');
            return res.data.role;
        },
        
    });

     return { role: data || 'user', roleLoading};
};


export default UseRole;
