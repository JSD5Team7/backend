
import mongoose from "mongoose";

const tabletennisSchema = mongoose.Schema(
    {
        date:{
            type:String,
        },
        court:[{
            courtNumber:{
                type:Number
            },
            slots:[{
                startTime: String,
                endTime: String,
                isBooked: Boolean,
                Booker:String
            }]
        }]
    },
    {
        timesstamps: true
    }
)

const tabletennisDB = mongoose.model("reserve_tabletennis",tabletennisSchema,"reserve_tabletennis")
export default tabletennisDB;