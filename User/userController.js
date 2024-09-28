const UserSchema = require('../User/userSchema');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utilis/authutilis');
const  response  = require('express');

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log(req.body)

        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const user = new UserSchema(
            {
                name,
                email,
                password
            }
        )
        await user.save();
        
        res.status(201).send('Successfully User Registered');
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const user = await UserSchema.findOne({ email });

        if (!user ) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = generateToken(user._id, process.env.SecretKey);

        res.json({ token, message: 'Login Succesful' });
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}

