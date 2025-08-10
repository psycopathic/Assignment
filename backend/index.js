import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import urlRouter from "./routes/urlRoutes.js";
import userRouter from "./routes/userRoutes.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config();

const app = express();
const port = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json());
if(process.env.NODE_ENV !== "production"){
  app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
}
app.use(cookieParser());
app.use("/", urlRouter);
app.use("/user", userRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("/*splat", (_, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  connectDB();
});
