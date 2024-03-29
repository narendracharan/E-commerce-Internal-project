const express = require("express");
const router = express.Router();
const userRoutes = require("./userRoutes/commonRoutes");
const productRoutes = require("./productRoutes/commonRoutes");
const cartsRoutes = require("./cartsRoutes/commonRoutes");
const wishCommonRoutes = require("./wishRoutes/commonRoutes");
const reviewCommonRoutes = require("./reviewRouter/commonRoutes");
const categoryCommonRoutes = require("./categoryRoutes/commonRoutes");
const addressCommonRoutes = require("./addressRoutes/commonRoutes");
const blogCommonRoutes = require("./blogRoutes/commonRoutes");
const saveCartsRoutes = require("./saveCartsRoutes/commonRoutes");
const dashboardCommonRoutes = require("./dashboardRoutes/commonRoutes");
const orderCommonRoutes = require("./orderRoutes/commonRoutes");
const contactCommonRoutes = require("./contactRoutes/commonRoutes");
const compareCommonRoutes = require("./compareRoutes/commonRoutes");
const tokenAuthorisationUser = require("../../middleware/userAuth");
const { reportsProduct } = require("../../controllers/User_PanelControllers/reportsControllers");

router.use("/user", userRoutes);
router.use("/product", productRoutes);
router.use("/carts", cartsRoutes);
router.use("/wish", wishCommonRoutes);
router.use("/review", reviewCommonRoutes);
router.use("/category", categoryCommonRoutes);
router.use("/address", addressCommonRoutes);
router.use("/blog", blogCommonRoutes);
router.use("/carts", saveCartsRoutes);
router.use("/dashboards", dashboardCommonRoutes);
router.use("/order", orderCommonRoutes);
router.use("/contact", contactCommonRoutes);
router.use("/compare", compareCommonRoutes);
router.post("/reports",tokenAuthorisationUser,reportsProduct)

module.exports = router;
