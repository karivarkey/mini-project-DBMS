import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing";
import Login from "./pages/login/login";
import Sell from "./pages/sell";
import Header from "./components/header/header";
import Product from "./pages/product";
import CheckOut from "./pages/checkOut";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Toaster
        toastOptions={{
          style: {
            background: "#333", // Dark gray background
            color: "#fff", // White text color
            borderRadius: "8px", // Optional: round the corners
            padding: "16px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)", // Soft shadow
          },
          success: {
            iconTheme: {
              primary: "#333", // Icon primary color (same as background)
              secondary: "#fff", // Icon secondary color (text color)
            },
          },
          error: {
            iconTheme: {
              primary: "#333",
              secondary: "#fff",
            },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/product/:productID" element={<Product />} />
        <Route path="/checkout" element={<CheckOut />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;