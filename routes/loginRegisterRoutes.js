const express = require("express");
const loginRegisterController = require("./../controllers/loginRegisterController");
const passport = require("passport");
const router = express.Router();
const cors = require("cors");
// Handle Google OAuth authentication
router.get(
  "/auth/google",
  cors(),
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/auth/google/callback",
  cors(),
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/auth/google/success",
    failureRedirect: "/auth/google/failure",
  })
);
+router.get("/auth/google/success", loginRegisterController.signupGoogleUser);

router.get("/auth/google/failure", (req, res) => {
  res.status(401).send("Google authentication failed.");
});

// Define routes using the imported controller functions
router.post("/loginRegister/signup", loginRegisterController.signup);
router.post("/loginRegister/login", loginRegisterController.login);
router.post("/loginRegister/forgot", loginRegisterController.forgotPassword);
router.post("/loginRegister/newsletter", loginRegisterController.newsletter);
router.post(
  "/loginRegister/resetPassword",
  loginRegisterController.resetPassword
);

module.exports = router;
