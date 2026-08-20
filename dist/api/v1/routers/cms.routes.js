"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const website_controller_1 = require("../controllers/cms/website.controller");
const page_controller_1 = require("../controllers/cms/page.controller");
const router = express_1.default.Router();
// Websites
router.get("/websites", website_controller_1.getAllWebsites);
router.get("/websites/:id", website_controller_1.getWebsiteById);
router.post("/websites", website_controller_1.createWebsite);
router.put("/websites/:id", website_controller_1.updateWebsite);
router.delete("/websites/:id", website_controller_1.deleteWebsite);
// Pages
router.get("/websites/:websiteId/pages", page_controller_1.getPagesByWebsite);
router.get("/pages/:id", page_controller_1.getPageById);
router.post("/pages", page_controller_1.createPage);
router.put("/pages/:id", page_controller_1.updatePage);
router.delete("/pages/:id", page_controller_1.deletePage);
exports.default = router;
