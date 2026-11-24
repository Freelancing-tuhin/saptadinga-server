import { guestAcknowledgement, Property, RequestKind } from "./guestAcknowledgement";
import axios from "axios";
import config from "../../config/config";

interface MailMessage {
	senderName?: string;
	to: { email: string }[];
	cc?: { email: string }[];
	subject: string;
	textContent: string;
	htmlContent?: string;
}

async function sendMail(recordId: string, { senderName, ...message }: MailMessage): Promise<void> {
	const { apiKey: key, senderEmail: sender } = config.brevo;
	if (!key || !sender) {
		console.error("Brevo configuration missing for enquiry", recordId);
		return;
	}

	try {
		await axios.post("https://api.brevo.com/v3/smtp/email", {
			sender: { email: sender, name: senderName },
			...message
		}, { headers: { "api-key": key }, timeout: 10000 });
	} catch (error) {
		console.error("Brevo email failed", message.subject, recordId, axios.isAxiosError(error) ? error.response?.status ?? error.code : "unknown");
	}
}

export function sendEnquiry(subject: string, recordId: string, fields: Record<string, unknown>): Promise<void> {
	return sendMail(recordId, {
		to: [{ email: "enquiry@hetalbon.com" }],
		cc: [{ email: "prosenjit.kpa@gmail.com" }],
		subject,
		textContent: Object.entries(fields).map(([label, value]) => `${label}: ${value ?? ""}`).join("\n")
	});
}

export async function sendGuestAcknowledgement(property: Property, kind: RequestKind, recordId: string, guestEmail?: string): Promise<void> {
	const email = guestEmail?.trim();
	if (!email) return;

	await sendMail(recordId, {
		to: [{ email }],
		...guestAcknowledgement(property, kind)
	});
}
