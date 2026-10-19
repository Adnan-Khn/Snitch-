import { verifyAccessToken } from "../utils/auth.util.js";

export const authenticate = async (req, res, next) => {
  const accessToken = req.headers.authorization.split(" ")[1];

  if (!accessToken) {
    return res.status(400).json({
      message: "AccessToken is required",
    });
  }
  try {
    const decoded = await verifyAccessToken(accessToken);

    req.user=decoded;             //req.user = { userId, role }

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired access token",
    });
  }
};
