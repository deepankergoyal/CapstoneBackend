const Review = require("./../models/reviewSchema");

// Get all reviews
const getAllReviews = async (req, res) => {
  try {
    let reviews;
    if (req.query.courseid == null) {
      reviews = await Review.find();
    } else {
      const courseId = req.query.courseid;
      reviews = await Review.find({ courseID: courseId });
    }

    res.status(200).json({
      status: "success",
      results: reviews.length,
      data: {
        reviews,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Failed",
      message: err.message,
    });
  }
};

// Create a new review
const createReview = async (req, res) => {
  try {
    const newReview = await Review.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        review: newReview,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

// Get a specific review by ID
const getReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      res.status(404).json({
        status: "failed",
        message: "Review not found",
      });
      return;
    }
    res.status(200).json({
      status: "success",
      data: {
        review,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Failed",
      message: err.message,
    });
  }
};

// Update a specific review by ID
const updateReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        review,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Failed",
      message: err.message,
    });
  }
};

// Delete a specific review by ID
const deleteReview = async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
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
  getAllReviews,
  createReview,
  getReview,
  updateReview,
  deleteReview,
};
