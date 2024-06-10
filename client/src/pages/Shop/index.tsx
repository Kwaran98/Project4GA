import { useGetProducts } from "../../hooks/useGetProduct";
import { Product } from "./product";
import "./styles.css"

export const Shop = () => {
  const { products } = useGetProducts();
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
