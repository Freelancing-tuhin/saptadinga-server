import express from "express";

const app = express();

app.use("/hetalbon", require("./bookings/hetalbon.routes"));

app.use("/machranga", require("./bookings/machranga.routes"));

module.exports = app;
