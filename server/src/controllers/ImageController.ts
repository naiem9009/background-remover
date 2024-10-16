import axios from "axios"
import fs from "fs"
import FormData from "form-data"
import User from "../models/User"
import { Request, Response } from "express"

class ImageController {
     async removeBgImage (req:Request, res:Response) : Promise<any> {
        try {

            const {clerkId} = req.body;

            const user = await User.findOne({clerkId});

            if (!user) {
                return res.json({
                    success: false,
                    message: "User not found",
                })
            }

            if (user.creaditBalance <= 0) {
                return res.json({
                    success: false,
                    message : "No credit balance"
                })
            }

            const imagePath = req.file?.path!;
            const imageFile = fs.createReadStream(imagePath);

            const formdata = new FormData();

            formdata.append('image_file', imageFile)

            const {data} = await axios.post("https://clipdrop-api.co/remove-background/v1", formdata, {
                headers : {
                    "x-api-key" : process.env.CLIPDROP_API
                },
                responseType : 'arraybuffer',
            })

            const base64Image = Buffer.from(data, 'binary').toString('base64');

            const resultImage = `data:${req.file?.mimetype};base64,${base64Image}`


            user.creaditBalance -= 1;

            const updatedUser = await user.save();
            

            res.json({
                success: true,
                resultImage,
                credit : updatedUser.creaditBalance,
                message : "Background removed"
            })
            
        } catch (error:any) {
            console.log(error);
            res.json({success: false, message: error.message})
            
        }
     }
}


export default new ImageController()