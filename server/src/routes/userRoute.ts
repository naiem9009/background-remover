import { Router } from "express";
import UserController from "../controllers/UserController";
import authUser from "../middlewares/auth";
const router = Router()




router.post("/webhook", UserController.clerkWebhooks)
router.get("/credits", authUser, UserController.userCredit)



export default router