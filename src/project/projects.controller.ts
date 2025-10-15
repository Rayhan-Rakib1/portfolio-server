import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import AppError from "../error/AppError";
import { ProjectServices } from "./project.services"; // Services layer যা DB handle করবে

// GET /projects
const getAllProjects = catchAsync(async (req: Request, res: Response) => {
  const projects = await ProjectServices.getAllProjects();
  sendResponse(res, {
    success: true,
    message: "All projects fetched successfully",
    statusCode: StatusCodes.OK,
    data: projects,
  });
});

// GET /projects/:slug
const getProjectBySlug = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const project = await ProjectServices.getProjectBySlug(Number(id));

  if (!project) {
    throw new AppError(StatusCodes.NOT_FOUND, "Project not found");
  }

  sendResponse(res, {
    success: true,
    message: "Project fetched successfully",
    statusCode: StatusCodes.OK,
    data: project,
  });
});

// POST /projects
const createProject = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const project = await ProjectServices.createProject(payload);

  sendResponse(res, {
    success: true,
    message: "Project created successfully",
    statusCode: StatusCodes.CREATED,
    data: project,
  });
});

// PATCH /projects/:id
const updateProject = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const updatedProject = await ProjectServices.updateProject(Number(id), payload);

  if (!updatedProject) {
    throw new AppError(StatusCodes.NOT_FOUND, "Project not found");
  }

  sendResponse(res, {
    success: true,
    message: "Project updated successfully",
    statusCode: StatusCodes.OK,
    data: updatedProject,
  });
});

// DELETE /projects/:id
const deleteProject = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedProject = await ProjectServices.deleteProject(Number(id));

  if (!deletedProject) {
    throw new AppError(StatusCodes.NOT_FOUND, "Project not found");
  }

  sendResponse(res, {
    success: true,
    message: "Project deleted successfully",
    statusCode: StatusCodes.OK,
    data: deletedProject,
  });
});

export const ProjectController = {
  getAllProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
};
 