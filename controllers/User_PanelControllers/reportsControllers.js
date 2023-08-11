const reportsSchema = require("../../models/User_PanelSchema/resportsSchema");
const { error, success } = require("../response");

exports.reportsProduct = async (req, res) => {
  try {
    const { user_Id, reason, product_Id ,description} = req.body;
    if (user_Id && reason && product_Id) {
        const newReports = new reportsSchema({
            user_Id: user_Id,
            product_Id: product_Id,
            reason: reason,
            description:description
          })
          const reports=await newReports.save()
          res.status(200).json(success(res.statusCode, "Success", { reports }));
      
         } else {
            return res.status(201).json(error("All filed are required"));

       }
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};
