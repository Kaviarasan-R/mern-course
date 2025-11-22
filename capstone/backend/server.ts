import cors from "cors";
import dotenv from "dotenv";
import Express from "express";
import mongoose from "mongoose";
// import seedDatabase from "./schema/seeders";
import PostRouter from "./routes/posts";
import UserRouter from "./routes/users";

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

const whitelist = ["http://localhost:5173", "http://localhost:3000"];
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

app.use("/", (req, res) => res.send({ json: "Hello World!" }));
app.use("/posts", PostRouter);
app.use("/users", UserRouter);

app.use((err: any, req: any, res: any, next: any) => {
  res.status(err.status ?? 500).json({
    message: err.message,
    error: err,
  });
});

app.listen(3000, () => {
  console.log("App is listening on port 3000...");
});
