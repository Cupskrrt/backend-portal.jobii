import { db } from "../utils/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 } from "uuid";

const tokenSecret = process.env.TOKEN_SECRET;
const refreshSecret = process.env.REFRESH_SECRET;

const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "None",
  path: "/",
  maxAge: 3 * 60 * 60 * 1000,
};

const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const register = async (req, res) => {
  const { email, password } = req.body;

  const hashedPassword = await hashPassword(password);

  try {
    await db.user.create({
      data: {
        id: v4(),
        email,
        password: hashedPassword,
      },
    });
    res.status(201).json({ msg: "Register Sucessfull" });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({ msg: "User not found!" });
    }

    const isPasswordValid = await verifyPassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ msg: "Incorrect password!" });
    }

    const payload = {
      role: user.role,
      userId: user.id,
    };

    //ADD JWT VERIFICATION
    const token = jwt.sign(payload, tokenSecret, {
      expiresIn: "5m",
    });

    const refreshToken = jwt.sign(payload, refreshSecret, {
      expiresIn: "8h",
    });

    res
      .cookie("token", token)
      .cookie("refreshToken", refreshToken)
      .status(200)
      .json({ msg: "Login successfull!", token: token, user: user });
  } catch (err) {
    res.json({ msg: err });
  }
};

export const refresh = async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(401).json({ error: "Refresh token not found" });
  }

  try {
    const { role, userId } = jwt.verify(refreshToken, refreshSecret);
    const payload = {
      role,
      userId,
    };

    const newToken = jwt.sign(payload, tokenSecret, { expiresIn: "5m" });

    const newRefreshToken = jwt.sign(payload, refreshSecret, {
      expiresIn: "8h",
    });

    res
      .cookie("token", newToken, cookieOptions)
      .cookie("refreshToken", newRefreshToken, cookieOptions)
      .header("Access-Control-Allow-Credentials", true)
      .status(200)
      .json({ msg: "Refresh successfull", token: newToken });
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired refresh token" });
  }
};
