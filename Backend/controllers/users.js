const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models/index.js')
const User = db.users

async function registerUser(req, res) {
  try {
    const { name, email, password, phone } = req.body;

    // Validate input
    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: 'please provide name, email, password and phone' });
    }

    if (name.length < 3) {
      return res.status(400).json({ message: 'name must be at least 3 characters long' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'please provide a valid email address' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'password must be at least 6 characters long' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'email address already in use' });
    }

    // Hash password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = await User.create({ name, email, password: hashedPassword, phone, isAdmin: false});

    // Generate JWT token
    const token = jwt.sign({ id: newUser.id }, "secret");

    // Send response with token
    res.status(201).json({ message: 'user registered successfully', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'internal server error' });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'please provide email and password' });
    }

    if (typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ message: 'email and password must be strings' });
    }

    // Check if user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'invalid email or password' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, "secret");

    // Send response with token
    res.status(200).json({ message: 'user logged in successfully', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'internal server error' })
  }
}

module.exports = {
  registerUser,
  loginUser
};

