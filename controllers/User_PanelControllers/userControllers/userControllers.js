const userSchema = require("../../../models/User_PanelSchema/userSchema/userSchema");
const { transporter } = require("../../../service/mailService");
const { error, success } = require("../../response");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../../models/User_PanelSchema/userSchema/userSchema");
const { validationResult } = require("express-validator");

exports.userSignup = async (req, res) => {
  try {
    const {userEmail,userName,password} =req.body
    const error = validationResult(req);
    if (!error.isEmpty()) {
      res.status(200).json({ errors: error.array() });
    }
    const userExist = await userSchema.findOne({ userEmail: userEmail });
    if (userExist) {
      return res.status(403).json({
        status: "Failed",
        message: "userEmail Already Exited",
      });
    }
   const passwordHash=  await bcrypt.hash(password, 10);
    const newUser=await new userSchema({
      userEmail:userEmail,
      userName:userName,
      password:passwordHash
    }).save()
    res
      .status(201)
      .json(success(res.statusCode, "userSignup Successfully", { newUser }));
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.userLogin = async (req, res) => {
  try {
    const { userEmail, password } = req.body;
    if (userEmail && password) {
      const verifyUser = await userSchema.findOne({ userEmail: userEmail });
      if (verifyUser != null) {
        const isMatch = await bcrypt.compare(password, verifyUser.password);
        if (isMatch) {
          const token = await verifyUser.generateUserAuthToken();
          return res
            .header("x-auth-token-user", token)
            .header("access-control-expose-headers", "x-auth-token-admin")
            .status(201)
            .json(
              success(res.statusCode, "login SuccessFully", {
                verifyUser,
                token,
              })
            );
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
        .json(error("User Email and Password Are empty", res.statusCode));
    }
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.sendMailResetPassword = async (req, res) => {
  try {
    const { userEmail } = req.body;
    const user = await userSchema.findOne({ userEmail: userEmail });
    if (user) {
      const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
      var mailOptions = {
        from: "s04450647@gmail.com",
        to: userEmail,
        subject: "Your Signup Successfully",
        text: `This ${otp} Otp Verify To Email`,
      };
      await userSchema.findOneAndUpdate({ userEmail: userEmail }, { otp: otp });
      await transporter.sendMail(mailOptions);
      return res.status(200).json(
        success(res.statusCode, "Mail Send Successfully", {
          userID: user._id,
        })
      );
    } else {
      res.status(200).json(error(" userEmail are incorrect", res.statusCode));
    }
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { otp, userEmail } = req.body;
    const verify = await userSchema.findOne({ userEmail: userEmail });
    if (verify.otp == otp) {
      res.status(200).json(success(res.statusCode, "Verify Otp Successfully"));
    } else {
      res.status(400).json(error("InValid Otp", res.statusCode));
    }
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.profilePic = async (req, res) => {
  try {
    const id = req.params.id;
    const data = {
      profile_Pic: req.file.location,
      userName: req.body.userName,
      userEmail: req.body.userEmail,
      mobileNumber: req.body.mobileNumber,
    };
    const profile = await userSchema.findByIdAndUpdate(id, data, {
      new: true,
    });
    res
      .status(200)
      .json(success(res.statusCode, " updated profile", { profile }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const user = new userSchema(req.body);
    const password = await bcrypt.hash(user.password, 10);
    const data = {
      userName: req.body.userName,
      userEmail: req.body.userEmail,
      profile_Pic: req.file.location,
      gender: req.body.gender,
      birthDay: req.body.birthDay,
      mobileNumber: req.body.mobileNumber,
      address_Id: req.body.address_Id,
      addressTwo: req.body.addressTwo,
      country: req.body.country,
      city: req.body.city,
      pinCode: req.body.pinCode,
      password: password,
    };
    const profile = await userSchema.findByIdAndUpdate(id, data, {
      new: true,
    });
    res.status(200).json(success(res.statusCode, " Success", { profile }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.aboutProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const details = await userSchema.findById(id);
    res.status(200).json(success(res.statusCode, "Success", { details }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.logOut = async (req, res) => {
  try {
    const authHeader = req.headers["x-auth-token-user"];
    jwt.sign(
      authHeader,
      "ultra-security",
      {
        expiresIn: 1,
      },
      (logout, err) => {
        if (logout) {
          res.status(200).json(success(res.statusCode, "Successfully Logout "));
        } else {
          res.status(400).json(error("Failed", res.statusCode, { err }));
        }
      }
    );
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.userResetPassword = async (req, res) => {
  try {
    const { password, confirm_Password, userEmail } = req.body;
    if ((password, confirm_Password)) {
      if (password != confirm_Password) {
        res.status(400).json(error("Password Not Match", res.statusCode));
      } else {
        const newPassword = await bcrypt.hash(password, 10);
        const createPassword = await User.findOneAndUpdate(
          { userEmail: userEmail },
          {
            $set: { password: newPassword },
          }
        );
        res.status(200).json(
          success(res.statusCode, "Password Updated Successfully", {
            createPassword,
          })
        );
      }
    }
  } catch (err) {
    res.status(400).json(error("Failed", res.status));
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const { userEmail } = req.body;
    const verifyEmail = await userSchema.findOne({ userEmail: userEmail });
    if (verifyEmail) {
      res.status(200).json(success(res.statusCode, "Success", { verifyEmail }));
    } else {
      res.status(400).json(error("Invalid userEmail", res.statusCode));
    }
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteData = await userSchema.findByIdAndDelete(id);
    res.status(200).json(success(res.statusCode, "Success", { deleteData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.notificationUpdate = async (req, res) => {
  try {
    const id = req.params.id;
    const data = {
      specialOffer: req.body.specialOffer,
      promo: req.body.promo,
      appUpdate: req.body.appUpdate,
    };
    const updateNotification = await userSchema.findByIdAndUpdate(id, data, {
      new: true,
    });
    res
      .status(200)
      .json(success(res.statusCode, "Success", { updateNotification }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};
