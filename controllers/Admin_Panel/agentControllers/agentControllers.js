const agentSchema = require("../../../models/Admin_PanelSchema/agentSchema/agentSchema");
const { transporter } = require("../../../service/mailService");
const { error, success } = require("../../response");
const bcrypt = require("bcrypt");
const User = require("../../../models/Admin_PanelSchema/agentSchema/agentSchema");
const feedbackSchema = require("../../../models/Admin_PanelSchema/agentSchema/feedbackSchema");
const orderSchema = require("../../../models/User_PanelSchema/orderSchema/orderSchema");
const userLocationSchema = require("../../../models/Admin_PanelSchema/agentSchema/userLocationSchema");
const languageSchema = require("../../../models/Admin_PanelSchema/agentSchema/language");
const { Notification } = require("../../notificationControllers");
const FCM = require("fcm-node");
const admin = require("firebase-admin");
const service = require("../../../config/firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(service),
});
exports.addUser = async (req, res) => {
  try {
    const user = new agentSchema(req.body);
    user.password = await bcrypt.hash(user.password, 10);
    user.profile_Pic = req.file.location.replace(
      "ecommercemedia.s3.ap-south-1.amazonaws.com",
      process.env.CDN_URL
    );
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
      const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
      var mailOptions = {
        from: "s04450647@gmail.com",
        to: Email,
        subject: "Your Signup Successfully",
        text: `This ${otp} Otp Verify To Email`,
      };
      await agentSchema.findOneAndUpdate({ Email: Email }, { otp: otp });
      await transporter.sendMail(mailOptions);
      return res.status(200).json(
        success(res.statusCode, "Mail Send Successfully", {
          userID: user._id,
        })
      );
    } else {
      res.status(400).json(error("Email Not Found", res.statusCode));
    }
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { otp, Email } = req.body;
    const verify = await agentSchema.findOne({ Email: Email });
    if (!otp) {
      res.status(201).json(error("Please Provide Otp", res.statusCode));
    }
    if (verify.otp == otp) {
      return res
        .status(200)
        .json(success(res.statusCode, "Verify Otp Successfully"));
    } else {
      return res.status(200).json(error("Invalid Otp", res.statusCode));
    }
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.userList = async (req, res) => {
  try {
    const { from, to } = req.body;
    const list = await agentSchema.find({
      $and: [
        from ? { createdAt: { $gte: new Date(from) } } : {},
        to ? { createdAt: { $lte: new Date(`${to}T23:59:59`) } } : {},
      ],
    });
    res.status(200).json(success(res.statusCode, "Success", { list }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.editProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const data = {
      name: req.body.name,
      Email: req.body.Email,
      mobileNumber: req.body.mobileNumber,
      profile_Pic: req.file.location.replace(
        "ecommercemedia.s3.ap-south-1.amazonaws.com",
        process.env.CDN_URL
      )
      // .replace(
      //   "ecommercemedia.s3.ap-south-1.amazonaws.com",
      //   process.env.CDN_URL
      // ),
    };
    const updateData = await agentSchema
      .findByIdAndUpdate(id, data, { new: true })
      .populate("_id", { address: 0 });
    res
      .status(200)
      .json(success(res.statusCode, "Updated Successfully", { updateData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.userDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const details = await orderSchema
      .find({ deliverdBy: id })
      .populate("deliverdBy")
      .populate("user_Id");
    const total = details.map((x) => x.orderStatus == "Delivered");
    var compltedOrder = 0;
    for (let i = 0; i < total.length; i++) {
      compltedOrder += total[i];
    }
    var totalearning = 0;
    const shiping = details.map((x) => x.shippingPrice);
    for (let i = 0; i < shiping.length; i++) {
      totalearning += shiping[i];
    }
    const userDetail = await agentSchema.findById(id);
    res.status(200).json(
      success(res.statusCode, "Success", {
        userDetail,
        details,
        totalearning,
        compltedOrder,
      })
    );
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteUser = await agentSchema.findByIdAndDelete(id);
    res
      .status(200)
      .json(success(res.statusCode, "deleted data", { deleteUser }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.userSerach = async (req, res) => {
  try {
    const name = req.body.name;
    const searchData = await agentSchema.find({
      name: { $regex: name, $options: "i" },
    });
    if (searchData.length > 0) {
      res.status(200).json(success(res.statusCode, "Success", { searchData }));
    } else {
      res.status(200).json(success(res.statusCode, "user are not found"));
    }
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, password, Email, confirm_Password } = req.body;
    if ((oldPassword, password, confirm_Password, Email)) {
      if (password != confirm_Password) {
        res.status(400).json(error("Password Not Match", res.statusCode));
      } else {
        const newPassword = await bcrypt.hash(password, 10);
        const createPassword = await User.findOneAndUpdate(
          { Email: Email },
          { $set: { password: newPassword } },
          { new: true }
        );
        res.status(200).json(
          success(res.statusCode, "Password Updated Successfully", {
            createPassword,
          })
        );
      }
    } else {
      res.status(200).json(error("All filed are required", res.statusCode));
    }
  } catch (err) {
    res.status(400).json(error("Failed", res.status));
  }
};

exports.feedbackAdd = async (req, res) => {
  try {
    const feedback = new feedbackSchema(req.body);
    const feedbackdata = await feedback.save();
    res
      .status(200)
      .json(
        success(res.statusCode, "Feedback Added Successfully", { feedbackdata })
      );
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.orderList = async (req, res) => {
  try {
    const id = req.params.id;
    const orderList = await orderSchema
      .find({ deliverdBy: id })
      .populate("user_Id")
      .populate("address_Id")
      .populate("deliverdBy", { name: 1, address: 1 });
    const shippedData = orderList.filter(
      (x) =>
        x.orderStatus == "Shipped" 
        // x.orderStatus == "Inprogress" ||
        // x.orderStatus == "Delivered"
    );
    res.status(200).json(success(res.statusCode, "Success", { shippedData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.orderDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const orderDetails = await orderSchema
      .findById(id)
      .populate("address_Id")
      .populate("deliverdBy", { name: 1, address: 1 })
      .populate("user_Id")
      .populate("products.product_Id");
    res.status(200).json(success(res.statusCode, "Success", { orderDetails }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.orderHistory = async (req, res) => {
  try {
    const id = req.params.id;
    const orderdata = await orderSchema
      .find({ deliverdBy: id })
      .populate("address_Id")
      .populate("deliverdBy")
      .populate("user_Id");
    const orderDetails = orderdata.filter((x) => x.orderStatus == "Delivered");
    res.status(200).json(success(res.statusCode, "success", { orderDetails }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const data = {
      name: req.body.name,
      Email: req.body.Email,
      accountNumber: req.body.accountNumber,
      bankName: req.body.bankName,
      profile_Pic: req.file.location.replace(
        "ecommercemedia.s3.ap-south-1.amazonaws.com",
        process.env.CDN_URL
      ),
      commisionType: req.body.commisionType,
      mobileNumber: req.body.mobileNumber,
      address: req.body.address,
      accountName: req.body.accountName,
      routingNumber: req.body.routingNumber,
    };
    const userUpdate = await agentSchema.findByIdAndUpdate(id, data, {
      new: true,
    });
    res.status(200).json(success(res.statusCode, "Success", { userUpdate }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.withdrawOrder = async (req, res) => {
  try {
    const withdrawData = await orderSchema
      .find()
      .populate("address_Id")
      .populate("deliverdBy")
      .populate("user_Id");
    const orderDetails = withdrawData.filter((x) => x.orderStatus == "NotSend");
    res.status(200).json(success(res.statusCode, "Success", { orderDetails }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.userLocation = async (req, res) => {
  try {
    const location = new userLocationSchema(req.query);
    const locationData = await location.save();
    res.status(200).json(success(res.statusCode, "Success", { locationData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.agentDeatails = async (req, res) => {
  try {
    const { _id } = req.query;
    const agentData = await agentSchema.findById(_id, { jobStatus: 1 });
  //  const orderDetails = await orderSchema.find(_id, { jobStatus: 1 });
    res.status(200).json(success(res.statusCode, "Success", { agentData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { _id } = req.query;
    const orderStatus = req.body;
    const updateData = await orderSchema
      .findByIdAndUpdate(_id, orderStatus, {
        new: true,
      })
      .populate("user_Id");
    var mailOptions = {
      from: "s04450647@gmail.com",
      to: updateData.user_Id.userEmail,
      subject: "Order Successfully",
      text: `Hello ${updateData.user_Id.userName}
      Your order has been successfully placed  and is being ${updateData.orderStatus}.
      Order Number: ${updateData._id}
      Date of Order: ${updateData.createdAt}
      Item(s) Ordered: ${updateData.products.length}
      Thank you    `,
    };
    await transporter.sendMail(mailOptions);
    res.status(200).json(success(res.statusCode, "Success", updateData));
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.totalRevenue = async (req, res) => {
  try {
    const id = req.params.id;
    const totalRevenue = await orderSchema.find({ deliverdBy: id });
    const revenue = totalRevenue.map((x) => x.shippingPrice);
    var total = 0;
    for (let i = 0; i < revenue.length; i++) {
      total += revenue[i];
    }
    res.status(200).json(success(res.statusCode, "Success", { total }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.updateOnline = async (req, res) => {
  try {
    const id = req.params.id;
    const onlineStatus = req.body;
    const updateData = await agentSchema.findByIdAndUpdate(id, onlineStatus, {
      new: true,
    });
    res.status(200).json(success(res.statusCode, "Success", { updateData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.detailsUser = async (req, res) => {
  try {
    const id = req.params.id;
    const details = await agentSchema.findById(id, {
      name: 1,
      Email: 1,
      mobileNumber: 1,
      profile_Pic: 1,
    });
    res.status(200).json(success(res.statusCode, "Success", { details }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.addLanguage = async (req, res) => {
  try {
    const language = new languageSchema(req.body);
    const saveLanguage = await language.save();
    res.status(201).json(success(res.statusCode, "Success", { saveLanguage }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.updateLanguage = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = await languageSchema.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res
      .status(200)
      .json(success(res.statusCode, "Updated Data", { updateData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.AssignToOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const { deliverdBy, deviceId } = req.body;
    let status = "Assign";
    const orderAssign = await orderSchema
      .findByIdAndUpdate(
        id,
        { deliverdBy: deliverdBy, assignStatus: status },
        { new: true }
      )
      .populate("deliverdBy");
    // console.log(orderAssign.deliverdBy.name);
    //    var serverKey = 'AAAAjF33UiM:APA91bFj7u-EFQOMzn56copvP-3Z4uPWR_xJwnVXXcoAe3rd0DqesSL_Urwtic-HugXVHyCxV7KnDrxuZBgUTbwDy9oWw1XR_0E4ihuHCNtYltj6OwMidBcYkwIO40NZ7S2j7TgxE4JO';
    //    var fcm = new FCM(serverKey);
    //    var token = "AAAAjF33UiM:APA91bFj7u-EFQOMzn56copvP-3Z4uPWR_xJwnVXXcoAe3rd0DqesSL_Urwtic-HugXVHyCxV7KnDrxuZBgUTbwDy9oWw1XR_0E4ihuHCNtYltj6OwMidBcYkwIO40NZ7S2j7TgxE4JO";
    //  // Sending a push notification
    const message = {
      notification: {
        title: "Order Shippment",
        body: `Order Assign To ${orderAssign._id}`,
      },
           token:
        "f3WgG9PDRx20jjwE-wF5Og:APA91bGYh30JnYH2rFueqEH7AuSGvQEo3xYz2uId4O4TBRBwR_zSclxd9MgawnPj74YFBCHRQrIDiwQnHzU-lhUNMeO7MG-1GX7IODfmrrYotKcuIkDuS9jZlwBp3Pk5himQV08NQvLE",
         data:{
          orderKey: `${orderAssign._id}`,
          redirect_to: "Notification"
        }
    };
 
    admin
      .messaging()
      .send(message)
      .then((response) => {
        console.log("Successfully sent notification:", response);
      })
      .catch((error) => {
        console.log("Error sending notification:", error);
      });
    // const dd= await Notification(
    //     "Assign Order",
    //     `${orderAssign.deliverdBy.name}`,
    //     {
    //       user: String(orderAssign.deliverdBy._id),
    //       type: "Assign Order",
    //       url: "url",
    //     },
    //     deviceId,
    //     orderAssign.token
    //   );
    //   console.log(dd);
    res
      .status(200)
      .json(success(res.statusCode, "Assign Order", { orderAssign }));
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.DeclineReasone = async (req, res) => {
  try {
    const id = req.params.id;
    let reason = req.body.reason;
    let status = "Decline";
    const addReason = await orderSchema.findByIdAndUpdate(
      id,
      { declineReason: reason, assignStatus: status },
      { new: true }
    );
    res.status(200).json(success(res.statusCode, "Success", { addReason }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};


exports.orderAccepted = async (req, res) => {
  try {
    const id = req.params.id;
    let status = "Accepted";
    const addReason = await orderSchema.findByIdAndUpdate(
      id,
      {assignStatus: status },
      { new: true }
    );
    res.status(200).json(success(res.statusCode, "Success", { addReason }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};
