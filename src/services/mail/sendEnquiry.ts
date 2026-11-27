import { guestAcknowledgement, Property, RequestKind } from "./guestAcknowledgement";
import axios from "axios";
import config from "../../config/config";

interface MailMessage {
	senderName?: string;
	senderEmail?: string;
	to: { email: string }[];
	cc?: { email: string }[];
	subject: string;
	textContent: string;
	htmlContent?: string;
}

async function sendMail(recordId: string, { senderName, senderEmail, ...message }: MailMessage): Promise<void> {
	const key = config.brevo.apiKey;
	const sender = senderEmail || config.brevo.senderEmail;
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

export function sendEnquiry(
	subject: string,
	recordId: string,
	fields: Record<string, unknown>,
	kind: "Booking" | "Contact",
	property?: Property
): Promise<void> {
	return sendMail(recordId, {
		senderEmail: property ? config.brevo.senderEmails[property] : undefined,
		senderName: property ? `${property === "hetalbon" ? "Hetalbon" : "Machranga"} ${kind} enquiry` : undefined,
		to: [{ email: "enquiry@hetalbon.com" }],
		cc: [{ email: "prosenjit.kpa@gmail.com" }, { email: "tuhin81018@gmail.com" }],
		subject,
		textContent: Object.entries(fields).map(([label, value]) => `${label}: ${value ?? ""}`).join("\n")
	});
}

export async function sendGuestAcknowledgement(property: Property, kind: RequestKind, recordId: string, guestEmail?: string): Promise<void> {
	const email = guestEmail?.trim();
	if (!email) return;

	await sendMail(recordId, {
		senderEmail: config.brevo.senderEmails[property],
		to: [{ email }],
		...guestAcknowledgement(property, kind)
	});
}
