const adgeUserSchema=require("../../models/addaPanelSchema/adgeUserSchema")
const bcrypt=require("bcrypt");
const { error, success } = require("../response");
const adgeSchema = require("../../models/addaPanelSchema/adgeSchema");
const uniq=require("uuid");
const adgeimgSchema = require("../../models/addaPanelSchema/adgeimgSchema");

exports.adgeUserSignup=async(req,res)=>{
    try {
        const user = new adgeUserSchema(req.body);
        if (!user.userEmail) {
          res.status(200).json(error("please provide userEmail"));
        }
        if (!user.userName) {
          res.status(200).json(error("please provide userName"));
        }
        if (!user.password) {
          res.status(200).json(error("please provide userPassword"));
        }
        const userExist = await adgeUserSchema.findOne({ userEmail: user.userEmail });
        if (userExist) {
          return res.status(403).json({
            status: "Failed",
            message: "userEmail Already Exited",
          });
        }
        const nameExist = await adgeUserSchema.findOne({ userName: user.userName });
        if (nameExist) {
          return res.status(403).json({
            status: "Failed",
            message: "userName Already Exited",
          });
        }
        user.password = await bcrypt.hash(user.password, 10);
        const createUser = await user.save();
        res
          .status(201)
          .json(success(res.statusCode, "userSignup Successfully", { createUser }));
      } catch (err) {
        res.status(400).json(error("Failed", res.statusCode));
      }
}

exports.adgeUserLogin=async(req,res)=>{
    try {
        const { userName, password } = req.body;
        if (userName && password) {
          const login = await adgeUserSchema.findOne({ userName: userName });
          if (login != null) {
            const match = await bcrypt.compare(password, login.password);
            if (match) {
              return res
                .status(200)
                .json(success(res.statusCode, "Login Success", { login }));
            } else {
              res.status(200).json(error("password are incorrect", res.statusCode));
            }
          } else {
            res.status(200).json(error("userName are incorrect", res.statusCode));
          }
        } else {
          res
            .status(200)
            .json(error("userName and Password are Invalid", res.statusCode));
        }
      } catch (err) {
        res.status(400).json(error("Failed", res.statusCode));
      }
}


exports.adgeAddForm=async(req,res)=>{
    try {
        const { userName, title } = req.body;
        const uniQ_Id = uniq.v4("abc12");
        if ((userName, title)) {
          const newForm = new adgeSchema({
            userName: userName,
            title: title,
            uniQ_Id: uniQ_Id,
          });
          const saveData = await newForm.save();
          res.status(200).json(success(res.statusCode, "Success", { saveData }));
        } else {
          res.status(400).json(error("Please provide all filed", res.statusCode));
        }
      } catch (err) {
        res.status(400).json(error("Failed", res.statusCode));
      }
}

exports.adgeQuestions=async(req,res)=>{
    try {
        const docData = new adgeimgSchema(req.body);
        console.log(req.files);
        if (req.files) {
          for (let i = 0; i < req.files.length; i++) {
            if (req.files[i].fieldname == "doc1") {
              docData.doc1 = req.files[i].location;
            }
            if (req.files[i].fieldname == "doc2") {
              docData.doc2 = req.files[i].location;
            }
            if (req.files[i].fieldname == "doc3") {
              docData.doc3 = req.files[i].location;
            }
            if (req.files[i].fieldname == "doc4") {
              docData.doc4 = req.files[i].location;
            }
            if (req.files[i].fieldname == "doc5") {
              docData.doc5 = req.files[i].location;
            }
            if (req.files[i].fieldname == "doc6") {
              docData.doc6 = req.files[i].location;
            }
            if (req.files[i].fieldname == "doc7") {
              docData.doc7 = req.files[i].location;
            }
            if (req.files[i].fieldname == "qdoc1") {
              docData.qdoc1 = req.files[i].location;
            }
            if (req.files[i].fieldname == "qdoc2") {
              docData.qdoc2 = req.files[i].location;
            }
            if (req.files[i].fieldname == "qdoc3") {
              docData.qdoc3 = req.files[i].location;
            }
            if (req.files[i].fieldname == "qdoc4") {
              docData.qdoc4 = req.files[i].location;
            }
            if (req.files[i].fieldname == "qdoc5") {
              docData.qdoc5 = req.files[i].location;
            }
            if (req.files[i].fieldname == "qdoc6") {
              docData.qdoc6 = req.files[i].location;
            }
            if (req.files[i].fieldname == "qdoc7") {
              docData.qdoc7 = req.files[i].location;
            }
          }
        }
        const data = await docData.save();
        res.status(200).json(success(res.statusCode, "Success", { data }));
      } catch (err) {
        res.status(400).json(error("Failed", res.statusCode));
      }
}


