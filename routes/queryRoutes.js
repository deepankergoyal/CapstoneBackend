const express = require("express");
const userQueryController = require("./../controllers/queryController");

const router = express.Router();

router
  .route("/")
  .get(userQueryController.getAllUserQueries)
  .post(userQueryController.createUserQuery);

router
  .route("/:id")
  .get(userQueryController.getUserQuery)
  .patch(userQueryController.updateUserQuery)
  .delete(userQueryController.deleteUserQuery);

module.exports = router;
