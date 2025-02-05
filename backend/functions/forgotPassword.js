const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const UserSchema = require('../models/user');
const connectDB = require('../utils/db');

exports.handler = async (event) => {
    await connectDB();
    try {
        const { email } = JSON.parse(event.body);

        const user = await UserSchema.findOne({ email });
        if (!user) {
            return {
                statusCode: 404,
                body: JSON.stringify('User not found')
            };
        }

        const resetToken = crypto.randomBytes(20).toString('hex');
        const hash = await bcrypt.hash(resetToken, 10);

        user.resetPasswordToken = hash;
        user.resetPasswordExpires = Date.now() + 3600000;
        await user.save();

        const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${user._id}/${resetToken}`;

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
            html: `
                <h2>Password Reset Request</h2>
                <p>Click <a href="${resetUrl}">here</a> to reset your password.</p>
            `
        };

        await transporter.sendMail(mailOptions);

        return {
            statusCode: 200,
            body: JSON.stringify('Password reset email sent.')
        };
    } catch (error) {
        console.error('Error during forgot-password:', error);
        return {
            statusCode: 500,
            body: JSON.stringify('An error occurred while processing your request.')
        };
    }
};
