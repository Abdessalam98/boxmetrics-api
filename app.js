// eslint-disable-next-line no-unused-vars
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const logger = require("morgan");
const helmet = require("helmet");
const expressValidator = require("express-validator");
const customValidators = require("./utils/customValidators");
const cors = require("cors");
const app = express();

app.use(cors());

// body-parser
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: false
	})
);

app.use(helmet());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// database connection
mongoose.connect(
	process.env.DB_URL,
	{ useCreateIndex: true, useNewUrlParser: true },
	error => {
		if (error) {
			throw error;
		}
		// eslint-disable-next-line no-console
		console.log("🚀 Successfully connected to database !");
	}
);

// express validator
app.use(
	expressValidator({
		customValidators
	})
);

// routes
app.use(require("./routes"));

// catch 404 and forward to error handler
app.use((req, res, next) => {
	next(createError(404, `Cannot ${req.method} ${req.originalUrl}`));
});

// error handler
app.use((err, req, res) => {
	res.status(err.status || 500);
	res.send(err.message);
});

module.exports = app;
