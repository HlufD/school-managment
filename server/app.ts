import express from "express";
import dotenv from "dotenv";
import { NotFound } from "./src/middlewares/error/NotFound";
import errorHandler from "./src/middlewares/error/customErrorHandler";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./src/Routes/user";
import courseRouter from "./src/Routes/course";
import departmentRouter from "./src/Routes/department";
import levelsRouter from "./src/Routes/level";
import studentTypeRouter from "./src/Routes/student_type";
import schoolYearRouter from "./src/Routes/school_year";
import studentRouter from "./src/Routes/student";
import fileUpload from "express-fileupload";

dotenv.config();

const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());
app.use(express.static("./public"));
// route hander middlewares
app.use("/api", userRouter);
app.use("/api/departments", departmentRouter);
app.use("/api/courese", courseRouter);
app.use("/api/levels", levelsRouter);
app.use("/api/student_type", studentTypeRouter);
app.use("/api/school_years", schoolYearRouter);
app.use("/api/students", studentRouter);

// error handling middlewares
app.use(errorHandler);
app.use(NotFound);

app.listen(process.env.port, () => {
  console.log(`The server is runnig on port ${process.env.port}`);
});
