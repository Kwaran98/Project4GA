import { SyntheticEvent, useState, useContext } from 'react';
import axios from "axios";
import { useCookies } from "react-cookie";
import { UserErrors } from "../../models/error";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { IShopContext, ShopContext } from '../../context/shopContext';

export const Authentication = () => {
  return (
    <div className="auth">
      {" "}
      <Register /> <Login />
    </div>
  );
};

const Register = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  //   SyntheticEvent is a type for an event that is in an onSubmit form
  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3001/user/register", {
        username,
        password,
      });
      alert("Registration Completed! Now Login.");
    } catch (err) {
      if (err?.response?.data?.type === UserErrors.USERNAME_ALREADY_EXISTS) {
        alert("ERROR: Username is in use. Try another username");
      } else {
        alert("ERROR: Something went wrong");
      }
    }
  };

  return (
    <div className="auth-container">
      {" "}
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div className="form-group">
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [_, setCookies] = useCookies(["access_token"]);

  const navigate = useNavigate();

  const {setIsAuthenticated} = useContext<IShopContext>(ShopContext)

  //   SyntheticEvent is a type for an event that is in an onSubmit form
  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      const results = await axios.post("http://localhost:3001/user/login", {
        username,
        password,
      });
      setCookies("access_token", results.data.token);
      localStorage.setItem("userID", results.data.userID);
      //By setting it to be true here whenever we login we will be authenticated
      setIsAuthenticated(true)
      navigate("/");
    } catch (err) {
      let errorMessage: string = "";
      switch (err?.response?.data?.type) {
        case UserErrors.NO_USER_FOUND:
          errorMessage = "User does not exist";
          break;
        case UserErrors.WRONG_CREDENTIALS:
          errorMessage = "Wrong username/password combination";
          break;
        default:
          errorMessage = "Something went wrong";
      }

      alert("Error: " + errorMessage);

      if (err?.response?.data?.type === UserErrors.USERNAME_ALREADY_EXISTS) {
        alert("ERROR: Username is in use. Try another username");
      } else {
        alert("ERROR: Something went wrong");
      }
    }
  };

  return (
    <div className="auth-container">
      {" "}
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
