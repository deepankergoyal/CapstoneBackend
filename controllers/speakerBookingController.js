const SpeakerBooking = require("./../models/speakerBookingSchema");

// Get all speaker bookings
const getAllSpeakerBookings = async (req, res) => {
  try {
    const speakerBookings = await SpeakerBooking.find();
    res.status(200).json({
      status: "success",
      results: speakerBookings.length,
      data: {
        speakerBookings,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Failed",
      message: err.message,
    });
  }
};

// Create a new speaker booking
const createSpeakerBooking = async (req, res) => {
  try {
    const newSpeakerBooking = await SpeakerBooking.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        speakerBooking: newSpeakerBooking,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

// Get a specific speaker booking by ID
const getSpeakerBooking = async (req, res) => {
  try {
    const speakerBooking = await SpeakerBooking.findById(req.params.id);
    if (!speakerBooking) {
      res.status(404).json({
        status: "failed",
        message: "Speaker booking not found",
      });
      return;
    }
    res.status(200).json({
      status: "success",
      data: {
        speakerBooking,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Failed",
      message: err.message,
    });
  }
};

// Update a specific speaker booking by ID
const updateSpeakerBooking = async (req, res) => {
  try {
    const speakerBooking = await SpeakerBooking.findByIdAndUpdate(
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
        speakerBooking,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Failed",
      message: err.message,
    });
  }
};

// Delete a specific speaker booking by ID
const deleteSpeakerBooking = async (req, res) => {
  try {
    await SpeakerBooking.findByIdAndDelete(req.params.id);
    res.status(204).json({
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
  getAllSpeakerBookings,
  createSpeakerBooking,
  getSpeakerBooking,
  updateSpeakerBooking,
  deleteSpeakerBooking,
};
