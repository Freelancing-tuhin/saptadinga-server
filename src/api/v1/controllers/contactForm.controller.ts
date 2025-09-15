import { Request, Response } from "express";
import ContactFormModel from "../../../models/contactForm.model";
import { MESSAGE } from "../../../constants/message";

export const submitContactForm = async (req: Request, res: Response) => {
	try {
		const { name, email, phone, comment, tag } = req.body;
		const contact = new ContactFormModel({ name, email, phone, comment, tag });
		await contact.save();
		return res.status(200).json({
			message: MESSAGE.post.succ,
			result: contact
		});
	} catch (error) {
		console.error("Error submitting contact form:", error);
		return res.status(400).json({
			message: MESSAGE.post.fail
		});
	}
};

export const getContactForms = async (req: Request, res: Response) => {
	try {
		const contacts = await ContactFormModel.find().sort({ createdAt: -1 });
		return res.status(200).json({
			message: MESSAGE.get.succ,
			result: contacts
		});
	} catch (error) {
		console.error("Error fetching contact forms:", error);
		return res.status(400).json({
			message: MESSAGE.get.fail
		});
	}
};
