const bycrypt = require('bcrypt');
const { User } = require('../models');
const jwt = require('jsonwebtoken');


// Function to register a new user
module.exports.registerUser = async (req, res) => {
    console.log("Registering user with data:", req.body);

    const { username, email, password, role } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Hash the password before saving (use bcrypt for hashing)
        const hashedPassword = await bycrypt.hash(password, 10);
        // Set the hashed password in the request body
        req.body.password = hashedPassword;

        // Create new user
        const newUser = await User.create({ username, email, password: hashedPassword, role });
        return res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({ message: 'Internal server error' });
    }  
}

// Function to login a user
module.exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Check password (assuming passwords are stored hashed)
        const isPasswordValid = await bycrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }   
        // Generate JWT token (assuming jwt is set up)
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' } )
        // Return success response with token
        req.user = user;
        req.token = token;
        console.log("User logged in successfully:", user);
        // Send response with user details and token
        // Note: Ensure to send the token in the response headers or body as per your API
        res.setHeader('Authorization', `Bearer ${token}`);  
        // Return user details and token
        return res.status(200).json({ message: 'User logged in successfully', user, token });

    } catch (error) {
        console.error("Error logging in user:", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

// Function to get user profile
module.exports.getUserById = async (req, res) => {
    const userId = req.params.id;

    try {
        // Find user by ID
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Return user details
        return res.status(200).json({ message: 'User profile retrieved successfully', user });
    } catch (error) {
        console.error("Error retrieving user profile:", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}