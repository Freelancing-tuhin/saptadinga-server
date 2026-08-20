"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePage = exports.updatePage = exports.createPage = exports.getPageById = exports.getPagesByWebsite = void 0;
const page_model_1 = __importDefault(require("../../../../models/page.model"));
const message_1 = require("../../../../constants/message");
const asyncHandler_1 = require("../../../../utils/asyncHandler");
const apiResponse_1 = require("../../../../utils/apiResponse");
const appError_1 = require("../../../../utils/appError");
const string_1 = require("../../../../utils/string");
exports.getPagesByWebsite = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { websiteId } = req.params;
    const { slug } = req.query;
    const query = { websiteId };
    if (slug)
        query.slug = slug;
    const pages = yield page_model_1.default.find(query).sort({ createdAt: -1 });
    return (0, apiResponse_1.sendResult)(res, message_1.MESSAGE.get.succ, pages);
}), message_1.MESSAGE.get.fail);
exports.getPageById = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = yield page_model_1.default.findById(req.params.id);
    return (0, apiResponse_1.sendResult)(res, message_1.MESSAGE.get.succ, page);
}), message_1.MESSAGE.get.fail);
exports.createPage = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { websiteId, name, slug, content } = req.body;
    const page = yield page_model_1.default.create({ websiteId, name, slug, content });
    return (0, apiResponse_1.sendResult)(res, message_1.MESSAGE.post.succ, page);
}), message_1.MESSAGE.post.fail);
exports.updatePage = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, slug, content } = req.body;
    const page = yield page_model_1.default.findByIdAndUpdate(req.params.id, { name, slug, content }, { new: true });
    return (0, apiResponse_1.sendResult)(res, message_1.MESSAGE.put.succ, page);
}), message_1.MESSAGE.put.fail);
/** Deletes a page together with every page nested beneath it (`slug/child`). */
exports.deletePage = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const page = yield page_model_1.default.findById(id);
    if (!page)
        throw (0, appError_1.notFound)("Page not found");
    const { slug, websiteId } = page;
    yield page_model_1.default.deleteMany({
        websiteId,
        $or: [{ _id: id }, { slug: new RegExp(`^${(0, string_1.escapeRegExp)(slug)}/`) }]
    });
    return (0, apiResponse_1.respond)(res, 200, message_1.MESSAGE.delete.succ);
}), message_1.MESSAGE.delete.fail);
