const productSchema = require("../../../models/Admin_PanelSchema/categorySchema/productSchema");
const { success, error } = require("../../response");

 exports.createProduct = async (req, res) => {
  try {
    const product = new productSchema(req.body);
    const filepath = req.files.map(({filename})=>`/${filename}`) ;
    product.product_Pic = filepath;
    const saveProduct = await product.save();
    res.status(201).json(success(res.statusCode, "Success", { saveProduct }));
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.productList = async (req, res) => {
  try {
    const list = await productSchema.find({});
    res.status(200).json(success(res.statusCode, "Success", { list }));
  } catch (err) {
    res.status(400).json("Failed", res.statusCode);
  }
};

exports.productSearch = async (req, res) => {
  try {
    const product = req.body.productName;
    const productData = await productSchema.find({
      productName: { $regex: product, $options: "i" },
    });
    if (productData.length > 0) {
      return res
        .status(200)
        .json(success(res.statusCode, "Success", { productData }));
    } else {
      res.status(200).json(error("Product Not found", res.statusCode));
    }
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = await productSchema.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(success(res.statusCode, "Success", { updateData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};


