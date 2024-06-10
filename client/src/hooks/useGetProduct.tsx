// we create a custom hook so that we can separate the logic between making API calls with the UI
// separates my logic from the dummy components so that eventually when you start testing your code you will test it way more easiy and you can test your hook and components separately
// by making your own custom hooks it allows you to create your own custom hooks and allows you to separate the logic and make the code look better

import { useState, useEffect } from "react";
import axios from "axios";
import { useGetToken } from "./useGetToken";
import { IProduct } from "../models/interface";

export const useGetProducts = () => {
  const [products, setProducts] = useState<IProduct []>([]);
  const { headers } = useGetToken();

  const fetchProducts = async () => {
    try {
      const fetchedProducts = await axios.get("http://localhost:3001/product", {
        headers,
      });
      setProducts(fetchedProducts.data.products);
    } catch (err) {
      alert("ERROR: Something went wrong. ");
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return { products };
};
