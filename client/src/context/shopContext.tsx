// context allows us to manage our states
// this context that we are creating is going to be accessible all around our application
// this context is going to obtain information regarding our cart and what we are going to buy
// the reason why we are making this context is because context allows us to manage our states in a way such that it becomes global states
// this is because the whole concept of context api allows us to do so
//we also want to access information about our cart everywhere in our application

import { createContext, useState } from "react";

interface IShopContext {
  addToCart: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
  updateCartItemCount: (newAmount: number, itemId: string) => void;

}

const defaultVal: IShopContext = {
  addToCart: () => null,
  removeFromCart: () => null,
  updateCartItemCount: ()  => null
};

export const ShopContext = createContext<IShopContext>(defaultVal);

export const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState<{ string: number } | {}>({});

  //this function here is going to be executed whenever the user clicks on the Addtocart button
  const addToCart = (itemID: string) => {

  }

  const removeFromCart = (itemId: string) => {

  }

  const updateCartItemCount = (newAmount: number, itemId: string) => {

  }

  const contextValue: IShopContext = {
    addToCart,
    removeFromCart,
    updateCartItemCount
  };
  return (
    <ShopContext.Provider value={defaultVal}>
      {props.children}
    </ShopContext.Provider>
  );
};
