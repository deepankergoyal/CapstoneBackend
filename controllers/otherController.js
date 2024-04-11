const CoursePurchase = require("./../models/coursePurchaseSchema");
const Course = require("./../models/courseSchema");
const CourseOffering = require("./../models/courseOfferingSchema");
const Query = require("./../models/querySchema");
const User = require("./../models/loginResgisterSchema");
const Email = require("./../utils/email");
const { google } = require("googleapis");
require("dotenv").config();

const calendar = google.calendar({
  version: "v3",
  // Add your Google API key here
  auth: "process.env.GOOGLE_API_KEY",
});

const enrollementstatus = async (req, res) => {
  const courseID = req.query.courseId;
  const userID = req.user._id;

  try {
    // Check if the user is enrolled in the specified course
    const coursePurchase = await CoursePurchase.findOne({ courseID, userID });
    console.log(userID);
    console.log(courseID);
    console.log(coursePurchase);

    if (coursePurchase) {
      res.json({ enrolled: true });
    } else {
      res.json({ enrolled: false });
    }
  } catch (error) {
    console.error("Error checking user enrollment status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const purchasedcourses = async (req, res) => {
  const userId = req.user.id; // Assuming you have user authentication middleware

  try {
    // Fetch course purchases for the user
    const coursePurchases = await CoursePurchase.find({ userID: userId });

    // Fetch course details for each purchased course
    const purchasedCourses = await Promise.all(
      coursePurchases.map(async (purchase) => {
        const course = await Course.findOne({ _id: purchase.courseID });
        const courseOffering = await CourseOffering.findOne({
          _id: purchase.courseOfferingID,
        });
        return {
          id: course._id,
          courseName: course.courseName,
          description: course.description,
          price: course.price,
          duration: course.duration,
          startDate: formatDate(courseOffering.startDate),
          endDate: formatDate(courseOffering.endDate),
          startTime: courseOffering.startTime,
          endTime: courseOffering.endTime,
        };
      })
    );

    res.json(purchasedCourses);
  } catch (error) {
    console.error("Error fetching purchased courses:", error);
    res
      .status(500)
      .json({ status: "failed", message: "Internal server error" });
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0]; // Extracts only the date part
};

const createEvent = async (req, res) => {
  try {
    const { course, token } = req.body;

    console.log(req.body.course);
    console.log(req.body.token);

    // Construct event data
    const event = {
      summary: course.courseName,
      description: course.description,
      start: {
        dateTime: course.startDate + "T" + course.startTime,
        timeZone: "YOUR_TIMEZONE", // Provide your timezone here
      },
      end: {
        dateTime: course.endDate + "T" + course.endTime,
        timeZone: "YOUR_TIMEZONE", // Provide your timezone here
      },
    };

    // Insert event to Google Calendar
    const response = await calendar.events.insert({
      calendarId: "primary",
      resource: event,
      auth: token,
    });

    console.log("Event created:", response.data);

    res.status(201).json({ message: "Event created successfully" });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ error: "Error creating event" });
  }
};

const queryResolve = async (req, res) => {
  const { queryId, name, email, response, message } = req.body;
  console.log(req.body);
  try {
    await Query.findByIdAndDelete(queryId);

    const emailtosend = new Email(email, name, message, response);

    console.log(req.body);
    console.log(emailtosend);
    await emailtosend.sendQueryResponseNotification(
      "testing",
      message,
      response
    );
    res.status(200).json({ message: "Query deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  enrollementstatus,
  purchasedcourses,
  createEvent,
  queryResolve,
};
