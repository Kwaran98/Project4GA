import { Router, Request, Response } from "express";
import { ProductModel } from "../models/product";
import { UserModel } from "../models/user";
import { verifyToken } from "./user";
import { ProductErrors, UserErrors } from "../common/error";

const router = Router();

//we put an underscore below as we are technically not using the request
router.get("/", verifyToken, async (_, res: Response) => {
  try {
    const products = await ProductModel.find({});
    res.json({ products });
  } catch (err) {
    res.status(400).json({ err });
  }
});

router.post("/checkout", verifyToken, async (req: Request, res: Response) => {
  const { customerID, cartItems } = req.body;

  try {
    const user = await UserModel.findById(customerID); // we are finding the customer here as we will be changing things from the customer
    // we are going to change the available money the customer has and we are going to change the number of items the customer have
    const productIDs = Object.keys(cartItems); // just a way to get back a list of keys of an object
    const products = await ProductModel.find({ _id: { $in: productIDs } });

    //to prevent from checking out of an userID that it is not real
    if (!user) {
      return res.status(400).json({ type: UserErrors.NO_USER_FOUND });
    }

    //this is to prevent the case of the list of productIDs to be more then the products
    if (products.length !== productIDs.length) {
      return res.status(400).json({ type: ProductErrors.NO_PRODUCT_FOUND });
    }

    //to find the products

    let totalPrice = 0;
    for (const item in cartItems) {
      const product = products.find((product) => String(product._id) === item);

      if (!product) {
        return res.status(400).json({ type: ProductErrors.NO_PRODUCT_FOUND });
      }

      if (product.stockQuantity < cartItems[item]) {
        return res.status(400).json({ type: ProductErrors.NOT_ENOUGH_STOCK });
      }

      totalPrice += product.price * cartItems[item];
    }

    //for the part where the availablle money in the website is less than the total items purchased
    if (user.availableMoney < totalPrice) {
      return res.status(400).json({ type: ProductErrors.NO_AVAILABLE_MONEY });
    }

    user.availableMoney -= totalPrice;
    user.purchasedItems.push(...productIDs);

    //what we are doing here in this codelines is that we are updating the stock quantity list by -1 whenever user purchases a product
    await user.save();
    await ProductModel.updateMany(
      { _id: { $in: productIDs } },
      { $inc: { stockQuantity: -1 } }
    );

    res.json({purchasedItems: user.purchasedItems})
  } catch (err) {
    res.status(400).json(err);
  }
});

export { router as productRouter };
