// Import necessary libraries and styles
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAsU3cx6zwCEgx1jKjgwe32vVMngh3F58U",
  authDomain: "toys-67cac.firebaseapp.com",
  projectId: "toys-67cac",
  storageBucket: "toys-67cac.firebasestorage.app",
  messagingSenderId: "933438963745",
  appId: "1:933438963745:web:36062acbc2fbb5f05fa360",
  measurementId: "G-XEE6KBC92G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const Login = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isHuman, setIsHuman] = useState(false); // State for the checkbox

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isHuman) {
      alert("Please check the 'Yes, I am a human' box to continue.");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const userString = JSON.stringify(auth.currentUser);
      navigate("/landing", { state: { userString } });
    } catch (error) {
      alert("Incorrect password");
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

