import React from "react";
import Navbar from "./components/Navbar";
import ShirtInfo from "./components/ShirtDisplay";
import { CartProvider } from "./services/CartContext";

function App() {
  return (
    <CartProvider>
      <Navbar />
      <ShirtInfo />
    </CartProvider>
  );
}

export default App;
