import React from "react";
import about from './asssets/Dbms.png'
import Footer from "../pages/landing/components/Footer/Footer";
const About = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f7f7f7] p-8">
      <div className="text-center max-w-2xl">
        <h1 className="text-3xl font-semibold font-poppins text-[#333] mb-4">
          About Us
        </h1>
        <p className="text-lg font-light text-[#666] mb-8 leading-relaxed">
          Welcome to our toy store! We believe that toys inspire creativity,
          learning, and joy in children and adults alike. Our mission is to
          provide a unique collection of high-quality toys that spark
          imagination and bring people together. Whether you're looking for
          something educational, fun, or nostalgic, we have a toy for every
          age and interest.
        </p>

        {/* Centered Image */}
        <div className="flex justify-center mb-8">
          <img
            src={about} // Replace with your actual image path
            alt="About Us"
            className="w-auto   rounded-lg shadow-lg min-h-96"
          />
        </div>

        <p className="text-lg font-light text-[#666] mb-8 leading-relaxed">
          Our dedicated team works tirelessly to curate and design toys that
          meet the highest standards of quality and safety. We partner with
          trusted manufacturers worldwide to bring you the latest trends, as
          well as timeless classics that have stood the test of time.
        </p>
        <p className="text-lg font-light text-[#666] leading-relaxed">
          Thank you for choosing us for your toy needs. We hope our toys bring
          smiles and unforgettable memories to you and your loved ones. Explore
          our collection and let the adventure begin!
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default About;
