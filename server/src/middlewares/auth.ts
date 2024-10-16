import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"


const authUser = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
    try {

        const {token} = req.headers;
        
        
        if (!token) {
            res.status(401).json({ success: false, message: "Not Authorized, token missing." });
        }

        const token_decode = jwt.decode(token as string); 

        console.log("token_decode", token_decode);
        
        
        req.body.clerkId = (token_decode as any).clerkId;

        next();

    } catch (error: any) {
        console.error("Authentication error: ", error);
        res.status(403).json({ success: false, message: "Invalid token, please log in again." });
    }
};


export default authUser;