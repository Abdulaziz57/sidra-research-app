require("dotenv").config();
const express = require("express");
const multer = require("multer");
const nodemailer = require("nodemailer");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5050;

// Middleware
app.use(cors());
app.use(express.json());

// Allowed file types and size (25MB)
const allowedExtensions = [".pdf", ".doc", ".docx"];
const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB

// Configure multer for file uploads with validation
const upload = multer({
  dest: "uploads/",
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowedExtensions.includes(ext)) {
      return cb(new Error("Only PDF, DOC, and DOCX files are allowed."));
    }
    cb(null, true);
  },
});

// Email configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
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
      to: "1rAAAesearchpmo@sidra.org",
      subject: "New Grant Application Submission",
      text: "Attached are the submitted grant application documents.",
      attachments: attachments,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Cleanup uploaded files
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
