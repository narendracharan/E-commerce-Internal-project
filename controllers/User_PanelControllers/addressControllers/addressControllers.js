const addressSchema = require("../../../models/User_PanelSchema/addressSchema/addressSchema");
const userSchema = require("../../../models/User_PanelSchema/userSchema/userSchema");
const { error, success } = require("../../response");

exports.createAddress = async (req, res) => {
  try {
    const {title,title_ar,address,address_ar,locality,locality_ar,city,city_ar,
      state,country,country_ar,fullName,fullName_ar,mobileNumber,Email,addressTwo,addressTwo_ar,pinCode,user_Id} = new addressSchema(req.body);
    const newAddress = new addressSchema({
      title:title,
      address:address,
      locality:locality,
      city:city,
      state:state,
      country:country,
      fullName:fullName,
      mobileNumber:mobileNumber,
      Email:Email,
      addressTwo:addressTwo,
      pinCode:pinCode,
      user_Id:user_Id,
      title_ar:title_ar,
      address_ar:address_ar,
      locality_ar:locality_ar,
      city_ar:city_ar,
      country_ar:country_ar,
      fullName_ar:fullName_ar,
      addressTwo_ar:addressTwo_ar
    })
    const addressData=await newAddress.save()
    const updte=await userSchema.findOneAndUpdate({_id:user_Id},{address_Id:newAddress._id},{new:true})
    res.status(201).json(success(res.statusCode, "Success", { addressData }));
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.addressList = async (req, res) => {
  try {
    const _id=req.params.id
    const addressData = await addressSchema.find({user_Id:_id});
    res.status(200).json(success(res.statusCode, "Success", { addressData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.updateAddress = async (req, res) => {
  try {
    const id = req.params.id;
    const addressData = await addressSchema.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(success(res.statusCode, "Success", { addressData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.deleteAddress = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteData = await addressSchema.findByIdAndDelete(id);
    res.status(200).json(success(res.statusCode, "Success", { deleteData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.addressDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const detailsData = await addressSchema.findById(id);
    res.status(200).json(success(res.statusCode, "Success", { detailsData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};
