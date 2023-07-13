import express from "express";
import {
  createProject,
  createSubtask,
  createTask,
  deleteTask,
  getAllProject,
  getProject,
  updateTask,
  deleteSubtask,
  createLogbook,
  deleteProject,
} from "../controller/projectController.js";
import jwtVerify from "../middleware/jwtVerify.js";

const router = express.Router();

router.get("/project", jwtVerify, getAllProject);
router.get("/project/:projectId", getProject);
router.delete("/project/:projectId", deleteProject);
router.post("/project", createProject);
router.post("/project/:projectId/task", createTask);
router.patch("/project/task/:taskId", updateTask);
router.delete("/project/task/:taskId", deleteTask);
router.post("/project/:projectId/task/:taskId/subtask", createSubtask);
router.delete(
  "/project/:projectId/task/:taskId/subtask/:subtaskId",
  deleteSubtask
);
router.post("/project/:projectId/logbook", createLogbook);

export default router;
