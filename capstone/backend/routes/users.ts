import Express, { Request, Response } from "express";
import UserController from "../controllers/users";

const router = Express.Router();
const Controller = new UserController();

router.get("/all", (req: Request, res: Response) => {
  Controller.getAll(req, res);
});
router.get("/:id", (req: Request, res: Response) => {
  Controller.getById(req, res);
});
router.post("/register", (req: Request, res: Response) => {
  Controller.register(req, res);
});
router.post("/login", (req: Request, res: Response) => {
  Controller.login(req, res);
});

export default router;
