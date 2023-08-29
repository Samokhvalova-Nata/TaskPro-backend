import Card from "../../models/card.js";
import { HttpError } from "../../helpers/index.js";

const updateCard = async (req, res) => {
    const { id } = req.params;
    const result = await Card.findByIdAndUpdate(id, req.body, {new: true});
    if (!result) {
        throw HttpError(404, `Card with id=${id} not found`)
    }

    res.json(result);
};

export default updateCard;