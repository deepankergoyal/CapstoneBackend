const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./models/loginResgisterSchema");

require("dotenv").config();
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback", // Adjust the callback URL as per your setup
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if the user exists in your database based on email
        let user = await User.findOne({ email: profile.emails[0].value });

        if (!user) {
          // If the user doesn't exist, create a new user in your database
          user = await User.create({
            email: profile.emails[0].value,
            name: profile.displayName,
            // You can add more fields based on the data available in the profile object
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, false);
  }
});

module.exports = passport;
