import { Request, Response } from "express";
import { FilterQuery } from "mongoose";
import PageModel from "../../../../models/page.model";
import { MESSAGE } from "../../../../constants/message";
import { asyncHandler } from "../../../../utils/asyncHandler";
import { respond, sendResult } from "../../../../utils/apiResponse";
import { notFound } from "../../../../utils/appError";
import { escapeRegExp } from "../../../../utils/string";

export const getPagesByWebsite = asyncHandler(async (req: Request, res: Response) => {
	const { websiteId } = req.params;
	const { slug } = req.query;

	const query: FilterQuery<Record<string, unknown>> = { websiteId };
	if (slug) query.slug = slug;

	const pages = await PageModel.find(query).sort({ createdAt: -1 });

	return sendResult(res, MESSAGE.get.succ, pages);
}, MESSAGE.get.fail);

export const getPageById = asyncHandler(async (req: Request, res: Response) => {
	const page = await PageModel.findById(req.params.id);

	return sendResult(res, MESSAGE.get.succ, page);
}, MESSAGE.get.fail);

export const createPage = asyncHandler(async (req: Request, res: Response) => {
	const { websiteId, name, slug, content } = req.body;
	const page = await PageModel.create({ websiteId, name, slug, content });

	return sendResult(res, MESSAGE.post.succ, page);
}, MESSAGE.post.fail);

export const updatePage = asyncHandler(async (req: Request, res: Response) => {
	const { name, slug, content } = req.body;
	const page = await PageModel.findByIdAndUpdate(req.params.id, { name, slug, content }, { new: true });

	return sendResult(res, MESSAGE.put.succ, page);
}, MESSAGE.put.fail);

/** Deletes a page together with every page nested beneath it (`slug/child`). */
export const deletePage = asyncHandler(async (req: Request, res: Response) => {
	const { id } = req.params;

	const page = await PageModel.findById(id);
	if (!page) throw notFound("Page not found");

	const { slug, websiteId } = page;

	await PageModel.deleteMany({
		websiteId,
		$or: [{ _id: id }, { slug: new RegExp(`^${escapeRegExp(slug)}/`) }]
	});

	return respond(res, 200, MESSAGE.delete.succ);
}, MESSAGE.delete.fail);
