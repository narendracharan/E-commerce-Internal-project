const userSchema = require("../../../models/Admin_PanelSchema/userSchema/userSchema");
const User = require("../../../models/Admin_PanelSchema/userSchema/userSchema");
const bcrypt = require("bcrypt");
const { transporter } = require("../../../service/mailService");
const { success, error } = require("../../response");
const { validationResult } = require("express-validator");
const Userschema = require("../../../models/User_PanelSchema/userSchema/userSchema");
const orderSchema = require("../../../models/User_PanelSchema/orderSchema/orderSchema");
const reviewSchema = require("../../../models/User_PanelSchema/reviewSchema/reviewSchema");
const jsonrawtoxlsx = require("jsonrawtoxlsx");
const fs = require("fs");
const { json } = require("body-parser");
const mapSchema = require("../../../models/mapSchema");
const addressSchema = require("../../../models/User_PanelSchema/addressSchema/addressSchema");

exports.userSignup = async (req, res) => {
  const users = new userSchema(req.body);
  const { userEmail } = req.body;
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(422).json({ errors: error.array() });
    }
    const exit = await userSchema.findOne({ userEmail: userEmail });
    if (exit) {
      return res.status(403).json({
        status: "Failed",
        message: "userEmail Already Exited",
      });
    }
    const Salt = await bcrypt.genSalt(10);
    users.password = await bcrypt.hash(users.password, Salt);
    const createUser = await users.save();
    res
      .status(201)
      .json(success(res.statusCode, "Signup Successfully", { createUser }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.checkStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const updateStatus = await userSchema.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(success(res.statusCode, "Success", { updateStatus }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.OtpVerify = async (req, res) => {
  try {
    const { userEmail, otp } = req.body;
    if (!userEmail || !otp) {
      return res
        .status(201)
        .json(error("Empty Otp Details Are Not Allowed", res.statusCode));
    }
    const userOtpVerify = await userSchema.findOne({ userEmail: userEmail });
    if (userOtpVerify.otp == otp) {
      return res
        .status(200)
        .json(success(res.statusCode, "Verify Otp Successfully", {}));
    } else {
      return res.status(200).json(error("Invalid Otp", res.statusCode));
    }
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.downlaod = async (req, res) => {
  try {
    const user = await Userschema.find({});
    let allOrders = [];
    for (const exportOrder of user) {
      let date = String(exportOrder.createdAt).split(" ");
      const newDate = `${date[2]}/${date[1]}/${date[3]}`;
      let obj = {
        "user Date": newDate,
        "User Name": `${exportOrder.userName}`,
        "Mobile Number": ` ${exportOrder.mobileNumber}`,
        "User Status": `${exportOrder.status}`,
      };
      allOrders.push(obj);
    }
    const filename = Date.now();
    const excel = jsonrawtoxlsx(allOrders);
    const file = fs.writeFileSync(`./public/${filename}.xlsx`, excel, "binary");
    res.status(201).json(
      success(res.statusCode, "Exported Successfully", {
        file: `${process.env.BASE_URL}/${filename}.xlsx`,
      })
    );
  } catch (err) {
    console.log(err);
    res.status(401).json(error("Error in exporting", res.statusCode));
  }
};

exports.editProfile = async (req, res) => {
  try {
    const data = {
      userName: req.body.userName,
      userEmail: req.body.userEmail,
      profile_Pic: req.file.location,
    };
    console.log(req.file);

    const profileData = await userSchema.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true }
    );
    res
      .status(200)
      .json(success(res.statusCode, "Profile Updated", { profileData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.userList = async (req, res) => {
  try {
    const { from, to } = req.body;
    const createData = await Userschema.find({
      $and: [
        from ? { createdAt: { $gte: new Date(from) } } : {},
        to ? { createdAt: { $lte: new Date(`${to}T23:59:59`) } } : {},
      ],
    })
      .sort({ createdAt: -1 })
      .populate("address_Id");
    res.status(200).json(success(res.statusCode, "Success", { createData }));
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.userLogin = async (req, res) => {
  try {
    const { userEmail, password } = req.body;
    if (userEmail && password) {
      const login = await userSchema.findOne({ userEmail: userEmail });
      if (login != null) {
        const match = await bcrypt.compare(password, login.password);
        if (match) {
          const token = await login.generateUserAuthToken();
          return res
            .header("x-auth-token-user", token)
            .header("access-control-expose-headers", "x-auth-token-admin")
            .status(201)
            .json(success(res.statusCode, "Successs", { login, token }));
        } else {
          res
            .status(403)
            .json(error("User Password Are Incorrect", res.statusCode));
        }
      } else {
        res.status(403).json(error("User Email Are Incorrect", res.statusCode));
      }
    } else {
      res
        .status(403)
        .json(error("User Email and Password Are Not Valid", res.statusCode));
    }
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.userDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const list = await Userschema.findById(id).populate("address_Id");
    const address = await addressSchema.find({ user_Id: id });
    const order = await orderSchema.find({ user_Id: id });
    var compltedOrder = 0;
    const status = order.map((x) => x.orderStatus == "Delivered");
    const price = order.map((x) => x.cartsTotal);
    for (let i = 0; i < status.length; i++) {
      compltedOrder += status[i];
    }
    var totalSpent = 0;
    // for (let i = 0; i < price.length; i++) {
    //   totalSpent += price[i];
    // }
    for (let i = 0; i < price.length; i++) {
      totalSpent += price[i];
      // for(let j=0;j<list[i]..length;j++)
      //   for(let k=0;k<order[i].cartsTotal[j];k++){
      //   }
      // }
    }
    console.log(totalSpent);
    const orderValue = compltedOrder / totalSpent;
    const review = await reviewSchema.find({ user_Id: id });
    res.status(200).json(
      success(res.statusCode, "Success", {
        list,
        address,
        order,
        review,
        compltedOrder,
        totalSpent,
        orderValue,
      })
    );
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.sendUserResetPassword = async (req, res) => {
  try {
    const { userEmail } = req.body;
    const user = await userSchema.findOne({ userEmail: userEmail });
    if (user) {
      const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
      let info = await transporter.sendMail({
        from: "s04450647@gmail.com",
        to: userEmail,
        subject: "Email Send For Reset Password",
        text: `This ${otp} Otp Verify To Email`,
      });
      await userSchema.findOneAndUpdate({ userEmail: userEmail }, { otp: otp });
      return res.status(200).json(success(res.statusCode, "Success", {}));
    } else {
      res.status(400).json(error("userEmail are empty", res.statusCode));
    }
  } catch (err) {
    res.status(500).json(error("Failed", res.statusCode));
  }
};

exports.userSerach = async (req, res) => {
  const userName = req.body.userName;
  try {
    const userData = await Userschema.find({
      userName: { $regex: userName, $options: "i" },
    });
    if (userData.length > 0) {
      res.status(200).json(success(res.statusCode, "Success", { userData }));
    } else {
      res.status(200).json(error("Data are Not Found", res.statusCode));
    }
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.resetPassword = async (req, res) => {
  const { password, confirmPassword, userEmail } = req.body;
  if ((password, confirmPassword, userEmail)) {
    try {
      if ((password, confirmPassword)) {
        if (password !== confirmPassword) {
          return res
            .status(401)
            .json(
              error(
                "Password Or Confirm_Password Could Not Be Same",
                res.statusCode
              )
            );
        } else {
          const salt = await bcrypt.genSalt(10);
          const new_Password = await bcrypt.hash(password, salt);
          const createPassword = await userSchema.findOneAndUpdate(
            { userEmail: userEmail },
            {
              $set: { password: new_Password },
            }
          );
          res
            .status(200)
            .json(success(res.statusCode, "Success", { createPassword }));
        }
      } else {
        res
          .status(403)
          .json(error("password and confirmPassword empty", res.statusCode));
      }
    } catch (err) {
      res.status(400).json(error("Failed", res.statusCode));
    }
  } else {
    res.status(400).json(error("All filed are required", res.statusCode));
  }
};

exports.userMap = async (req, res) => {
  try {
    const createMap = new mapSchema(req.body);
    const saveMap = await createMap.save();
    res.status(200).json(success(res.statusCode, "Success", { saveMap }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.allLocation = async (req, res) => {
  try {
    const allData = await Userschema.find().select([
      "userName",
      "longitude",
      "latitude",
    ]);
    res.status(200).json(success(res.statusCode, "Success", { allData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};
