const express = require("express");
const router = express.Router();
const storeController = require("../controllers/store.controller");
const { authJwt } = require("../middlewares");

//Create a restaurant ( Admin and Mod can use it! )
//PORT =>  http://localhost:5000/api/v1/store/
router.post(
  "/",
  [authJwt.verifyToken, authJwt.isModOrAdmin],
  storeController.create
);

//Get all restaurant
router.get("/", storeController.getAll);

//Get ById restaurant
router.get("/:id", [authJwt.verifyToken], storeController.getById);

//Update a restaurant ( Admin and Mod can use it! )
router.put(
  "/:id",
  [authJwt.verifyToken, authJwt.isModOrAdmin],
  storeController.update
);

//Delete a restaurant ( Admin can use it! )
router.delete(
  "/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  storeController.delete
);

module.exports = router;
