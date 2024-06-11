import { useGetProducts } from "../../hooks/useGetProduct";
import { Product } from "./product";
import "./styles.css";
import { useContext } from "react";
import { IShopContext, ShopContext } from "../../context/shopContext";
import { Navigate } from "react-router-dom";

export const Shop = () => {
  const { products } = useGetProducts();
  const { isAuthenticated } = useContext<IShopContext>(ShopContext);

  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  return (
    <div className="shop">
      <div className="products">
        {products.map((product) => (
          <Product product={product} />
        ))}
      </div>
    </div>
  );
};
