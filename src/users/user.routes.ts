import { Router } from "express";
import { UserController } from "./user.controller";

const router = Router();

router.post("/register", UserController.registerUser);

router.post("/login", UserController.loginUser);
router.post("/logout", UserController.logoutUser);

router.get("/me", UserController.getMe);

router.patch("/update-user", UserController.updateUserProfile);

// router.post("/change-password", UserController.changePasswordUser);
router.patch("/change-password", UserController.changePasswordUser);

router.delete("/delete-user", UserController.deleteUser);

// router.get("/stats");


export const userRoutes = router;
