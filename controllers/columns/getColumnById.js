import Column from "../../models/column.js";
import {HttpError} from "../../helpers/index.js";

const getColumnById = async (req, res) => {
    const {id} = req.params;
    const result = await Column.findById(id)
    if (!result) {
        throw HttpError(404, `Such column with id ${id} not found`)
    }
    res.json(result)

};

export default getColumnById;