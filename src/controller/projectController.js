import { db } from "../utils/db.js";
import { v4 } from "uuid";

export const getAllProject = async (req, res) => {
  try {
    const projects = await db.Project.findMany({});
    res.status(200).json(projects);
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
  const { name } = req.body;

  try {
    await db.Project.create({
      data: {
        id: v4(),
        name,
      },
    });
    res.status(201).json({ msg: "Project created successfully" });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

export const createTask = async (req, res) => {
  const projectId = req.params.projectId;
  const { title, body, startDate, endDate, manageBy } = req.body;

  try {
    await db.Task.create({
      data: {
        id: v4(),
        projectId,
        title,
        body,
        startDate: startDate + "T00:00:00.000Z",
        endDate: endDate + "T00:00:00.000Z",
        manageBy,
      },
    });
    res.status(201).json({ msg: "Task created sucessfully" });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

export const updateTask = async (req, res) => {
  const taskId = req.params.taskId;
  const { title } = req.body;

  try {
    await db.Task.update({
      where: {
        id: taskId,
      },
      data: {
        title,
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
