
import { BSON } from "mongodb";
import mongoose from "mongoose";


const txSchema = mongoose.Schema(
    {
        "tx_id":{
            type:String,
            require:true
        },
        "type":{
            type:String
        },
        "location":{
            type:String
        },
        "date":{
            type:Date
        },
        "time":{
            type:String
        },
        "iscoach":{
            type:Boolean
        },
        "coachName":{
            type:String
        },
        "activity":{
            type:String
        },
        "information":{
            user_id:Number,
            fname:String,
            lname:String,
            phone:String,
            desc:String
        }
    }
)
const txdata = mongoose.model("tx_activity",txSchema,"tx_activity");
export default txdata;