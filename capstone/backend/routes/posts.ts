import Express, { Request, Response } from "express";
import PostController from "../controllers/posts";

const router = Express.Router();
const Controller = new PostController();

router.get("/", (req: Request, res: Response) => {
  Controller.getAll(req, res);
});
router.get("/:id", (req: Request, res: Response) => {
  Controller.getById(req, res);
});
router.post("/", (req: Request, res: Response) => {
  Controller.create(req, res);
});
router.put("/:id", (req: Request, res: Response) => {
  Controller.update(req, res);
});
router.delete("/:id", (req: Request, res: Response) => {
  Controller.delete(req, res);
});

export default router;
