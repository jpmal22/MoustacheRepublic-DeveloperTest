import React, { useState, useEffect } from "react";
import axios from "axios";

const ShirtInfo = () => {
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product"
        );
        console.log("Product data:", response.data);
        setProduct(response.data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to fetch product details.");
      }
    };

    fetchData();
  }, []);

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
          <p className="text-lightgrey">Size*</p>
          <div className="flex flex-wrap items-center space-x-2 my-4">
            {product.sizeOptions.map((size) => (
              <button
                key={size.id}
                onClick={() => setSelectedSize(size.label)}
                className={`border px-3 py-1  ${
                  selectedSize === size.label
                    ? "bg-black text-white"
                    : "text-black bg-white"
                }`}
              >
                {size.label}
              </button>
            ))}
          </div>
          <button className="bg-white text-black py-2 px-4 border-black hover:bg-gray-700 transition duration-300">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShirtInfo;
