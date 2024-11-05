import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing";
import Sell from "./pages/sell";
import Header from "./components/header/header";
const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/sell" element={<Sell />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
