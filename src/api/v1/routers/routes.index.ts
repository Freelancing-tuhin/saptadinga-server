import express from "express";

const app = express();

app.use("/hetalbon", require("./bookings/hetalbon.routes"));
app.use("/machranga", require("./bookings/machranga.routes"));
app.use("/contact-form", require("./contactForm.routes"));
app.use("/cms", require("./cms.routes"));


module.exports = app;
