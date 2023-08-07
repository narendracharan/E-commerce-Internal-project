const express = require("express");
const router = express.Router();
const tokenAuthorisationUser = require("../../../middleware/userAuth");
const {
  createThougth,
  thougthList,
  thougthSearch,
  deleteThougth,
} = require("../../../controllers/Admin_Panel/thougthControllers/thougthControllers");
const { s3upload } = require("../../../middleware/multer");

router.post("/createThougth", tokenAuthorisationUser,s3upload.single("thougth_Pic"), createThougth);
router.post("/list", tokenAuthorisationUser, thougthList);
router.post("/thougthSearch", tokenAuthorisationUser, thougthSearch);
router.post("/delete-thougth/:id",tokenAuthorisationUser,deleteThougth)
module.exports = router;
