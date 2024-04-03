const Course = require("./../models/courseSchema");

const getAllCourses = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludedFields = ["page", "limit", "sort", "fields"];

    excludedFields.forEach((el) => delete queryObj[el]);

    console.log(req.query);

    // Filtering for >=, <=, <, >
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g, (match) => `$${match}`);

    let query = Course.find(JSON.parse(queryStr)); // Building the query

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numOfCourses = await Course.countDocuments();
      if (skip >= numOfCourses) {
        throw new Error("This page doesn't exist");
      }
    }

    const courses = await query; // Executing the query

    res.status(200).json({
      status: "success",
      results: courses.length,
      data: {
        courses,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Failed",
      message: err.message,
    });
  }
};

const createCourse = async (req, res) => {
  try {
    const newCourse = await Course.create(req.body);

    console.log(newCourse);
    res.status(201).json({
      status: "success",
      data: {
        course: newCourse,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

const getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        course,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Failed",
      message: err.message,
    });
  }
};

const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        course,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Failed",
      message: err.message,
    });
  }
};

const deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);

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
  getAllCourses,
  createCourse,
  getCourse,
  updateCourse,
  deleteCourse,
};
