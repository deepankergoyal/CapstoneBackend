const express = require("express");
const cors = require("cors"); // Import the CORS middleware
const userController = require("./../controllers/userController");
const loginResgisterController = require("./../controllers/loginRegisterController");

const router = express.Router();

// Add CORS middleware to the router
router.use(cors());

router
  .route("/currentuser")
  .get(loginResgisterController.protect, userController.currentUser);

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
