import express from "express";
import cookieParser from "cookie-parser";
import authRoute from "./routes/authRoute.js";
import projectRoute from "./routes/projectRoute.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use("/api", authRoute);
app.use("/api", projectRoute);

app.listen(3000, () => {
  console.log("nyala");
});
