const CourseOffering = require("../models/courseOfferingSchema");

const getAllCourseOfferings = async (req, res) => {
  try {
    let courseOfferings;
    if (req.query.courseid == null) {
      courseOfferings = await CourseOffering.find();
    } else {
      const courseId = req.query.courseid;
      courseOfferings = await CourseOffering.find({ courseid: courseId });
    }
    // Retrieve courseID from query parameter

    res.status(200).json({
      status: "success",
      results: courseOfferings.length,
      data: {
        courseOfferings,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Failed",
      message: err.message,
    });
  }
};

const createCourseOffering = async (req, res) => {
  try {
    const newCourseOffering = await CourseOffering.create(req.body);

    console.log(newCourseOffering);
    res.status(201).json({
      status: "success",
      data: {
        courseOffering: newCourseOffering,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

const getCourseOffering = async (req, res) => {
  try {
    const courseOffering = await CourseOffering.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        courseOffering,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Failed",
      message: err.message,
    });
  }
};

const updateCourseOffering = async (req, res) => {
  try {
    const courseOffering = await CourseOffering.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: "success",
      data: {
        courseOffering,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Failed",
      message: err.message,
    });
  }
};

const deleteCourseOffering = async (req, res) => {
  try {
    await CourseOffering.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "Failed",
      message: err.message,
    });
  }
};

module.exports = {
  getAllCourseOfferings,
  createCourseOffering,
  getCourseOffering,
  updateCourseOffering,
  deleteCourseOffering,
};
