import { Router } from "express";
const router = Router()
import upload from "../middlewares/multer";
import authUser from "../middlewares/auth";
import ImageController from "../controllers/ImageController";



router.post('/remove-bg', upload.single("image"), authUser, ImageController.removeBgImage)


export default router;
