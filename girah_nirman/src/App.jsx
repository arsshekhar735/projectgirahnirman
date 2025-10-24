import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import AdminAuth from "./pages/AdminAuth";
import ProtectedRoute from "./components/ProtectedRoute";
import Calculator from "./pages/Calculator";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./dashboard/Dashboard";

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/calculator" element={<Calculator />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Auth Routes */}
      <Route
        path="/admin-auth"
        element={<AdminAuth onAuthSuccess={() => (window.location.href = "/admin")} />}
      />

      {/* Protected Admin Route */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute tokenKey="adminToken" redirectTo="/admin-auth">
            <Admin />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
