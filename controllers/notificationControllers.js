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
    if (type === "Assign Order") {
      body = `Dear ${name} Assign In`;
      title = "Assign Order";
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
     // .send(deviceId, payload, notification_options)
       .sendToDevice(deviceId, payload, notification_options)
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
