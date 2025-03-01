import { Router } from "express";
import Card from "../models/Card.schema.js";
import {
  getAll,
  getOne,
  getMyCards,
  remove,
} from "../services/CardsDataAccess.service.js";
import { auth } from "../../middlewares/auth.js";
import { isUser } from "../../middlewares/isUser.js";

const cardsRouter = Router();

cardsRouter.get("/", async (req, res) => {
  try {
    const cards = await getAll();
    return res.json(cards);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

cardsRouter.get("/my-cards", auth, async (req, res) => {
  try {
    const id = req.user.id;
    const card = await getMyCards(id);
    return res.send(card);
  } catch (error) {
    return res.status(500).send(err.message);
  }
});

cardsRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const card = await getOne(id);

    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }

    return res.json(card);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

cardsRouter.post("/", auth, isUser, async (req, res) => {
  try {
    const data = req.body;
    const newCard = new Card(data);
    await newCard.save();
    return res.json(newCard);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

cardsRouter.put("/:id", auth, async (req, res) => {
  const cardId = req.params.id;
  const updateData = req.body;

  try {
    // Find and update the user by ID
    const updatedCard = await Card.findByIdAndUpdate(cardId, updateData, {
      new: true, // return updated document
      runValidators: true, // apply schema validation
    });

    if (!updatedCard) {
      return res.status(404).json({ message: "Card not found" });
    }

    // Respond with the updated user
    res.json(updatedCard);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating Card" });
  }
});

cardsRouter.patch("/:id", auth, async (req, res) => {
  try {
    const cardId = req.params.id;
    const userId = req.user._id;

    const card = await likeCard(cardId, userId);
    return res.send(card);
  } catch (error) {
    res.status(500).json({ message: "Error Liked Card" });
  }
});

cardsRouter.delete("/:id", auth, isUser, async (req, res) => {
  try {
    const id = req.params.id;
    const deletedCard = remove(id);

    return res.json({ message: "Card Deleted", deletedCard });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default cardsRouter;
