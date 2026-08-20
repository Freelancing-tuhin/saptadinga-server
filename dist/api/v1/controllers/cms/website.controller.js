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
exports.deleteWebsite = exports.updateWebsite = exports.createWebsite = exports.getWebsiteById = exports.getAllWebsites = void 0;
const website_model_1 = __importDefault(require("../../../../models/website.model"));
const message_1 = require("../../../../constants/message");
const asyncHandler_1 = require("../../../../utils/asyncHandler");
const apiResponse_1 = require("../../../../utils/apiResponse");
/** Fields a client is allowed to set on a website. */
const pickWebsiteFields = (body) => ({
    name: body.name,
    slug: body.slug,
    description: body.description,
    logo: body.logo,
    url: body.url
});
exports.getAllWebsites = (0, asyncHandler_1.asyncHandler)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const websites = yield website_model_1.default.find().sort({ createdAt: -1 });
    return (0, apiResponse_1.sendResult)(res, message_1.MESSAGE.get.succ, websites);
}), message_1.MESSAGE.get.fail);
exports.getWebsiteById = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const website = yield website_model_1.default.findById(req.params.id);
    return (0, apiResponse_1.sendResult)(res, message_1.MESSAGE.get.succ, website);
}), message_1.MESSAGE.get.fail);
exports.createWebsite = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const website = yield website_model_1.default.create(pickWebsiteFields(req.body));
    return (0, apiResponse_1.sendResult)(res, message_1.MESSAGE.post.succ, website);
}), message_1.MESSAGE.post.fail);
exports.updateWebsite = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const website = yield website_model_1.default.findByIdAndUpdate(req.params.id, pickWebsiteFields(req.body), { new: true });
    return (0, apiResponse_1.sendResult)(res, message_1.MESSAGE.put.succ, website);
}), message_1.MESSAGE.put.fail);
exports.deleteWebsite = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield website_model_1.default.findByIdAndDelete(req.params.id);
    return (0, apiResponse_1.respond)(res, 200, message_1.MESSAGE.delete.succ);
}), message_1.MESSAGE.delete.fail);
