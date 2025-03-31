require("dotenv").config();
const express = require("express");
const multer = require("multer");
const nodemailer = require("nodemailer");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Configure multer for file uploads
const upload = multer({ dest: "uploads/" });

// Email configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL, // Use environment variable for security
    pass: process.env.PASSWORD, // App password (not regular password)
  },
});

// Handle file uploads and email sending
app.post("/upload", upload.array("files"), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).send("No files uploaded.");
    }

    // Construct email with attachments
    const attachments = req.files.map((file) => ({
      filename: file.originalname,
      path: file.path,
    }));

    const mailOptions = {
      from: process.env.EMAIL,
      to: "researchpmo@sidra.org1", // Replace with the actual recipient email
      subject: "New Grant Application Submission",
      text: "Attached are the submitted grant application documents.",
      attachments: attachments,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Cleanup uploaded files after sending email
    req.files.forEach((file) => fs.unlinkSync(file.path));

    res.status(200).send("Email sent successfully with attachments.");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Error sending email.");
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
