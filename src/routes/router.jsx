import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import DashboardLayout from "../Layouts/DashboardLayout";
import AddTicket from "../Pages/Dashboard/Vendor/AddTicket";
import MyAddedTickets from "../Pages/Dashboard/Vendor/MyAddedTickets";
import TicketDetails from "../Pages/TicketDetails/TicketDetails";
import MyBookedTickets from "../Pages/Dashboard/User/MyBookedTickets";
import RequestedBookings from "../Pages/Dashboard/Vendor/RequestedBookings";
import ManageTickets from "../Pages/Dashboard/Admin/ManageTickets";
import AllTickets from "../Pages/AllTickets/AllTickets";
import AdvertiseTickets from "../Pages/Dashboard/Admin/AdvertiseTickets";
import PaymentSuccess from "../Pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancel from "../Pages/Dashboard/Payment/PaymentCancel";
import PaymentHistory from "../Pages/Dashboard/Payment/PaymentHistory";
import PrivateRoute from "./PrivateRoute";
import ApproveVendors from "../Pages/Dashboard/Admin/ApproveVendors";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";
import Profile from "../Pages/Dashboard/Profile/Profile";
import RevenueOverview from "../Pages/Dashboard/Vendor/RevenueOverview";
import BecomeVendor from "../Pages/BecomeVendor/BecomeVendor";
import UnauthorizedAccess from "../Pages/UnauthorizedAccess/UnauthorizedAccess";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import LoadingSpinner from "../Components/LoadingSpinner/LoadingSpinner";
import VendorRoute from "./VendorRoute";
import AdminRoute from "./AdminRoute";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        errorElement:<ErrorPage></ErrorPage>,
        HydrateFallback: <LoadingSpinner></LoadingSpinner>,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: 'ticket/:id',
                Component: TicketDetails
            },
            {
                path: 'all-tickets',
                Component: AllTickets
            },
            {
                path: 'become-vendor',
                element: <PrivateRoute><BecomeVendor></BecomeVendor></PrivateRoute>
            }
        ]
    },
    {
        path: '/',
        Component: AuthLayout,
        errorElement:<ErrorPage></ErrorPage>,
        HydrateFallback: <LoadingSpinner></LoadingSpinner>,
        children: [
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'register',
                Component: Register
            }
        ]
    },
    {
        path: 'dashboard',
        errorElement:<ErrorPage></ErrorPage>,
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        HydrateFallback: <LoadingSpinner></LoadingSpinner>,
        children: [
            {
                index: true,
                Component: Profile
            },
            // user route
            {
                path: 'my-booked-tickets',
                Component: MyBookedTickets
            },
             {
                path: 'payment-success',
                Component: PaymentSuccess
            },

             {
                path: 'payment-cancelled',
                Component: PaymentCancel
            },
            {
                path: 'payment-history',
                Component: PaymentHistory
            },
            // vendor only route
            {
                path: 'add-ticket',
                element: <VendorRoute><AddTicket></AddTicket></VendorRoute>
            },
            {
                path: 'my-added-tickets',
                element: <VendorRoute><MyAddedTickets></MyAddedTickets></VendorRoute>
            },
            
            {
                path: 'requested-bookings',
                element: <VendorRoute><RequestedBookings></RequestedBookings></VendorRoute>
            },
            {
                path: 'revenue-overview',
                element: <VendorRoute><RevenueOverview></RevenueOverview></VendorRoute>
            },
            // Admin only route
            {
                path: 'manage-tickets',
                element: <AdminRoute><ManageTickets></ManageTickets></AdminRoute>
            },
            {
                path: 'advertise-tickets',
                element: <AdminRoute><AdvertiseTickets></AdvertiseTickets></AdminRoute>
            },
            {
                path: 'manage-users',
                element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
            },
            {
                path: 'approve-vendors',
                Component: ApproveVendors
            },
        ]
    },
    {
        path : 'unauthorized',
        Component: UnauthorizedAccess
    },
   
])