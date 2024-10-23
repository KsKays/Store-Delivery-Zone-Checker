import React from "react";
import storefood from "../../assets/storefood1.png"; // import รูปภาพจาก assets

const Home = () => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center pt-16"
      style={{ backgroundImage: `url(${storefood})` }} // ใช้รูปภาพที่ import มา
    >
      <h1
        className="text-7xl font-bold mb-6 text-white"
        style={{ textShadow: "3px 3px 6px rgba(0, 0, 0, 0.7)" }}
      >
        Welcome to our Delivery Service
      </h1>
      <p
        className="text-center text-xl max-w-xl mb-8 text-white"
        style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)" }}
      >
        We offer fast and reliable delivery for all your favorite products,
        straight to your doorstep. Order now and enjoy the convenience of
        shopping from home with just a few clicks!
      </p>
      <a
        href="/App"
        className="px-8 py-3 bg-green-500 text-white text-lg rounded-md hover:bg-green-600"
      >
        Order Now
      </a>
    </div>
  );
};

export default Home;
