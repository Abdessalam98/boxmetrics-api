// eslint-disable-next-line no-unused-vars
const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const database = require("./database");
const logger = require("morgan");
const helmet = require("helmet");
const validator = require("./utils/validator");
const cors = require("cors");
const app = express();

// security
app.use(helmet());

// cors
app.use(cors());

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
	res.status(404).json({
		statusCode: 404,
		error: "Not found",
		message: `Cannot ${req.method} ${req.originalUrl}`
	});
});

// error handler
app.use((error, req, res) => {
	const statusCode = error.status || 500;
	res.status(statusCode).json({
		statusCode,
		error: "Internal error",
		message: error.message
	});
});

module.exports = app;
