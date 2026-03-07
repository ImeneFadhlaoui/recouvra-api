const User = require("../models/User");
const jwt = require("jsonwebtoken");

/*                    ****************Regiter****************                     */
const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists !" });
    }

    user = new User({
      name,
      email,
      password,
      role,
    });
    await user.save();

    const userPayload = { id: user._id, role: user.role };
    const token = jwt.sign(userPayload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: process.env.MAX_AGE,
    });
    res.status(201).json({
      message: "User registered successfully",
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/*                    ****************Login****************                     */
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ message: "User not found !" });
    }
    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const userPayload = { id: user._id, role: user.role };
    const token = jwt.sign(userPayload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: process.env.MAX_AGE,
    });
    res.status(200).json({
      message: "Login successful",
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/*                    ****************Logout****************                   */

const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { register, login, logout };
