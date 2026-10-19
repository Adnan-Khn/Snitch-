import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/auth.util.js";

export const registerController = async (req, res) => {
  const { email, name, password } = req.body;

  const isUserExists = await userModel.findOne({ email });

  if (isUserExists) {
    res.status(401).json({
      message: "User already present with this email address",
      errors: [
        {
          path: email,
          msg: "User already exists.",
        },
      ],
    });
  }

  const user = await userModel.create({
    email,
    name,
    passwordHash: await bcrypt.hash(password, 12),
  });

  const accessToken = await generateAccessToken({
    userId: user._id,
    role: user.role,
  });
  const refreshToken = await generateRefreshToken({
    userId: user._id,
    role: user.role,
  });
  res.cookie("refreshToken", refreshToken, { httpOnly: true });
  //   user.refreshToken = refreshToken
  //   await user.save();
  await userModel.findByIdAndUpdate(user._id, { refreshToken });

  res.status(201).json({
    message: "User created successfully",
    user: {
      email,
      name,
    },
    accessToken,
  });
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(401).json({
      message: "Invalid credentials!!!",
    });
  }

  const isValidPassword = await bcrypt.compare(password, user.passwordHash);

  if (!isValidPassword) {
    return res.status(401).json({
      message: "Invalid credentials!!!",
    });
  }

  const accessToken = await generateAccessToken({
    usedId: user._id,
    role: user.role,
  });
  const refreshToken = await generateRefreshToken({
    userId: user._id,
    role: user.role,
  });

  res.cookie("refreshToken", refreshToken, { httpOnly: true });

  await userModel.findOneAndUpdate({ email }, { refreshToken });

  res.status(201).json({
    message: "User logged in",
    user: {
      email: user.email,
      name: user.name,
    },
    accessToken,
  });
};

export const refreshController = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  //console.log(refreshToken)
  if (!refreshToken) {
    return res.status(401).json({
      message: "Refresh Token required",
    });
  }
  try {
    //console.log("Step1")
    const decoded = await verifyRefreshToken(refreshToken);
    //console.log("Decoded :", decoded);
    const { userId, role } = decoded;
    //console.log("Step2")
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    //console.log("Step3")
    if (user.refreshToken !== refreshToken) {
      await userModel.findByIdAndUpdate(user._id, { refreshToken: null });
      return res.status(401).json({
        message: "Refresh token mismatch",
      });
    }
    //console.log("Step4")
    const accessToken = await generateAccessToken({
      userId: user._id,
      role: user.role,
    });
    const newRefreshToken = await generateRefreshToken({
      userId: user._id,
      role: user.role,
    });
    //console.log("Step5",newRefreshToken)
    await userModel.findByIdAndUpdate(user._id, {
      refreshToken: newRefreshToken,
    });
    ///console.log("Step6")
    res.cookie("refreshToken", newRefreshToken, { httpOnly: true });

    res.status(200).json({
      message: "Token rotated successfully",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      accessToken,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error Invalid refresh Token",
    });
  }
};

export const meController = async (req, res) => {
  const { userId, role } = req.user;

  const user = await userModel.findById(userId);

  if (!user) {
    return res.status(400).json({
      message: "No user found",
    });
  }

  res.status(200).json({
    message: "User data fetch successfully",
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
  });
};
