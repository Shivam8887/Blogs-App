const jwt = require('jsonwebtoken');
require("dotenv").config();
exports.auth = (req, res, next) => {
    try {
        let tokenValue;
        console.log( "Data in cookies",req.cookies.token)
        if (req.cookies && req.cookies.token) {
            tokenValue = req.cookies.token;
        } else if (req.headers.cookie) {
            // Extract token manually if cookie-parser isn't used
            const token = req.headers.cookie.split('; ').find(row => row.startsWith('token='));
            tokenValue = token ? decodeURIComponent(token.split('=')[1]) : null;
        }

        if (!tokenValue) {
            console.log("Token not found in request");
            return res.status(401).json({ message: "No token provided" });
        }


        const decoded = jwt.verify(tokenValue, process.env.SECRET_KEY);
        console.log("Decoded Token:", decoded);

        req.user = decoded; // Attach decoded data to request
        next(); 

    } catch (err) {
        console.error("Token verification failed:", err.message);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
