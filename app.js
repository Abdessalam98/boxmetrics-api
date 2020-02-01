// eslint-disable-next-line no-unused-vars
const dotenv = require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const mongoose = require("mongoose");
const database = require("./database");
const logger = require("morgan");
const helmet = require("helmet");
const validator = require("./utils/validator");
const cors = require("cors");
const app = express();

// cors
app.use(cors());

// security
app.use(helmet());

// logger
app.use(logger("dev"));

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// database connection
database.connect();

// routes
app.use(require("./routes"));

// catch 404 and forward to error handler
app.use((req, res, next) => {
	res.json({
		statusCode: 404,
		error: "Not found",
		message: `Cannot ${req.method} ${req.originalUrl}`
	}).status(404);
});

// error handler
app.use((error, req, res) => {
	const statusCode = error.status || 500;
	res.json({
		statusCode,
		error: "Internal error",
		message: error.message
	}).status(statusCode);
});

module.exports = app;
