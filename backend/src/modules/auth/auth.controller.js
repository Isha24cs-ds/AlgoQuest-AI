import { registerUser, loginUser, getUserProfile } from "./auth.service.js";

export async function signup(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields",
      });
    }

    const { user, token } = await registerUser(name, email, password);

    res.status(201).json({
      success: true,
      message: "Account created successfully!",
      user,
      token,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const { user, token } = await loginUser(email, password);

    res.status(200).json({
      success: true,
      message: "Logged in successfully!",
      user,
      token,
    });
  } catch (err) {
    res.status(401).json({
      success: false,
      message: err.message,
    });
  }
}

export async function getMe(req, res) {
  try {
    const user = await getUserProfile(req.user.id);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
}

