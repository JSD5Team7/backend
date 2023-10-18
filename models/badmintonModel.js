import mongoose from "mongoose";

const babmintonSchema = mongoose.Schema(
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

const badmintonDB = mongoose.model("reserve_badminton",babmintonSchema,"reserve_badminton");
export default badmintonDB;