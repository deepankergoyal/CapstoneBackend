const CoursePurchase = require("./../models/coursePurchaseSchema");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const Email = require("./../utils/email");
const Course = require("./../models/courseSchema");
const CourseOffereing = require("./../models/courseOfferingSchema");

const getAllCoursePurchases = async (req, res) => {
  try {
    const coursePurchases = await CoursePurchase.find();
    res.status(200).json({
      status: "success",
      results: coursePurchases.length,
      data: {
        coursePurchases,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Failed",
      message: err.message,
    });
  }
};

const createCoursePurchase = async (req, res) => {
  try {
    // Assuming req.user contains the user making the request
    const userID = req.user._id.toString(); // Convert ObjectId to string

    // Add the userId to the request body before creating the course purchase
    const coursePurchaseData = { ...req.body, userID };

    console.log(coursePurchaseData);

    // Create the course purchase with the user information
    const newCoursePurchase = await CoursePurchase.create(coursePurchaseData);
    console.log(newCoursePurchase);

    // Fetch the course details for sending email notification
    const course = await Course.findById(req.body.courseID);

    const courseTiming = await CourseOffereing.findById(
      req.body.courseOfferingID
    );

    // Combine courseTiming fields into a single object
    const timing = {
      start: courseTiming.startDate,
      end: courseTiming.endDate,
      startTime: courseTiming.startTime,
      endTime: courseTiming.endTime,
    };
    console.log(timing);

    const timingString = `${timing.start} to ${timing.end}, ${timing.startTime} to ${timing.endTime}`;

    // Instantiate the Email class with user, course details, and timing as a string
    const email = new Email(
      req.user,
      "/course",
      course.courseName,
      timingString
    );

    // Send enrollment email
    console.log(course.courseName);
    await email.sendEnrollmentNotification(course.courseName);

    res.status(201).json({
      status: "success",
      data: {
        coursePurchase: newCoursePurchase,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

const getCoursePurchase = async (req, res) => {
  try {
    const coursePurchase = await CoursePurchase.findById(req.params.id);
    if (!coursePurchase) {
      res.status(404).json({
        status: "Failed",
        message: "Course purchase not found",
      });
      return;
    }
    res.status(200).json({
      status: "success",
      data: {
        coursePurchase,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Failed",
      message: err.message,
    });
  }
};

const updateCoursePurchase = async (req, res) => {
  try {
    const coursePurchase = await CoursePurchase.findByIdAndUpdate(
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
        coursePurchase,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Failed",
      message: err.message,
    });
  }
};

const deleteCoursePurchase = async (req, res) => {
  try {
    await CoursePurchase.findByIdAndDelete(req.params.id);
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
  getAllCoursePurchases,
  createCoursePurchase,
  getCoursePurchase,
  updateCoursePurchase,
  deleteCoursePurchase,
};
