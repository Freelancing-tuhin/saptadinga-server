import express from "express";
import hetalbonRoutes from "./bookings/hetalbon.routes";
import machrangaRoutes from "./bookings/machranga.routes";
import contactFormRoutes from "./contactForm.routes";
import cmsRoutes from "./cms.routes";

/** Every v1 route, mounted under `/api/v1` by the app. */
const router = express.Router();

router.use("/hetalbon", hetalbonRoutes);
router.use("/machranga", machrangaRoutes);
router.use("/contact-form", contactFormRoutes);
router.use("/cms", cmsRoutes);

export default router;
