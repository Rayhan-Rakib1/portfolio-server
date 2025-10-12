import { Prisma, Comment } from "@prisma/client";
import { prisma } from "../config/db";
import AppError from "../error/AppError";
import { StatusCodes } from "http-status-codes";

// GET all comments by blogId
const getCommentsByBlog = async (blogId: number): Promise<Comment[]> => {
  return prisma.comment.findMany({
    where: { blogId },
    orderBy: { createdAt: "desc" },
  });
};

// CREATE comment
const createComment = async (
  blogId: number,
  payload: Prisma.CommentCreateInput
): Promise<Comment> => {
  const blogExists = await prisma.blog.findUnique({ where: { id: blogId } });
  if (!blogExists) {
    throw new AppError(StatusCodes.NOT_FOUND, "Blog not found");
  }

  const comment = await prisma.comment.create({
    data: {
      ...payload,
      blog: { connect: { id: blogId } },
    },
  });

  return comment;
};

// UPDATE comment
const updateComment = async (
  id: number,
  payload: Partial<Comment>
): Promise<Comment | null> => {
  const comment = await prisma.comment.findUnique({ where: { id } });
  if (!comment) return null;

  return prisma.comment.update({
    where: { id },
    data: payload,
  });
};

// DELETE comment
const deleteComment = async (id: number): Promise<Comment | null> => {
  const comment = await prisma.comment.findUnique({ where: { id } });
  if (!comment) return null;

  return prisma.comment.delete({ where: { id } });
};

export const CommentServices = {
  getCommentsByBlog,
  createComment,
  updateComment,
  deleteComment,
};
