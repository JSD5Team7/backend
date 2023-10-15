import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        "user_id":{
            type:String
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
        },
        "desc":{
            type:String
        }
    },
    {
        timesstamps: true
    }
);
 const userDB = mongoose.model("user",userSchema,"user");
export default userDB;