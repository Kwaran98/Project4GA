import { Schema, model } from "mongoose";

//Since we are using typescript, we have to create interfaces that can define the types of our objects
export interface IUser {
  _id?: string;
  username: string;
  password: string;
  availableMoney: number;
  purchasedItems: string[];
}

const UserSchema = new Schema<IUser>({
  username: { type: String, require: true, unique: true },
  password: { type: String, required: true },
  availableMoney: { type: Number, default: 5000 },
  purchasedItems: [
    { type: Schema.Types.ObjectId, ref: "product", default: [] },
  ],
});

export const UserModel = model<IUser>("user", UserSchema);
