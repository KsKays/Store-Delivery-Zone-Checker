const express = require("express");
const cors = require("cors");
require("dotenv").config();
const authRouter = require("./routers/auth.router");
const storeRouter = require("./routers/store.router");

const db = require("./models");
const role = db.Role;

const PORT = process.env.PORT;
const frontend_url = process.env.FRONTEND_URL;

const corsOption = {
  origin: frontend_url,
};

//Dev Mode
// db.sequelize.sync({ force: true }).then(() => {
//   initRole();
//   console.log("Drop and Sync Database");
// });

//List of stores
const stores = require("./stores");
//console.log(stores);

const app = express();
app.use(cors(corsOption));

const initRole = () => {
  role.create({ id: 1, name: "user" });
  role.create({ id: 2, name: "moderator" });
  role.create({ id: 3, name: "admin" });
};

//use Middleware
app.use(cors(corsOption)); //cors
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//use Router
app.use("/api/v1/store", storeRouter);
app.use("/api/v1/auth", authRouter);

//Homepage
app.get("/api/stores", (req, res) => {
  res.json(stores);
});

app.get("/", (req, res) => {
  res.send("<h1>Welcome API for Store Delivery Zone Checker</h1>");
});

app.listen(PORT, () => {
  console.log("Server Running on port " + PORT);
});
