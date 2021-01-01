"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var multer_1 = require("../config/multer");
var multer_2 = __importDefault(require("multer"));
var path = require('path');
var routes = express_1.Router();
routes.post('/uploadImage', multer_2.default(multer_1.multerConfig).single('file'), function (request, response) {
    return response.json({ Message: 'http://localhost:3020/' + request.file.filename });
});
exports.default = routes;
