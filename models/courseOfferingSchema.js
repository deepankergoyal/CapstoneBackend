const mongoose = require("mongoose");

const courseOfferingSchema = new mongoose.Schema({
  courseid: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
});

// Assigning the CourseOffering model to module.exports
module.exports = mongoose.model("CourseOffering", courseOfferingSchema);
