const admin = require("firebase-admin");
const service = require("../config/firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(service),
});

exports.Notification = async (type, name, data, deviceId) => {
  try {
    const notification_options = {
      priority: "high",
      timeToLive: 60 * 60 * 24,
    };
    let title = "";
    let body = "";
    if (type === "login") {
      body = `Dear ${name} Logged In`;
      title = "Login Successful";
    } else if (type === "Signup") {
      body = `Dear ${name} SignUp In`;
      title = "SignUp Successful";
    } else if (type === "pending") {
      //Orders   "DELIVERED", "CANCEL"
      body = `Dear ${name} your order is Placed`;
      title = "Order Placed Successful";
    } else if (type === "Approved") {
      body = `Dear ${name} your order is dispatched`;
      title = "Order Dispatched";
    } else if (type === "SHIPPED") {
      body = `Dear ${name} your order is shipped`;
      title = "Order shipped";
    } else if (type === "DELIVERED") {
      body = `Dear ${name} your order has been delivered successfully`;
      title = "Order Delivered Successfully";
    } else if (type === "CANCEL") {
      body = `Dear ${name} your order has been cancelled`;
      title = "Order Cancelled";
    }
    const payload = {
      notification: {
        title: title,
        body: body,
        sound: "default",
      },
      data: { ...data },
    };
    admin
      .messaging()
      .send(deviceId, payload, notification_options)
      //  .sendToDevice(deviceId, payload, notification_options)
      .then((response) => {
        console.log(response.results);
      })
      .catch((error) => {
        console.log(error);
      });
    return;
  } catch (err) {
    console.log(err);
    return;
  }
};
