const helpSchema = require("../../../models/Admin_PanelSchema/helpSchema/helpSchema");
const questionSchema = require("../../../models/Admin_PanelSchema/helpSchema/questionSchema");
const { error, success } = require("../../response");

exports.createhelp = async (req, res) => {
  try {
    const help = new helpSchema(req.body);
    const helpData = await help.save();
    res.status(201).json(success(res.statusCode, "Success", { helpData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.helpList = async (req, res) => {
  try {
    const {from,to}=req.body
    const list = await helpSchema.find({
      $and:[
        from ?{createdAt:{$gte:new Date(from)}}:{},
        to ?{createdAt :{$lte :new Date(`${to}T23:59:59`)}}:{}
      ]
    });
    res.status(200).json(success(res.statusCode, "Success", { list }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.helpSearch = async (req, res) => {
  try {
    const categoryName = req.body.categoryName;
    const searchData = await helpSchema.find({
      categoryName: { $regex: categoryName, $options: "i" },
    });
    if (searchData.length > 0) {
      res.status(200).json(success(res.statusCode, "Success", { searchData }));
    } else {
      res.status(200).json(error("Data are Not Found", res.statusCode));
    }
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.createQuestion = async (req, res) => {
  try {
    const question = new questionSchema(req.body);
    const questionData = await question.save();
    res.status(201).json(success(res.statusCode, "Success", { questionData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.questionList = async (req, res) => {
  try {
    const listData = await questionSchema.find();
    res.status(200).json(success(res.statusCode, "Success", { listData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.updateQuestion = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = await questionSchema.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(success(res.statusCode, "Success", { updateData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};


exports.deleteQuestion=async(req,res)=>{
  try{
const id=req.params.id
const deleteData=await helpSchema.findByIdAndDelete(id)
res.status(200).json(success(res.statusCode,"Success",{deleteData}))
  }catch(err){
    res.status(400).json(error("Failed",res.statusCode))
  }
}