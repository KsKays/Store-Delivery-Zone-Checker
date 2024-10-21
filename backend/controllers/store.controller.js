const { where } = require("sequelize");
const Store = require("../models/store.model");

// Create and Save a new store
exports.create = async (req, res) => {
  const {
    storeName,
    address,
    latitude,
    longitude,
    deliveryRadius,
    getDirection,
    userId,
  } = req.body; // สลายโครงสร้าง
  // Validate data
  if (
    !storeName ||
    !address ||
    !latitude ||
    !longitude ||
    !deliveryRadius ||
    !getDirection
  ) {
    res.status(400).send({
      message:
        "StoreName, Address, Latitude, Longitude or DeliveryRadius can not be empty!",
    });
    return; // เพิ่ม return เพื่อหยุดการทำงานถ้าข้อมูลไม่ครบถ้วน
  }

  await Store.findOne({ where: { storeName: storeName } }).then((store) => {
    if (store) {
      res.status(400).send({
        message: "Store already exists!",
      });
      return;
    }
    // create a store สร้าง store
    const newStore = {
      storeName: storeName,
      address: address,
      latitude: latitude,
      longitude: longitude,
      deliveryRadius: deliveryRadius,
      getDirection: getDirection,
      userId: userId,
    };
    Store.create(newStore)
      .then((data) => {
        res.send(data);
      })
      .catch((error) => {
        res.status(500).send({
          message:
            error.message ||
            "Something error occurred while creating the store.",
        });
      });
  });
};

// Get all stores สร้าง Get all
exports.getAll = async (req, res) => {
  await Store.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message ||
          "Something error occurred while retrieving the stores.",
      });
    });
};

// Get By ID store สร้าง Get By ID
exports.getById = async (req, res) => {
  const id = req.params.id;
  await Store.findByPk(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Not found Store with id " + id });
      } else {
        res.send(data);
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message ||
          "Something error occurred while retrieving the store.",
      });
    });
};

// UpdateById store
exports.update = async (req, res) => {
  const id = req.params.id;
  await Store.update(req.body, {
    where: {
      id: id,
    },
  })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Store was updated successfully" });
      } else {
        res.send({
          message:
            "Cannot update store with id " +
            id +
            ". Maybe store was not found or req.body is empty!",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Something error occurred while updating the store.",
      });
    });
};

// Delete store
exports.delete = async (req, res) => {
  const id = req.params.id;
  await Store.destroy({
    where: {
      id: id,
    },
  })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Delete successfully" });
      } else {
        res.send({
          message: "Cannot delete store with id " + id + ".",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Something error occurred while deleting the store.",
      });
    });
};
