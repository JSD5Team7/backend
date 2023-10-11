import mongoose from "mongoose";

const tennisSchema = mongoose.Schema(
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
                isBooked: Boolean
            }]
        }]
    },
    {
        timesstamps: true
    }
)

const tennisCourt = mongoose.model("tennis_reserve",tennisSchema,"tennis_reserve");
export default tennisCourt;