import { Router } from "express";
import { ProjectController } from "./projects.controller";

const router = Router();




// Public: view projects
router.get("/", ProjectController.getAllProjects);
router.get("/:id", ProjectController.getProjectBySlug);



router.post("/", ProjectController.createProject);
router.patch("/:id", ProjectController.updateProject);
router.delete("/:id", ProjectController.deleteProject);


export const projectRoutes = router;