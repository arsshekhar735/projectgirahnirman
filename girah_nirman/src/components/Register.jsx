import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, User, Mail, Phone, Lock, CheckCircle } from "lucide-react";
import logo from "../assets/logo.png"; // NirmanX logo

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", username: "", phone: "", password: "" });
  const [step, setStep] = useState("form"); // "form", "otp", "success"
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const API_BASE_URL = "http://localhost:5000"; // Adjust if different

  async function handleRegister(e) {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          userid: form.username, // userid field expected by backend
          phone: form.phone,
          email: form.email,
          password: form.password,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to register");
      }

      setStep("otp"); // Proceed to OTP verification step on success
    } catch (err) {
      alert(err.message);
    }
  }

  async function handleVerify(e) {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/api/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userid: form.username, userOtp: otp }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "OTP verification failed");
      }
      setStep("success");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      alert(err.message);
    }
  }

  function handleResendOtp() {
    alert("OTP resent!");
    // You can add API call here to trigger resend OTP if implemented
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden font-[Inter]">
      {/* Floating shapes (cranes, gears, blueprint grids) */}
      <motion.div
        className="absolute w-40 h-40 border-4 border-yellow-400 rounded-full opacity-20"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ top: "10%", left: "5%" }}
      />
      <motion.div
        className="absolute w-60 h-60 border-2 border-blue-400 rounded-lg opacity-15"
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        style={{ bottom: "10%", right: "10%" }}
      />
      <motion.div
        className="absolute text-6xl opacity-10"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        style={{ top: "20%", right: "25%" }}
      >
        🏗️
      </motion.div>
      <motion.div
        className="absolute text-5xl opacity-10"
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        style={{ bottom: "20%", left: "15%" }}
      >
        ⚙️
      </motion.div>

      {/* Card */}
      <motion.div
        className="relative w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-lg shadow-2xl border border-white/20"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <motion.img
            src={logo}
            alt="NirmanX"
            className="w-20 h-20 rounded-full shadow-lg"
            whileHover={{ scale: 1.1 }}
          />
        </div>

        {step === "form" && (
          <>
            <h2 className="text-2xl font-bold text-white text-center mb-6">Create your NirmanX Account</h2>
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full pl-10 p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-400 outline-none"
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="w-full pl-10 p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-400 outline-none"
                />
              </div>
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Username"
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  required
                  className="w-full pl-10 p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-400 outline-none"
                />
              </div>
              <div className="relative">
                <Phone className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  required
                  className="w-full pl-10 p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-400 outline-none"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                  className="w-full pl-10 pr-10 p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-400 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-yellow-400"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-yellow-400 text-black font-semibold hover:bg-yellow-500 transition"
              >
                Register
              </button>
            </form>
          </>
        )}

        {step === "otp" && (
          <>
            <h2 className="text-xl font-bold text-white text-center mb-4">Verify OTP</h2>
            <form onSubmit={handleVerify} className="space-y-4">
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-400 outline-none"
              />
              <div className="flex gap-3 justify-between">
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="flex-1 py-3 rounded-xl bg-gray-600 text-white hover:bg-gray-500 transition"
                >
                  Resend OTP
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-yellow-400 text-black font-semibold hover:bg-yellow-500 transition"
                >
                  Verify
                </button>
              </div>
            </form>
          </>
        )}

        {step === "success" && (
          <motion.div
            className="flex flex-col items-center justify-center text-center text-white"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <CheckCircle size={60} className="text-green-400 mb-4" />
            <h2 className="text-2xl font-bold">Registration Successful!</h2>
            <p className="text-gray-300 mt-2">Redirecting to Login...</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
