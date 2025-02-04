import React, { useState } from "react";
import "./SignUp.css";
import { FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import login from "../../assets/signup/login.png";
import register from "../../assets/signup/register.png";
import axios from "axios";

const Input = ({ id, label, type, autoComplete, value, onChange, icon, error }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
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
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          autoComplete={autoComplete}
          value={value}
          onChange={onChange}
          className={`w-full px-10 py-2 bg-gray-800 text-gray-100 border ${
            error ? "border-red-500" : "border-gray-600"
          } rounded-lg focus:outline-none focus:ring-2 ${
            error ? "focus:ring-red-500" : "focus:ring-blue-500"
          }`}
        />
        {type === 'password' && (
          <button
            type="button"
            className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-200"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};
export default function SignUp() {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!isLoginForm && (!formData.username || formData.username.length < 3 || formData.username.length > 20)) {
      newErrors.username = "Username must be between 3 and 20 characters.";
    }
    if ((!formData.email || formData.email.length > 50)&&!isLoginForm) {
      newErrors.email = "Email is required and must not exceed 50 characters.";
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    if(!isLoginForm && !formData.username.match(/^[a-zA-Z0-9_]+$/)) {
      newErrors.username = "Username must contain only letters, numbers, and underscores.";
  }
  if(!isLoginForm && !formData.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) { 
      newErrors.email = "Invalid email address.";
  }
  if(!isLoginForm && !formData.password.match(/^[a-zA-Z0-9!@#$%^&*]{6,}$/)) {
      newErrors.password = "Password must contain only letters, numbers, and special characters.";
  }
  if(!isLoginForm && !formData.password.match(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9].*[0-9].*[0-9]).{6,}$/)) {
      newErrors.password = "Password must contain at least one uppercase letter, one special character, and three numbers.";
  }


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleToggleForm = () => {
    setIsLoginForm((prev) => !prev);
    setFormData({
      username: "",
      email: "",
      password: ""
      
    });
    setErrors({});
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post("/api/register", formData);
      // console.log(response.data);
      setIsLoginForm(true);
      setFormData({
        username: "",
        email: "",
        password: "",
      });
    } catch (err) {
      if (err.response && err.response.status === 400) {
          const serverError = err.response.data.error;
          if (serverError.includes("username")) {
              setErrors((prevErrors) => ({
                  ...prevErrors,
                  username: "This username is already taken.",
              }));
          } else if (serverError.includes("email")) {
              setErrors((prevErrors) => ({
                  ...prevErrors,
                  email: "This email is already registered.",
              }));
          }
         

      } else {
          console.error("Error during registration:", err);
          alert("Something went wrong. Please try again later.");
      }
  }
};

const handleLogin = async (e) => {
  console.log("Login Form Data:", formData);
  e.preventDefault();
  if (!validateForm()) return;

  try {
    const response = await axios.post("/api/login", formData);
    console.log("Login Response:", response.data);
    localStorage.setItem("user", JSON.stringify(response.data));

    // Verify localStorage data
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("Stored User Data:", user);

    if (user) {
      window.location.href = "/";
    } else {
      console.error("User data not found in localStorage.");
    }
  } catch (err) {
    if(err.response && err.response.status === 400) {
      setErrors({ ...errors, username: "Invalid username or password.", password: "Invalid username or password." });
  } else {
    console.log("Error during login:", err);
  }
  }
};

  

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">

      <div
        className={`flip-container perspective mt-14 ml-[20%] ${
          isLoginForm ? "" : "flipped"
        }`}
      >
        
        <div className="flipper relative w-[90%] max-w-4xl h-[650px] bg-gray-800 rounded-lg shadow-2xl">
          
<div className="front flex w-full h-full group relative">
  <div className="absolute inset-0 border-gray-700 rounded-lg transition-opacity duration-500 opacity-100 group-hover:opacity-100 pointer-events-none">
  <span className="absolute inset-x-0 top-0 h-[1px] bg-gray-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
  <span className="absolute inset-y-0 right-0 w-[1px] bg-gray-600 scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top"></span>
  <span className="absolute inset-x-0 bottom-0 h-[1px] bg-gray-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right"></span>
  <span className="absolute inset-y-0 left-0 w-[1px] bg-gray-600 scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom"></span>
</div>

  {/* Image Section */}
  <div className="flex w-1/2 items-center justify-center bg-gradient-to-l to-gray-900 from-slate-900
   rounded-l-lg">
 <div className="image-section">
                <img
                  src={login}
                  alt="Login"
                  className="w-[80%] h-auto rounded-lg"
                />
              </div> 
               </div>

  {/* Form Section */}
  <div className="w-1/2 flex flex-col justify-center px-8 bg-gray-800 rounded-r-lg">
    <h2 className="text-center text-3xl font-bold text-white mb-2">Login</h2>
    <p className="text-center text-gray-400 mb-6">
      Welcome back! Please log in to your account.
    </p>
    <form className="space-y-6" method="POST">
      <Input
        id="username"
        label="Username"
        type="text"
        autoComplete="username"
        value={formData.username}
        onChange={handleChange}
        icon={<FaUser />}
        error={errors.username}
      />

      <Input
        id="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        value={formData.password}
        onChange={handleChange}
        icon={<FaLock />}
        error={errors.password}
      />
      <button className="w-full py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg transition focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={handleLogin}>
        Login
      </button>
    </form>
    <p className="text-center text-sm text-gray-400 mt-4">
      Forgot your password?{" "}
      <a href="/forgotpassword" className="text-blue-500 hover:underline">
        Click here
      </a>
    </p>
    <div className="flex items-center justify-center mt-4">
      <p className="text-sm text-gray-400">Don't have an account?</p>
      <button
        type="button"
        onClick={handleToggleForm}
        className="ml-2 text-sm text-blue-600 hover:underline"
      >
        Register here
      </button>
    </div>
  </div>
</div>

          <div className="back flex w-full h-full group relative">
          <div className="absolute inset-0 border-gray-700 rounded-lg transition-opacity duration-500 opacity-100 group-hover:opacity-100 pointer-events-none">
  <span className="absolute inset-x-0 top-0 h-[1px] bg-gray-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
  <span className="absolute inset-y-0 right-0 w-[1px] bg-gray-600 scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top"></span>
  <span className="absolute inset-x-0 bottom-0 h-[1px] bg-gray-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right"></span>
  <span className="absolute inset-y-0 left-0 w-[1px] bg-gray-600 scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom"></span>
</div>
            {/* Left Section */}
            <div className="w-1/2 flex flex-col justify-center px-8 bg-gray-800 rounded-l-lg">
              <h2 className="text-center text-3xl font-bold text-white mb-2">
                Register
              </h2>
              <p className="text-center text-gray-400 mb-6">
                Join us today and explore amazing models!
              </p>
              <form className="space-y-6" method="POST">
                <Input
                  id="username"
                  label="Username"
                  type="text"
                  autoComplete="username"
                  value={formData.username}
                  onChange={handleChange}
                  icon={<FaUser />}
                  error={errors.username}
                />
                <Input
                  id="email"
                  label="Email address"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  icon={<FaEnvelope />}
                  error={errors.email}
                />
                <Input
                  id="password"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  icon={<FaLock />}
                  error={errors.password}
                />
                <button className="w-full py-3 text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-lg transition focus:outline-none focus:ring-2 focus:ring-green-500" onClick={handleRegister}>
                  Register
                </button>
              </form>

              <div className="flex items-center justify-center mt-4">
              <p className="text-sm text-gray-400">Already have an account?</p>
              <button
                type="button"
                onClick={handleToggleForm}
                className="ml-2 text-sm text-green-500 hover:underline"
              >
                Login here
              </button>
              
              </div>
            </div>

            {/* Right Section */}
            <div className="w-1/2 flex items-center justify-center bg-gradient-to-l to-gray-900 from-slate-900 rounded-r-lg">

              <div className="image-section">
                <img
                  src={register}
                  alt="Register"
                  className="w-[80%] h-auto rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
