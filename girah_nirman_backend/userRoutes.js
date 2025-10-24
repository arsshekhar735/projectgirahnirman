// userRoutes.js
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require('./models/User');  // Import the User model from models/User.js

const JWT_SECRET = process.env.JWT_SECRET;

const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sgensis735@gmail.com", // Your email
    pass: "qlwkmbmugltieztz",    // Your app password or real one (preferably app password)
  },
});

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendEmailOtp(to, type, otp) {
  await transporter.sendMail({
    from: `"Your App" <your_email@gmail.com>`,
    to,
    subject: `${type} OTP Verification`,
    text: `Your ${type} OTP code is: ${otp}`,
  });
}

// Registration route
router.post("/register", async (req, res) => {
  try {
    const { name, userid, phone, email, password } = req.body;
    if (!userid || !phone || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields required" });
    }
    let user = await User.findOne({ where: { userid } });
    const now = new Date();
    const userOtp = generateOtp();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    if (user) {
      if (!user.otpResendTime || now - user.otpResendTime > 15 * 60 * 1000) {
        user.otpResendTime = now;
        user.otpResendCount = 0;
      }
      if (user.otpResendCount >= 3) {
        return res.status(429).json({ success: false, message: "OTP resend limit reached. Please wait 15 minutes." });
      }
      user.userOtp = userOtp;
      user.otpExpiresAt = otpExpiresAt;
      user.otpResendCount += 1;
      await user.save();
      await sendEmailOtp(user.email, "User", userOtp);
      return res.json({ success: true, message: "New OTP sent to your email" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    user = await User.create({
      name,
      userid,
      phone,
      email,
      passwordHash,
      userOtp,
      otpExpiresAt,
      otpResendCount: 1,
      otpResendTime: now,
    });
    await sendEmailOtp(email, "User", userOtp);
    res.json({ success: true, message: "OTP sent to your email" });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// OTP verification route
router.post("/verify-otp", async (req, res) => {
  try {
    const { userid, userOtp } = req.body;
    const user = await User.findOne({ where: { userid } });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    if (user.isVerified) return res.json({ success: true, message: "Already verified" });
    if (user.otpExpiresAt < new Date()) return res.status(400).json({ success: false, message: "OTP expired" });
    if (user.userOtp !== userOtp) return res.status(400).json({ success: false, message: "Invalid OTP" });

    user.isVerified = true;
    user.userOtp = null;
    user.otpExpiresAt = null;
    user.otpResendCount = 0;
    user.otpResendTime = null;
    await user.save();
    res.json({ success: true, message: "Verified, you can login now" });
  } catch (err) {
    console.error("OTP verification error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { userid, password } = req.body;
    const user = await User.findOne({ where: { userid } });
    if (!user) return res.status(401).json({ success: false, message: "Invalid credentials" });
    if (!user.isVerified) return res.status(403).json({ success: false, message: "Not verified" });
    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(401).json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign({ userid: user.userid, name: user.name }, JWT_SECRET, { expiresIn: "2h" });
    res.json({ success: true, token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
