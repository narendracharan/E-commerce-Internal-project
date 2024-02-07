const express = require("express");
const router = express.Router();
const tokenAuthorisationUser = require("../../../middleware/userAuth");
const {
  createStaff,
  staffList,
  staffSearch,
  updateStaff,
  stafstatus,
  StaffDetails,
  showModule,
  assignmodules,
} = require("../../../controllers/Admin_Panel/staffControllers/staffControllers");

router.post("/createStaff", tokenAuthorisationUser, createStaff);
router.post("/list", tokenAuthorisationUser, staffList);
//router.post("/staffSearch", tokenAuthorisationUser, staffSearch);
router.patch("/updateStaff/:id", tokenAuthorisationUser, updateStaff);
router.post('/stafstatus/:id',tokenAuthorisationUser,stafstatus);
router.post('/StaffDetails/:id',tokenAuthorisationUser,StaffDetails)
router.post('/showModule/:id',tokenAuthorisationUser,showModule)
//router.post("/assignmodules/:id",tokenAuthorisationUser,assignmodules)

module.exports = router;
