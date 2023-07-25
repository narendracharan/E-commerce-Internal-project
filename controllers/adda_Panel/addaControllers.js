const addaUserSchema = require("../../models/addaPanelSchema/addaUserSchema");
const bcrypt = require("bcrypt");
const { error, success } = require("../response");
const addaSchema = require("../../models/addaPanelSchema/addaSchema");
const adgeSchema = require("../../models/addaPanelSchema/adgeSchema");
const addaRoleSchema = require("../../models/addaPanelSchema/addaRoleSchema");

exports.addaUserSignup = async (req, res) => {
  try {
    const user = new addaUserSchema(req.body);
    if (!user.userEmail) {
      res.status(200).json(error("please provide userEmail"));
    }
    if (!user.userName) {
      res.status(200).json(error("please provide userName"));
    }
    if (!user.password) {
      res.status(200).json(error("please provide userPassword"));
    }
    const userExist = await addaUserSchema.findOne({
      userEmail: user.userEmail,
    });
    if (userExist) {
      return res.status(403).json({
        status: "Failed",
        message: "userEmail Already Exited",
      });
    }
    const nameExist = await addaUserSchema.findOne({ userName: user.userName });
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

exports.addaUserLogin = async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (userName && password) {
      const login = await addaUserSchema.findOne({ userName: userName });
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

exports.addaHome = async (req, res) => {
  try {
    const userList = await adgeSchema.find();
    const list = userList.filter(
      (x) => x.status == "In-progress" ||  x.status ==  "scheduled"
    ).sort()
    const listdata = userList.filter(
      (x) =>
        x.status == "assestment completed",
    ).sort()
    res
      .status(200)
      .json(success(res.statusCode, "Success", { list, listdata }));
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.addaRoleAdd = async (req, res) => {
  try {
    const { roleName, descripation, status } = req.body;
    if ((roleName, descripation)) {
      const newRole = new addaRoleSchema({
        roleName: roleName,
        descripation: descripation,
        status: status,
      });
      const addRole = await newRole.save();
      res.status(200).json(success(res.statusCode, "Success", { addRole }));
    } else {
      res.status(200).json(error("All filed are required", res.statusCode));
    }
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.addaRoleList = async (req, res) => {
  try {
    const listData = await addaRoleSchema.find({});
    res.status(200).json(success(res.statusCode, "Succcess", { listData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.addaSearchRole = async (req, res) => {
  try {
    const roleName = req.body.roleName;
    const searchData = await addaRoleSchema.find({
      roleName: { $regex: roleName, $options: "i" },
    });
    if (searchData.length > 0) {
      res.status(200).json(success(res.statusCode, "Success", { searchData }));
    } else {
      res.status(200).json(error("Data are Not Found", res.statusCode));
    }
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.addaRoleUpdate = async (req, res) => {
  try {
    const id = req.params.id;
    const update = await addaRoleSchema.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(success(res.statusCode, "Success", { update }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.addaDeleteRole = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteRole = await addaRoleSchema.findByIdAndDelete(id);
    if (deleteRole) {
      res.status(200).json(success(res.statusCode, "Success", { deleteRole }));
    } else {
      res.status(200).json(error("Role are Not Found", res.statusCode));
    }
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.addaUserAdd = async (req, res) => {
  try {
    const { name, userName, entity, role_Id, status } = req.body;
    if ((name, userName, entity, role_Id)) {
      const newUser = new addaSchema({
        name: name,
        userName: userName,
        entity: entity,
        role_Id: role_Id,
        status: status,
      });
      const addUser = await newUser.save();
      res.status(201).json(success(res.statusCode, "Success", { addUser }));
    } else {
      return res.status(200).json(error("Please provide all required fields"));
    }
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.addaUserList = async (req, res) => {
  try {
    const ListData = await addaSchema.find().populate("role_Id");
    res.status(200).json(success(res.statusCode, "Success", { ListData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.addaUserUpdate = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = await addaSchema.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(success(res.statusCode, "Success", { updateData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.addaUserSearch = async (req, res) => {
  try {
    const name = req.body.name;
    const searchUser = await addaSchema.find({
      name: { $regex: name, $options: "i" },
    });
    if (searchUser.length > 0) {
      res.status(200).json(success(res.statusCode, "Success", { searchUser }));
    } else {
      res.status(200).json(error("Failed", res.statusCode));
    }
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.addaUserDelete = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteUser = await addaSchema.findByIdAndDelete(id);
    if (deleteUser) {
      res
        .status(200)
        .json(success(res.statusCodem, "Deleted User", { deleteUser }));
    } else {
      res.status(200).json(error("User are Not Found", res.statusCode));
    }
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.addaScheduleAdd = async (req, res) => {
  try {
    const id = req.params.id;
    let status = "scheduled";
    const { type, to, from, Status, schedule } = req.body;
    const update = await adgeSchema.findOneAndUpdate(
      { _id: id },
      {
        type: type,
        to: new Date(to),
        from: new Date(from),
        Status: Status,
        status: status,
        schedule: schedule,
      },
      { new: true }
    );
    res.status(200).json(success(res.statusCode, "Success", { update }));
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.addaApprovedIn = async (req, res) => {
  try {
    const id = req.params.id;
    const status = "scheduled";
    const updateData = await adgeSchema.findByIdAndUpdate(
      id,
      { status: status },
      { new: true }
    );
    res.status(200).json(success(res.statusCode, "Success", { updateData }));
  } catch (err) {
    res.statusCode(400).json(error("Failed", res.statusCode));
  }
};
