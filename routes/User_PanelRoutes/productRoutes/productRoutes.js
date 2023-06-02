const express=require("express")
const { productSearch, productList, productDetails, relatedProduct, rating, filterPrice, lowPrice, highPrice, asendingProduct, descendingProduct, trandingProduct, getReview, productDiscount, ratingProduct, highDiscount, catrgoryProductSearch } = require("../../../controllers/User_PanelControllers/productContorllers/productControllers")
const tokenAuthorisationUser = require("../../../middleware/userAuth")
const router=express.Router()

router.post("/list",tokenAuthorisationUser,productList)
router.post("/details/:id",tokenAuthorisationUser,productDetails)
router.post("/search-product",tokenAuthorisationUser,productSearch)
router.post("/releted-product/:id",tokenAuthorisationUser,relatedProduct)
router.post("/product-rating",tokenAuthorisationUser,rating)
router.post("/price",tokenAuthorisationUser,filterPrice)
router.post("/low-price",tokenAuthorisationUser,lowPrice)
router.post("/high-price",tokenAuthorisationUser,highPrice)
router.post("/asending-product",tokenAuthorisationUser,asendingProduct)
router.post("/descending-product",tokenAuthorisationUser,descendingProduct)
router.post("/tranding-product",tokenAuthorisationUser,trandingProduct)
router.post("/review",tokenAuthorisationUser,productDiscount)
router.post("/rating-product",tokenAuthorisationUser,ratingProduct)
router.post("/high-Discount-list",tokenAuthorisationUser,highDiscount)


module.exports=router