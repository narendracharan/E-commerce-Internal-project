const express = require("express");
const {
  adgeUserSignup,
  adgeUserLogin,
  adgeAddForm,
  adgeQuestions,
  questionList,
  adgeDashboard,
  adgeUpdateTitle,
  adgeHome,
  adgeScore,
  adgetotalScore,
  saveDraft,
  exportsPDF,
  exportsUserPDF,
  updateQuestion,
  submit,
  formDelete,
} = require("../../controllers/adda_Panel/adgeControllers");
const { s3upload } = require("../../middleware/multer");
const {
  addaUserSignup,
  addaUserLogin,
  addaHome,
  addaRoleAdd,
  addaRoleList,
  addaSearchRole,
  addaRoleUpdate,
  addaDeleteRole,
  addaUserAdd,
  addaUserList,
  addaUserUpdate,
  addaUserSearch,
  addaUserDelete,
  addaScheduleAdd,
  addaApprovedIn,
} = require("../../controllers/adda_Panel/addaControllers");
const {
  auditorUserSignup,
  auditorUserLogin,
  auditorHome,
  auditorRejected,
  auditorAprovedScore,
} = require("../../controllers/adda_Panel/auditorControllers");
const router = express.Router();

router.post("/adge-signup", adgeUserSignup);
router.post("/adge-login", adgeUserLogin);
router.post("/adge-add-form", adgeAddForm);
router.post("/adge-question/:id", s3upload.any(), adgeQuestions);
router.post("/adge-questionList/:id", questionList);
router.post("/adge-dashboard", adgeDashboard);
router.post("/adge-update-title/:id", adgeUpdateTitle);
router.post("/adge-home", adgeHome);
router.post("/adge-total-score", adgetotalScore);
router.post("/save-draft/:id", saveDraft);
router.post("/generate-pdf", exportsPDF);
router.post("/generate-user-pdf", exportsUserPDF);
router.post("/update-question/:id", updateQuestion);
router.post("/update-submit/:id", submit);
router.post("/delete-form/:id",formDelete)

router.post("/adda-Signup", addaUserSignup);
router.post("/adda-Login", addaUserLogin);
router.post("/adda-home", addaHome);
router.post("/adda-role-add", addaRoleAdd);
router.post("/adda-Role-List", addaRoleList);
router.post("/adda-Role-Search", addaSearchRole);
router.post("/adda-Role-update/:id", addaRoleUpdate);
router.post("/adda-role-delete/:id", addaDeleteRole);
router.post("/adda-user-add", addaUserAdd);
router.post("/adda-user-list", addaUserList);
router.post("/adda-user-update/:id", addaUserUpdate);
router.post("/adda-user-search", addaUserSearch);
router.post("/adda-user-delete/:id", addaUserDelete);
router.post("/adda-shedule-add/:id", addaScheduleAdd);
router.post("/adda-aproved-in/:id", addaApprovedIn);

router.post("/auditor-signup", auditorUserSignup);
router.post("/auditor-Login", auditorUserLogin);
router.post("/auditor-home", auditorHome);
router.post("/auditor-rejected/:id", auditorRejected);
router.post("/auditor-aproved-Score/:id", auditorAprovedScore);
module.exports = router;
