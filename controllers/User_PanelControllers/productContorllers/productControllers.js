const brandSchema = require("../../../models/Admin_PanelSchema/categorySchema/brandSchema");
const categorySchema = require("../../../models/Admin_PanelSchema/categorySchema/categorySchema");
const productSchema = require("../../../models/Admin_PanelSchema/categorySchema/productSchema");
const offerSchema = require("../../../models/Admin_PanelSchema/offerSchema/offerSchema");
const reviewSchema = require("../../../models/User_PanelSchema/reviewSchema/reviewSchema");
const { error, success } = require("../../response");

exports.productList = async (req, res) => {
  try {
    const list = await productSchema
      .find({})
      .sort({ _id: -1 })
      .populate("brand_Id");
    res.status(200).json(success(res.statusCode, "Success", { list }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.productDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const details = await productSchema.findById(id);
    const Discount = await offerSchema
      .find({ product_Id: id })
      .populate("brand_Id")
      .select("Discount");
    const discount = Discount.map((x) => x.Discount);
    const price = details.Price;
    const afterDiscountPrice = price - discount;
    if (details.stockQuantity == 0) {
      res.status(400).json(error("Product Out of Stock", res.statusCode));
    }
    const reviewCount = await reviewSchema.find({ product_Id: id }).count();
    res.status(200).json(
      success(res.statusCode, "Success", {
        details,
        Discount,
        afterDiscountPrice,
        reviewCount,
      })
    );
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.productSearch = async (req, res) => {
  try {
    const productName_en = req.body.productName_en;
    const productData = await productSchema.find({
      productName_en: { $regex: productName_en, $options: "i" },
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
    const { min, max } = req.body;
    const categoryData = await productSchema.find({});
    var filterData = categoryData.filter((x) => x.Price > min && x.Price < max);
    res.status(200).json(success(res.statusCode, "Success", { filterData }));
  } catch (err) {
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

exports.highDiscount = async (req, res) => {
  try {
    const productList = await productSchema.find({}).sort({ Discount: -1 });
    res.status(200).json(success(res.statusCode, "Success", { productList }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

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
    const productData = await productSchema.find(quearyObjetct);
    res.status(200).json(success(res.statusCode, "Success", { productData }));
  } catch (err) {
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
    res.status(200).json(success(res.statusCode, "Success", { productData }));
  } catch (err) {
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
      console.log(totalRating);
      const rating = await productSchema.findByIdAndUpdate(
        { _id: product_Id },
        { totalRating: totalRating },
        { new: true }
      );

      // let newrating = await productSchema({
      //   totalRating,
      //   ralatedProduct,
      // }).save();
      res
        .status(200)
        .json(success(res.statusCode, "Success", { ralatedProduct }));
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.Brandlist = async (req, res) => {
  try {
    const brandlist = await brandSchema.find({});
    res.status(200).json(success(res.statusCode, "Success", { brandlist }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.brandProduct = async (req, res) => {
  try {
    const id = req.query.id;
    const product = await productSchema.find({ brand_Id: id });
    res.status(200).json(success(res.statusCode, "Success", { product }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.popularProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const popularProduct = await productSchema
      .find({ Subcategory_Id: id })
      .limit(10);
    res
      .status(200)
      .json(success(res.statusCode, "Success", { popularProduct }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};
