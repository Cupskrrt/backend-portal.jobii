import express from "express";
import cookieParser from "cookie-parser";
import { login, refresh, register } from "./controller/authController.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.post("/", register);
app.post("/login", login);
app.get("/refresh", refresh);

app.listen(3000, () => {
  console.log("nyala");
});
