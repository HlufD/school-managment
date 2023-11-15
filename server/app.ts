import express from "express";
import dotenv from "dotenv";
import { NotFound } from "./src/middlewares/error/NotFound";
import errorHandler from "./src/middlewares/error/customErrorHandler";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./src/Routes/user";
import departmentRouter from "./src/Routes/department";
dotenv.config();

const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser());

// route hander middlewares
app.use("/api", userRouter);
app.use("/api/departments", departmentRouter);
// error handling middlewares
app.use(errorHandler);
app.use(NotFound);

app.listen(process.env.port, () => {
  console.log(`The server is runnig on port ${process.env.port}`);
});
