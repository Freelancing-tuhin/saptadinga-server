"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.machrangaEnquiryEmail = void 0;
function escapeHtml(value) {
    return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function machrangaEnquiryEmail(kind, fields) {
    const field = (key) => { var _a, _b; return String((_b = (_a = fields[key]) !== null && _a !== void 0 ? _a : fields[key.toLowerCase()]) !== null && _b !== void 0 ? _b : "").trim(); };
    const email = field("Email");
    const phone = field("Phone");
    const link = (href, label) => `<a href="${escapeHtml(href)}" style="color:#174e91;text-decoration:underline">${escapeHtml(label)}</a>`;
    const emailDisplay = /^[^\s@?&#]+@[^\s@?&#]+$/.test(email)
        ? link(`mailto:${email}`, email) : escapeHtml(email);
    const phoneDisplay = /^\+?[\d ().-]+$/.test(phone)
        ? link(`tel:${phone.replace(/[ ().-]/g, "")}`, phone) : escapeHtml(phone);
    const message = escapeHtml(field("Comment")).replace(/\r\n?|\n/g, "<br>");
    const bookingSummary = kind === "Booking" ? `
<h2 style="margin:0 0 8px;font-size:16px">Booking details</h2>
<table width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:24px;border-collapse:collapse">
${["Check-in", "Check-out", "Rooms", "Guests"].map(label => `<tr>
<th scope="row" align="left" style="width:45%;padding:8px 12px;background:#eaf3ff;border-bottom:1px solid #ffffff">${label}</th>
<td style="padding:8px 12px;border-bottom:1px solid #eaf3ff">${escapeHtml(field(label)) || "Unavailable"}</td></tr>`).join("")}
</table>` : "";
    return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;background:#f3f7ff;font:16px/1.5 Arial,Helvetica,sans-serif;color:#18304d">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:20px 10px">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;table-layout:fixed;text-align:left;overflow-wrap:anywhere">
<tr><td bgcolor="#173b72" style="padding:24px;color:#ffffff;border-radius:10px 10px 0 0">
<p style="margin:0 0 6px;font-size:14px">Machranga Cruise</p>
<h1 style="margin:0;font:normal 32px/1.2 Georgia,serif">New ${kind.toLowerCase()} enquiry</h1></td></tr>
<tr><td bgcolor="#ffffff" style="padding:24px">
${bookingSummary}
<h2 style="margin:0 0 8px;font-size:16px">Message</h2>
<p style="margin:0;background:#eaf3ff;border-left:3px solid #4277af;padding:14px 16px">${message || "No message provided"}</p>
<h2 style="margin:24px 0 8px;font-size:16px">Contact details</h2>
<p style="margin:0 0 4px"><strong>${escapeHtml(field("Name")) || "Name unavailable"}</strong></p>
<p style="margin:0 0 4px">Email: ${emailDisplay || "Unavailable"}</p>
<p style="margin:0">Phone: ${phoneDisplay || "Unavailable"}</p>
</td></tr></table></td></tr></table></body></html>`;
}
exports.machrangaEnquiryEmail = machrangaEnquiryEmail;
