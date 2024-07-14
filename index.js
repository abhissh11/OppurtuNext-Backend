import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import postRoute from "./routes/post-route.js";
import cors from "cors";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("MongoDB Connected!"))
  .catch((err) => console.log(err));

const app = express();

app.use(
  cors({
    origin: "https://opportunext.vercel.app/",
    credentials: true,
  })
);

app.use(express.json());
const port = 5000;

app.use("/api/post", postRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`OppurtuNext app listening at http://localhost:${port}`);
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
