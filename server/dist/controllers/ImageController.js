"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
const form_data_1 = __importDefault(require("form-data"));
const User_1 = __importDefault(require("../models/User"));
class ImageController {
    removeBgImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const { clerkId } = req.body;
                const user = yield User_1.default.findOne({ clerkId });
                if (!user) {
                    return res.json({
                        success: false,
                        message: "User not found",
                    });
                }
                if (user.creaditBalance <= 0) {
                    return res.json({
                        success: false,
                        message: "No credit balance"
                    });
                }
                const imagePath = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
                const imageFile = fs_1.default.createReadStream(imagePath);
                const formdata = new form_data_1.default();
                formdata.append('image_file', imageFile);
                const { data } = yield axios_1.default.post("https://clipdrop-api.co/remove-background/v1", formdata, {
                    headers: {
                        "x-api-key": process.env.CLIPDROP_API
                    },
                    responseType: 'arraybuffer',
                });
                const base64Image = Buffer.from(data, 'binary').toString('base64');
                const resultImage = `data:${(_b = req.file) === null || _b === void 0 ? void 0 : _b.mimetype};base64,${base64Image}`;
                user.creaditBalance -= 1;
                const updatedUser = yield user.save();
                res.json({
                    success: true,
                    resultImage,
                    credit: updatedUser.creaditBalance,
                    message: "Background removed"
                });
            }
            catch (error) {
                console.log(error);
                res.json({ success: false, message: error.message });
            }
        });
    }
}
exports.default = new ImageController();
