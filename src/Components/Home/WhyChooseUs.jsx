import React from 'react';
import price from '../../assets/Payment Information.gif'
import partner from '../../assets/Live collaboration.gif'
import document from '../../assets/Download.gif'
import support from '../../assets/Active Support.gif'
import { useState } from 'react';
import { FaGlobe, FaChartLine, FaShieldAlt, FaRocket, FaTag, FaUserShield, FaTicketAlt, FaHeadset } from 'react-icons/fa';


const WhyChooseUs = () => {
  const [view, setView] = useState('customer'); // 'customer' or 'vendor'

  const content = {
    customer: [
      {
       icon: <img src={price} alt="" />,
        title: "Best Price Guarantee",
        description: "We aggregate deals across all transport modes to ensure you find the most competitive rates and exclusive discounts."
      },
      {
        icon: <img src={partner} alt="" />,
        title: "Verified Partners",
        description: "Every bus, train, and flight provider is strictly vetted for safety and reliability, ensuring a worry-free journey."
      },
      {
         icon: <img src={document} alt="" />,
        title: "Instant Digital Stubs",
        description: "Skip the queues. Receive your premium digital boarding pass instantly on your device the second you book."
      },
      {
        icon: <img src={support} alt="" />,
        title: "24/7 Priority Support",
        description: "Our dedicated success team is available around the clock to handle rescheduling, refunds, or travel queries."
      }
    ],
    vendor: [
      {
        icon: <FaGlobe className="text-indigo-500" />,
        title: "Global Market Reach",
        description: "Connect your fleet to thousands of daily travelers and international tourists looking for reliable transport."
      },
      {
        icon: <FaRocket className="text-orange-500" />,
        title: "Inventory Automation",
        description: "Manage seats, schedules, and live pricing through our high-speed backend. Eliminate overbooking forever."
      },
      {
        icon: <FaChartLine className="text-emerald-500" />,
        title: "Data-Driven Growth",
        description: "Access deep analytics on peak routes and customer trends to optimize your pricing and increase revenue."
      },
      {
        icon: <FaShieldAlt className="text-slate-500" />,
        title: "Secure Payouts",
        description: "Benefit from our fraud-protected payment gateway and guaranteed, timely payouts directly to your account."
      }
    ]
  };

  return (
    <section className="py-16 px-6 bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-[#383886] dark:text-slate-50 mb-4">
            Why Choose Our Platform
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Whether you're hitting the road or managing a fleet, we provide the tools and security to make every trip a success.
          </p>
        </div>

        {/* Toggle Switch */}
        <div className="flex justify-center mb-16">
          <div className="bg-slate-200 dark:bg-slate-800 p-1 rounded-xl flex items-center relative w-72">
            <button
              onClick={() => setView('customer')}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all z-10 ${view === 'customer' ? 'text-white' : 'text-slate-500'}`}
            >
              For Travelers
            </button>
            <button
              onClick={() => setView('vendor')}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all z-10 ${view === 'vendor' ? 'text-white' : 'text-slate-500'}`}
            >
              For Vendors
            </button>
            {/* Sliding Background */}
            <div 
              className={`absolute top-1 left-1 bottom-1 w-[calc(50%-4px)] bg-[#383886] rounded-lg transition-transform duration-300 ease-out ${view === 'vendor' ? 'translate-x-full' : 'translate-x-0'}`}
            />
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {content[view].map((item, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">
                {item.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;