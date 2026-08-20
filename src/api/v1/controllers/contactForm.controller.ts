import { Request, Response } from "express";
import ContactFormModel from "../../../models/contactForm.model";
import { MESSAGE } from "../../../constants/message";
import { asyncHandler } from "../../../utils/asyncHandler";
import { sendResult } from "../../../utils/apiResponse";

export const submitContactForm = asyncHandler(async (req: Request, res: Response) => {
	const { name, email, phone, comment, tag } = req.body;
	const contact = await ContactFormModel.create({ name, email, phone, comment, tag });

	return sendResult(res, MESSAGE.post.succ, contact);
}, MESSAGE.post.fail);

export const getContactForms = asyncHandler(async (_req: Request, res: Response) => {
	const contacts = await ContactFormModel.find().sort({ createdAt: -1 });

	return sendResult(res, MESSAGE.get.succ, contacts);
}, MESSAGE.get.fail);
