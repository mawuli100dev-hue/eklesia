"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var cors = require('cors');
var dotenv = require("dotenv");
dotenv.config();
var readingRoute_1 = require("./routes/readingRoute");
var app = express();
app.use(cors());
app.use(express.json());
// Routes
app.use('/api/lections', readingRoute_1.default);
exports.default = app;
