import { Prisma, Blog } from "@prisma/client";
import { prisma } from "../config/db";
import AppError from "../error/AppError";
import { StatusCodes } from "http-status-codes";

const getAllBlogs = async (): Promise<Blog[]> => {
  const blogs = await prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
  });
  return blogs;
};

const getBlogBySlug = async (slug: string): Promise<Blog | null> => {
  const blog = await prisma.blog.findUnique({
    where: { slug },
  });

  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, "Blog not found");
  }

  return blog;
};

const createBlog = async (payload: Prisma.BlogCreateInput): Promise<Blog> => {
  const existingBlog = await prisma.blog.findUnique({
    where: { slug: payload.slug as string },
  });
  if (existingBlog) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Slug already exists");
  }

  const blog = await prisma.blog.create({
    data: payload,
  });

  return blog;
};

const updateBlog = async (
  id: number,
  payload: Partial<Blog>
): Promise<Blog | null> => {
  const blog = await prisma.blog.findUnique({ where: { id } });
  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, "Blog not found");
  }

  if (payload.slug && payload.slug !== blog.slug) {
    const duplicate = await prisma.blog.findUnique({
      where: { slug: payload.slug },
    });
    if (duplicate) {
      throw new AppError(StatusCodes.BAD_REQUEST, "Slug already exists");
    }
  }

  const updatedBlog = await prisma.blog.update({
    where: { id },
    data: payload,
  });

  return updatedBlog;
};

const deleteBlog = async (id: number): Promise<Blog> => {
  const blog = await prisma.blog.findUnique({ where: { id } });
  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, "Blog not found");
  }

  return prisma.blog.delete({ where: { id } });
};

export const BlogServices = {
  getAllBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
};
