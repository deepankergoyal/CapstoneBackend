const express = require("express");
const coursePurchaseController = require("./../controllers/coursePurchaseController");
const loginRegisterController = require("./../controllers/loginRegisterController");

const router = express.Router();

router
  .route("/")
  .get(coursePurchaseController.getAllCoursePurchases)
  .post(
    loginRegisterController.protect,
    coursePurchaseController.createCoursePurchase
  );

router
  .route("/:id")
  .get(coursePurchaseController.getCoursePurchase)
  .patch(coursePurchaseController.updateCoursePurchase)
  .delete(coursePurchaseController.deleteCoursePurchase);

module.exports = router;
