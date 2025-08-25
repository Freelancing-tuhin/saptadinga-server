import express from "express";
import { submitContactForm, getContactForms } from "../controllers/contactForm.controller";

const router = express.Router();

router.post("/submit", submitContactForm);
router.get("/all", getContactForms);

export = router;
