import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/user";
import { productRouter } from "./routes/product";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/products", productRouter);


// Connect to MongoDB
mongoose.connect("mongodb+srv://egator:iJ5MV3mpl84XNJbR@cluster0.4vtjxuo.mongodb.net/ecommerce1?retryWrites=true&w=majority")
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Could not connect to MongoDB", error));

app.listen(3001, () => console.log("Server started"));