exports.questionList = async (req, res) => {
    try {
      const id = req.params.id;
      const listData = await adgeimgSchema.findOne({ adge_Id: id });
      res.status(200).json(success(res.statusCode, "Success", { listData }));
    } catch (err) {
      res.status(400).json(error("Failed", res.statusCode));
    }
  };

  exports.adgeDashboard=async(req,res)=>{
    try {
        const total = await adgeSchema.find().count();
        const status = await adgeSchema.find();
        const rej = status.map((x) => x.status == "Rejected");
        const appr = status.map((x) => x.status == "assestment completed");
        const proc = status.map((x) => x.status == "In Progress");
        var rejected = 0;
        var approved = 0;
        var pending = 0;
        for (let i = 0; i < rej.length; i++) {
          rejected += rej[i];
        }
        for (let i = 0; i < appr.length; i++) {
          approved += appr[i];
        }
        for (let i = 0; i < proc.length; i++) {
          pending += proc[i];
        }
        res.status(200).json(
          success(res.statusCode, "Success", {
            total,
            rejected,
            approved,
            pending,
          })
        );
      } catch (err) {
        res.status(400).json(error("Failed", res.statusCode));
      }
  }

  exports.adgeUpdateTitle = async (req, res) => {
    try {
      const id = req.params.id;
      const updateTitle = await adgeSchema.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(success(res.statusCode, "Update", { updateTitle }));
    } catch (err) {
      res.status(400).json(error("Failed", res.statusCode));
    }
  };

  exports.adgeHome= async (req, res) => {
    try {
      const list = await adgeSchema.find({ status: "Yet to schedule" });
      var data2 = [];
      const listData2 = await adgeSchema.find({ status: "scheduled" });
      const listData3 = await adgeSchema.find({ status: "assestment completed" });
      const listData23 = await adgeSchema.find({
        status: "assestment in progress",
      });
      data2.push(listData2);
      data2.push(listData23);
      data2.push(listData3);
      res.status(200).json(success(res.statusCode, "Success", { list, data2 }));
    } catch (err) {
      console.log(err);
      res.status(400).json(error("Failed", res.statusCode));
    }
  };





  
exports.adgetotalScore = async (req, res) => {
    try {
      const Score = await adgeimgSchema.findOne({});
      var subTotal = 0;
      var subTotal2 = 0;
      for (let i = 0; i < Score.score.length; i++) {
        subTotal = Score.score[i] + subTotal;
      }
      let total = (subTotal * 100) / 700;
      const dataGover = parseInt(total);
      for (let i = 0; i < Score.scoreTwo.length; i++) {
        subTotal2 = Score.scoreTwo[i] + subTotal2;
      }
      let total2 = (subTotal2 * 100) / 700;
      const dataquality = parseInt(total2);
      const allTotal = subTotal + subTotal2;
      let score = (allTotal * 100) / 700;
      const totalScore = parseInt(score);
      res.status(200).json(
        success(res.statusCode, "Success", {
          totalScore,
          dataGover,
          dataquality,
        })
      );
    } catch (err) {
      res.status(400).json(error("Failed", res.statusCode));
    }
  };