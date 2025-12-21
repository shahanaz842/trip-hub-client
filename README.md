🎟️ TicketBari – Online Ticket Booking Platform
📌 Project Overview

TicketBari is a full-stack Online Ticket Booking Platform built using the MERN stack. The platform allows users to discover and book travel tickets (Bus, Train, Launch, Plane), while vendors can manage tickets and bookings, and admins control approvals, advertisements, and user roles.

The system is role-based with User, Vendor, and Admin dashboards and includes secure authentication, real-time booking workflows, and online payments.

🌐 Live Website

👉 Live URL:[ https://your-live-site-link.com](https://trip-hub-12f28.web.app/)

👉 Server URL: [https://your-server-link.com](https://trip-hub-server.vercel.app/)

🚀 Key Features
🔐 Authentication

Email & Password login and registration

Google Social Login

Password validation (uppercase, lowercase, min 6 characters)

Protected routes with persistent login on reload

Firebase authentication secured with environment variables

🏠 Home Page

Hero banner / slider

Advertisement Section (max 6 admin-selected tickets)

Latest Tickets Section

Extra informative sections (e.g., Why Choose Us, Popular Routes)

Responsive design for all devices

🎫 All Tickets Page

Shows admin-approved tickets only

Search by route (From → To)

Filter by transport type

Pagination for better performance

Ticket details navigation

📄 Ticket Details (Protected)

Full ticket information

Countdown based on departure date & time

“Book Now” modal with quantity validation

Auto-disable booking for expired or sold-out tickets

📊 Dashboard System
👤 User Dashboard

User Profile

My Booked Tickets

Booking status: pending / accepted / rejected / paid

Stripe payment integration

Countdown for departure

Transaction History (Stripe payments)

🧑‍💼 Vendor Dashboard

Vendor Profile

Add Ticket (with image upload via imgbb)

My Added Tickets (update/delete)

Requested Bookings (accept/reject)

Revenue Overview with charts

🛡️ Admin Dashboard

Admin Profile

Manage Tickets (approve/reject)

Manage Users (make admin/vendor, mark fraud)

Advertise Tickets (max 6 at a time)

Fraud vendors’ tickets are hidden automatically

💳 Payment System

Secure Stripe payment integration

Automatic ticket quantity reduction after payment

Transaction history tracking

🛠️ Technologies Used
🔵 Frontend

React 19

React Router

TanStack React Query

Axios

Firebase Authentication

Tailwind CSS + DaisyUI

Swiper & React Responsive Carousel

React Hook Form

SweetAlert2 & React Hot Toast

Recharts

Lucide Icons

🟢 Backend

Node.js

Express.js

MongoDB

Firebase Admin SDK

Stripe

dotenv

CORS

📦 Client Dependencies
@tanstack/react-query
axios
firebase
react
react-router
react-hook-form
tailwindcss
daisyui
swiper
recharts
sweetalert2
react-hot-toast

📦 Server Dependencies
express
mongodb
cors
dotenv
firebase-admin
stripe

🔐 Security

Firebase config secured using environment variables

MongoDB credentials hidden via .env

JWT-based secure API access

CORS properly configured for production

📈 Commit History

✅ 20+ meaningful commits on client side

✅ 12+ meaningful commits on server side

Clear and descriptive commit messages

📱 Responsiveness & UI

Fully responsive (mobile, tablet, desktop)

Clean layout with consistent spacing

Equal-height cards and grid layouts

Eye-friendly color contrast

Dashboard optimized for data visualization

⚠️ Notes

No page breaks or errors on reload

Private routes persist authentication

Firebase authorized domains configured properly

Server works smoothly in production without CORS / 404 / 504 errors

👨‍💻 Author
SM Mehedi Hasan Shawon
Full Stack MERN Developer
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
