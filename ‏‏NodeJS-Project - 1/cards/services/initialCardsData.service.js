import Card from "../models/Card.schema.js";
import initialCards from "../initialData/initialCards.json" with { type: "json" };


export const createInitialCardsData = async () => {
    const cardsFromDb = await Card.find();

    initialCards.forEach(async (card) => {
        try {
            if (cardsFromDb.find((c) => c.email === card.email)) {
                return;
            }

            const newCard = new Card(card);
            await newCard.save();
            console.log("Card created: ", newCard.email);
        } catch (error) {
            console.log("Error creating Card: ", error);
        }
    });
}