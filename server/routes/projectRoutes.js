import express from "express";
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";
import {
  getProjectSummary,
  getAllProjectsSummary,
} from "../controllers/projectSummaryController.js";
import authenticateToken from "../middlewares/authenticateToken.js";

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticateToken);

// GET /api/projects - Get all projects for the user
router.get("/", getProjects);

// GET /api/projects/summary - Get summary for all projects
router.get("/summary", getAllProjectsSummary);

// POST /api/projects - Create a new project
router.post("/", createProject);

// GET /api/projects/:id - Get a specific project
router.get("/:id", getProjectById);

// GET /api/projects/:id/summary - Get summary for a specific project
router.get("/:id/summary", getProjectSummary);

// PUT /api/projects/:id - Update a project
router.put("/:id", updateProject);

// DELETE /api/projects/:id - Delete a project
router.delete("/:id", deleteProject);

export default router;
