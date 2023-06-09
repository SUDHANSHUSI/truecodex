const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const { username, password, first_name, last_name } = req.body;

    // Check if the username already exists
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      username,
      password: hashedPassword,
      first_name,
      last_name,
    });

    // Generate a token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);

    res.json({
      user_id: newUser._id,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to signup" });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    // console.log(user);

    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.json({
      user_id: user._id,
      username: user.username,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "failed to login" });
  }
};
