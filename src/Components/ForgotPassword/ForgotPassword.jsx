import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";

const Input = ({ id, label, type, autoComplete, value, onChange, icon, error }) => (
  <div className="mb-4 relative">
    <label htmlFor={id} className="block text-sm font-medium text-gray-200 mb-2">
      {label}
    </label>
    <div className="relative">
      <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
        {icon}
      </span>
      <input
        id={id}
        name={id}
        type={type}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        className={`w-full px-10 py-2 bg-gray-800 text-gray-100 border ${
          error ? "border-red-500" : "border-gray-600"
        } rounded-lg focus:outline-none focus:ring-2 ${
          error ? "focus:ring-red-500" : "focus:ring-blue-500"
        }`}
      />
    </div>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Email is required");
      return;
    }

    try {
      await axios.post("/.netlify/functions/forgotPassword", { email });
      setSuccess(true);
      setError("");
    } catch (err) {
        console.log(err);
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-2xl">
        <h2 className="text-center text-3xl font-bold text-white mb-2">
          Forgot Password
        </h2>
        <p className="text-center text-gray-400 mb-6">
          Enter your email to reset your password
        </p>

        {success ? (
          <div className="text-center">
            <p className="text-green-500 mb-4">
              Password reset instructions sent to your email!
            </p>
            <Link
              to="/signup"
              className="text-blue-500 hover:underline"
            >
              Back to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              id="email"
              label="Email address"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<FaEnvelope />}
              error={error}
            />
            
            <button
              type="submit"
              className="w-full py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg transition focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Reset Password
            </button>

            <div className="text-center mt-4">
              <Link
                to="/signup"
                className="text-sm text-blue-500 hover:underline"
              >
                Back to Login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}