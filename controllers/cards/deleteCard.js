import {HttpError} from "../../helpers/index.js";
import Card from "../../models/card.js";

const deleteCard = async (req, res) => {
    const {id} = req.params;
    const result = await Card.findByIdAndRemove(id);
    if (!result) {
        throw HttpError(404, `Card with id=${id} not found`);
    }
    res.status(200).json(result);
};

export default deleteCard;