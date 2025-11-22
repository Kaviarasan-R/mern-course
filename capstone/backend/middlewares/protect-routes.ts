import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../schema/users.js";

const protectRoutes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer") &&
    process.env.SECRET_TOKEN
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded: any = jwt.verify(token, process.env.SECRET_TOKEN);
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({
        message: "Not authorized",
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      message: "Not authorized, token not found",
    });
  }
};

export default protectRoutes;
