const agentSchema = require("../../../models/Admin_PanelSchema/agentSchema/agentSchema");
const { transporter } = require("../../../service/mailService");
const { error, success } = require("../../response");
const bcrypt = require("bcrypt");
const User = require("../../../models/Admin_PanelSchema/agentSchema/agentSchema");
const jwt = require("jsonwebtoken");
const feedbackSchema = require("../../../models/Admin_PanelSchema/agentSchema/feedbackSchema");
const orderSchema = require("../../../models/User_PanelSchema/orderSchema/orderSchema");
exports.addUser = async (req, res) => {
  try {
    const user = new agentSchema(req.body);
    user.password = await bcrypt.hash(user.password, 10);
    user.profile_Pic = req.file.location;
    const saveUser = await user.save();
    res
      .status(201)
      .json(success(res.statusCode, "add user successfully", { saveUser }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.userLogin = async (req, res) => {
  try {
    const { Email, password } = req.body;
    if (Email && password) {
      const verifyUser = await agentSchema.findOne({ Email: Email });
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

exports.sendEmail = async (req, res) => {
  try {
    const { Email } = req.body;
    const user = await agentSchema.findOne({ Email: Email });
    if (user) {
      const secret = user._id + process.env.SECRET_KEY;
      const token = jwt.sign({ userID: user._id }, secret, { expiresIn: "3d" });
      const link = `http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:3000/api/user/reset${user._id}/${token}}`;
      let info = await transporter.sendMail({
        from: "s04450647@gmail.com",
        to: Email,
        subject: "Email Send For Reset Password",
        text: `<a href=${link}></a>`,
      });
      return res.status(200).json(
        success(res.statusCode, "Mail Send Successfully", {
          userID: user._id,
          token,
        })
      );
    } else {
      res.status(400).json(error("Email Not Found", res.statusCode));
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.ResetPassword = async (req, res) => {
  try {
    const { password, confirm_Password } = req.body;
    const { id, token } = req.params;
    const user = await User.findById(id);
    const secret = user._id + process.env.SECRET_KEY;
    const decodedToken = jwt.verify(token, secret);
    if ((password, confirm_Password)) {
      if (password != confirm_Password) {
        res.status(400).json(error("Password Not Match", res.statusCode));
      } else {
        const newPassword = await bcrypt.hash(password, 10);
        const createPassword = await User.findByIdAndUpdate(user._id, {
          $set: { password: newPassword },
        });
        res.status(200).json(
          success(res.statusCode, "Password Updated Successfully", {
            createPassword,
          })
        );
      }
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.userList = async (req, res) => {
  try {
    const list = await agentSchema.find({});
    res.status(200).json(success(res.statusCode, "Success", { list }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.editProfile=async(req,res)=>{
  try{
const id=req.params.id
const data={
  name:req.body.name,
  Email:req.body.Email,
  mobileNumber:req.body.mobileNumber,
  profile_Pic:req.file.location
}
const updateData=await agentSchema.findByIdAndUpdate(id,data,{new:true}).populate("_id",{address:0})
res.status(200).json(success(res.statusCode,"Updated Successfully",{updateData}))
  }catch(err){
    res.status(400).json(error("Failed",res.statusCode))
  }
}



exports.changePassword=async(req,res)=>{
  try{
const id=req.params.id
const { oldPassword,password, confirm_Password } = req.body;
const user = await User.findById(id);
if ((oldPassword,password, confirm_Password)) {
  if (password != confirm_Password) {
    res.status(400).json(error("Password Not Match", res.statusCode));
  } else {
    const newPassword = await bcrypt.hash(password, 10);
    const createPassword = await User.findByIdAndUpdate(user.id,{$set:{password:newPassword}},{new:true})
    res.status(200).json(
      success(res.statusCode, "Password Updated Successfully", {
        createPassword,
      })
    );
  }
}
  }catch(err){
    console.log(err);
    res.status(400).json(error("Failed",res.status))
  }
}

exports.feedbackAdd=async(req,res)=>{
  try{
const feedback=new feedbackSchema(req.body)
const feedbackdata=await feedback.save()
res.status(200).json(success(res.statusCode,"Feedback Added Successfully",{feedbackdata}))
  }catch(err){
    console.log(err);
    res.status(400).json(error("Failed",res.statusCode))
  }
}

exports.orderList=async(req,res)=>{
  try{ 
const orderList=await orderSchema.find({}).populate("user_Id").populate("address_Id")
res.status(200).json(success(res.statusCode,"Success",{orderList}))
  }catch(err){
    res.status(400).json(error("Failed",res.statusCode))
  }
}

exports.orderDetails=async(req,res)=>{
  try{
const id=req.params.id
const orderDetails=await orderSchema.findById(id)
res.status(200).json(success(res.statusCode,"Success",{orderDetails}))
  }catch(err){
    console.log(err);
    res.status(400).json(error("Failed",res.statusCode))
  }
}


exports.orderHistory=async(req,res)=>{
  try{
const orderdata=await orderSchema.aggregate([
  {
    $match: {
      orderStatus : "pending",
    },
  },
])
res.status(200).json(success(req.statusCode,"success",{orderdata}))
  }catch(err){
    res.status(400).json(error("Failed",res.statusCode))
  }
}