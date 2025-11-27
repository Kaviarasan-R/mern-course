import cors from "cors";
import dotenv from "dotenv";
import Express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
// import seedDatabase from "./schema/seeders.js";
import PostRouter from "./routes/posts";
import UserRouter from "./routes/users";
import protectRoutes from "./middlewares/protect-routes";

dotenv.config();

(async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URL || "");
    console.log(`Mongodb Connected: ${conn.connection.host}`);

    // seedDatabase();
  } catch (error) {
    console.log(error);
  }
})();

const app = Express();

const whitelist = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://capstone-frontend-five-mu.vercel.app",
  "https://test-capstone-frontend.vercel.app",
];
const corsOptions = {
  origin: function (origin: any, callback: any) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(Express.json());
app.use(Express.urlencoded({ extended: false }));

app.use("/posts", protectRoutes, PostRouter);
app.use("/users", UserRouter);

app.get("/", (_req, res) => res.json({ message: "Hello World!" }));

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status ?? 500).json({
    message: err.message,
    error: err,
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("App is listening...");
});
