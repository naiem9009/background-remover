import { Request, Response } from "express";
import { Webhook } from "svix";
import User from "../models/User";

class UserController {
    async clerkWebhooks (req:Request, res:Response) {
        try {
            // create svix instance with clerk webhook secret
            const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET!)

            await webhook.verify(JSON.stringify(req.body), {
                "svix-id" : req.headers["svix-id"] as unknown as string,
                "svix-timestamp" : req.headers["svix-timestamp"] as string,
                "svix-signature" : req.headers["svix-signature"] as string,

            })


            const {data, type} = req.body;

            switch (type) {
                case "user.created":
                    const userData = {
                        clerkId: data.id,
                        email: data.email_addresses[0].email_address,
                        firstName : data.first_name,
                        lastName : data.last_name,
                        photo: data.image_url

                    }

                    await User.create(userData);

                    res.json({})
                    break;

                case "user.updated":
                    const userUpdatedData = {
                        email: data.email_addresses[0].email_address,
                        firstName : data.first_name,
                        lastName : data.last_name,
                        photo: data.image_url
                    }

                    await User.findOneAndUpdate({clerkId: data.id}, userUpdatedData)

                    res.json({})
                    break;

                case "user.deleted":
                    await User.findOneAndDelete({clerkId: data.id})
                    res.json({})
                    break;
            
                default:
                    break;
            }
        } catch (error:any) {
            console.log(error);
            res.json({success: false, message : error.message})
        }
    }


    async userCredit (req:Request, res:Response) {
        try {
            const {clerkId} = req.body;

            const userData = await User.findOne({clerkId})

            res.json({success : true, credits : userData?.creaditBalance})
            
        } catch (error:any) {
            console.log(error);
            res.json({success: false, message: error.message})
            
        }
    }
}



export default new UserController()