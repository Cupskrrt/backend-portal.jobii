import express from "express";
import cookieParser from "cookie-parser";
import authRoute from "./routes/authRoute.js";
import {
  createLogbook,
  getAllProject,
  getProject,
} from "./controller/projectController.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", authRoute);
app.get("/", getAllProject);
app.get("/:projectId", getProject);

app.post("/:projectId", createLogbook);

app.listen(3000, () => {
  console.log("nyala");
});
