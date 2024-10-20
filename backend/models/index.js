const sequelize = require("./db"); //obj database
const Sequelize = require("sequelize"); //class from pakage sequelize
const User = require("./user.model");
const Role = require("./role.model");
const Store = require("./store.model");

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = User;
db.Role = Role;
db.Store = Store;

//Association (1toM)
db.User.belongsToMany(db.Role, {
  through: "user_roles",
});
//Association (1toM)
db.Role.belongsToMany(db.User, {
  through: "user_roles",
});

//One-to-Many : User-Role
db.User.hasMany(db.Store, { foreignKey: "userId" });
db.Store.belongsTo(db.User, { foreignKey: "userId" });

module.exports = db;
