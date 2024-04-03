const express = require("express");
const sgMail = require("@sendgrid/mail");

const app = express();
require("dotenv").config();

// Set up SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Define root route to send email
app.get("/", (req, res) => {
  const msg = {
    to: "deepankergoyal1999@gmail.com", // Change to your recipient
    from: "deepankergoyal1@gmail.com", // Change to your verified sender
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };

  console.log(process.env.SENDGRID_API_KEY);
  console.log(msg);
  // Send email
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
      res.status(200).send("Email sent successfully");
    })
    .catch((error) => {
      console.error("Error sending email:", error);
      res.status(500).send("Failed to send email");
    });
});

// Define port
const port = process.env.PORT || 3000;

// Start server
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
