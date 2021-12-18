const serverless = require('serverless-http');
const express = require('express')

const app = express();
app.use(express.json()); // Adding a Middleware

// Setup Routes
require("./routes")(app);

module.exports.handler = serverless(app);