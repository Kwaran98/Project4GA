import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import {userRouter} from './routes/user';
import { productRouter } from './routes/product';

const app = express();

app.use(express.json()) //everytime data comes in an endpoint in the api we would want it to be in json format, it would be way easier for us
app.use(cors()) //here we are applying the middleware for cors, if we do not have this, we would get an error everytime we make a request to our own API in our React Application

//this codeline here is where all the endpoints related to the user are going to exist
//however in our userrotuer function itself there are many other endpoints such as register, login etc
//this endpoints are all located in the user.ts file that is in the routes folder
app.use("/user", userRouter)
app.use("/product", productRouter)

mongoose.connect("mongodb+srv://egator:iJ5MV3mpl84XNJbR@cluster0.4vtjxuo.mongodb.net/ecommerce1?retryWrites=true&w=majority")

app.listen(3001, () => console.log("Server Started"));