const mongoose = require("mongoose");

const speakerBookingSchema = new mongoose.Schema({
  instructorSpeakerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming the speaker is a user
    required: true,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bookingDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending",
  },
});

const SpeakerBooking = mongoose.model("SpeakerBooking", speakerBookingSchema);

module.exports = SpeakerBooking;
