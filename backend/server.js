const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const discordRoutes = require('./routes/discordRoutes');

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

connectDB();

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/discord', discordRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

