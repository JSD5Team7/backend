
import { BSON, ObjectId } from "mongodb";
import mongoose from "mongoose";


const txSchema = mongoose.Schema(
    {
        "type":{
            type:String
        },
        "location":{
            type:String
        },
        "date":{
            type:String
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
        "coachId":{
            type:String
        },
        "activity":{
            type:String
        },
        "information":{
            user_id:String,
            fname:String,
            lname:String,
            phone:String,
            desc:String
        }
    }
)
const txdata = mongoose.model("tx_activity",txSchema,"tx_activity");
export default txdata;