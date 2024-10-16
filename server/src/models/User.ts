import { Document, model, Schema } from "mongoose";


export interface IUser extends Document {
    clerkId : string;
    email: string;
    photo : string;
    firstName : string;
    lastName : string;
    creaditBalance : number;
}



const userSchema = new Schema<IUser> ({
    clerkId : {
        type : String,
        required: true,
        unique: true,
    },
    email: {
        type : String,
        required: true,
        unique : true,
    },
    photo: {
        type : String,
        required: true,
    },
    firstName : {
        type : String,
    },
    lastName : {
        type : String,
    },
    creaditBalance : {
        type : Number,
        default : 10,
    }
})

const User = model<IUser>("User", userSchema);

export default User;