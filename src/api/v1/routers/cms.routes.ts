import express from "express";
import {
	createWebsite,
	deleteWebsite,
	getAllWebsites,
	getWebsiteById,
	updateWebsite
} from "../controllers/cms/website.controller";
import {
	createPage,
	deletePage,
	getPageById,
	getPagesByWebsite,
	updatePage
} from "../controllers/cms/page.controller";

const router = express.Router();

// Websites
router.get("/websites", getAllWebsites);
router.get("/websites/:id", getWebsiteById);
router.post("/websites", createWebsite);
router.put("/websites/:id", updateWebsite);
router.delete("/websites/:id", deleteWebsite);

// Pages
router.get("/websites/:websiteId/pages", getPagesByWebsite);
router.get("/pages/:id", getPageById);
router.post("/pages", createPage);
router.put("/pages/:id", updatePage);
router.delete("/pages/:id", deletePage);

export default router;
