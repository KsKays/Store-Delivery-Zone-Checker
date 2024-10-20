const config = require("../config/auth.config");
const db = require("../models");
const User = db.User;
const Role = db.Role;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

// Register a new user
exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  //const { username, email, password, address } = req.body;
  // Validate input fields
  // if (!username || !email || !password || !address) {
  //   return res.status(400).send({
  //     message: "Please provide all required fields!",
  //   });
  // }

  if (!username || !email || !password) {
    return res.status(400).send({
      message: "Please provide all required fields!",
    });
  }

  // Prepare user data without userId
  const newUser = {
    username,
    email,
    password: bcrypt.hashSync(password, 8),
    // address,
  };

  try {
    // Save user in the database
    const user = await User.create(newUser);

    // Handle user roles
    if (req.body.roles) {
      const roles = await Role.findAll({
        where: {
          name: { [Op.or]: req.body.roles },
        },
      });
      await user.setRoles(roles);
    } else {
      // Set default role to "user" (id = 1)
      await user.setRoles([1]);
    }

    return res.send({
      message: "User registered successfully!",
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message || "An error occurred while creating the user.",
    });
  }
};

// Sign in user
exports.signin = async (req, res) => {
  const { username, password } = req.body;

  // Validate input fields
  if (!username || !password) {
    return res.status(400).send({
      message: "Please provide all required fields.",
    });
  }

  try {
    // Find user by username
    const user = await User.findOne({
      where: { username },
    });

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    // Check password
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid password!",
      });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400, // 24 hoursINTEGER
    });

    // Retrieve user roles
    const authorities = [];
    const roles = await user.getRoles();
    roles.forEach((role) => {
      authorities.push("ROLES_" + role.name.toUpperCase());
    });

    return res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      address: user.address, // Include address in response
      roles: authorities,
      accessToken: token,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message || "An error occurred during the signin process.",
    });
  }
};
