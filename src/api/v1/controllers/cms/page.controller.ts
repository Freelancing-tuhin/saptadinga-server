import { Request, Response } from "express";
import PageModel from "../../../../models/page.model";
import { MESSAGE } from "../../../../constants/message";

export const getPagesByWebsite = async (req: Request, res: Response) => {
	try {
		const { websiteId } = req.params;
		const { slug } = req.query;
		const query: any = { websiteId };
		if (slug) {
			query.slug = slug;
		}
		const pages = await PageModel.find(query).sort({ createdAt: -1 });
		return res.status(200).json({
			message: MESSAGE.get.succ,
			result: pages
		});
	} catch (error) {
		console.error("Error fetching pages:", error);
		return res.status(400).json({
			message: MESSAGE.get.fail
		});
	}
};

export const getPageById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const page = await PageModel.findById(id);
		return res.status(200).json({
			message: MESSAGE.get.succ,
			result: page
		});
	} catch (error) {
		console.error("Error fetching page:", error);
		return res.status(400).json({
			message: MESSAGE.get.fail
		});
	}
};

export const createPage = async (req: Request, res: Response) => {
	try {
		const { websiteId, name, slug, content } = req.body;
		const page = new PageModel({ websiteId, name, slug, content });
		await page.save();
		return res.status(200).json({
			message: MESSAGE.post.succ,
			result: page
		});
	} catch (error) {
		console.error("Error creating page:", error);
		return res.status(400).json({
			message: MESSAGE.post.fail
		});
	}
};

export const updatePage = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const { name, slug, content } = req.body;
		const page = await PageModel.findByIdAndUpdate(
			id,
			{ name, slug, content },
			{ new: true }
		);
		return res.status(200).json({
			message: MESSAGE.put.succ,
			result: page
		});
	} catch (error) {
		console.error("Error updating page:", error);
		return res.status(400).json({
			message: MESSAGE.put.fail
		});
	}
};

export const deletePage = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		
		// Find the page first to get its slug and websiteId
		const page = await PageModel.findById(id);
		
		if (!page) {
			return res.status(404).json({
				message: "Page not found"
			});
		}

		const { slug, websiteId } = page;

		// Delete the page and all its children
		// Children will have slugs starting with "slug/"
		await PageModel.deleteMany({
			websiteId,
			$or: [
				{ _id: id },
				{ slug: new RegExp(`^${slug}/`) }
			]
		});

		return res.status(200).json({
			message: MESSAGE.delete.succ
		});
	} catch (error) {
		console.error("Error deleting page:", error);
		return res.status(400).json({
			message: MESSAGE.delete.fail
		});
	}
};
