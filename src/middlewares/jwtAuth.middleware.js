import jwt from "jsonwebtoken";
import CustomErrorHandler from "../error/CustomErrorHandler.js";
import { UNAUTHORIZED_CODE } from "../utils/common.js";

const jwtAuthMiddleware = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    throw new CustomErrorHandler(
      "Access denied, invalid token",
      UNAUTHORIZED_CODE
    );
  }
  try {
    token = token.split(" ")[1].trim();
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    throw new CustomErrorHandler(
      "Access denied, invalid token",
      UNAUTHORIZED_CODE
    );
  }
};

export default jwtAuthMiddleware;
