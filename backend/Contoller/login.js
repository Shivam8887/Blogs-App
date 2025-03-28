const User = require('../Models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config(); 

exports.login = async (req, res) => {
    try {
        const { email, password} = req.body;
        const user = await User.findOne({email});

        if (!user) {
            return res.status(401).json({ message: "Email not registered" });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: "Wrong Password" });
        }

        const payload = { email, name: user.name };
        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000, 
        });
        
        return res.status(200).json({ message: "Login successful" });
        

    } catch (err) {
        console.error("Error in Verification", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
