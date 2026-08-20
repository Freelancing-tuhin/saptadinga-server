import { Request, Response } from "express";
import WebsiteModel from "../../../../models/website.model";
import { MESSAGE } from "../../../../constants/message";
import { asyncHandler } from "../../../../utils/asyncHandler";
import { respond, sendResult } from "../../../../utils/apiResponse";

/** Fields a client is allowed to set on a website. */
const pickWebsiteFields = (body: Record<string, unknown>) => ({
	name: body.name,
	slug: body.slug,
	description: body.description,
	logo: body.logo,
	url: body.url
});

export const getAllWebsites = asyncHandler(async (_req: Request, res: Response) => {
	const websites = await WebsiteModel.find().sort({ createdAt: -1 });

	return sendResult(res, MESSAGE.get.succ, websites);
}, MESSAGE.get.fail);

export const getWebsiteById = asyncHandler(async (req: Request, res: Response) => {
	const website = await WebsiteModel.findById(req.params.id);

	return sendResult(res, MESSAGE.get.succ, website);
}, MESSAGE.get.fail);

export const createWebsite = asyncHandler(async (req: Request, res: Response) => {
	const website = await WebsiteModel.create(pickWebsiteFields(req.body));

	return sendResult(res, MESSAGE.post.succ, website);
}, MESSAGE.post.fail);

export const updateWebsite = asyncHandler(async (req: Request, res: Response) => {
	const website = await WebsiteModel.findByIdAndUpdate(req.params.id, pickWebsiteFields(req.body), { new: true });

	return sendResult(res, MESSAGE.put.succ, website);
}, MESSAGE.put.fail);

export const deleteWebsite = asyncHandler(async (req: Request, res: Response) => {
	await WebsiteModel.findByIdAndDelete(req.params.id);

	return respond(res, 200, MESSAGE.delete.succ);
}, MESSAGE.delete.fail);
