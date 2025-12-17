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
import Vendor from "../Pages/Vendor/Vendor";
import ApproveVendors from "../Pages/Dashboard/Admin/ApproveVendors";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";
import Profile from "../Pages/Dashboard/Profile/Profile";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
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
                path: 'vendor',
                Component: Vendor
            }
        ]
    },
    {
        path: '/',
        Component: AuthLayout,
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
        element: <DashboardLayout></DashboardLayout>,
        children: [
            {
                index: true,
                Component: Profile
            },
            {
                path: 'add-ticket',
                Component: AddTicket
            },
            {
                path: 'my-added-tickets',
                Component: MyAddedTickets
            },
            {
                path: 'my-booked-tickets',
                Component: MyBookedTickets
            },
            {
                path: 'requested-bookings',
                Component: RequestedBookings
            },
            {
                path: 'manage-tickets',
                Component: ManageTickets
            },
            {
                path: 'advertise-tickets',
                Component: AdvertiseTickets
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
            {
                path: 'approve-vendors',
                Component: ApproveVendors
            },
            {
                path: 'manage-users',
                Component: ManageUsers
            }
        ]
    }
])