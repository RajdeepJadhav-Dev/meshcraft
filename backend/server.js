const UserSchema = require('./models/user');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const bcrypt = require('bcrypt');
const multer = require('multer');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const axios = require('axios');

dotenv.config();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL|| 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true, 
}));
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connection established!'))
.catch(err => console.log(err))

app.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new UserSchema({
            username,
            email,
            password: hashedPassword,
            profilePicture: "",
        });
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        if (err.code === 11000) {
            // Handle duplicate key error
            const field = Object.keys(err.keyValue)[0]; // Get the duplicate field
            return res.status(400).json({ error: `${field} already exists` });
        }
        console.error("Error during registration:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        app.post('/login', async (req, res) => {
            console.log("Login Request Body:", req.body);  // Debugging line
            // Your existing login logic
        });
        const user = await UserSchema
            .findOne({ username });
        if (!user) {
            return res.status(400).json("User not found");
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json("Wrong password");
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}
);

// Update username endpoint
app.put('/update-username', async (req, res) => {
    try {
        const { username, userId } = req.body;

        if (!username || !userId) {
            return res.status(400).json("Username and User ID are required");
        }

        const updatedUser = await UserSchema.findByIdAndUpdate(
            userId,
            { username },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json("User not found");
        }

        res.status(200).json({
            message: "Username updated successfully",
            user: updatedUser,
        });
    } catch (err) {
        res.status(500).json("Error updating username");
    }
});


// Update password endpoint
app.put('/update-password', async (req, res) => {
    try {
        const { oldPassword, newPassword, userId } = req.body;

        if (!oldPassword || !newPassword || !userId) {
            return res.status(400).json("All fields are required");
        }

        const user = await UserSchema.findById(userId);

        if (!user) {
            return res.status(404).json("User not found");
        }


        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedNewPassword;
        await user.save();

        res.status(200).json("Password updated successfully");
    } catch (err) {
        res.status(500).json("Error updating password");
    }
});


const upload = multer({ storage: multer.memoryStorage() }); // Store files in memory

app.put('/update-profile-picture', upload.single('profilePicture'), async (req, res) => {
    try {
        const { userId } = req.body;


        if (!userId) {
            return res.status(400).json("User ID is required");
        }

        if (!req.file) {
            return res.status(400).json("Image file is required");
        }

        const base64Image = req.file.buffer.toString('base64');

        const updatedUser = await UserSchema.findByIdAndUpdate(
            userId,
            { profilePicture: `data:${req.file.mimetype};base64,${base64Image}` },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json("User not found");
        }

        res.status(200).json({
            message: "Profile picture updated successfully",
            user: updatedUser,
        });
    } catch (err) {
        console.error("Error:", err);  // Added debug line
        res.status(500).json("Error updating profile picture");
    }
});

app.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;

        // Find the user by email
        const user = await UserSchema.findOne({ email });
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Generate reset token and hash it
        const resetToken = crypto.randomBytes(20).toString('hex');
        const hash = await bcrypt.hash(resetToken, 10);

        // Update the user's reset token and expiry in the database
        user.resetPasswordToken = hash;
        user.resetPasswordExpires = Date.now() + 3600000; 
        await user.save();

        // Define reset URL and email content
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
        const resetUrl = `${frontendUrl}/reset-password/${user._id}/${resetToken}`;
        const htmlContent = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2 style="color: #333;">Password Reset Request</h2>
                <p>Hi ${user.username || 'User'},</p>
                <p>You requested to reset your password. Click the link below to reset it:</p>
                <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; margin: 10px 0; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">Reset Password</a>
                <p>If you did not request a password reset, please ignore this email.</p>
            </div>
        `;

        // Send the email using nodemailer with app password
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, 
            auth: {
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_APP_PASSWORD, 
            },
        });

        const mailOptions = {
            from: `"Meshcraft" <${process.env.EMAIL_USER}>`,
            to: user.email,
            subject: 'Password Reset',
            html: htmlContent,
        };

        await transporter.sendMail(mailOptions);

        res.send('Password reset email sent.');
    } catch (error) {
        console.error('Error during forgot-password:', error);
        
        res.status(500).send('An error occurred while processing your request.');
    }
});

app.post('/reset-password', async (req, res) => {
    try {
        const { userId, token, newPassword } = req.body;

        if (!userId || !token || !newPassword) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const user = await UserSchema.findById(userId);
        
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (user.resetPasswordExpires < Date.now()) {
            return res.status(400).json({ error: "Reset token has expired" });
        }
        const isSamePassword = await bcrypt.compare(newPassword, user.password);
if (isSamePassword) {
    return res.status(400).json({ error: "New password cannot be the same as the old password" });
}



        const validToken = await bcrypt.compare(token, user.resetPasswordToken);
        
        if (!validToken) {
            return res.status(400).json({ error: "Invalid token" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedNewPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        
        await user.save();

        res.status(200).json({ message: "Password reset successfully" });

    } catch (err) {
        console.error('Error during reset-password:', err);
        res.status(500).json({ error: "An error occurred while resetting the password" });
    }
});


app.get("/auth/discord", (req, res) => {
    const userId = req.query.userId;
    const discordAuthURL = `https://discord.com/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(
        process.env.DISCORD_REDIRECT_URI
    )}&response_type=code&scope=identify&state=${userId}`;
    res.redirect(discordAuthURL);
  });

  app.get("/auth/discord/callback", async (req, res) => {
    const { code,state } = req.query;
  
    if (!code) {
      return res.status(400).send("No code provided");
    }
  
    try {
      // Exchange code for an access token
      const tokenResponse = await axios.post(
        "https://discord.com/api/oauth2/token",
        new URLSearchParams({
          client_id: process.env.DISCORD_CLIENT_ID,
          client_secret: process.env.DISCORD_CLIENT_SECRET,
          grant_type: "authorization_code",
          code,
          redirect_uri: process.env.DISCORD_REDIRECT_URI,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
  
      const { access_token } = tokenResponse.data;
  
      // Use the access token to get user info
      const userResponse = await axios.get("https://discord.com/api/users/@me", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
  
      const discordUser = userResponse.data;
      const avatarUrl = `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`;

  
      // Update the user's Discord ID in the database
      const userId = state;
      const user = await UserSchema.findByIdAndUpdate(
        userId,
        {
            discordId: discordUser.id,
            discordUsername: `${discordUser.username}`,
            discordAvatar: avatarUrl,
          },        
          { new: true }
      );
      if(!user){
        return res.status(404).json({ error: "User not found" });
        }
  
        res.redirect(
            `${process.env.FRONTEND_URL || 'http://localhost:3000'}/profile?userId=${userId}&discordId=${discordUser.id}&discordUsername=${encodeURIComponent(discordUser.username)}&discordAvatar=${encodeURIComponent(avatarUrl)}&discordConnected=true`
          );
          
    } catch (error) {
      console.error("Error connecting Discord:", error);
      res.status(500).send("Failed to connect Discord");
    }
  });








app.listen(PORT, () => console.log(`Server running on port ${PORT}`));