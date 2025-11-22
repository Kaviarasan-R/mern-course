import { Request, Response } from "express";
import { loginDto, registerDto } from "@/helpers/joi-validations.js";
import User from "@/schema/users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class UserController {
  async getAll(req: Request, res: Response): Promise<any> {
    try {
      const {
        page = 1,
        limit = 10,
        sortBy = "createdAt",
        order = "desc",
        search,
      } = req.query;

      const pageNum = parseInt(page as string);
      const limitNum = parseInt(limit as string);
      const skip = (pageNum - 1) * limitNum;

      const filter: any = {};

      if (search) {
        filter.$or = [
          { name: { $regex: search, $options: "i" } },
          { username: { $regex: search, $options: "i" } },
        ];
      }

      const sort: any = {};
      if (sortBy === "createdAt") {
        sort.createdAt = order === "asc" ? 1 : -1;
      } else if (sortBy === "name") {
        sort.name = order === "asc" ? 1 : -1;
      }

      const [users, total] = await Promise.all([
        User.find(filter)
          .select("-password")
          .sort(sort)
          .skip(skip)
          .limit(limitNum),
        User.countDocuments(filter),
      ]);

      return res.status(200).json({
        success: true,
        data: users,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages: Math.ceil(total / limitNum),
        },
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: "Error fetching users",
        error: error.message,
      });
    }
  }

  async getById(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;

      const user = await User.findById(id).select("-password");

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: "Error fetching user",
        error: error.message,
      });
    }
  }

  async register(req: Request, res: Response): Promise<any> {
    const { error, value = {} } = registerDto.validate(req.body);
    if (error)
      return res.status(400).json({
        message:
          error?.details[0]?.message || "Unable to validate request body",
      });
    const { name, username, email, password } = value;

    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
    });

    if (user && process.env.SECRET_TOKEN) {
      return res.status(201).json({
        id: user.userId,
        token: jwt.sign({ id: user._id }, process.env.SECRET_TOKEN, {
          expiresIn: "100MINS",
        }),
      });
    } else {
      return res.status(400).json({
        message: "Invalid user data",
      });
    }
  }

  async login(req: Request, res: Response): Promise<any> {
    const { error, value = {} } = loginDto.validate(req.body);
    if (error)
      return res.status(400).json({
        message:
          error?.details[0]?.message || "Unable to validate request body",
      });
    const { email, password } = value;

    const user = await User.findOne({ email });

    if (
      user &&
      (await bcrypt.compare(password, user.password)) &&
      process.env.SECRET_TOKEN
    ) {
      return res.status(200).json({
        id: user.userId,
        token: jwt.sign({ id: user._id }, process.env.SECRET_TOKEN, {
          expiresIn: "100MINS",
        }),
      });
    } else {
      return res.status(400).json({
        message: "Invalid user data",
      });
    }
  }
}

export default UserController;
