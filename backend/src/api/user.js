import sql from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

export const createUser = async (req, res) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    return res
      .status(400)
      .json({ message: "Email, name, and password are required" });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Invalid email format." });
  }

  try {
    const existingUser = await sql`
            SELECT id FROM users WHERE email =${email}`;
    if (existingUser.length > 0) {
      return res.status(409).json({ message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await sql`
            INSERT INTO users (email, name, password)
            VALUES (${email}, ${name}, ${hashedPassword})
            RETURNING id, email, name, created_at`;

    if (newUser.length > 0) {
      return res.status(201).json({
        message: "User created successfully",
        user: newUser[0],
      });
    } else {
      res.status(500).json({ message: "Failed to create user" });
    }
  } catch (error) {
    console.error("Error creating user:", error);
    if (error.code === "23505") {
      return res.status(409).json({
        message:
          "User with this email or name already exists (database constraint).",
      });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const users = await sql`
            SELECT id, email, name, password FROM users WHERE email = ${email}`;

    if (users.length > 0) {
      const user = users[0];
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const payload = {
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
          },
        };
        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: process.env.JWT_EXPIRATION },
          (err, token) => {
            if (err) throw err;
            res.status(200).json({
              message: "Login successful",
              token,
              user: { id: user.id, email: user.email, name: user.name },
            });
          }
        );
      } else {
        return res.status(401).json({ message: "Invalid password" });
      }
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUser = async (req, res) => {
  const loggedInUserId = req.user.id;

  try {
    const user = await sql`
            SELECT id, email, name, created_at FROM users WHERE id = ${loggedInUserId}`;

    if (user.length > 0) {
      return res.status(200).json(user[0]);
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
