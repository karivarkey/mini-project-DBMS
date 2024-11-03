import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing";
import Sell from "./pages/sell";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/sell" element={<Sell />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
