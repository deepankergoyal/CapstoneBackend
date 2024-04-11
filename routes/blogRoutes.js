const express = require("express");
const blogController = require("./../controllers/blogController");
const loginRegisterController = require("./../controllers/loginRegisterController");

const router = express.Router();

//router.use(loginRegisterController.protect);

router
  .route("/")
  .get(blogController.getAllBlogs)
  .post(blogController.createBlog);

router
  .route("/:id")
  .get(blogController.getBlog)
  .patch(blogController.updateBlog)
  .delete(blogController.deleteBlog);

module.exports = router;
