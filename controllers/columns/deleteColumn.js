import Column from "../../models/column.js";
import {HttpError} from "../../helpers/index.js";

const deleteColumn = async (req, res) => {
    const {id} = req.params;
    const result = await Column.findByIdAndRemove(id);
    if (!result) {
        throw HttpError(404, `Column with id=${id} not found`);
    }
    res.status(200).json({ message: "Column successfully deleted", deletedId: result._id});
};

export default deleteColumn;

