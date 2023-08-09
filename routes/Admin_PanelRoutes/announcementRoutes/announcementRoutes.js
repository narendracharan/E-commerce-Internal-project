const express = require("express");
const router = express.Router();
const tokenAuthorisationUser = require("../../../middleware/userAuth");
const {
  createAnnouncement,
  searchAnnouncement,
  announcementList,
  deleteAnnouncement,
} = require("../../../controllers/Admin_Panel/announcementControllers/announcementControllers");
const { s3upload } = require("../../../middleware/multer");

router.post(
  "/create",
  tokenAuthorisationUser,
  s3upload.single("pic"),
  createAnnouncement
);
router.post("/search", tokenAuthorisationUser, searchAnnouncement);
router.post("/list", tokenAuthorisationUser, announcementList);
router.post("/delete-announcement/:id",tokenAuthorisationUser,deleteAnnouncement)
module.exports = router;
