const productSchema = require("../../../models/Admin_PanelSchema/categorySchema/productSchema");
const reviewSchema = require("../../../models/User_PanelSchema/reviewSchema/reviewSchema");
const { error, success } = require("../../response");

exports.productList = async (req, res) => {
  try {
    const list = await productSchema.find({}).sort({ _id: -1 });
    res.status(200).json(success(res.statusCode, "Success", { list }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.productDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const details = await productSchema.findById(id);
    if (details.stockQuantity == 0) {
      res.status(400).json(error("Product Out of Stock", res.statusCode));
    }
    const reviewCount=await reviewSchema.find({product_Id:id}).count()
    res.status(200).json(success(res.statusCode, "Success", { details,reviewCount }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.productSearch = async (req, res) => {
  try {
    const productName = req.body.productName;
    const productData = await productSchema.find({
      productName: { $regex: productName, $options: "i" },
    });
    if (productData.length > 0) {
      return res
        .status(200)
        .json(success(res.statusCode, "Success", { productData }));
    }
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.relatedProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const productData = await productSchema.find({ category_Id: id });
    res.status(200).json(success(res.statusCode, "Success", { productData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};



exports.filterPrice = async (req, res) => {
  try {
    const { Price } = req.body;
    const quearyObjetct = {};
    if (Price) {
      quearyObjetct.Price = Price;
    }
    const filter = await productSchema.find(quearyObjetct);
    res.status(200).json(success(res.statusCode, "Success", { filter }));
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};
exports.lowPrice = async (req, res) => {
  try {
    const productlist = await productSchema.find({}).sort({ Price: 1 });
    res.status(200).json(success(res.statusCode, "Success", { productlist }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.highPrice = async (req, res) => {
  try {
    const productList = await productSchema.find({}).sort({ Price: -1 });
    res.status(200).json(success(res.statusCode, "Success", { productList }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.asendingProduct = async (req, res) => {
  try {
    const productList = await productSchema.find({}).sort({ createdAt: -1 });
    res.status(200).json(success(res.statusCode, "Success", { productList }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.descendingProduct = async (req, res) => {
  try {
    const productList = await productSchema.find({}).sort({ createdAt: 1 });
    res.status(200).json(success(res.statusCode, "Success", { productList }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.highDiscount=async(req,res)=>{
  try{
const productList=await productSchema.find({}).sort({Discount:-1})
res.status(200).json(success(res.statusCode,"Success",{productList}))
  }catch(err){
    res.status(400).json(error("Failed",res.statusCode))
  }
}

exports.trandingProduct = async (req, res) => {
  try {
    const productlist = await productSchema
      .find({})
      .sort({ productName: -1 })
      .limit(4);
    res.status(200).json(success(res.statusCode, "Success", { productlist }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.productDiscount = async (req, res) => {
  try {
    const { Discount } = req.query;
    const quearyObjetct = {};
    if (Discount) {
      quearyObjetct.Discount = Discount;
    }
    const productData = await productSchema.find(quearyObjetct)
    res.status(200).json(success(res.statusCode, "Success", { productData }));
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  } 
};

exports.ratingProduct = async (req, res) => {
  try {
    const { star } = req.query;
    const quearyObjetct = {};
    if (star) {
      quearyObjetct.star = star;
    }
    const productData = await productSchema.find(quearyObjetct);
    console.log(productData);
    res.status(200).json(success(res.statusCode, "Success", { productData }));
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};


exports.rating = async (req, res) => {
  try {
    const { _id } = req.body;
    const { star, product_Id } = req.body;
    const product = await productSchema.findById(product_Id);
    let alreadyRated = product.ratings.find((user_Id) => user_Id.postedby);
    if (alreadyRated) {
      const updateRating = await product.updateOne(
        {
          ratings: { $elemMatch: alreadyRated },
        },
        {
          $set: { "ratings.star": star },
        },
        {
          new: true,
        }
      );
      res
        .status(200)
        .json(success(res.statusCode, "Success", { updateRating }));
    } else {
      let totalRating = 0;
      const ralatedProduct = await productSchema.findByIdAndUpdate(
        product_Id,
        {
          $push: {
            ratings: {
              star: star,
              postedby: _id,
            },
          },
        },
        { new: true }
      );
      for (let i = 0; i < ralatedProduct.ratings.length; i++) {
        totalRating = totalRating + ralatedProduct.ratings[i].star;
      }
      let newrating = await productSchema({
        totalRating,
        ralatedProduct,
      }).save();
      res 
        .status(200)
        .json(
          success(res.statusCode, "Success", { ralatedProduct, newrating })
        );
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};
