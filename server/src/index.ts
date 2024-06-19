import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import { userRouter } from './routes/user';
import { productRouter } from './routes/product';

const app = express();

// CORS configuration to allow requests from your frontend
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions)); // Set CORS middleware with options before routes

app.use(express.json()); // Middleware to parse JSON bodies

// Set up routes
app.use("/user", userRouter);
app.use("/product", productRouter);

app.get('/', (req, res) => {
  res.send('Hello, Vercel!');
});

// Connect to MongoDB
mongoose.connect("mongodb+srv://egator:iJ5MV3mpl84XNJbR@cluster0.4vtjxuo.mongodb.net/ecommerce1?retryWrites=true&w=majority")
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Could not connect to MongoDB", error));

// Start the server
app.listen(3001, () => console.log("Server Started"));
