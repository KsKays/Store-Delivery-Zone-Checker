const express = require("express");
const router = express.Router();
const storeController = require("../controllers/store.controller");
const { authJwt } = require("../middlewares");

//Create a store ( Admin and Mod can use it! )
//PORT =>  http://localhost:5000/api/v1/store/
router.post(
  "/",
  [authJwt.verifyToken, authJwt.isModOrAdmin],
  storeController.create
);

//Get all store
router.get("/", storeController.getAll);

//Get ById store
router.get("/:id", [authJwt.verifyToken], storeController.getById);

//Update a store ( Admin and Mod can use it! )
router.put(
  "/:id",
  [authJwt.verifyToken, authJwt.isModOrAdmin],
  storeController.update
);

//Delete a store ( Admin can use it! )
router.delete(
  "/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  storeController.delete
);

module.exports = router;
