import { useContext } from "react";
import { IProduct } from "../../models/interface";
import { IShopContext, ShopContext } from "../../context/shopContext";

interface Props {
  product: IProduct;
}

export const CartItem = (props: Props) => {
  const { _id, imageURL, productName, price } = props.product;
  const { addToCart, removeFromCart, updateCartItemCount, getCartItemCount } =
    useContext<IShopContext>(ShopContext);

  const cartItemCount = getCartItemCount(_id);
  return (
    <div className="cartItem">
      <img src={imageURL} />
      <div className="description">
        <h3>{productName}</h3>
        <p>Price: ${price}</p>
      </div>

      <div className="countHandler">
        {/* Can remove cart item here */}
        <button onClick={() => removeFromCart(_id)}> - </button>
        {/* Can update the number of cart items here */}
        <input
          type="number"
          value={cartItemCount}
          onChange={(e) => updateCartItemCount(Number(e.target.value), _id)}
        />
        {/* Can add the number of cart items here */}
        <button onClick={() => addToCart(_id)}> + </button>
      </div>
    </div>
  );
};
