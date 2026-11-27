export const properties = {
	hetalbon: {
		name: "Hetalbon Eco Resort",
		senderName: "Hetalbon Eco Resort",
		url: "https://hetalbon.com",
		favicon: "https://hetalbon.com/assets/logo-Fj8GhOgP.png",
		photo: "https://r1imghtlak.mmtcdn.com/6ece26de4e6011ea827d0242ac110002.png?&output-quality=75&downsize=520:350&crop=520:350;22,0&output-format=jpg&downsize=480:336&crop=480:336",
		alt: "Hetalbon Eco Resort",
		heading: "A stay in the Sundarbans",
		followUp: "Our resort team will be in touch soon to help plan your stay.",
		action: "Explore the resort",
		ink: "#153e2c",
		paper: "#eaf2e7",
		background: "#f5f5ef",
		button: "#ffad59",
		buttonText: "#242719"
	},
	machranga: {
		name: "Machranga Cruise",
		senderName: "Machranga Cruise",
		url: "https://machrangacruise.com",
		favicon: "https://machrangacruise.com/assets/machrangapic-pWF2uX2h.png",
		photo: "https://machrangacruise.com/assets/slide4-BOPo3u1g.jpg",
		alt: "Machranga Cruise",
		heading: "The Sundarbans by river",
		followUp: "Our cruise team will be in touch soon to help plan your time on the water.",
		action: "Explore the cruise",
		ink: "#173b72",
		paper: "#eaf3ff",
		background: "#f3f7ff",
		button: "#1d4ed8",
		buttonText: "#ffffff"
	}
};

export type Property = keyof typeof properties;
export type RequestKind = "booking request" | "enquiry";

export function guestAcknowledgement(property: Property, kind: RequestKind) {
	const { name, senderName, url, favicon, photo, alt, heading, followUp, action, ink, paper, background, button, buttonText } = properties[property];
	const subject = `We received your ${kind} | ${name}`;
	const receipt = `Thank you for choosing ${name}. We’ve received your ${kind}.`;
	const textContent = `${receipt} ${followUp}\n\nWarm regards,\n${senderName}\n\n${action}: ${url}`;
	const heroImage = `<img src="${photo}" width="600" alt="${alt}" style="display:block;border:0;width:100%;height:auto">`;
	const htmlContent = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${subject}</title></head>
<body style="margin:0;background:${background};color:${ink};font-family:Arial,Helvetica,sans-serif">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr><td align="center">
<table role="presentation" width="600" cellspacing="0" cellpadding="0" style="width:100%;max-width:600px">
<tr><td align="center" bgcolor="${ink}" style="padding:32px 20px;color:#ffffff">
<p style="margin:0 0 14px;font-size:13px;font-weight:bold;letter-spacing:2px;text-transform:uppercase"><img src="${favicon}" width="36" height="36" alt="" style="display:inline-block;vertical-align:middle;border:0;margin-right:10px;border-radius:4px"><span style="vertical-align:middle">${name}</span></p>
<h1 style="margin:0;font:normal 40px/1.12 Georgia,serif">${heading}</h1>
</td></tr>
<tr><td bgcolor="${paper}">${heroImage}</td></tr>
<tr><td align="center" bgcolor="${paper}" style="padding:36px 24px">
<h2 style="margin:0 0 16px;font:normal 30px/1.2 Georgia,serif">Thank you for getting in touch</h2>
<p style="margin:0 auto 24px;max-width:420px;font-size:16px;line-height:1.6">${receipt} ${followUp}</p>
<a href="${url}" style="display:inline-block;background:${button};color:${buttonText};padding:12px 22px;border-radius:4px;font-size:15px;font-weight:bold;text-decoration:none">${action}</a>
</td></tr>
<tr><td align="center" bgcolor="#ffffff" style="padding:24px;font:16px/1.5 Georgia,serif">Warm regards,<br>${senderName}</td></tr>
</table></td></tr></table></body></html>`;
	return { senderName, subject, textContent, htmlContent };
}
