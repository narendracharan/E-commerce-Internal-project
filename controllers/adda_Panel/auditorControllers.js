const auditorUserSchema = require("../../models/addaPanelSchema/auditorUserSchema");
const bcrypt = require("bcrypt");
const { error, success } = require("../response");
const adgeSchema = require("../../models/addaPanelSchema/adgeSchema");
const adgeimgSchema = require("../../models/addaPanelSchema/adgeimgSchema");

exports.auditorUserSignup = async (req, res) => {
  try {
    const user = new auditorUserSchema(req.body);
    if (!user.userEmail) {
      res.status(200).json(error("please provide userEmail"));
    }
    if (!user.userName) {
      res.status(200).json(error("please provide userName"));
    }
    if (!user.password) {
      res.status(200).json(error("please provide userPassword"));
    }
    const userExist = await auditorUserSchema.findOne({
      userEmail: user.userEmail,
    });
    if (userExist) {
      return res.status(403).json({
        status: "Failed",
        message: "userEmail Already Exited",
      });
    }
    const nameExist = await auditorUserSchema.findOne({
      userName: user.userName,
    });
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
};

exports.auditorUserLogin = async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (userName && password) {
      const login = await auditorUserSchema.findOne({ userName: userName });
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
};

exports.auditorHome = async (req, res) => {
  try {
    const userList = await adgeSchema.find();
    const list = userList.filter((x) => x.status == "assestment in progress");
    const listdata = userList.filter((x) => x.status == "assestment completed");
    res
      .status(200)
      .json(success(res.statusCode, "Success", { list, listdata }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.auditorRejected = async (req, res) => {
  try {
    const id = req.params.id;
    const status = "Rejected";
    const updateData = await adgeSchema.findByIdAndUpdate(
      id,
      { status: status },
      { new: true }
    );
    res.status(200).json(success(res.statusCode, "Success", { updateData }));
  } catch (err) {
    res.statusCode(400).json(error("Failed", res.statusCode));
  }
};

exports.auditorAprovedScore = async (req, res) => {
  try {
    const id = req.params.id;
    var status = "assestment completed";
    const Score = await adgeimgSchema.findOne({ adge_Id: id });
    console.log(Score.status1);
    var status1 = 0;
    var status2 = 0;

    if (Score.status1 == "yes") {
      status1 += 100;
    }
    if (Score.status2 == "yes") {
      status1 += 100;
    }
    if (Score.status3 == "yes") {
      status1 += 100;
    }
    if (Score.status4 == "yes") {
      status1 += 100;
    }
    if (Score.status5 == "yes") {
      status1 += 100;
    }
    if (Score.status6 == "yes") {
      status1 += 100;
    }
    if (Score.status7 == "yes") {
      status1 += 100;
    }
    if (Score.qstatus1 == "yes") {
      status2 += 100;
    }
    if (Score.qstatus2 == "yes") {
      status2 += 100;
    }
    if (Score.qstatus3 == "yes") {
      status2 += 100;
    }
    if (Score.qstatus4 == "yes") {
      status2 += 100;
    }
    if (Score.qstatus5 == "yes") {
      status2 += 100;
    }
    if (Score.qstatus6 == "yes") {
      status2 += 100;
    }
    if (Score.status7 == "yes") {
      status2 += 100;
    }
    let total = (status1 * 100) / 700;
    let total2 = (status2 * 100) / 700;
    let subTotal = ((status1 + status2) * 100) / 1400;
    Score.score.push(parseInt(total));
    Score.scoreTwo.push(parseInt(total2));
    let score = parseInt(subTotal);
    await adgeSchema.findByIdAndUpdate(
      id,
      { score: score, status: status },
      { new: true }
    );
    await Score.save();
    res.status(200).json(success(res.statusCode, "Success", { Score }));
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};
