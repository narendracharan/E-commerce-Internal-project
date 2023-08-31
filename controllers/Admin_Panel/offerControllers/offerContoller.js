const offerSchema = require("../../../models/Admin_PanelSchema/offerSchema/offerSchema");
const { error, success } = require("../../response");

exports.addOffer = async (req, res) => {
  try {

    const {carts,title,code,Discount,startDate,endDate} = req.body;
    let products=[]
    for (let i = 0; i < carts.length; i++) {
      let object = {};
      object.product_Id = carts[i].product_Id;
       
      products.push(object);
    }
    const newOffer=new offerSchema({
      products,
      Discount:Discount,
      title:title,
      code :code ,
      startDate:startDate,
     endDate:endDate

    })
    const saveData = await newOffer.save();
    res.status(201).json(success(res.statusCode, "Success", { newOffer }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.offerList = async (req, res) => {
  try {
    const {from,to}=req.body
    const list = await offerSchema
      .find({
        $and:[
          from ?{createdAt:{$gte:new Date(from)}}:{},
          to ?{createdAt :{$lte :new Date(`${to}T23:59:59`)}}:{}
        ]
      })
      .populate("products.product_Id",{productName_en:1});
    res.status(200).json(success(res.statusCode, "Success", { list }));
  } catch (err) {
  console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.searchOffer = async (req, res) => {
  try {
    const title = req.body.title;
    const offerData = await offerSchema.find({
      title: { $regex: title, $options: "i" },
    });
    if (offerData.length > 0) {
      return res
        .status(200)
        .json(success(res.statusCode, "Success", { offerData }));
    } else {
      res.status(200).json(error("Data are Not Found", res.statusCode));
    }
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.offerDelete = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteData = await offerSchema.findByIdAndDelete(id);
    res.status(200).json(success(res.statusCode, "Success", { deleteData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.updateOffer = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedata = await offerSchema.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(success(res.statusCode, "Success", { updatedata }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};
