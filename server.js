require('dotenv').config();

const express = require('express');
const connectDB = require('./src/config/database');
const app = express();

const PORT = process.env.PORT


const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
}

startServer();


