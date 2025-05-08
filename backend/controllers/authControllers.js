const User = require('../models/User');


const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { name, email, password, devices } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, devices });
    await user.save();
    res.status(201).json({ message: 'Registered successfully' });
  } catch (error) {
    // res.status(500).json({ error: err.message });
    console.error(" Registration Error:", error); // <-- this logs the cause
    res.status(500).json({ error: error.message }); // this sends readable info to frontend
  
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000
    });

    res.json({ message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// exports.getUser = async (req, res) => {
//   try {
//     const token = req.cookies.token;
//     if (!token) return res.status(401).json({ error: 'Unauthorized' });

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.userId);
//     res.json(user);
//   } catch (err) {
//     res.status(401).json({ error: 'Invalid token' });
//   }
// };
exports.getUser = async (req, res) => {
  try {
    const token = req.cookies.token;
    console.log("Token from cookie:", req.cookies.token);
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).lean();

    // Group devices by systemId
    const systems = {};
    user.devices.forEach(device => {
      if (!systems[device.systemId]) {
        systems[device.systemId] = [];
      }
      systems[device.systemId].push(device);
    });

    res.json({
      name: user.name,
      email: user.email,
      systems
    });
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // use true in production
      sameSite: "strict",
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Logout failed" });
  }
};



exports.authenticateToken = (req, res, next) => {
  const token = req.cookies.token; // The token is automatically included in the request if it's HttpOnly

  if (!token) {
    return res.sendStatus(403); // Forbidden if no token is found
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden if token is invalid
    }
    req.user = user;
    next(); // Proceed to the next middleware or route handler
  });
};
