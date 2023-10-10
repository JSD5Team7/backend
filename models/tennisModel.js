import mongoose from "mongoose";

const tennisSchema = mongoose.Schema(
    {
        courtName:{
            type:Number,
            require:true
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