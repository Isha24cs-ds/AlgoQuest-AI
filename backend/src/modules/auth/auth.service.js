import { findUserByEmail, createUser } from "./auth.repository.js";

export async function registerUser(name, email, password) {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new Error("An account with this email already exists");
  }

  // In production, hash password using bcrypt
  const user = await createUser({
    name,
    email,
    password,
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

export async function loginUser(email, password) {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error("No account found with this email");
  }

  if (user.password !== password) {
    throw new Error("Invalid password credentials");
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}
