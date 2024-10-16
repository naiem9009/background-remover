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
const svix_1 = require("svix");
const User_1 = __importDefault(require("../models/User"));
class UserController {
    clerkWebhooks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // create svix instance with clerk webhook secret
                const webhook = new svix_1.Webhook(process.env.CLERK_WEBHOOK_SECRET);
                yield webhook.verify(JSON.stringify(req.body), {
                    "svix-id": req.headers["svix-id"],
                    "svix-timestamp": req.headers["svix-timestamp"],
                    "svix-signature": req.headers["svix-signature"],
                });
                const { data, type } = req.body;
                switch (type) {
                    case "user.created":
                        const userData = {
                            clerkId: data.id,
                            email: data.email_addresses[0].email_address,
                            firstName: data.first_name,
                            lastName: data.last_name,
                            photo: data.image_url
                        };
                        yield User_1.default.create(userData);
                        res.json({});
                        break;
                    case "user.updated":
                        const userUpdatedData = {
                            email: data.email_addresses[0].email_address,
                            firstName: data.first_name,
                            lastName: data.last_name,
                            photo: data.image_url
                        };
                        yield User_1.default.findOneAndUpdate({ clerkId: data.id }, userUpdatedData);
                        res.json({});
                        break;
                    case "user.deleted":
                        yield User_1.default.findOneAndDelete({ clerkId: data.id });
                        res.json({});
                        break;
                    default:
                        break;
                }
            }
            catch (error) {
                console.log(error);
                res.json({ success: false, message: error.message });
            }
        });
    }
    userCredit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { clerkId } = req.body;
                const userData = yield User_1.default.findOne({ clerkId });
                res.json({ success: true, credits: userData === null || userData === void 0 ? void 0 : userData.creaditBalance });
            }
            catch (error) {
                console.log(error);
                res.json({ success: false, message: error.message });
            }
        });
    }
}
exports.default = new UserController();
