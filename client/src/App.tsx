import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/navbar"; //it is important that the navbar exists above all the routes because it will exist in any page regardless of the routes
import { Authentication } from "./pages/Authentication";
import { Shop } from "./pages/Shop";
import { PurchasedItems } from "./pages/PurchasedItems";
import { Checkout } from "./pages/Checkout";
import { ShopContextProvider } from "./context/shopContext";

function App() {
  return (
    <div className="App">
      {" "}
      <Router>
        <ShopContextProvider>
          {/* Has to be within the Router for us to navigate through the page */}
          <Navbar />
          <Routes>
            <Route path="/" element={<Shop />} />
            {/* A page for authentication for register and login */}
            <Route path="/auth" element={<Authentication />} />
            {/*A route to checkout*/}
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/purchased-items" element={<PurchasedItems />} />
          </Routes>
        </ShopContextProvider>
      </Router>
    </div>
  );
}

export default App;
