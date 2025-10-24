import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Eye, EyeOff, LogIn, ArrowLeft, Mail, Lock } from "lucide-react";
import logo from "../assets/logo.png";

/**
 * NirmanX — Construction + Innovation/Expansion
 * Big-tech aesthetic with construction-tech visuals:
 *  - Glass card
 *  - Blueprint grid background
 *  - Floating cranes / rotating gears / blueprint shapes (SVG + Framer Motion)
 *  - Back button to Home
 *  - Input icons, loader button, shake on error
 *  - Caps Lock warning + simple password strength meter
 */

export default function Login() {
  const navigate = useNavigate();

  // Form + UI state
  const [form, setForm] = useState({ userOrEmail: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [capsOn, setCapsOn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Parallax / pointer tracking
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateCardX = useTransform(my, [-50, 50], [8, -8]);
  const rotateCardY = useTransform(mx, [-50, 50], [-8, 8]);

  function handlePointerMove(e) {
    const { innerWidth: w, innerHeight: h } = window;
    const x = (e.clientX / w) * 100;
    const y = (e.clientY / h) * 100;
    // Centered range ~[-50, 50]
    mx.set(x - 50);
    my.set(y - 50);
  }



  async function handleLogin(e) {
  e.preventDefault();
  setLoading(true);
  setError("");
  try {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userid: form.userOrEmail,  // matches backend expected field name
        password: form.password,
      }),

    });
    if (!res.ok) throw new Error("Invalid username or password");
    const data = await res.json();
    // Store token/session etc as needed
    navigate("/dashboard");
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
}


  return (
    <div
      onMouseMove={handlePointerMove}
      className="min-h-screen relative overflow-hidden bg-gray-950 p-6 flex items-center justify-center"
    >
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1220] via-[#0A1020] to-[#030712]" />
        {/* Thin blueprint grid */}
        <div className="absolute inset-0 opacity-30"
             style={{
               backgroundImage:
                 "linear-gradient(90deg, rgba(37,99,235,0.15) 1px, transparent 1px), linear-gradient(rgba(37,99,235,0.15) 1px, transparent 1px)",
               backgroundSize: "40px 40px",
             }}
        />
        {/* Bold blueprint grid (larger spacing) */}
        <div className="absolute inset-0 opacity-10"
             style={{
               backgroundImage:
                 "linear-gradient(90deg, rgba(59,130,246,0.4) 2px, transparent 2px), linear-gradient(rgba(59,130,246,0.4) 2px, transparent 2px)",
               backgroundSize: "160px 160px",
             }}
        />
      </div>

      {/* Floating Construction Shapes Layer */}
      <FloatingShapes mx={mx} my={my} />

      {/* Auth Card */}
      <motion.div
        style={{ rotateX: rotateCardX, rotateY: rotateCardY }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`relative w-full max-w-md rounded-2xl shadow-2xl p-8 
                    backdrop-blur-lg border border-white/10 bg-white/10`}
      >
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 left-4 flex items-center gap-1 text-gray-300 hover:text-white"
        >
          <ArrowLeft size={18} /> Back
        </button>

        {/* Logo + Glow Aura */}
        <div className="flex flex-col items-center mb-8 relative">
          <motion.div
            animate={{
              boxShadow: [
                "0 0 20px 6px rgba(37,99,235,0.45), 0 0 0 2px rgba(255,255,255,0.06) inset",
                "0 0 36px 10px rgba(37,99,235,0.7), 0 0 0 2px rgba(255,255,255,0.06) inset",
                "0 0 20px 6px rgba(37,99,235,0.45), 0 0 0 2px rgba(255,255,255,0.06) inset",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="rounded-full p-3 bg-white/5"
          >
            <img
              src={logo}
              alt="NirmanX Logo"
              className="w-28 h-28 object-contain drop-shadow-2xl select-none"
              draggable={false}
            />
          </motion.div>
          <p className="mt-4 text-gray-300 text-sm text-center">
            Building the Future with <span className="text-blue-400 font-medium">NirmanX</span>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className={`space-y-6 ${error ? "animate-shake" : ""}`}>
          {/* Username */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Username or Email
            </label>
            <span className="absolute left-3 top-10 text-gray-400 pointer-events-none">
              <Mail size={18} />
            </span>
            <input
              type="text"
              placeholder="you@nirmanx.com"
              value={form.userOrEmail}
              onChange={(e) => setForm({ ...form, userOrEmail: e.target.value })}
              required
              className="w-full rounded-xl border border-white/20 bg-white/10 pl-10 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Password
            </label>
            <span className="absolute left-3 top-10 text-gray-400 pointer-events-none">
              <Lock size={18} />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              onKeyUp={(e) => setCapsOn(e.getModifierState && e.getModifierState("CapsLock"))}
              required
              className="w-full rounded-xl border border-white/20 bg-white/10 pl-10 pr-12 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {/* <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button> */}
            {/* Caps Lock Warning */}
            {capsOn && (
              <p className="mt-1 text-xs text-amber-400">Caps Lock is ON</p>
            )}
          </div>

          {/* Password Strength */}
          

          {/* Error */}
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          {/* Login */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            disabled={loading}
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg transition-colors disabled:opacity-60"
          >
            {loading ? (
              <motion.div
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                aria-label="Loading"
              />
            ) : (
              <>
                <LogIn size={18} /> Login
              </>
            )}
          </motion.button>
        </form>

        {/* Footer Link */}
        <div className="mt-6 text-center">
          <a href="#" className="text-sm text-blue-400 hover:underline">
            Forgot your password?
          </a>
        </div>
      </motion.div>

      {/* Little CSS hook for the shake animation */}
      <style>{`
        .animate-shake {
          animation: shakeX .4s ease-in-out;
        }
        @keyframes shakeX {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
      `}</style>
    </div>
  );
}

/* ------------------ Floating Construction Shapes ------------------ */

function FloatingShapes({ mx, my }) {
  // Parallax transforms
  const txSlowX = useTransform(mx, [-50, 50], [-6, 6]);
  const txSlowY = useTransform(my, [-50, 50], [-6, 6]);
  const txMedX = useTransform(mx, [-50, 50], [-12, 12]);
  const txMedY = useTransform(my, [-50, 50], [-12, 12]);
  const txFastX = useTransform(mx, [-50, 50], [-20, 20]);
  const txFastY = useTransform(my, [-50, 50], [-20, 20]);

  return (
    <>
      {/* Left Crane */}
      <motion.div
        style={{ x: txSlowX, y: txSlowY }}
        className="pointer-events-none absolute -left-24 top-16 opacity-20"
      >
        <CraneSVG width={260} height={160} />
      </motion.div>

      {/* Right Crane */}
      <motion.div
        style={{ x: txMedX, y: txMedY }}
        className="pointer-events-none absolute -right-24 bottom-10 opacity-15"
      >
        <CraneSVG width={300} height={180} direction="right" />
      </motion.div>

      {/* Rotating Gears */}
      <div className="pointer-events-none">
        <RotatingGear className="absolute left-8 bottom-10 opacity-25" size={80} speed={18} />
        <RotatingGear className="absolute right-10 top-14 opacity-20" size={120} speed={28} reverse />
        <RotatingGear className="absolute right-1/3 bottom-24 opacity-15" size={60} speed={14} />
      </div>

      {/* Blueprint Circles / Guides */}
      <motion.div
        style={{ x: txFastX, y: txFastY }}
        className="pointer-events-none absolute left-1/4 top-10 opacity-15"
      >
        <BlueprintRings size={220} />
      </motion.div>
      <motion.div
        style={{ x: txFastX, y: txFastY }}
        className="pointer-events-none absolute right-1/4 bottom-8 opacity-15"
      >
        <BlueprintRings size={160} />
      </motion.div>
    </>
  );
}

function RotatingGear({ size = 100, speed = 20, reverse = false, className = "" }) {
  return (
    <motion.svg
    
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ repeat: Infinity, ease: "linear", duration: speed }}
      className={className}
    >
      {/* Gear body */}
      <circle cx="50" cy="50" r="22" stroke="#60A5FA" strokeWidth="2" fill="transparent" />
      {/* Teeth */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x1 = 50 + Math.cos(angle) * 28;
        const y1 = 50 + Math.sin(angle) * 28;
        const x2 = 50 + Math.cos(angle) * 36;
        const y2 = 50 + Math.sin(angle) * 36;
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#60A5FA" strokeWidth="2" />
        );
      })}
      {/* Inner detail */}
      <circle cx="50" cy="50" r="6" fill="#60A5FA" />
    </motion.svg>
  );
}

