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

const allowedOrigins = [
  "http://localhost:3000",
  "https://opportunext.vercel.app/",
  "https://oppurtunext-backend-1.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
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
