import express from "express";
import dotenv from "dotenv";
import departmetRouter from "./src/routes/department";
import authRoute from "./src/routes/auth";
import { NotFound } from "./src/middlewares/error/NotFound";
import errorHandler from "./src/middlewares/error/customErrorHandler";
dotenv.config();

const app = express();
app.use(express.json());

// route hander middlewares
app.use("/api/auth", authRoute);
app.use("/api/departments", departmetRouter);

// error handling middlewares
app.use(errorHandler);
app.use(NotFound);

app.listen(process.env.port, () => {
  console.log(`The server is runnig on port ${process.env.port}`);
});
