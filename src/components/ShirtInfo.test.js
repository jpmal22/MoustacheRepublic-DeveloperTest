import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import { CartProvider } from "../services/CartContext";
import ShirtInfo from "./ShirtInfo";

//tests suites aren't working

jest.mock("axios");

describe("ShirtInfo Component", () => {
  const mockProduct = {
    data: {
      title: "Classic Tee",
      price: 75.0,
      description: "A classic tee for classic style.",
      imageURL:
        "https://mrdevelopertestassets.s3.ap-southeast-2.amazonaws.com/classic-tee.jpg",
      sizeOptions: [
        { id: 1, label: "S" },
        { id: 2, label: "M" },
        { id: 3, label: "L" },
      ],
    },
  };

  beforeEach(() => {
    axios.get.mockClear();
  });

  it("fetches product data and renders it", async () => {
    axios.get.mockResolvedValue(mockProduct);
    render(
      <CartProvider>
        <ShirtInfo />
      </CartProvider>
    );

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
    expect(screen.getByText("Classic Tee")).toBeInTheDocument();
    expect(screen.getByText("$75.00")).toBeInTheDocument();
    expect(
      screen.getByText("A classic tee for classic style.")
    ).toBeInTheDocument();
  });

  it("displays an error message if the product data cannot be fetched", async () => {
    axios.get.mockRejectedValue(new Error("Failed to fetch data"));
    render(
      <CartProvider>
        <ShirtInfo />
      </CartProvider>
    );

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
    expect(
      screen.getByText("Error: Failed to fetch product details.")
    ).toBeInTheDocument();
  });

  it("allows the user to select a size and add to cart", async () => {
    axios.get.mockResolvedValue(mockProduct);
    render(
      <CartProvider>
        <ShirtInfo />
      </CartProvider>
    );

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

    const sizeButton = screen.getByText("S");
    fireEvent.click(sizeButton);

    const addToCartButton = screen.getByText("ADD TO CART");
    fireEvent.click(addToCartButton);
  });
});
