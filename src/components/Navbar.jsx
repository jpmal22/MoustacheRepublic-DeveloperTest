import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-gray-300 shadow-md py-4">
      <div className="container mx-auto px-4 flex justify-end">
        <button className="px-4 py-2 text-black">My Cart</button>
      </div>
    </nav>
  );
};

export default Navbar;
