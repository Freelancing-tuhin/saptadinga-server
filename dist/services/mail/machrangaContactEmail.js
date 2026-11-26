"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.machrangaContactEmail = void 0;
function escapeHtml(value) {
    return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function machrangaContactEmail(fields) {
    const field = (key) => { var _a; return String((_a = fields[key]) !== null && _a !== void 0 ? _a : "").trim(); };
    const email = field("email");
    const phone = field("phone");
    const link = (href, label) => `<a href="${escapeHtml(href)}" style="color:#174e91;text-decoration:underline">${escapeHtml(label)}</a>`;
    const emailDisplay = /^[^\s@?&#]+@[^\s@?&#]+$/.test(email)
        ? link(`mailto:${email}`, email) : escapeHtml(email);
    const phoneDisplay = /^\+?[\d ().-]+$/.test(phone)
        ? link(`tel:${phone.replace(/[ ().-]/g, "")}`, phone) : escapeHtml(phone);
    const message = escapeHtml(field("comment")).replace(/\r\n?|\n/g, "<br>");
    return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;background:#f3f7ff;font:16px/1.5 Arial,Helvetica,sans-serif;color:#18304d">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:20px 10px">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;table-layout:fixed;text-align:left;overflow-wrap:anywhere">
<tr><td bgcolor="#173b72" style="padding:24px;color:#ffffff;border-radius:10px 10px 0 0">
<p style="margin:0 0 6px;font-size:14px">Machranga Cruise</p>
<h1 style="margin:0;font:normal 32px/1.2 Georgia,serif">New contact enquiry</h1></td></tr>
<tr><td bgcolor="#ffffff" style="padding:24px">
<h2 style="margin:0 0 8px;font-size:16px">Message</h2>
<p style="margin:0;background:#eaf3ff;border-left:3px solid #4277af;padding:14px 16px">${message || "No message provided"}</p>
<h2 style="margin:24px 0 8px;font-size:16px">Contact details</h2>
<p style="margin:0 0 4px"><strong>${escapeHtml(field("name")) || "Name unavailable"}</strong></p>
<p style="margin:0 0 4px">Email: ${emailDisplay || "Unavailable"}</p>
<p style="margin:0">Phone: ${phoneDisplay || "Unavailable"}</p>
</td></tr></table></td></tr></table></body></html>`;
}
exports.machrangaContactEmail = machrangaContactEmail;
