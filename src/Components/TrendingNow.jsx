import React from "react";

const TrendingNow = () => {
  const trendingProducts = [
    {
      title: "Alien Character",
      description:
        "This quirky alien character is perfect for your next project.",
      price: "$139.99",
      image: "path/to/alien-character.jpg", // Replace with actual image path
    },
    {
      title: "Furry Felix",
      description: "A fluffy and fun character for all your creative needs.",
      price: "$99.99",
      image: "path/to/furry-felix.jpg", // Replace with actual image path
    },
    {
      title: "Lion Cub",
      description: "Bring your projects to life with this adorable lion cub.",
      price: "$36.00",
      image: "path/to/lion-cub.jpg", // Replace with actual image path
    },
  ];

  return (
    <section className="bg-black py-16">
      <div className="container mx-auto px-8">
        <h2 className="text-3xl text-center text-white mb-8">Trending Now</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trendingProducts.map((product, index) => (
            <div
              key={index}
              className="bg-gray-700 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white">
                  {product.title}
                </h3>
                <p className="text-gray-300">{product.description}</p>
                <p className="text-xl text-purple-500 font-bold">
                  {product.price}
                </p>
                <button className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-500 transition">
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingNow;
