import React, { useState } from "react";
import { useCart } from "../services/CartContext";

const Navbar = () => {
  const [isCartVisible, setCartVisible] = useState(false);
  const { cartItems } = useCart();

  return (
    <nav className="bg-gray-100 shadow-md py-4 relative">
      <div className="container mx-auto px-4 flex justify-end">
        <button
          onClick={() => setCartVisible(!isCartVisible)}
          className="px-4 py-2 rounded text-grey focus:outline-none"
        >
          My Cart ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
        </button>
        {isCartVisible && (
          <div className="absolute right-0 mt-2 py-2 w-72 bg-white shadow-lg rounded-lg z-50 overflow-hidden">
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between px-4 py-2 border-b border-gray-300"
                >
                  <img
                    src={item.imageURL}
                    alt={item.title}
                    className="w-10 h-10 object-cover mr-2"
                  />
                  <div className="flex-1">
                    <h5 className="font-bold">{item.title}</h5>
                    <p>Size: {item.size}</p>
                  </div>
                  <div className="text-right">
                    <p>
                      {item.quantity} x ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-gray-500">
                Your cart is empty.
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
