import { Schema, model } from "mongoose";

const CardSchema = new Schema({
  _id: String,
  title: String,
  subtitle: String,
  description: String,
  phone: String,
  email: String,
  web: String,
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
  bizNumber: Number,
  likes: [],
  user_id: String,
});

const Card = model("cards", CardSchema);
export default Card;
