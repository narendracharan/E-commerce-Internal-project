const deviceSchema = require("../models/deviceSchema");
const { error, success } = require("./response");

exports.addLanguage = async (req, res) => {
  try {
    const language = new deviceSchema(req.query);
    const saveLanguage = await language.save();
    res.status(201).json(success(res.statusCode, "Success", { saveLanguage }));
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.updateLanguage = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = await deviceSchema.findByIdAndUpdate(id,req.body,{new:true});
    res
      .status(200)
      .json(success(res.statusCode, "Updated Data", { updateData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};
