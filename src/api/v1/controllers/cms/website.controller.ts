import { Request, Response } from "express";
import WebsiteModel from "../../../../models/website.model";
import { MESSAGE } from "../../../../constants/message";

export const getAllWebsites = async (req: Request, res: Response) => {
	try {
		const websites = await WebsiteModel.find().sort({ createdAt: -1 });
		return res.status(200).json({
			message: MESSAGE.get.succ,
			result: websites
		});
	} catch (error) {
		console.error("Error fetching websites:", error);
		return res.status(400).json({
			message: MESSAGE.get.fail
		});
	}
};

export const getWebsiteById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const website = await WebsiteModel.findById(id);
		return res.status(200).json({
			message: MESSAGE.get.succ,
			result: website
		});
	} catch (error) {
		console.error("Error fetching website:", error);
		return res.status(400).json({
			message: MESSAGE.get.fail
		});
	}
};

export const createWebsite = async (req: Request, res: Response) => {
	try {
		const { name, slug, description, logo, url } = req.body;
		const website = new WebsiteModel({ name, slug, description, logo, url });
		await website.save();
		return res.status(200).json({
			message: MESSAGE.post.succ,
			result: website
		});
	} catch (error) {
		console.error("Error creating website:", error);
		return res.status(400).json({
			message: MESSAGE.post.fail
		});
	}
};

export const updateWebsite = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const { name, slug, description, logo, url } = req.body;
		const website = await WebsiteModel.findByIdAndUpdate(
			id,
			{ name, slug, description, logo, url },
			{ new: true }
		);
		return res.status(200).json({
			message: MESSAGE.put.succ,
			result: website
		});
	} catch (error) {
		console.error("Error updating website:", error);
		return res.status(400).json({
			message: MESSAGE.put.fail
		});
	}
};

export const deleteWebsite = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		await WebsiteModel.findByIdAndDelete(id);
		return res.status(200).json({
			message: MESSAGE.delete.succ
		});
	} catch (error) {
		console.error("Error deleting website:", error);
		return res.status(400).json({
			message: MESSAGE.delete.fail
		});
	}
};
