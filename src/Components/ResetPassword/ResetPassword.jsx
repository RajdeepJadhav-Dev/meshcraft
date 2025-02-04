import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const Input = ({ id, label, type, value, onChange, error }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-gray-200 mb-2">
      {label}
    </label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-2 bg-gray-800 text-gray-100 border ${
        error ? "border-red-500" : "border-gray-600"
      } rounded-lg focus:outline-none focus:ring-2 ${
        error ? "focus:ring-red-500" : "focus:ring-blue-500"
      }`}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

export default function ResetPassword() {
  const { userId, token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!newPassword.match(/^[a-zA-Z0-9!@#$%^&*]{6,}$/)) {
      newErrors.newPassword = "Password must contain only letters, numbers, and special characters.";
    }
    if (!newPassword.match(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9].*[0-9].*[0-9]).{6,}$/)) {
      newErrors.newPassword =
      "Password must contain at least one uppercase letter, one special character, and three numbers.";
    }
    if (!newPassword || newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters.";
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    }
    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await axios.post(`/api/reset-password`, {
        userId,
        token,
        newPassword,
      });
      setSuccess(true);
      setErrors({});
    } catch (err) {
      if (err.response?.status === 401) {
        setErrors({ newPassword: "Invalid or expired token." });
      } else {
        setErrors({
          newPassword: err.response?.data?.error || "Something went wrong. Please try again later.",
        });
      }
    }
  };

  return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-2xl">
          <h2 className="text-center text-3xl font-bold text-white mb-2">
            Reset Password
          </h2>
  
          {success ? (
            <div className="text-center">
              <p className="text-green-500 mb-4">Password reset successfully!</p>
              <Link to="/signup" className="text-blue-500 hover:underline">
                Back to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                id="newPassword"
                label="New Password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                error={errors.newPassword}
              />
              <Input
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={errors.confirmPassword}
              />
  
              <button
                type="submit"
                className="w-full py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg transition focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Reset Password
              </button>
            </form>
          )}
        </div>
      </div>

    );
}