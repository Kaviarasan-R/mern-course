import { Request, Response } from "express";

class UserController {
  async getAll(req: Request, res: Response): Promise<void> {}
  async getById(req: Request, res: Response): Promise<void> {}
  async register(req: Request, res: Response): Promise<void> {}
  async login(req: Request, res: Response): Promise<void> {}
}

export default UserController;
