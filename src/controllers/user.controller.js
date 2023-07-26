const bcrypt = require("bcrypt");
const db = require("../model");
const User = db.user;
const userService = require("../services/user.service");

exports.createUser = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  const user = await userService.findUser({ username: req.body.username });
  if (!user) {
    const newUser = new User({
      username: req.body.username,
      password: await bcrypt.hash(req.body.password, 10),
      createDate: new Date(),
      fistName: req.body.fistName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
    });
    const val = await userService.createUser(newUser);
    if (val) {
      res.status(200).send({ success: true, data: val, message: "Success!" });
    } else {
      res.status(500).send({
        message: "ERRR",
        success: false,
      });
    }
  }
};

exports.findUser = async (req, res) => {
  if (!req.params.id) {
    res
      .status(400)
      .send({ success: false, message: "Content can not be empty!" });
  }
  const user = await userService.findUser({ username: req.params.id });
  if (user) {
    res.status(200).send({ success: true, data: user, message: "Success!" });
  } else {
    res.status(500).send({
      message: err.message,
      success: false,
    });
  }
};
