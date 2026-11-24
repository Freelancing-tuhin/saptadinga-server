"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.guestAcknowledgement = void 0;
const properties = {
    hetalbon: {
        name: "Hetalbon Eco Resort",
        senderName: "Hetalbon Eco Resort",
        url: "https://hetalbon.com",
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Sundarban_Tiger.jpg/960px-Sundarban_Tiger.jpg",
        alt: "Bengal tiger beside a canal in the Sundarbans. Photo by Soumyajit Nandy, CC BY-SA 4.0.",
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
        photo: "https://www.yoyotripsindia.com/images/package/eoHG24yCWc/banner3.jpg",
        alt: "",
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
function guestAcknowledgement(property, kind) {
    const { name, senderName, url, photo, alt, heading, followUp, action, ink, paper, background, button, buttonText } = properties[property];
    const subject = `We received your ${kind} | ${name}`;
    const receipt = `Thank you for choosing ${name}. We’ve received your ${kind}.`;
    const textContent = `${receipt} ${followUp}\n\nWarm regards,\n${senderName}\n\n${action}: ${url}`;
    const image = `<img src="${photo}" width="600" alt="${alt}" style="display:block;border:0;width:100%;height:auto">`;
    const heroImage = property === "hetalbon"
        ? `<a href="https://commons.wikimedia.org/wiki/File:Sundarban_Tiger.jpg">${image}</a>`
        : image;
    const htmlContent = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${subject}</title></head>
<body style="margin:0;background:${background};color:${ink};font-family:Arial,Helvetica,sans-serif">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr><td align="center">
<table role="presentation" width="600" cellspacing="0" cellpadding="0" style="width:100%;max-width:600px">
<tr><td align="center" bgcolor="${ink}" style="padding:32px 20px;color:#ffffff">
<p style="margin:0 0 14px;font-size:13px;font-weight:bold;letter-spacing:2px;text-transform:uppercase">${name}</p>
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
exports.guestAcknowledgement = guestAcknowledgement;
