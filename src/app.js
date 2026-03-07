const express = require("express");
const cookieParser = require("cookie-parser");
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);

const clientRoutes = require("./routes/client.routes");
app.use("/api/clients", clientRoutes);

const invoiceRoutes = require("./routes/invoice.routes");
app.use("/api/invoices",invoiceRoutes);

module.exports = app;
