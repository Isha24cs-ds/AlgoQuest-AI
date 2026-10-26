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
    const isClientError =
      err.message.includes("already exists") ||
      err.message.includes("required");
    const isDbError =
      err.message.includes("prisma") ||
      err.message.includes("tenant") ||
      err.message.includes("database");

    res.status(isClientError ? 400 : isDbError ? 503 : 500).json({
      success: false,
      message: isDbError
        ? "Database connection failed. Please ensure your database is active and reachable."
        : err.message,
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
    const isAuthError =
      err.message.includes("Invalid email or password") ||
      err.message.includes("No account found");
    const isDbError =
      err.message.includes("prisma") ||
      err.message.includes("tenant") ||
      err.message.includes("database");

    res.status(isAuthError ? 401 : isDbError ? 503 : 500).json({
      success: false,
      message: isDbError
        ? "Database connection failed. Please ensure your database is active and reachable."
        : err.message,
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

