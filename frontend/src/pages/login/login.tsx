// Import necessary libraries and styles
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import toast from "react-hot-toast";
const firebaseConfig = {
  apiKey: "AIzaSyCLpw_Uq_rFNraPtyIMsCehR2IBgSvQFs4",

  authDomain: "toyaiweb.firebaseapp.com",

  projectId: "toyaiweb",

  storageBucket: "toyaiweb.firebasestorage.app",

  messagingSenderId: "713559921121",

  appId: "1:713559921121:web:cc779e8f5d29971905c2a0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app);

const Login = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isHuman, setIsHuman] = useState(false); // State for the checkbox

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isHuman) {
      toast.error("Please check the 'Yes, I am a human' box to continue.");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);

      toast.success(
        `Welcome back ${
          auth.currentUser?.displayName || auth.currentUser?.email
        }`
      );
      navigate("/landing");
    } catch (error) {
      console.log(error);
      toast.error("Wrong password");
    }
  };

  return (
    <div className="flex flex-col min-h-screen justify-center items-center bg-gray-100">
      {/* Toy.AI Title */}
      <h1 className="text-4xl md:text-6xl font-bold font-poppins text-center mb-6">
        Toy.AI
      </h1>

      {/* Login Box */}
      <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          {/* Email Input */}
          <input
            type="email"
            placeholder="Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FCE1E4] focus:border-transparent"
          />

          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FCE1E4] focus:border-transparent"
          />

          {/* Human Verification Checkbox */}
          <div className="flex ml-20 mt-0.5">
            <input
              id="okayToEmail"
              type="checkbox"
              name="welcome"
              className="mr-1 accent-blue-500"
              checked={isHuman}
              onChange={(e) => setIsHuman(e.target.checked)} // Update state when checkbox is clicked
            />
          </div>
          <div className="flex ml-20 -mt-4">
            <label htmlFor="okayToEmail" className="text-black text-sm">
              Yes, I am a human
            </label>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="bg-[#FCE1E4] px-6 py-2 mt-4 rounded-full font-poppins font-regular group hover:bg-white transition duration-300"
          >
            <span className="relative z-10 text-sm md:text-base">LOGIN</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
