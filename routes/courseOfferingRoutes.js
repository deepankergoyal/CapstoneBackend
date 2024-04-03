const express = require("express");
const courseOfferingController = require("../controllers/courseOfferingController.js");
const CourseOffering = require("../models/courseOfferingSchema");

const {
  getAllCourseOfferings,
  createCourseOffering,
  getCourseOffering,
  updateCourseOffering,
  deleteCourseOffering,
} = courseOfferingController;

const router = express.Router();

router.route("/").get(getAllCourseOfferings).post(createCourseOffering);

router
  .route("/:id")
  .get(getCourseOffering)
  .patch(updateCourseOffering)
  .delete(deleteCourseOffering);

module.exports = router;
