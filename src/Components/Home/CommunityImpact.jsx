import React from 'react';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';


const CommunityImpact = () => {
  const reviews = [
    {
      name: "Anika Rahman",
      role: "Frequent Traveler",
      text: "The premium ticket interface is so easy to use. I booked my flight to Cox's Bazar in under 2 minutes!",
      rating: 5
    },
    {
      name: "Green Line Services",
      role: "Official Vendor",
      text: "Partnering with this platform has streamlined our seat management and reached a whole new demographic.",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Stats */}
          <div>
            <h2 className="text-3xl font-bold text-[#383886] dark:text-white mb-6 leading-tight">
              We’re Redefining the <br /> 
              <span className="text-[#ffaa0f]">Travel Experience.</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-10 text-lg">
              Join thousands of travelers and hundreds of vendors who trust our 
              automated ticketing ecosystem every single day.
            </p>
            
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-3xl font-black text-[#383886] dark:text-[#ffaa0f]">98%</h4>
                <p className="text-sm font-bold uppercase tracking-wider text-slate-500">Customer Satisfaction</p>
              </div>
              <div>
                <h4 className="text-3xl font-black text-[#383886] dark:text-[#ffaa0f]">24/7</h4>
                <p className="text-sm font-bold uppercase tracking-wider text-slate-500">Live Monitoring</p>
              </div>
            </div>
          </div>

          {/* Right Side: Testimonial Cards */}
          <div className="space-y-6">
            {reviews.map((rev, idx) => (
              <div key={idx} className="p-8 bg-slate-50 dark:bg-slate-800 rounded-2xl relative shadow-sm border border-slate-100 dark:border-slate-700">
                <FaQuoteLeft className="absolute top-6 right-8 text-slate-200 dark:text-slate-700 text-4xl" />
                <div className="flex gap-1 mb-4 text-yellow-400">
                  {[...Array(rev.rating)].map((_, i) => <FaStar key={i} />)}
                </div>
                <p className="text-slate-700 dark:text-slate-300 italic mb-6">"{rev.text}"</p>
                <div>
                  <h5 className="font-bold text-slate-900 dark:text-white">{rev.name}</h5>
                  <p className="text-xs text-indigo-600 font-medium uppercase tracking-widest">{rev.role}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default CommunityImpact;