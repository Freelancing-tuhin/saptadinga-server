"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const hetalbon_routes_1 = __importDefault(require("./bookings/hetalbon.routes"));
const machranga_routes_1 = __importDefault(require("./bookings/machranga.routes"));
const contactForm_routes_1 = __importDefault(require("./contactForm.routes"));
const cms_routes_1 = __importDefault(require("./cms.routes"));
/** Every v1 route, mounted under `/api/v1` by the app. */
const router = express_1.default.Router();
router.use("/hetalbon", hetalbon_routes_1.default);
router.use("/machranga", machranga_routes_1.default);
router.use("/contact-form", contactForm_routes_1.default);
router.use("/cms", cms_routes_1.default);
exports.default = router;
