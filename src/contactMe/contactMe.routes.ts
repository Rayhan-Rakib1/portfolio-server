import { Router } from "express";
import { ContactController } from "./contactMe.controller";

const router = Router();
router.get("/", ContactController.getAllContacts);       // Get all

router.post("/", ContactController.createContact);       // Create
router.get("/:id", ContactController.getContactById);    // Get one
router.patch("/:id", ContactController.updateContactStatus); // Update status
router.delete("/:id", ContactController.deleteContact);  // Delete

export const  contactMeRoutes = router;
