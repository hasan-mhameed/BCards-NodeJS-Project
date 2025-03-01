import Card from "../models/Card.schema.js";

const getAll = async () => {
  return Card.find();
};

const getOne = async (id) => {
  const card = Card.findById(id);

  if (!card) {
    throw new Error("User not found");
  }

  return card;
};

const getMyCards = async (userId) => {
  try {
    const cards = await Card.find({ user_id: userId });
    return Promise.resolve(cards);
  } catch (error) {
    error.status = 404;
    return res.status(404).send(err.message);
  }

  return Promise.resolve("get card not in mongodb");
};

const remove = async (id) => {
  const card = await Card.findByIdAndDelete(id);
  return `Card ${card.email} deleted`;
};

const likeCard = async (cardId, userId) => {
  if (DB === "MONGODB") {
    try {
      const card = await Card.findById(cardId);
      if (!card)
        throw new Error("A card with this ID cannot be found in the database");

      const cardLikes = card.likes.find((id) => id === userId);

      if (!cardLikes) {
        card.likes.push(userId);
        const cardFromDB = await card.save();
        return Promise.resolve(cardFromDB);
      }

      const cardFiltered = card.likes.filter((id) => id !== userId);
      card.likes = cardFiltered;
      const cardFromDB = await card.save();
      return Promise.resolve(cardFromDB);
    } catch (error) {
      error.status = 400;
      res.status(400).json({ message: "Error Liked Card" });
    }
  }
  return Promise.resolve("card likeCard not in mongodb");
};

export { getAll, getOne, getMyCards, remove, likeCard };
