const mongoose = require("mongoose");

const coursePurchaseSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  courseID: {
    type: String,
    required: true,
  },
  courseOfferingID: {
    type: String,
    required: true,
  },
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
});

const CoursePurchase = mongoose.model("CoursePurchase", coursePurchaseSchema);

module.exports = CoursePurchase;
