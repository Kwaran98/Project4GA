//this code here will be related to all the routes related to user

import { Router, Request, Response, NextFunction } from "express";
//we are going to have this statement below as we are gonna do hashing for our passwords
//in our case, hashing is done through bcrypt
import bcrypt from "bcrypt";
//to create a jwt token
import jwt from "jsonwebtoken";
//to make the registration happen we will have to import the model we made in models/user.ts
import { IUser, UserModel } from "../models/user";
import { UserErrors } from "../common/error";

const router = Router();
//a router is just a way to organise your routes in your code into different files

//the first request here allows a user to register in our application
//whenever someone makes request to the end point below, the router will send the request to "localhost:3001/register"
//req and res are used to get stuff from whoever made the request in the particular register route and send stuff to whoever who use the route

router.post("/register", async (req: Request, res: Response) => {
  const { username, password } = req.body; //we are accepting the username and password from the body here

  //whenever we make a request to mongoose table, it will return a promise hence we have to use it an asynchronous function like await, try catch
  //whenever we are accessing our databases, something might happen hence we will have to make an asynchronous function

  try {
    const user = await UserModel.findOne({ username });

    if (user) {
      return res.status(400).json({ type: UserErrors.USERNAME_ALREADY_EXISTS });
    }

    //this code is done here to provide security in the passwords
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ username, password: hashedPassword });
    await newUser.save();

    res.json({ message: "User Register Successfully" });
  } catch (err) {
    res.status(500).json({ type: err });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user: IUser = await UserModel.findOne({ username }); //here we are trying to login with a username that should be registered

    if (!user) {
      return res.status(400).json({ type: UserErrors.NO_USER_FOUND });
    }

    //Here we cannot just simply let password == user.password as password will be in plaintext and user.password would be in hashed format
    //Hence we would have to hash the text password as well

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ type: UserErrors.WRONG_CREDENTIALS });
    }

    const token = jwt.sign({ id: user._id }, "secret");
    res.json({ token, userID: user._id });
  } catch (err) {
    res.status(500).json({ type: err });
  }
});

//next is basically a function that we can used to ignore the rest and move on to the request
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    jwt.verify(authHeader, "secret", (err) => {
      if (err) {
        return res.sendStatus(403);
      }
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

router.get(
  "/available-money/:userID",
  verifyToken,
  async (req: Request, res: Response) => {
    const { userID } = req.params;

    try {
      const user = await UserModel.findById(userID);
      if (!user) {
        res.status(400).json({ type: UserErrors.NO_USER_FOUND });
      }
      res.json({ availableMoney: user.availableMoney });
    } catch (err) {
      res.status(500).json({ err });
    }
  }
);

export { router as userRouter };
