const mongoose = require("mongoose");

const schema = new mongoose.Schema({
   sideBanner: {
        type: Array,
        require: true,
    },
    category_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        require: true,
    },
    product_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        require: true,
    },
});

schema.set("timestamps", true)
module.exports = mongoose.model("productSide", schema)