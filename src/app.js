const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(cookieParser());

const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);

const clientRoutes = require("./routes/client.routes");
app.use("/api/clients", clientRoutes);

module.exports = app;
