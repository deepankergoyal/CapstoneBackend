const User = require("./../models/loginResgisterSchema");

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Failed",
      message: err.message,
    });
  }
};

// Create a new user
const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

// Get a specific user by ID
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({
        status: "failed",
        message: "User not found",
      });
      return;
    }
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Failed",
      message: err.message,
    });
  }
};

// Update a specific user by ID
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Failed",
      message: err.message,
    });
  }
};

// Delete a specific user by ID
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
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

const currentUser = async (req, res, next) => {
  try {
    const userId = req.user._id;

    // Fetch the current user from the database using the user ID
    const user = await User.findById(userId);

    // Check if the user exists
    if (!user) {
      return next(new AppError("User not found.", 404));
    }

    // Return the current user information
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    // Handle any errors
    console.error("Error fetching current user:", error);
    next(new AppError("Internal server error", 500));
  }
};

module.exports = {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  currentUser,
};
