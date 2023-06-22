const express=require("express")
const { transactionList, transactionDetails } = require("../../../controllers/Admin_Panel/transactionControllers/transactionControllers")
const router=express.Router()

router.post("/list",transactionList)
router.post("/details/:id",transactionDetails)
module.exports=router