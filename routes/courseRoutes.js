const express = require("express");
const courseController = require("./../controllers/courseController");
const loginRegisterController = require("./../controllers/loginRegisterController");

const router = express.Router();

router
  .route("/")
  .get(courseController.getAllCourses) // Protect the route
  .post(loginRegisterController.protect, courseController.createCourse); // Protect the route

router
  .route("/:id")
  .get(courseController.getCourse) // Protect the route
  .patch(loginRegisterController.protect, courseController.updateCourse) // Protect the route
  .delete(loginRegisterController.protect, courseController.deleteCourse); // Protect the route

module.exports = router;
