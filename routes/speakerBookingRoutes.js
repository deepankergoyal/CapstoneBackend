const express = require("express");
const speakerBookingController = require("./../controllers/speakerBookingController");

const router = express.Router();

router
  .route("/")
  .get(speakerBookingController.getAllSpeakerBookings)
  .post(speakerBookingController.createSpeakerBooking);

router
  .route("/:id")
  .get(speakerBookingController.getSpeakerBooking)
  .patch(speakerBookingController.updateSpeakerBooking)
  .delete(speakerBookingController.deleteSpeakerBooking);

module.exports = router;
