import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        "user_id":{
            type:String
        },
        "username": {
            type:String
        },
        "password": {
            type:String
        },
        "role": {
            type: String,
            default: 'user'
        },
        "isActive": {
            type: Boolean,
            default: true
        },
        "fname":{
            type:String
        },
        "lname":{
            type:String
        },
        "age":{
            type:String
        },
        "email":{
            type:String
        },
        "phone":{
            type:String
        }
    },
    {
        timesstamps: true
    }
);
 const userDB = mongoose.model("user",userSchema,"user");
export default userDB;