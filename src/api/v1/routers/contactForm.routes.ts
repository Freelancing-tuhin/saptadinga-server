import express from "express";
import { getContactForms, submitContactForm } from "../controllers/contactForm.controller";

const router = express.Router();

router.post("/submit", submitContactForm);
router.get("/all", getContactForms);

export default router;
