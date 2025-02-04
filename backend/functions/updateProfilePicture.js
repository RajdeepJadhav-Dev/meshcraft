const mongoose = require('mongoose');
const UserSchema = require('../models/user');  // Adjust path accordingly

mongoose.connect(process.env.MONGODB_URI);

exports.handler = async (event) => {
    try {
        const { userId, imageBase64, mimeType } = JSON.parse(event.body);

        if (!userId || !imageBase64 || !mimeType) {
            return {
                statusCode: 400,
                body: JSON.stringify("User ID, image, and MIME type are required")
            };
        }

        const base64Image = `data:${mimeType};base64,${imageBase64}`;

        const updatedUser = await UserSchema.findByIdAndUpdate(
            userId,
            { profilePicture: base64Image },
            { new: true }
        );

        if (!updatedUser) {
            return {
                statusCode: 404,
                body: JSON.stringify("User not found")
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Profile picture updated successfully",
                user: updatedUser
            })
        };
    } catch (err) {
        console.error("Error:", err);
        return {
            statusCode: 500,
            body: JSON.stringify("Error updating profile picture")
        };
    }
};
