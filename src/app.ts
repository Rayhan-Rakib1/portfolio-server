import express from "express";
import cors from "cors";
import compression from "compression";
import { userRoutes } from "./users/user.routes";
import { blogRoutes } from "./blog/blog.routes";
import { commentRoutes } from "./comment/comment.routes";
import { projectRoutes } from "./project/project.routes";

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(compression());
app.use(express.json());

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);
app.use("/api/v1/comment", commentRoutes);
app.use("/api/v1/projects", projectRoutes);

app.get("/", (_req, res) => {
  res.send("api is working");
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;
