import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { IShopContext, ShopContext } from "../context/shopContext";
import { useCookies } from "react-cookie";

export const Navbar = () => {
  const { availableMoney, isAuthenticated, setIsAuthenticated } =
    useContext<IShopContext>(ShopContext);
  const [_, setCookies] = useCookies(["access_token"]);

  //what does it mean to logout?
  //to logout it means to clear the localstorage of our userID and also remove the cookie we set we our access token
  const logout = () => {
    setIsAuthenticated(false)
  };
  return (
    <div className="navbar">
      <div className="navbar-title">
        <h1>Kwaran Shop</h1>
      </div>

      <div className="navbar-links">
        {isAuthenticated && (
          <>
            <Link to="/"> Shop </Link>
            <Link to="/purchased-items"> Purchases </Link>
            <Link to="/checkout">
              <FontAwesomeIcon icon={faShoppingCart} />
            </Link>
            <Link to="/auth" onClick={logout}>
              Logout
            </Link>

            <span> ${availableMoney}</span>
          </>
        )}
      </div>
    </div>
  );
};
