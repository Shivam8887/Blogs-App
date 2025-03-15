require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const { dbConnect } = require('./Configs/database');

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors({
    origin: "http://localhost:5173", // Frontend URL
    credentials: true, // Allows cookies to be sent & stored
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Database Connection
dbConnect();

// Routes
const routes = require('./Routes/routes');
app.use('/', routes);

// Start Server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
