const express = require("express");
const {
  blogList,
  blogDetails,
  blogSearch,
  blogComment,
  commnetsList,
} = require("../../../controllers/User_PanelControllers/blogControllers/blogControllers");
const tokenAuthorisationUser = require("../../../middleware/userAuth");
const router = express.Router();

router.post("/blog-list", blogList);
router.post('/blog-details/:id',blogDetails)
router.post("/blog-search",  blogSearch);
router.post("/blog-comments",  blogComment);
router.post("/comments-list", commnetsList);
module.exports = router;
