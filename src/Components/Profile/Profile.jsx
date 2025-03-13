import React, { useState, useEffect } from "react";
import { FaDiscord } from "react-icons/fa";
import pfp from "../../assets/profile/pfp.jpeg";

const Input = ({ id, label, type, value, onChange, icon, error }) => (
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
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-2 bg-gray-800 text-gray-100 border ${
          error ? "border-red-500" : "border-gray-600"
        } rounded-lg focus:outline-none focus:ring-2 ${
          error ? "focus:ring-red-500" : "focus:ring-blue-500"
        }`}
      />
    </div>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [username, setUsername] = useState("");
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [discordUsername, setDiscordUsername] = useState("");
  const [discordAvatar, setDiscordAvatar] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const queryParams = new URLSearchParams(location.search);
    const discordConnected = queryParams.get("discordConnected");
    const discordId = queryParams.get("discordId");
    const discordUsername = queryParams.get("discordUsername");
    const discordAvatar = queryParams.get("discordAvatar");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setUsername(parsedUser.username);

      if (parsedUser.discordId) {
        setDiscordUsername(parsedUser.discordUsername);
        setDiscordAvatar(parsedUser.discordAvatar);
      }

      if (discordConnected) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...parsedUser,
            discordId,
            discordAvatar,
            discordUsername,
          })
        );

        setDiscordUsername(discordUsername);
        setDiscordAvatar(discordAvatar);
        window.location.href = "/profile";
      }
    } else {
      window.location.href = "/signup";
    }
  }, []);

  const validateUsername = () => {
    if (!username || username.length < 3 || username.length > 20) {
      return "Username must be between 3 and 20 characters.";
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return "Username can only contain letters, numbers, and underscores.";
    }
    return "";
  };

  const validatePassword = () => {
    if(!password.match(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9].*[0-9].*[0-9]).{6,}$/)) {
      return "Password must contain at least one uppercase letter, one special character, and three numbers.";
    }
    if (!password || password.length < 6) {
      return "Password must be at least 6 characters.";
    }
    if (!confirmPassword) {
      return "Please confirm your password.";
    }

    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }
    return "";
  };

  const handleSaveUsername = async () => {
    const usernameError = validateUsername();
    if (usernameError) {
      setErrors((prev) => ({ ...prev, username: usernameError }));
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch("/.netlify/functions/updateUsername", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id, username }),
      });

      const data = await response.json();
      if (response.ok) {
        setUser((prev) => ({ ...prev, username: data.user.username }));
        localStorage.setItem("user", JSON.stringify(data.user));
        setIsEditingUsername(false);
        setErrors((prev) => ({ ...prev, username: "" }));
      } else {
        setErrors((prev) => ({ ...prev, username: data.message || "Failed to update username." }));
      }
    } catch (err) {
      console.error("Error updating username:", err);
      setErrors((prev) => ({ ...prev, username: "An error occurred. Please try again later." }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSavePassword = async () => {
    const passwordError = validatePassword();
    if (passwordError) {
      setErrors((prev) => ({ ...prev, password: passwordError }));
      return;
    }



    try {
        setIsLoading(true);
        const response = await fetch("/.netlify/functions/updatePassword", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: user._id, 
                oldPassword: user.password, 
                newPassword: password, 
            }),
        });

        const data = await response.json();

        if (response.ok) {
            setIsEditingPassword(false);
            setPassword("");
            setConfirmPassword("");
            setErrors((prev) => ({ ...prev, password: "" }));
        } else {

            setErrors((prev) => ({ ...prev, password: data.message || "Failed to update password." }));
        }
    } catch (err) {
        console.error("Error updating password:", err);
        setErrors((prev) => ({ ...prev, password: "An error occurred. Please try again later." }));
    } finally {
        setIsLoading(false);
    }
};

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profilePicture", file);
      formData.append("userId", user._id);

      try {
        const response = await fetch("/.netlify/functions/updateProfilePicture", {
          method: "PUT",
          body: formData,
        });

        const data = await response.json();

        if (response.ok) {
          setUser((prevUser) => ({
            ...prevUser,
            profilePicture: data.user.profilePicture,
          }));
          localStorage.setItem("user", JSON.stringify(data.user));
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Error updating profile picture:", error);
      }
    }
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
  <div className="mt-12 w-full sm:w-[80%] md:w-[60%] lg:w-[50%] xl:w-[40%] max-w-4xl bg-gray-800 shadow-lg rounded-lg p-4 sm:p-6 lg:p-8">
    <div className="mb-6 text-center">
      <div className="relative inline-block">
        <img
          src={user?.profilePicture || pfp}
          alt="Profile"
          className="w-24 h-24 sm:w-28 sm:h-28 lg:w-36 lg:h-36 rounded-full object-cover border-gray-700 border-4"
        />
        <label
          htmlFor="profilePictureInput"
          className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-1 sm:p-2 cursor-pointer hover:bg-blue-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15.232 5H21a2 2 0 012 2v12a2 2 0 01-2 2H3a2 2 0 01-2-2V7a2 2 0 012-2h5.768M16 3l-4 4m0 0l-4-4m4 4V15"
            />
          </svg>
        </label>
        <input
          id="profilePictureInput"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleProfilePictureChange}
        />
      </div>
      <div className="mt-4">
        <h2 className="text-xs sm:text-sm font-semibold text-gray-400">Email</h2>
        <p className="text-base sm:text-lg text-gray-300">{user?.email}</p>
      </div>
    </div>

    <div className="mb-6 lg:mb-8">
      <h2 className="text-base sm:text-lg font-semibold text-gray-200 mb-2 lg:mb-4">Username</h2>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center">
        {isEditingUsername ? (
          <>
            <div className="w-full">
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={errors.username}
              />
            </div>
            <div className="flex gap-2 mt-2 sm:mt-0">
              <button
                onClick={handleSaveUsername}
                className="bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600 text-sm sm:text-base"
                disabled={isLoading}
              >
                Save
              </button>
              <button
                onClick={() => {
                  setIsEditingUsername(false);
                  setErrors((prev) => ({ ...prev, username: "" }));
                }}
                className="bg-red-500 text-white rounded-lg px-4 py-2 hover:bg-red-600 text-sm sm:text-base"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <input
              type="text"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 cursor-not-allowed text-gray-300"
              value={username}
              readOnly
            />
            <button
              onClick={() => setIsEditingUsername(true)}
              className="mt-2 sm:mt-0 bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 text-sm sm:text-base"
            >
              Change
            </button>
          </>
        )}
      </div>
    </div>

    <div className="mb-6 lg:mb-8">
      <h2 className="text-base sm:text-lg font-semibold text-gray-200 mb-2 lg:mb-4">Password</h2>
      <div className="flex flex-col gap-2 lg:gap-4">
        {isEditingPassword ? (
          <>
            <Input
              type="password"
              label="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
            />
            <Input
              type="password"
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={errors.password}
            />
            <div className="flex gap-2 sm:gap-4">
              <button
                onClick={handleSavePassword}
                className="bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600 text-sm sm:text-base"
                disabled={isLoading}
              >
                Save
              </button>
              <button
                onClick={() => {
                  setIsEditingPassword(false);
                  setPassword("");
                  setConfirmPassword("");
                  setErrors((prev) => ({ ...prev, password: "" }));
                }}
                className="bg-red-500 text-white rounded-lg px-4 py-2 hover:bg-red-600 text-sm sm:text-base"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <input
              type="password"
              placeholder="********"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 focus:outline-none cursor-not-allowed"
              readOnly
            />
            <button
              onClick={() => setIsEditingPassword(true)}
              className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 text-base"
            >
              Change
            </button>
          </>
        )}
      </div>
    </div>

    <div>
      <h2 className="text-base sm:text-lg font-semibold text-gray-200 mb-2 lg:mb-4">Discord</h2>
      {user?.discordId ? (
        <div className="flex items-center gap-4">
          {discordAvatar && (
            <img
              src={discordAvatar}
              alt="Discord Avatar"
              className="w-10 h-10 rounded-full"
            />
          )}
          <p className="text-gray-100 text-base">{discordUsername}</p>
        </div>
      ) : (
        <button
          onClick={() => {
            const userId = user?._id;
            window.location.href = `/.netlify/functions/auth-discord?userId=${userId}`;
          }}
          className="bg-blue-600 text-white rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-blue-700 text-base"
        >
          <FaDiscord className="w-5 h-5" />
          Connect Discord
        </button>
      )}
    </div>
  </div>
</div>
  );
};

export default Profile;
