import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing";

import Sell from "./pages/sell";
import Header from "./components/header/header";
import Product from "./pages/product";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/product/:productID" element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
