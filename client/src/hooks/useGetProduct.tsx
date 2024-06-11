// we create a custom hook so that we can separate the logic between making API calls with the UI
// separates my logic from the dummy components so that eventually when you start testing your code you will test it way more easiy and you can test your hook and components separately
// by making your own custom hooks it allows you to create your own custom hooks and allows you to separate the logic and make the code look better

import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useGetToken } from "./useGetToken";
import { IProduct } from "../models/interface";
import { IShopContext, ShopContext } from "../context/shopContext";

export const useGetProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const { headers } = useGetToken();
  const { isAuthenticated } = useContext<IShopContext>(ShopContext);

  const fetchProducts = async () => {
    try {
      const products = await axios.get("http://localhost:3001/product", {
        headers,
      });
      setProducts(products.data.products);
    } catch (err) {
      alert("ERROR: Something went wrong. ");
      console.log(err);
    }
  };

//For the useEffect here is if the isAuthenticated is not put in the array then it will not fetch the products even after we login as the useEffect will only be called once
//But if the isAuthenticated is put in the dependency then whenever the isAuthenticated values change the useEffect function would be triggered and the fetchProducts function would be executed
  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
    }
  }, [isAuthenticated]);

  return { products };
};
