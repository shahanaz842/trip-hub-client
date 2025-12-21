import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
    baseURL: 'https://trip-hub-server.vercel.app'
})

const UseAxiosSecure = () => {
    const { user, logout , loading} = useAuth();
    const navigate = useNavigate();

    // intercept request
    useEffect(() => {
        if (loading || !user?.accessToken) return;
        const reqInterceptor = axiosSecure.interceptors.request.use(config => {
            config.headers.authorization = `Bearer ${user.accessToken}`
            return config
        })

        // interceptor response
        const resInterceptor = axiosSecure.interceptors.response.use((response) => {
            return response;
        }, (error) => {
            console.log(error);

            const statusCode = error.response?.status;
            if (statusCode === 401 || statusCode === 403) {
                logout()
                    .then(() => {
                        navigate('/login');
                    })


            }

            return Promise.reject(error);
        })

        return () => {
            axiosSecure.interceptors.request.eject(reqInterceptor);
            axiosSecure.interceptors.response.eject(resInterceptor);
        }

    }, [user, logout, navigate])
    return axiosSecure;
};

export default UseAxiosSecure;