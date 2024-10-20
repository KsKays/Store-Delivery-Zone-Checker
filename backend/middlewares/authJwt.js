//Autolization *admin, *user, *mod
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models");
const User = db.User;

//verify token
verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"]; //นำมาจาก auth.router.js
  // 1st Verify ไม่รู้ว่า User Token เป็นใครและสามารถเข้าถึงได้
  if (!token) {
    return res.status(403).send({
      message: "No token provided",
    });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    //รู้ว่า User Tokenเป็นใครแต่ไม่สามารถเข้าถึงสิทธิ์ได้
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id; // **decoded.id** เอามาจาก auth.controller.js, ฟังก์ชันที่ชื่อว่า jwt.sign มี object{id} อยู่
    next();
  });
};

//Check *

//* isAdmin? ใช้ loop เพื่อเช็คว่า user เป็น admin มั้ย?
isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
      return res.status(401).send({
        message: "Unauthorized, Require Admin Role!",
      });
    });
  });
};

//* isMod?
isMod = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }
      }
      return res.status(401).send({
        message: "Unauthorized, Require Moderator Role!",
      });
    });
  });
};

//* isAdminOrMod?
isModOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator" || roles[i].name === "admin") {
          next();
          return;
        }
      }
      return res.status(401).send({
        message: "Unauthorized, Require Moderator Or Admin Role!",
      });
    });
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
  isMod,
  isModOrAdmin,
};

module.exports = authJwt;
