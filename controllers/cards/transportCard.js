import Card from "../../models/card.js";
import Column from "../../models/column.js";
import { HttpError } from "../../helpers/index.js";


const transportCard = async (req, res) => {
    const { id } = req.params;
    const { source, destination } = req.body;

    const exsistColumn = await Column.findById(source);
    if (!exsistColumn) {
        throw HttpError(400, `Column with id=${source} not found`);
    }

    const result = await Card.findByIdAndUpdate(id, {column: destination}, {new: true});
    if (!result) {
        throw HttpError(404, `Card with id=${id} not found`)
    }

    res.json(result);
};

export default transportCard;