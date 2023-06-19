const userSchema = require("../../../models/Admin_PanelSchema/userSchema/userSchema");
const User = require("../../../models/Admin_PanelSchema/userSchema/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { transporter } = require("../../../service/mailService");
const { success, error } = require("../../response");
const { validationResult } = require("express-validator");
const Userschema=require("../../../models/User_PanelSchema/userSchema/userSchema");
const orderSchema = require("../../../models/User_PanelSchema/orderSchema/orderSchema");
const reviewSchema = require("../../../models/User_PanelSchema/reviewSchema/reviewSchema");

exports.userSignup = async (req, res) => {
  const users = new userSchema(req.body);
  const { userEmail } = req.body;
  try {
    const error =  validationResult(req);
    if (!error.isEmpty()) {
      return res.status(422).json({errors:error.array() });
    }
    const exit = await userSchema.findOne({ userEmail: userEmail });
    console.log(exit);
    if (exit) {
    return  res.status(403).json({
        status: "Failed",
        message: "userEmail Already Exited",
      });
    }
    const Salt = await bcrypt.genSalt(10);
    users.password = await bcrypt.hash(users.password, Salt);
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    var mailOptions = {
      from: "narendracharan25753@gmail.com",
      to: userEmail,
      subject: "Your Signup Successfully",
      text: `This ${otp} Otp Verify To Email`,
    };
    transporter.sendMail(mailOptions);
    const newOtpVerify = await new userSchema({
      otp: otp,
      expiresAt: Date.now() + 300,
    });
    await newOtpVerify.save();
    console.log(mailOptions);
    await transporter.sendMail(mailOptions);
    const createUser = await users.save();
    console.log(createUser);
    res.status(201).json(success(res.statusCode,"Signup Successfully",{createUser}));
  } catch (err) {
    res.status(400).json(error("Failed",res.statusCode));
  }
};

exports.checkStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const updateStatus = await userSchema.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(success(res.statusCode,"Success",{updateStatus}));
  } catch (err) {
    res.status(400).json(error("Failed",res.statusCode));
  }
};

exports.OtpVerify = async (req, res) => {
  try {
    const { userEmail, otp } = req.body;
    if (!userEmail || !otp) {
      throw Error("Empty Otp Details Are Not Allowed");
    } else {
      const userOtpVerify = await userSchema.find({ userEmail });
      if (userOtpVerify.length <= 0) {
        throw Error;
      } else {
        const { expiresAt } = userOtpVerify[0];
        if (expiresAt < Date.now()) {
          throw Error("Otp Has Expired. Please Request Again");
        } else {
          res.status(200).json(success(res.statusCode,"Verify Otp Successfully"));
        }
      }
    }
  } catch (err) {
    res.status(400).json(error("userEmail are incorrect",res.statusCode));
  }
};

exports.editProfile = async (req, res) => {
  try {
    const data = {
      userName: req.body.userName,
      userEmail: req.body.userEmail,
      profile_Pic: req.file.location,
    };
   const profileData= await userSchema.findByIdAndUpdate(req.params.id, data, { new: true });
    res.status(200).json(success(res.statusCode,"Profile Updated",{ profileData}));
  } catch (err) {

    res.status(400).json(error("Failed",res.statusCode));
  }
};

exports.userList = async (req, res) => {
  const userName = req.body.userName;
  try {
    var { page, pagesize } = req.body;
    var skip;
    if (page <= 1) {
    return  skip = 0;
    } else {
      skip = (page - 1) * pagesize;
    }
    const count = await Userschema.count();
    const totalpage = Math.ceil(count / pagesize);
    const createData = await Userschema
      .find({
        userName: { $regex: userName, $options: "i" },
      })
      .skip(skip)
      .limit(pagesize);
    res.status(200).json(success(res.statusCode,"Success",{createData,totalpage}));
  } catch (err) {
    res.status(400).json(error("Failed",res.statusCode));
  }
};

exports.userLogin = async (req, res) => {
  try {
    const { userEmail, password } = req.body;
    if (userEmail && password) {
      const login = await userSchema.findOne({userEmail:userEmail})
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
          res.status(403).json(error("User Password Are Incorrect",res.statusCode));
        }
      } else {
        res.status(403).json(error("User Email Are Incorrect",res.statusCode));
      }
    } else {
      res.status(403).json(error("User Email and Password Are Not Valid",res.statusCode));
    }
  } catch (err) {
    res.status(400).json(error("Failed",res.statusCode));
  }
};


exports.userDetails = async (req, res) => {
  try {
    const id= req.params.id
    const list = await Userschema.findById(id, {
      _id: 0,
     userName:1,
     userEmail:1,
     birthDay:1,
     status:1,
     gender:1
    }).populate("address_Id",{address:1,pinCode:1,mobileNumber:1,city:1,country:1})
    const order=await orderSchema.find({user_Id:id})
    var compltedOrder=0
    const status =order.map((x)=>x.orderStatus=="Delivered")
for(let i=0;i<status.length;i++){
  compltedOrder+=status[i]
}
const review=await reviewSchema.find({user_Id:id})
    res.status(200).json(success(res.statusCode,"Success",{list,order,review,compltedOrder}));
  } catch (err) {
    res.status(400).json(error("Failed",res.statusCode));
  }
}

exports.sendUserResetPassword = async (req, res) => {
  try {
    const { userEmail } = req.body;
    const user = await User.findOne({ userEmail: userEmail });
    if (user) {
      const secret = user._id + process.env.SECRET_KEY;
      const token = jwt.sign({ userID: user._id }, secret, { expiresIn: "3d" });
      const link = `http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/changePassword${user._id}/${token}}`;
      let info = await transporter.sendMail({
        from: "s04450647@gmail.com",
        to: userEmail,
        subject: "Email Send For Reset Password",
        text: `<a href=${link}></a>`,
      });
   return res.status(200).json(success(res.statusCode,"Success",{ useriD: user._id,
        token,}));
    } else {
      res.status(400).json(error("userEmail are empty",res.statusCode));
    }
  } catch (err) {
    res.status(500).json(error("Failed",res.statusCode));
  }
};

exports.resetPassword = async (req, res) => {
  const { password, confirmPassword } = req.body;
  const { id, token } = req.params;
  const user = await User.findById(id);
  const new_secret = user._id + process.env.SECRET_KEY;
  try {
    jwt.verify(token, new_secret);
    if ((password, confirmPassword)) {
      if (password !== confirmPassword) {
      return  res.status(401).json(error("Password Or Confirm_Password Could Not Be Same",res.statusCode));
      } else {
        const salt = await bcrypt.genSalt(10);
        const new_Password = await bcrypt.hash(password, salt);
        const createPassword = await User.findByIdAndUpdate(user.id, {
          $set: { password: new_Password },
        });
        res.status(200).json(success(res.statusCode,"Success",{createPassword}));
      }
    } else {
      res.status(403).json(error("password and confirmPassword empty",res.statusCode));
    }
  } catch (err) {
    res.status(400).json(error("Failed",res.statusCode));
  }
};



