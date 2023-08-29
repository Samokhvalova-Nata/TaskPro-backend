import {HttpError} from "../../helpers/index.js";
import Column from "../../models/column.js";

const updateColumn = async (req, res) => {
    const {id} = req.params;
    const result = await Column.findByIdAndUpdate(id, req.body, {new: true});
    if (!result) {
        throw HttpError(404, `Such column with id ${id} not found`);
    }
    res.json(result);
};

export default updateColumn;