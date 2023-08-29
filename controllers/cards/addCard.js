import Card from "../../models/card.js";

const addCard = async (req, res) => {
    const result = await Card.create({ ...req.body });

    res.status(201).json(result);
};

export default addCard;