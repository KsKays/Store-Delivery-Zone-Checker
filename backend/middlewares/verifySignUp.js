const User = require("../models/user.model");
const Role = require("../models/role.model");
const { Op } = require("sequelize");

//(req, res, next) จะเป็นการทำ middlemare เสมอ
checkDuplicateUsernameOrEmail = async (req, res, next) => {
  //Check username
  await User.findOne({
    where: {
      username: req.body.username,
    },
  }).then((user) => {
    if (user) {
      res.status(400).send({
        message: "Failed! Username is already in use!",
      });
      return;
    }
    //Check email
    User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      if (user) {
        res.status(400).send({
          message: "Failed! Email is already in use!",
        });
        return;
      }
      next();
    });
  });
};

//Check roles are valid
checkRoleExisted = async (req, res, next) => {
  if (req.body.roles) {
    Role.findAll({
      where: {
        name: { [Op.or]: req.body.roles },
      },
    }).then((roles) => {
      if (roles.length !== req.body.roles.length) {
        res.status(400).send({
          message: "Failed! Role does not exist.",
        });
        return;
      }
      next();
    });
  } else {
    next();
  }
};

// plubic medthod(+)
const verifySignUp = {
  checkRoleExisted,
  checkDuplicateUsernameOrEmail,
};

module.exports = verifySignUp;
