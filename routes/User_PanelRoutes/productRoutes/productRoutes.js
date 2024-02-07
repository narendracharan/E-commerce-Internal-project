const express = require("express");
const {
  productSearch,
  productList,
  productDetails,
  relatedProduct,
  //rating,
  filterPrice,
  lowPrice,
  highPrice,
  asendingProduct,
  descendingProduct,
  trandingProduct,
  productDiscount,
  updateRating,
  highDiscount,
  Brandlist,
  brandProduct,
  popularProduct,
  categoryProduct,
  searchCategory,
  DealsOfDay,
  discountProduct,
  similarProduct,
  newArriwalProduct,
  indemandProducts,
  userProductDetails,
  createrating,
  recommendedProductList
} = require("../../../controllers/User_PanelControllers/productContorllers/productControllers");
const tokenAuthorisationUser = require("../../../middleware/userAuth");
const { updateQuatity } = require("../../../controllers/User_PanelControllers/cartsControllers/cartsControllers");
const router = express.Router();

router.post("/list", productList);
router.post("/details/:id",  productDetails);;
router.post("/releted-product/:id",  relatedProduct);
router.post("/search-product",productSearch)
router.post("/updateRating", updateRating);
router.post("/price",  filterPrice);
router.post("/low-price", lowPrice);
router.post("/high-price",  highPrice);
router.post("/create-rating",createrating);
router.post("/asending-product",  asendingProduct);
router.post("/descending-product", descendingProduct);
router.post("/tranding-product",trandingProduct);
router.post("/review", productDiscount);
//router.post("/rating-product",  ratingProduct);
router.post("/high-Discount-list",  highDiscount);
router.post("/brand-list", Brandlist);
router.post("/brand-product/:id",  brandProduct);
router.post("/popular-product/:id", popularProduct);
router.post("/category-product/:id",categoryProduct)
router.post("/search-category",searchCategory)
router.post("/deals-of-day",DealsOfDay)
router.post("/Discount-product",discountProduct)
router.post("/similar-product/:id",similarProduct)
router.post("/newProduct",newArriwalProduct)
router.post("/indemand-product",indemandProducts)
router.post("/userProductDetails/:id",userProductDetails)
router.post("/update-qty",updateQuatity)
router.post('/recommendedProductList',recommendedProductList)
module.exports = router;
