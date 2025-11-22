import Express, { Request, Response } from "express";
import UserController from "../controllers/users.js";
import protectRoutes from "../middlewares/protect-routes.js";

const router = Express.Router();
const Controller = new UserController();

router.get("/", protectRoutes, (req: Request, res: Response) => {
  Controller.getAll(req, res);
});
router.get("/:id", protectRoutes, (req: Request, res: Response) => {
  Controller.getById(req, res);
});
router.post("/register", (req: Request, res: Response) => {
  Controller.register(req, res);
});
router.post("/login", (req: Request, res: Response) => {
  Controller.login(req, res);
});

export default router;
