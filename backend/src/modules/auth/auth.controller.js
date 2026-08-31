import { registerUser, loginUser } from "./auth.service.js";

export async function signup(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields",
      });
    }

    const user = await registerUser(name, email, password);

    res.status(201).json({
      success: true,
      message: "Account created successfully!",
      user,
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

    const user = await loginUser(email, password);

    res.status(200).json({
      success: true,
      message: "Logged in successfully!",
      user,
    });
  } catch (err) {
    res.status(401).json({
      success: false,
      message: err.message,
    });
  }
}
