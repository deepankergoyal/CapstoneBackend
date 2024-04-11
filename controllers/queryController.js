const UserQuery = require("./../models/querySchema");

// Get all user queries
const getAllUserQueries = async (req, res) => {
  try {
    const userQueries = await UserQuery.find();
    res.status(200).json({
      status: "success",
      results: userQueries.length,
      data: {
        userQueries,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Failed",
      message: err.message,
    });
  }
};

// Create a new user query
const createUserQuery = async (req, res) => {
  try {
    const newUserQuery = await UserQuery.create(req.body);
    console.log(newUserQuery);
    res.status(201).json({
      status: "success",
      data: {
        userQuery: newUserQuery,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

// Get a specific user query by ID
const getUserQuery = async (req, res) => {
  try {
    const userQuery = await UserQuery.findById(req.params.id);
    if (!userQuery) {
      res.status(404).json({
        status: "failed",
        message: "User query not found",
      });
      return;
    }
    res.status(200).json({
      status: "success",
      data: {
        userQuery,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Failed",
      message: err.message,
    });
  }
};

// Update a specific user query by ID
const updateUserQuery = async (req, res) => {
  try {
    const userQuery = await UserQuery.findByIdAndUpdate(
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
        userQuery,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Failed",
      message: err.message,
    });
  }
};

// Delete a specific user query by ID
const deleteUserQuery = async (req, res) => {
  try {
    await UserQuery.findByIdAndDelete(req.params.id);
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
  getAllUserQueries,
  createUserQuery,
  getUserQuery,
  updateUserQuery,
  deleteUserQuery,
};
