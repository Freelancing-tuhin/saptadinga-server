import { properties, Property } from "./guestAcknowledgement";

function escapeHtml(value: string): string {
	return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

export function enquiryEmail(property: Property, kind: "Booking" | "Contact", fields: Record<string, unknown>): string {
	const { name, ink, paper, background } = properties[property];
	const field = (key: string) => {
		const value = fields[key] ?? fields[key.toLowerCase()] ?? "";
		return (Array.isArray(value) ? value.join(", ") : String(value)).trim();
	};
	const email = field("Email");
	const phone = field("Phone");
	const link = (href: string, label: string) =>
		`<a href="${escapeHtml(href)}" style="color:${ink};text-decoration:underline">${escapeHtml(label)}</a>`;
	const emailDisplay = /^[^\s@?&#]+@[^\s@?&#]+$/.test(email)
		? link(`mailto:${email}`, email) : escapeHtml(email);
	const phoneDisplay = /^\+?[\d ().-]+$/.test(phone)
		? link(`tel:${phone.replace(/[ ().-]/g, "")}`, phone) : escapeHtml(phone);
	const message = escapeHtml(field("Comment")).replace(/\r\n?|\n/g, "<br>");
	const bookingLabels = ["Check-in", "Check-out", "Rooms", "Guests"];
	if (property === "hetalbon" && field("Activities")) bookingLabels.push("Activities");
	const bookingSummary = kind === "Booking" ? `
<h2 style="margin:0 0 8px;font-size:16px">Booking details</h2>
<table width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:24px;border-collapse:collapse">
${bookingLabels.map(label => `<tr>
<th scope="row" align="left" style="width:45%;padding:8px 12px;background:${paper};border-bottom:1px solid #ffffff">${label}</th>
<td style="padding:8px 12px;border-bottom:1px solid ${paper}">${escapeHtml(field(label)) || "Unavailable"}</td></tr>`).join("")}
</table>` : "";
	return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;background:${background};font:16px/1.5 Arial,Helvetica,sans-serif;color:${ink}">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:20px 10px">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;table-layout:fixed;text-align:left;overflow-wrap:anywhere">
<tr><td bgcolor="${ink}" style="padding:24px;color:#ffffff;border-radius:10px 10px 0 0">
<p style="margin:0 0 6px;font-size:14px">${name}</p>
<h1 style="margin:0;font:normal 32px/1.2 Georgia,serif">New ${kind.toLowerCase()} enquiry</h1></td></tr>
<tr><td bgcolor="#ffffff" style="padding:24px">
${bookingSummary}
<h2 style="margin:0 0 8px;font-size:16px">Message</h2>
<p style="margin:0;background:${paper};border-left:3px solid ${ink};padding:14px 16px">${message || "No message provided"}</p>
<h2 style="margin:24px 0 8px;font-size:16px">Contact details</h2>
<p style="margin:0 0 4px"><strong>${escapeHtml(field("Name")) || "Name unavailable"}</strong></p>
<p style="margin:0 0 4px">Email: ${emailDisplay || "Unavailable"}</p>
<p style="margin:0">Phone: ${phoneDisplay || "Unavailable"}</p>
</td></tr></table></td></tr></table></body></html>`;
}
