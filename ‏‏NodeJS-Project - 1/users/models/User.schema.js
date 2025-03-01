// import { boolean } from "joi";
import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  // _id: String,
  name: {
    first: String,
    middle: String,
    last: String,
  },
  phone: String,
  email: String,
  password: String,
  image: {
    url: String,
    alt: String,
  },
  address: {
    state: String,
    country: String,
    city: String,
    street: String,
    houseNumber: Number,
    zip: Number,
  },
  isAdmin: Boolean,
  isBusiness: Boolean,
});

const User = model("users", UserSchema);
export default User;
