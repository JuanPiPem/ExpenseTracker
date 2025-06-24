import Project from "../models/Project.js";

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.user.uid }).sort({
      createdAt: -1,
    });
    res.json(projects);
  } catch (error) {
    console.error("getProjects error:", error);
    res.status(500).json({ error: "Error fetching projects" });
  }
};

export const getProjectById = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findOne({ _id: id, userId: req.user.uid });
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: "Error fetching project" });
  }
};

export const createProject = async (req, res) => {
  const { name, description, type, startDate, endDate, budget } = req.body;
  try {
    const newProject = new Project({
      name,
      description,
      type,
      startDate,
      endDate,
      budget,
      userId: req.user.uid,
    });
    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ error: "Error creating project" });
  }
};

export const updateProject = async (req, res) => {
  const { id } = req.params;
  const { name, description, type, startDate, endDate, budget, isActive } =
    req.body;
  try {
    const updatedProject = await Project.findOneAndUpdate(
      { _id: id, userId: req.user.uid },
      { name, description, type, startDate, endDate, budget, isActive },
      { new: true }
    );
    if (!updatedProject) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ error: "Error updating project" });
  }
};

export const deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProject = await Project.findOneAndDelete({
      _id: id,
      userId: req.user.uid,
    });
    if (!deletedProject) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting project" });
  }
};
