import { Request, Response } from "express";

class PostController {
  async getAll(req: Request, res: Response): Promise<void> {}
  async getById(req: Request, res: Response): Promise<void> {}
  async create(req: Request, res: Response): Promise<void> {}
  async update(req: Request, res: Response): Promise<void> {}
  async delete(req: Request, res: Response): Promise<void> {}
}

export default PostController;
