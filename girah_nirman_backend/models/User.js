// models/User.js
const { DataTypes } = require("sequelize");
const sequelize = require("../db"); // Adjust path as needed

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
  },
  userid: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  passwordHash: {
    type: DataTypes.STRING,
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  userOtp: {
    type: DataTypes.STRING,
  },
  otpExpiresAt: {
    type: DataTypes.DATE,
  },
  otpResendCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  otpResendTime: {
    type: DataTypes.DATE,
  },
});

module.exports = User;
