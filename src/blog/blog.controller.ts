import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import AppError from "../error/AppError";
import { BlogServices } from "./blog.services";

const getAllBlogs = catchAsync(async (req: Request, res: Response) => {
  const blogs = await BlogServices.getAllBlogs();
  sendResponse(res, {
    success: true,
    message: "All blogs fetched successfully",
    statusCode: StatusCodes.OK,
    data: blogs,
  });
});

const getBlogBySlug = catchAsync(async (req: Request, res: Response) => {
  const { slug } = req.params;
  const blog = await BlogServices.getBlogBySlug(slug);

  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, "Blog not found");
  }

  sendResponse(res, {
    success: true,
    message: "Blog fetched successfully",
    statusCode: StatusCodes.OK,
    data: blog,
  });
});

const createBlog = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const blog = await BlogServices.createBlog(payload);

  sendResponse(res, {
    success: true,
    message: "Blog created successfully",
    statusCode: StatusCodes.CREATED,
    data: blog,
  });
});

const updateBlog = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const updatedBlog = await BlogServices.updateBlog(Number(id), payload);

  if (!updatedBlog) {
    throw new AppError(StatusCodes.NOT_FOUND, "Blog not found");
  }

  sendResponse(res, {
    success: true,
    message: "Blog updated successfully",
    statusCode: StatusCodes.OK,
    data: updatedBlog,
  });
});

const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedBlog = await BlogServices.deleteBlog(Number(id));

  if (!deletedBlog) {
    throw new AppError(StatusCodes.NOT_FOUND, "Blog not found");
  }

  sendResponse(res, {
    success: true,
    message: "Blog deleted successfully",
    statusCode: StatusCodes.OK,
    data: deletedBlog,
  });
});

export const BlogController = {
  getAllBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
};
