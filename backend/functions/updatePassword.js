const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UserSchema = require('./models/User');  // Adjust the path based on your project structure

mongoose.connect(process.env.MONGODB_URI);

exports.handler = async (event) => {
    try {
        const { oldPassword, newPassword, userId } = JSON.parse(event.body);

        if (!oldPassword || !newPassword || !userId) {
            return {
                statusCode: 400,
                body: JSON.stringify("All fields are required")
            };
        }

        const user = await UserSchema.findById(userId);
        if (!user) {
            return {
                statusCode: 404,
                body: JSON.stringify("User not found")
            };
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return {
                statusCode: 400,
                body: JSON.stringify("Old password is incorrect")
            };
        }

        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedNewPassword;
        await user.save();

        return {
            statusCode: 200,
            body: JSON.stringify("Password updated successfully")
        };
    } catch (err) {
        console.error(err);
        return {
            statusCode: 500,
            body: JSON.stringify("Error updating password")
        };
    }
};
