import { useContext } from "react";
import { IProduct } from "../../models/interface";
import "./styles.css";
import { IShopContext, ShopContext } from "../../context/shopContext";

interface Props {
  product: IProduct;
}

export const Product = (props: Props) => {
  const { _id, productName, description, price, stockQuantity, imageURL } =
    props.product;

  const { addToCart, getCartItemCount } = useContext<IShopContext>(ShopContext);

  const count = getCartItemCount(_id)

  return (
    <div className="product">
      <img src={imageURL} />
      <div className="description">
        <h3>{productName}</h3>
        <p>{description}</p>
        <p>${price}</p>
      </div>

      <button className="addToCartBttn" onClick={() => addToCart(_id)}>
        Add to Cart {count > 0 && <>({count})</>}
      </button>

      <div className="stock-quantity">
        {stockQuantity === 0 && <h1>OUT OF STOCK</h1>}
      </div>
    </div>
  );
};
