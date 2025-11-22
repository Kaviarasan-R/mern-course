import { Request, Response } from "express";
import { loginDto, registerDto } from "../helpers/joi-validations";
import User from "../schema/users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class UserController {
  async getAll(req: Request, res: Response): Promise<any> {
    return res.status(200).send({
      message: "Get All",
    });
  }

  async getById(req: Request, res: Response): Promise<any> {
    return res.status(200).send({
      message: "Get By ID",
    });
  }

  async register(req: Request, res: Response): Promise<any> {
    const { error, value = {} } = registerDto.validate(req.body);
    if (error)
      return res.status(400).send({
        message:
          error?.details[0]?.message || "Unable to validate request body",
      });
    const { name, username, email, password } = value;

    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
      return res.status(400).send({
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
        token: jwt.sign({ id: user._id }, process.env.SECRET_TOKEN, {
          expiresIn: "5MINS",
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
      return res.status(400).send({
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
        token: jwt.sign({ id: user._id }, process.env.SECRET_TOKEN, {
          expiresIn: "5MINS",
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
