import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./views/login/Login.jsx";
import Header from "../src/layout/header/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "../src/views/home/Home.jsx";
import UsersContext, { UsersProvider } from "./context/UsersContext.js";
import Products from "./views/products/Products";
import { useContext } from "react";
import Register from "./views/register/Register";
import { ProductsProvider } from "./context/ProductsContext";
import Product from "./views/product/Product";
import Cart from "./views/cart/Cart";
import { CartProvider } from "./context/CartContext";
import AddProduct from "./views/addProduct/AddProduct";
import Users from "./views/users/Users";

function App() {
  return (
    <UsersProvider>
      <ProductsProvider>
        <CartProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/edit-product" element={<AddProduct />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </BrowserRouter>
        </CartProvider>
      </ProductsProvider>
    </UsersProvider>
  );
}

export default App;
