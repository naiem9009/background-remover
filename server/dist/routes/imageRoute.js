"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const multer_1 = __importDefault(require("../middlewares/multer"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const ImageController_1 = __importDefault(require("../controllers/ImageController"));
router.post('/remove-bg', multer_1.default.single("image"), auth_1.default, ImageController_1.default.removeBgImage);
exports.default = router;
