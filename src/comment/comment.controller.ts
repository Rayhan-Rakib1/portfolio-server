import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import AppError from "../error/AppError";
import { CommentServices } from "./comment.services";


 const getAllComments = catchAsync(async (req: Request, res: Response) => {
  const comments = await CommentServices.getAllComments();
  
  sendResponse(res, {
    success: true,
    message: "Comments fetched successfully",
    statusCode: StatusCodes.OK,
    data: comments,
  });
});
// GET comments by blog
const getCommentsByBlog = catchAsync(async (req: Request, res: Response) => {
  const { blogId } = req.params;
  const comments = await CommentServices.getCommentsByBlog(Number(blogId));

  sendResponse(res, {
    success: true,
    message: "Comments fetched successfully",
    statusCode: StatusCodes.OK,
    data: comments,
  });
});

// POST create comment
const createComment = catchAsync(async (req: Request, res: Response) => {
  const { blogId } = req.params;
  const payload = req.body; 
  const comment = await CommentServices.createComment(Number(blogId), payload);

  sendResponse(res, {
    success: true,
    message: "Comment added successfully",
    statusCode: StatusCodes.CREATED,
    data: comment,
  });
});

// PATCH update comment
const updateComment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const updatedComment = await CommentServices.updateComment(Number(id), payload);

  if (!updatedComment) {
    throw new AppError(StatusCodes.NOT_FOUND, "Comment not found");
  }

  sendResponse(res, {
    success: true,
    message: "Comment updated successfully",
    statusCode: StatusCodes.OK,
    data: updatedComment,
  });
});

// DELETE comment
const deleteComment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedComment = await CommentServices.deleteComment(Number(id));

  if (!deletedComment) {
    throw new AppError(StatusCodes.NOT_FOUND, "Comment not found");
  }

  sendResponse(res, {
    success: true,
    message: "Comment deleted successfully",
    statusCode: StatusCodes.OK,
    data: deletedComment,
  });
});

export const CommentController = {
  getCommentsByBlog,
  createComment,
  updateComment,
  deleteComment,
  getAllComments
};
