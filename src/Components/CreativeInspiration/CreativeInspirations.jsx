import React from 'react';

const CreativeInspirations = () => {
  return (
    <section className="bg-black py-16">
      <div className="container mx-auto px-8">
        <h2 className="text-4xl text-white text-center mb-8">Creative Inspirations</h2>
        <p className="text-gray-300 text-lg text-center mb-12">
          Discover quotes and ideas that spark your creativity and drive your projects forward.
        </p>
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex-1 mb-8 md:mr-4">
            <blockquote className="text-xl italic text-gray-200 mb-4">
              “Creativity is intelligence having fun.” 
            </blockquote>
            <cite className="text-gray-400">– Albert Einstein</cite>
          </div>
          
          <div className="flex-1 mb-8 md:mx-4">
            <blockquote className="text-xl italic text-gray-200 mb-4">
              “Design is not just what it looks like and feels like. Design is how it works.”
            </blockquote>
            <cite className="text-gray-400">– Steve Jobs</cite>
          </div>
          
          <div className="flex-1 mb-8 md:ml-4">
            <blockquote className="text-xl italic text-gray-200 mb-4">
              “The best way to predict the future is to invent it.”
            </blockquote>
            <cite className="text-gray-400">– Alan Kay</cite>
          </div>
        </div>

        <div className="text-center mt-8">
          <a href="/inspirations" className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-500 transition">
            Explore More Inspirations
          </a>
        </div>
      </div>
    </section>
  );
};

export default CreativeInspirations;
