import mongoose from "mongoose";

const tennisSchema = mongoose.Schema(
    {
        courtName:{
            type:Number,
            require:true
        },
        slots_today:[{
            startTime: String,
            endTime: String,
            isBooked: Boolean
        }],
        slots_tomr:[{
            startTime: String,
            endTime: String,
            isBooked: Boolean
        }]
    },
    {
        timesstamps: true
    }
)

const tennisCourt = mongoose.model("tennis_reserve",tennisSchema,"tennis_reserve");
export default tennisCourt;