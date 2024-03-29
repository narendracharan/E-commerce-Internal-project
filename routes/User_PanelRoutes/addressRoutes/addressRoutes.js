const express = require("express");
const {
  createAddress,
  addressList,
  updateAddress,
  deleteAddress,
  addressDetails,
} = require("../../../controllers/User_PanelControllers/addressControllers/addressControllers");
const tokenAuthorisationUser = require("../../../middleware/userAuth");
const router = express.Router();

router.post("/create-address", tokenAuthorisationUser, createAddress);
router.post("/address-list/:id", tokenAuthorisationUser, addressList);
router.post("/update-address/:id", tokenAuthorisationUser, updateAddress);
router.delete("/delete-address/:id", tokenAuthorisationUser, deleteAddress);
router.post("/address-details/:id", tokenAuthorisationUser, addressDetails);
module.exports = router;
