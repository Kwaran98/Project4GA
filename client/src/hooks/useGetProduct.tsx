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
      const response = await axios.get("http://localhost:3001/product", { headers });
      setProducts(response.data.products);
    } catch (err) {
      alert("ERROR: Something went wrong.");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
    }
  }, [isAuthenticated]);

  return { products };
};
