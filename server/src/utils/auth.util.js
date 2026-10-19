import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

export const generateAccessToken = async ({ userId, role }) => {
  const accessToken = await jwt.sign(
    { userId, role },
    config.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" },
  );
  return accessToken;
};
export const generateRefreshToken = async ({ userId, role }) => {
  const refreshToken = await jwt.sign(
    { userId, role },
    config.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" },
  );
  return refreshToken;
};
export const verifyAccessToken = async (accessToken) => {
  const decoded = await jwt.verify(accessToken, config.ACCESS_TOKEN_SECRET);
  return decoded;
};
export const verifyRefreshToken = async (refreshToken) => {
  const decoded = await jwt.verify(refreshToken, config.REFRESH_TOKEN_SECRET);
  return decoded;
};
