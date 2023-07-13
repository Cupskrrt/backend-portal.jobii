import { db } from "../utils/db.js";
import { v4 } from "uuid";

export const getAllProject = async (req, res) => {
  try {
    const project = await db.Project.findMany({
      include: {
        tasks: true,
      },
    });
    res.status(200).json(project);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

export const getProject = async (req, res) => {
  const projectId = req.params.projectId;

  try {
    const project = await db.Project.findFirst({
      where: {
        id: projectId,
      },
      include: {
        tasks: {
          include: {
            subtasks: true,
          },
        },
        logbooks: true,
      },
    });
    res.status(200).json(project);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

export const createProject = async (req, res) => {
  const { name, status } = req.body;

  try {
    await db.Project.create({
      data: {
        id: v4(),
        name,
        status,
      },
    });
    res.status(201).json({ msg: "Project created successfully" });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

export const deleteProject = async (req, res) => {
  const projectId = req.params.projectId;
  try {
    await db.project.delete({
      where: {
        id: projectId,
      },
    });
    res.status(201).json({ msg: "Project deleted successfully" });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

export const createTask = async (req, res) => {
  const projectId = req.params.projectId;
  const { ...body } = req.body;

  try {
    await db.Task.create({
      data: {
        id: v4(),
        projectId,
        manageBy: "Not Assigned",
        startDate: new Date(),
        endDate: new Date(),
        ...body,
      },
    });
    res.status(201).json({ msg: "Task created sucessfully" });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

export const updateTask = async (req, res) => {
  const taskId = req.params.taskId;
  const changes = req.body;

  try {
    await db.Task.update({
      where: {
        id: taskId,
      },
      data: {
        status: changes.status,
        ...changes,
      },
    });
    res.status(201).json({ msg: "Task updated sucessfully" });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

export const deleteTask = async (req, res) => {
  const taskId = req.params.taskId;

  try {
    await db.Task.delete({
      where: {
        id: taskId,
      },
    });
    res.status(201).json({ msg: "Task deleted successfully" });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

export const createSubtask = async (req, res) => {
  const taskId = req.params.taskId;
  const { title } = req.body;

  try {
    await db.Subtask.create({
      data: {
        id: v4(),
        taskId,
        title,
      },
    });
    res.status(201).json({ msg: "Subtask created successfully" });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

export const deleteSubtask = async (req, res) => {
  const subtaskId = req.params.subtaskId;

  try {
    await db.Subtask.delete({
      where: {
        id: subtaskId,
      },
    });
    res.status(201).json({ msg: "Subtask deleted successfully" });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

export const createLogbook = async (req, res) => {
  const projectId = req.params.projectId;
  const { message } = req.body;

  try {
    await db.Logbook.create({
      data: {
        id: v4(),
        projectId,
        message,
      },
    });
    res.status(201).json({ msg: "Logbook created successfully" });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};
