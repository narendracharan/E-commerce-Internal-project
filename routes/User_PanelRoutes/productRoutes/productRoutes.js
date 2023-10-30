const express = require("express");
const {
  productSearch,
  productList,
  productDetails,
  relatedProduct,
  rating,
  filterPrice,
  lowPrice,
  highPrice,
  asendingProduct,
  descendingProduct,
  trandingProduct,
  productDiscount,
  ratingProduct,
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
  indemandProducts
} = require("../../../controllers/User_PanelControllers/productContorllers/productControllers");
const tokenAuthorisationUser = require("../../../middleware/userAuth");
const { updateQuatity } = require("../../../controllers/User_PanelControllers/cartsControllers/cartsControllers");
const router = express.Router();

router.post("/list", tokenAuthorisationUser, productList);
router.post("/details/:id", tokenAuthorisationUser, productDetails);
router.post("/search-product", tokenAuthorisationUser, productSearch);
router.post("/releted-product/:id", tokenAuthorisationUser, relatedProduct);
router.post("/product-rating", tokenAuthorisationUser, rating);
router.post("/price", tokenAuthorisationUser, filterPrice);
router.post("/low-price", tokenAuthorisationUser, lowPrice);
router.post("/high-price", tokenAuthorisationUser, highPrice);
router.post("/asending-product", tokenAuthorisationUser, asendingProduct);
router.post("/descending-product", tokenAuthorisationUser, descendingProduct);
router.post("/tranding-product", tokenAuthorisationUser, trandingProduct);
router.post("/review", tokenAuthorisationUser, productDiscount);
router.post("/rating-product", tokenAuthorisationUser, ratingProduct);
router.post("/high-Discount-list", tokenAuthorisationUser, highDiscount);
router.post("/brand-list", tokenAuthorisationUser, Brandlist);
router.post("/brand-product/:id", tokenAuthorisationUser, brandProduct);
router.post("/popular-product/:id", tokenAuthorisationUser, popularProduct);
router.post("/category-product/:id",tokenAuthorisationUser,categoryProduct)
router.post("/search-category",tokenAuthorisationUser,searchCategory)
router.post("/deals-of-day",tokenAuthorisationUser,DealsOfDay)
router.post("/Discount-product",tokenAuthorisationUser,discountProduct)
router.post("/similar-product/:id",tokenAuthorisationUser,similarProduct)
router.post("/newProduct",tokenAuthorisationUser,newArriwalProduct)
router.post("/indemand-product",tokenAuthorisationUser,indemandProducts)
router.post("/update-qty",updateQuatity)
module.exports = router;
