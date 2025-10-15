import { Prisma, Project } from "@prisma/client";
import { prisma } from "../config/db";
import AppError from "../error/AppError";
import { StatusCodes } from "http-status-codes";

// GET all projects
const getAllProjects = async (): Promise<Project[]> => {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });
  return projects;
};

// GET project by slug
const getProjectBySlug = async (id: number): Promise<Project | null> => {
  const project = await prisma.project.findUnique({
    where: { id:id },
  });

  if (!project) {
    throw new AppError(StatusCodes.NOT_FOUND, "Project not found");
  }

  return project;
};

// CREATE a new project
const createProject = async (payload: Prisma.ProjectCreateInput): Promise<Project> => {
  // check duplicate slug
  const existing = await prisma.project.findUnique({ where: { slug: payload.slug as string } });
  if (existing) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Slug already exists");
  }

  const project = await prisma.project.create({
    data: payload,
  });

  return project;
};

// UPDATE project by ID
const updateProject = async (
  id: number,
  payload: Partial<Project>
): Promise<Project | null> => {
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) {
    throw new AppError(StatusCodes.NOT_FOUND, "Project not found");
  }

  // check slug duplicate if slug is updated
  if (payload.slug && payload.slug !== project.slug) {
    const duplicate = await prisma.project.findUnique({ where: { slug: payload.slug } });
    if (duplicate) {
      throw new AppError(StatusCodes.BAD_REQUEST, "Slug already exists");
    }
  }

  const updatedProject = await prisma.project.update({
    where: { id },
    data: payload,
  });

  return updatedProject;
};

// DELETE project by ID
const deleteProject = async (id: number): Promise<Project> => {
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) {
    throw new AppError(StatusCodes.NOT_FOUND, "Project not found");
  }

  return prisma.project.delete({ where: { id } });
};

export const ProjectServices = {
  getAllProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
};
