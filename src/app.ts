import express from "express";
import path from "path";
import cors from "cors";

import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { option } from "./swaggerOptions";

import "./config";
import "./config/connectDB";
import UserRouter from "./routes/user";
import postRouter from "./routes/post";

const app = express();

app.set("port", process.env.PORT || 4000);

app.use("/uploads", express.static(path.resolve("uploads")));

var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", UserRouter);
app.use("/api/post", postRouter);

const specs = swaggerJsDoc(option);
app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs));

export default app;
