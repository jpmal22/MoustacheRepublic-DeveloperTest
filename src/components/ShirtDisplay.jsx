import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "../services/CartContext";

const apiURL = process.env.REACT_APP_API_URL;

const ShirtInfo = () => {
  // State hooks for managing the shirt details, selected size, and any errors during the fetch operation.
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [error, setError] = useState(null);

  // Extract the addToCart function from the cart context to allow adding items to the cart.
  const { addToCart } = useCart();

  // useEffect hook to handle fetching product data from the API or cache on component mount.
  useEffect(() => {
    //attempt to retrieve product data and cache time from local storage
    const productCache = localStorage.getItem("productData");
    const cacheTime = localStorage.getItem("cacheTime");

    // Fetch product data from the API if not cached or cache is older than 1 hour.
    const fetchData = async () => {
      if (productCache && new Date().getTime() - cacheTime < 3600000) {
        setProduct(JSON.parse(productCache));
      } else {
        // Fetch product data from the API and store it in local storage.
        try {
          const response = await axios.get(apiURL);
          localStorage.setItem("productData", JSON.stringify(response.data));
          localStorage.setItem("cacheTime", new Date().getTime());
          setProduct(response.data);
        } catch (err) {
          console.error("Error fetching product:", err);
          setError("Failed to fetch product details.");
        }
      }
    };

    fetchData();
  }, []);

  // Function to handle adding the selected product to the cart.
  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }

    const itemToAdd = {
      ...product,
      size: selectedSize,
      quantity: 1,
    };
    addToCart(itemToAdd);
  };

  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Loading...</div>;

  return (
    <div className="container mx-auto max-w-4xl p-5 bg-white shadow-lg rounded-lg">
      <div className="flex flex-col md:flex-row">
        <img
          src={product.imageURL}
          alt={product.title}
          className="md:w-1/2 w-full object-cover"
        />
        <div className="md:w-1/2 w-full flex flex-col p-5">
          <h1 className="text-2xl font-bold mb-3">{product.title}</h1>
          <p className="text-lg font-semibold mb-3">
            Price: ${product.price.toFixed(2)}
          </p>
          <p className="mb-3">{product.description}</p>
          <div className="my-4">
            <p className="text-lightgrey">Size*</p>
            <div className="flex flex-wrap items-center space-x-2">
              {product.sizeOptions.map((size) => (
                <button
                  key={size.id}
                  onClick={() => setSelectedSize(size.label)}
                  className={`border px-3 py-1 rounded ${
                    selectedSize === size.label
                      ? "bg-black text-white"
                      : "text-black bg-white border-gray-300"
                  }`}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-black text-white py-2 px-4 rounded hover:bg-gray-700 transition duration-300"
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShirtInfo;
