import React from "react";

const Testimonials = () => {
  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white">
          What Our Clients Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <p className="text-gray-600 mb-4">
              "This service has completely transformed the way we do business.
              The team is amazing and the results speak for themselves!"
            </p>
            <h3 className="text-xl font-semibold">John Doe</h3>
            <p className="text-gray-500">CEO of Example Co.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <p className="text-gray-600 mb-4">
              "I am beyond impressed with the quality of service. Their
              attention to detail is second to none. Highly recommended!"
            </p>
            <h3 className="text-xl font-semibold">Jane Smith</h3>
            <p className="text-gray-500">Founder of ABC Ventures</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <p className="text-gray-600 mb-4">
              "Their innovative solutions have helped our business grow in ways
              we never imagined. Truly a game-changer!"
            </p>
            <h3 className="text-xl font-semibold">Mark Wilson</h3>
            <p className="text-gray-500">CTO of XYZ Corp.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
