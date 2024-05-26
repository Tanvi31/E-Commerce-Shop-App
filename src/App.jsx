import Layout from "./Components/Layout";
import Products from "./Pages/Products";
import Orders from "./Pages/Orders";
import ProductDetails from "./Pages/ProductDetails";
import Checkout from "./Pages/Checkout";
import Cart from "./Pages/Cart";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/orders" element={<Orders />} />
          <Route path="/details/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/" element={<Products />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
