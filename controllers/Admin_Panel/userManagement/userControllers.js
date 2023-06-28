const userSchema = require("../../../models/Admin_PanelSchema/userSchema/userSchema");
const User = require("../../../models/Admin_PanelSchema/userSchema/userSchema");
const bcrypt = require("bcrypt");
const { transporter } = require("../../../service/mailService");
const { success, error } = require("../../response");
const { validationResult } = require("express-validator");
const Userschema = require("../../../models/User_PanelSchema/userSchema/userSchema");
const orderSchema = require("../../../models/User_PanelSchema/orderSchema/orderSchema");
const reviewSchema = require("../../../models/User_PanelSchema/reviewSchema/reviewSchema");

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

exports.editProfile = async (req, res) => {
  try {
    const data = {
      userName: req.body.userName,
      userEmail: req.body.userEmail,
      profile_Pic: req.file.location,
    };
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
  const userName = req.body.userName;
  try {
    var { page, pagesize } = req.body;
    var skip;
    if (page <= 1) {
      return (skip = 0);
    } else {
      skip = (page - 1) * pagesize;
    }
    const count = await Userschema.count();
    const totalpage = Math.ceil(count / pagesize);
    const createData = await Userschema.find({
      userName: { $regex: userName, $options: "i" },
    })
      .skip(skip)
      .limit(pagesize);
    res
      .status(200)
      .json(success(res.statusCode, "Success", { createData, totalpage }));
  } catch (err) {
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
    const list = await Userschema.findById(id, {
      _id: 0,
      userName: 1,
      userEmail: 1,
      birthDay: 1,
      status: 1,
      gender: 1,
    }).populate("address_Id", {
      address: 1,
      pinCode: 1,
      mobileNumber: 1,
      city: 1,
      country: 1,
    });
    const order = await orderSchema.find({ user_Id: id });
    var compltedOrder = 0;
    const status = order.map((x) => x.orderStatus == "Delivered");
    const price = order.map((x) => x.cartsTotal);
    for (let i = 0; i < status.length; i++) {
      compltedOrder += status[i];
    }
    var totalSpent = 0;
    for (let i = 0; i < price.length; i++) {
      totalSpent += price[i];
    }
    const orderValue = compltedOrder / totalSpent;
    const review = await reviewSchema.find({ user_Id: id });
    res.status(200).json(
      success(res.statusCode, "Success", {
        list,
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
    console.log(err);
    res.status(500).json(error("Failed", res.statusCode));
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
