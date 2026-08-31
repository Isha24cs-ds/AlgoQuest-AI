import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUserByEmail, createUser, findUserById } from "./auth.repository.js";

const JWT_SECRET = process.env.JWT_SECRET || "algoquest_jwt_secret_key_2026";

function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}

export async function registerUser(name, email, password) {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new Error("An account with this email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await createUser({
    name,
    email,
    password: hashedPassword,
  });

  const token = generateToken(user);

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    token,
  };
}

export async function loginUser(email, password) {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error("No account found with this email");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password credentials");
  }

  const token = generateToken(user);

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    token,
  };
}

export async function getUserProfile(userId) {
  const user = await findUserById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
}

