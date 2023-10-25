import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        "username": {
            type:String,
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
        "img": {
            type:String
        },
        "fname":{
            type:String
        },
        "lname":{
            type:String
        },
        "gender":{
            type:String
        },
        "birthday":{
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