const mongoose = require("mongoose");


module.exports = (id) => (req, res, next) => {

    if (!mongoose.Types.ObjectId.isValid(req.params[id]))
    return res.status(400).json({ errors: [{ msg: "ID is not valid" }] });


    next();
};