function BlueprintRings({ size = 200 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200">
      <circle cx="100" cy="100" r="80" stroke="#93C5FD" strokeOpacity="0.7" strokeWidth="1.5" fill="none" />
      <circle cx="100" cy="100" r="60" stroke="#60A5FA" strokeOpacity="0.5" strokeWidth="1" fill="none" />
      <circle cx="100" cy="100" r="40" stroke="#3B82F6" strokeOpacity="0.35" strokeWidth="1" fill="none" />
      <line x1="20" y1="100" x2="180" y2="100" stroke="#60A5FA" strokeOpacity="0.35" strokeWidth="1" />
      <line x1="100" y1="20" x2="100" y2="180" stroke="#60A5FA" strokeOpacity="0.35" strokeWidth="1" />
    </svg>
  );
}

function CraneSVG({ width = 260, height = 160, direction = "left" }) {
  // Simple crane silhouette
  const flip = direction === "right" ? "-1" : "1";
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 260 160"
      style={{ transform: `scaleX(${flip})` }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Base */}
      <rect x="10" y="130" width="240" height="6" fill="#3B82F6" opacity="0.7" />
      {/* Tower */}
      <rect x="60" y="60" width="8" height="70" fill="#60A5FA" />
      {/* Tower cross braces */}
      {[0, 14, 28, 42, 56].map((off, i) => (
        <line key={i} x1="60" y1={70 + off} x2="68" y2={60 + off} stroke="#60A5FA" strokeWidth="1.5" />
      ))}
      {/* Jib */}
      <line x1="64" y1="60" x2="200" y2="40" stroke="#93C5FD" strokeWidth="3" />
      {/* Trolley hook (animated) */}
      <motion.line
        x1="140"
        y1="40"
        x2="140"
        y2="90"
        stroke="#93C5FD"
        strokeWidth="2"
        animate={{ y2: [86, 96, 86] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.rect
        x="136"
        y="90"
        width="8"
        height="10"
        fill="#93C5FD"
        animate={{ y: [86, 96, 86] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Counterweight */}
      <rect x="48" y="52" width="16" height="12" fill="#60A5FA" />
      {/* Cabin */}
      <rect x="72" y="56" width="14" height="10" fill="#93C5FD" />
      {/* Support lines */}
      <line x1="64" y1="60" x2="120" y2="48" stroke="#60A5FA" strokeWidth="1.5" />
      <line x1="64" y1="60" x2="92" y2="52" stroke="#60A5FA" strokeWidth="1.5" />
    </svg>
  );
}
