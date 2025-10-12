import { Router } from "express";
import { CommentController } from "./comment.controller";

const router = Router();

router.get("/blog/:blogId", CommentController.getCommentsByBlog);

router.post("/blog/:blogId", CommentController.createComment);

router.patch("/:id", CommentController.updateComment);

router.delete("/:id", CommentController.deleteComment);

export const commentRoutes = router;
