const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const passport = require("./passport-config.js");
const session = require("express-session");
const courseOfferingRouter = require("./routes/courseOfferingRoutes.js");
const courseRouter = require("./routes/courseRoutes.js");
const coursePurchaseRouter = require("./routes/coursePurchaseRoutes.js");
const loginRegisterRouter = require("./routes/loginRegisterRoutes.js");
const queryRouter = require("./routes/queryRoutes.js");
const userRouter = require("./routes/userRoutes.js");
const reviewRouter = require("./routes/reviewRoutes.js");
const speakerBookingRouter = require("./routes/speakerBookingRoutes.js");
const blogRouter = require("./routes/blogRoutes.js");

const app = express();

// Middlewares
app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(
  session({
    secret: "your_secret_session_key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(passport.initialize());
app.use(passport.session());
require("dotenv").config();

const DB = process.env.DATABASE;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!"))
  .catch((err) => console.error("DB connection error:", err));

// Routes
app.use("/api/course", courseRouter);
app.use("/api/courseOffering", courseOfferingRouter);
app.use("/api/coursePurchase", coursePurchaseRouter);
app.use("/api/user", userRouter);
app.use("/api/query", queryRouter);
app.use("/api/review", reviewRouter);
app.use("/api/speakerBooking", speakerBookingRouter);
app.use("/api/blog", blogRouter);
app.use("/", loginRegisterRouter);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

module.exports = app;
