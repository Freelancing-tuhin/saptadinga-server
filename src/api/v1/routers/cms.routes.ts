import express from "express";
import {
	getAllWebsites,
	getWebsiteById,
	createWebsite,
	updateWebsite,
	deleteWebsite
} from "../controllers/cms/website.controller";
import {
	getPagesByWebsite,
	getPageById,
	createPage,
	updatePage,
	deletePage
} from "../controllers/cms/page.controller";

const router = express.Router();

// Website routes
router.get("/websites", getAllWebsites);
router.get("/websites/:id", getWebsiteById);
router.post("/websites", createWebsite);
router.put("/websites/:id", updateWebsite);
router.delete("/websites/:id", deleteWebsite);

// Page routes
router.get("/websites/:websiteId/pages", getPagesByWebsite);
router.get("/pages/:id", getPageById);
router.post("/pages", createPage);

router.put("/pages/:id", updatePage);
router.delete("/pages/:id", deletePage);

module.exports = router;
