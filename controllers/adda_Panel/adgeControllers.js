const adgeUserSchema = require("../../models/addaPanelSchema/adgeUserSchema");
const bcrypt = require("bcrypt");
const { error, success } = require("../response");
const adgeSchema = require("../../models/addaPanelSchema/adgeSchema");
const uniq = require("uuid");
const adgeimgSchema = require("../../models/addaPanelSchema/adgeimgSchema");
const draftSchema = require("../../models/addaPanelSchema/draftSchema");
const generatePDF = require("../../helpers/generatePdf");
const generateUserPDF = require("../../helpers/generateUserPdf");

exports.adgeUserSignup = async (req, res) => {
  try {
    const user = new adgeUserSchema(req.body);
    if (!user.userEmail) {
      res.status(200).json(error("please provide userEmail"));
    }
    if (!user.userName) {
      res.status(200).json(error("please provide userName"));
    }
    if (!user.password) {
      res.status(200).json(error("please provide userPassword"));
    }
    const userExist = await adgeUserSchema.findOne({
      userEmail: user.userEmail,
    });
    if (userExist) {
      return res.status(403).json({
        status: "Failed",
        message: "userEmail Already Exited",
      });
    }
    const nameExist = await adgeUserSchema.findOne({ userName: user.userName });
    if (nameExist) {
      return res.status(403).json({
        status: "Failed",
        message: "userName Already Exited",
      });
    }
    user.password = await bcrypt.hash(user.password, 10);
    const createUser = await user.save();
    res
      .status(201)
      .json(success(res.statusCode, "userSignup Successfully", { createUser }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.adgeUserLogin = async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (userName && password) {
      const login = await adgeUserSchema.findOne({ userName: userName });
      if (login != null) {
        const match = await bcrypt.compare(password, login.password);
        if (match) {
          return res
            .status(200)
            .json(success(res.statusCode, "Login Success", { login }));
        } else {
          res.status(200).json(error("password are incorrect", res.statusCode));
        }
      } else {
        res.status(200).json(error("userName are incorrect", res.statusCode));
      }
    } else {
      res
        .status(200)
        .json(error("userName and Password are Invalid", res.statusCode));
    }
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.adgeAddForm = async (req, res) => {
  try {
    const { userName, title } = req.body;
    const count = await adgeSchema.find().count();
    const uniQ_Id = "ABUD" + count;
    if ((userName, title)) {
      const newForm = new adgeSchema({
        userName: userName,
        title: title,
        uniQ_Id: uniQ_Id,
      });
      const saveData = await newForm.save();
      res.status(200).json(success(res.statusCode, "Success", { saveData }));
    } else {
      res.status(400).json(error("Please provide all filed", res.statusCode));
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.adgeQuestions = async (req, res) => {
  try {
    var {
      status1,
      comment1,
      doc1,
      status2,
      comment2,
      doc2,
      status3,
      comment3,
      doc3,
      status4,
      comment4,
      doc4,
      status5,
      comment5,
      doc5,
      status6,
      comment6,
      doc6,
      status7,
      comment7,
      doc7,
      qstatus1,
      qcomment1,
      qdoc1,
      qstatus2,
      qcomment2,
      qdoc2,
      qstatus3,
      qcomment3,
      qdoc3,
      qstatus4,
      qcomment4,
      qdoc4,
      qstatus5,
      qcomment5,
      qdoc5,
      qstatus6,
      qcomment6,
      qdoc6,
      qstatus7,
      qcomment7,
      qdoc7,
    } = req.body;
    var id = req.params.id;
    if (req.files) {
      for (let i = 0; i < req.files.length; i++) {
        if (req.files[i].fieldname == "doc1") {
          doc1 = req.files[i].location;
        }
        if (req.files[i].fieldname == "doc2") {
          doc2 = req.files[i].location;
        }
        if (req.files[i].fieldname == "doc3") {
          doc3 = req.files[i].location;
        }
        if (req.files[i].fieldname == "doc4") {
          doc4 = req.files[i].location;
        }
        if (req.files[i].fieldname == "doc5") {
          doc5 = req.files[i].location;
        }
        if (req.files[i].fieldname == "doc6") {
          doc6 = req.files[i].location;
        }
        if (req.files[i].fieldname == "doc7") {
          doc7 = req.files[i].location;
        }
        if (req.files[i].fieldname == "qdoc1") {
          qdoc1 = req.files[i].location;
        }
        if (req.files[i].fieldname == "qdoc2") {
          qdoc2 = req.files[i].location;
        }
        if (req.files[i].fieldname == "qdoc3") {
          qdoc3 = req.files[i].location;
        }
        if (req.files[i].fieldname == "qdoc4") {
          qdoc4 = req.files[i].location;
        }
        if (req.files[i].fieldname == "qdoc5") {
          qdoc5 = req.files[i].location;
        }
        if (req.files[i].fieldname == "qdoc6") {
          qdoc6 = req.files[i].location;
        }
        if (req.files[i].fieldname == "qdoc7") {
          qdoc7 = req.files[i].location;
        }
      }
    }
    // const status = "In-progress";
    // const data = new adgeimgSchema({
    //   status1: status1,
    //   comment1: comment1,
    //   doc1: doc1,
    //   status2: status2,
    //   comment2: comment2,
    //   doc2: doc2,
    //   status3: status3,
    //   comment3: comment3,
    //   doc3: doc3,
    //   status4: status4,
    //   comment4: comment4,
    //   doc4: doc4,
    //   status5: status5,
    //   comment5: comment5,
    //   doc5: doc5,
    //   status6: status6,
    //   comment6: comment6,
    //   doc6: doc6,
    //   status7: status7,
    //   comment7: comment7,
    //   doc7: doc7,
    //   qstatus1: qstatus1,
    //   qcomment1: qcomment1,
    //   qdoc1: qdoc1,
    //   qstatus2: qstatus2,
    //   qcomment2: qcomment2,
    //   qdoc2: qdoc2,
    //   qstatus3: qstatus3,
    //   qcomment3: qcomment3,
    //   qdoc3: qdoc3,
    //   qstatus4: qstatus4,
    //   qcomment4: qcomment4,
    //   qdoc4: qdoc4,
    //   qstatus5: qstatus5,
    //   qcomment5: qcomment5,
    //   qdoc5: qdoc5,
    //   qstatus6: qstatus6,
    //   qcomment6: qcomment6,
    //   qdoc6: qdoc6,
    //   qstatus7: qstatus7,
    //   qcomment7: qcomment7,
    //   qdoc7: qdoc7,
    //   adge_Id: adge_Id,
    // });
    //const allData = await data.save()
    const update = await adgeSchema.findByIdAndUpdate(
      id,
      {
        status1: status1,
        comment1: comment1,
        doc1: doc1,
        status2: status2,
        comment2: comment2,
        doc2: doc2,
        status3: status3,
        comment3: comment3,
        doc3: doc3,
        status4: status4,
        comment4: comment4,
        doc4: doc4,
        status5: status5,
        comment5: comment5,
        doc5: doc5,
        status6: status6,
        comment6: comment6,
        doc6: doc6,
        status7: status7,
        comment7: comment7,
        doc7: doc7,
        qstatus1: qstatus1,
        qcomment1: qcomment1,
        qdoc1: qdoc1,
        qstatus2: qstatus2,
        qcomment2: qcomment2,
        qdoc2: qdoc2,
        qstatus3: qstatus3,
        qcomment3: qcomment3,
        qdoc3: qdoc3,
        qstatus4: qstatus4,
        qcomment4: qcomment4,
        qdoc4: qdoc4,
        qstatus5: qstatus5,
        qcomment5: qcomment5,
        qdoc5: qdoc5,
        qstatus6: qstatus6,
        qcomment6: qcomment6,
        qdoc6: qdoc6,
        qstatus7: qstatus7,
        qcomment7: qcomment7,
        qdoc7: qdoc7,
      },
      { new: true }
    );
    res.status(200).json(success(res.statusCode, "Success", { update }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.questionList = async (req, res) => {
  try {
    const id = req.params.id;
    const listData = await adgeSchema.findById(id);
    res.status(200).json(success(res.statusCode, "Success", { listData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.adgeDashboard = async (req, res) => {
  try {
    const total = await adgeSchema.find().count();
    const status = await adgeSchema.find();
    const rej = status.map((x) => x.status == "Rejected");
    const appr = status.map((x) => x.status == "assestment completed");
    const proc = status.map((x) => x.status == "assestment in progress");
    var rejected = 0;
    var approved = 0;
    var pending = 0;
    for (let i = 0; i < rej.length; i++) {
      rejected += rej[i];
    }
    for (let i = 0; i < appr.length; i++) {
      approved += appr[i];
    }
    for (let i = 0; i < proc.length; i++) {
      pending += proc[i];
    }
    res.status(200).json(
      success(res.statusCode, "Success", {
        total,
        rejected,
        approved,
        pending,
      })
    );
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.adgeUpdateTitle = async (req, res) => {
  try {
    const id = req.params.id;
    const updateTitle = await adgeSchema.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(success(res.statusCode, "Update", { updateTitle }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.adgeHome = async (req, res) => {
  try {
    const adge = await adgeSchema.find();
    const list = adge.filter((x) => x.status == "yet to submit").sort();
    //await adgeSchema.find({ status: "assestment in progress" });
    const listData = adge
      .filter(
        (x) =>
          x.status == "assestment completed" ||
          x.status == "In-progress" ||
          x.status == "Approve" ||
          x.status == "Rejected"
      )
      .sort();
    //await adgeSchema.find({ status: "assestment completed"||,st "Yet to schedule"  }).sort()
    res
      .status(200)
      .json(success(res.statusCode, "Success", { list, listData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.adgetotalScore = async (req, res) => {
  try {
    const Score = await adgeSchema.find({});
    var subTotal = 0;
    var subTotal2 = 0;
    for (let i = 0; i < Score.length; i++) {
      Score[i].Score.map((x) => (subTotal = subTotal + x));
    }
    let total = (subTotal * 100) / 700;
    const dataGover = parseInt(total);
    for (let i = 0; i < Score.length; i++) {
      Score[i].scoreTwo.map((x) => (subTotal2 = subTotal2 + x));
    }

    let total2 = (subTotal2 * 100) / 700;
    const dataquality = parseInt(total2);
    const allTotal = subTotal + subTotal2;
    let score = (allTotal * 100) / 1400;
    const totalScore = parseInt(score);
    await adgeimgSchema.findOneAndUpdate({
      totalGover: dataGover,
      totalQuatily: dataquality,
      totalScore: totalScore,
    });
    res.status(200).json(
      success(res.statusCode, "Success", {
        totalScore,
        dataGover,
        dataquality,
      })
    );
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.saveDraft = async (req, res) => {
  try {
    const draft = new draftSchema(req.params);
    const draftData = await draft.save();
    res.status(200).json(success(res.statusCode, "Success", { draftData }));
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.exportsPDF = async (req, res) => {
  try {
    const score = await adgeimgSchema.find();
    const filename = Date.now();
    const filepath = `./public/pdf/${filename}`;
    const pdf = generatePDF(filename, filepath, score, res);
    res.status(201).json(
      success(res.statusCode, "pdf exported", {
        file: `${process.env.BASE_URL}/pdf/${filename}.pdf`,
      })
    );
  } catch (err) {
    res.status(400).json(error("error exportsPDF", res.statusCode));
  }
};

exports.exportsUserPDF = async (req, res) => {
  try {
    const score = await adgeSchema.find();
    const filename = Date.now();
    const filepath = `./public/pdf/${filename}`;
    const pdf = generateUserPDF(filename, filepath, score, res);
    res.status(201).json(
      success(res.statusCode, "pdf exported", {
        file: `${process.env.BASE_URL}/pdf/${filename}.pdf`,
      })
    );
  } catch (err) {
    res.status(400).json(error("error exportsPDF", res.statusCode));
  }
};

exports.updateQuestion = async (req, res) => {
  try {
    const id = req.params.id;
    let {
      accept1,
      accept2,
      accept3,
      accept4,
      accept5,
      accept6,
      accept7,
      qaccept1,
      qaccept2,
      qaccept3,
      qaccept4,
      qaccept5,
      qaccept6,
      qaccept7,
    } = req.body;
    const updateData = await adgeSchema.findByIdAndUpdate(
      id,
      {
        accept1: accept1,
        accept2: accept2,
        accept3: accept3,
        accept4: accept4,
        accept5: accept5,
        accept6: accept6,
        accept7: accept7,
        qaccept1: qaccept1,
        qaccept2: qaccept2,
        qaccept3: qaccept3,
        qaccept4: qaccept4,
        qaccept5: qaccept5,
        qaccept6: qaccept6,
        qaccept7: qaccept7,
      },
      { new: true }
    );
    res.status(200).json(success(res.statusCode, "Success", { updateData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.submit = async (req, res) => {
  try {
    const id = req.params.id;
    const status = "In-progress";
    const update = await adgeSchema.findByIdAndUpdate(
      id,
      { status: status },
      { new: true }
    );
    res.status(200).json(success(res.statusCode, "Success", { update }));
  } catch (err) {
    res.status(400).json("Failed", res.statusCode);
  }
};

exports.formDelete = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteData = await adgeSchema.findByIdAndDelete(id);
    res.status(200).json(success(res.statusCode, "Success", { deleteData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.submitData = async (req, res) => {
  try {
    var {
      status1,
      comment1,
      doc1,
      status2,
      comment2,
      doc2,
      status3,
      comment3,
      doc3,
      status4,
      comment4,
      doc4,
      status5,
      comment5,
      doc5,
      status6,
      comment6,
      doc6,
      status7,
      comment7,
      doc7,
      qstatus1,
      qcomment1,
      qdoc1,
      qstatus2,
      qcomment2,
      qdoc2,
      qstatus3,
      qcomment3,
      qdoc3,
      qstatus4,
      qcomment4,
      qdoc4,
      qstatus5,
      qcomment5,
      qdoc5,
      qstatus6,
      qcomment6,
      qdoc6,
      qstatus7,
      qcomment7,
      qdoc7,
    } = req.body;
    var id = req.params.id;
    if (req.files) {
      for (let i = 0; i < req.files.length; i++) {
        if (req.files[i].fieldname == "doc1") {
          doc1 = req.files[i].location;
        }
        if (req.files[i].fieldname == "doc2") {
          doc2 = req.files[i].location;
        }
        if (req.files[i].fieldname == "doc3") {
          doc3 = req.files[i].location;
        }
        if (req.files[i].fieldname == "doc4") {
          doc4 = req.files[i].location;
        }
        if (req.files[i].fieldname == "doc5") {
          doc5 = req.files[i].location;
        }
        if (req.files[i].fieldname == "doc6") {
          doc6 = req.files[i].location;
        }
        if (req.files[i].fieldname == "doc7") {
          doc7 = req.files[i].location;
        }
        if (req.files[i].fieldname == "qdoc1") {
          qdoc1 = req.files[i].location;
        }
        if (req.files[i].fieldname == "qdoc2") {
          qdoc2 = req.files[i].location;
        }
        if (req.files[i].fieldname == "qdoc3") {
          qdoc3 = req.files[i].location;
        }
        if (req.files[i].fieldname == "qdoc4") {
          qdoc4 = req.files[i].location;
        }
        if (req.files[i].fieldname == "qdoc5") {
          qdoc5 = req.files[i].location;
        }
        if (req.files[i].fieldname == "qdoc6") {
          qdoc6 = req.files[i].location;
        }
        if (req.files[i].fieldname == "qdoc7") {
          qdoc7 = req.files[i].location;
        }
      }
    }
    const status = "In-progress";
    const update = await adgeSchema.findByIdAndUpdate(
      id,
      {
        status: status,
        status1: status1,
        comment1: comment1,
        doc1: doc1,
        status2: status2,
        comment2: comment2,
        doc2: doc2,
        status3: status3,
        comment3: comment3,
        doc3: doc3,
        status4: status4,
        comment4: comment4,
        doc4: doc4,
        status5: status5,
        comment5: comment5,
        doc5: doc5,
        status6: status6,
        comment6: comment6,
        doc6: doc6,
        status7: status7,
        comment7: comment7,
        doc7: doc7,
        qstatus1: qstatus1,
        qcomment1: qcomment1,
        qdoc1: qdoc1,
        qstatus2: qstatus2,
        qcomment2: qcomment2,
        qdoc2: qdoc2,
        qstatus3: qstatus3,
        qcomment3: qcomment3,
        qdoc3: qdoc3,
        qstatus4: qstatus4,
        qcomment4: qcomment4,
        qdoc4: qdoc4,
        qstatus5: qstatus5,
        qcomment5: qcomment5,
        qdoc5: qdoc5,
        qstatus6: qstatus6,
        qcomment6: qcomment6,
        qdoc6: qdoc6,
        qstatus7: qstatus7,
        qcomment7: qcomment7,
        qdoc7: qdoc7,
      },
      { new: true }
    );
    res.status(200).json(success(res.statusCode, "Success", { update }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};
