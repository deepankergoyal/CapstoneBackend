const express = require("express");
const otherController = require("./../controllers/otherController");
const loginResgisterController = require("./../controllers/loginRegisterController");

const router = express.Router();

router
  .route("/enrollementstatus")
  .get(loginResgisterController.protect, otherController.enrollementstatus);

router
  .route("/purchasedcourses")
  .get(loginResgisterController.protect, otherController.purchasedcourses);

router
  .route("/createevent")
  .post(loginResgisterController.protect, otherController.createEvent);

router.route("/queryResolve").post(otherController.queryResolve);

module.exports = router;
