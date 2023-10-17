import mongoose from "mongoose";

const aerobicSchema = mongoose.Schema(
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

const aerobicDB = mongoose.model("reserve_aerobic",aerobicSchema,"reserve_aerobic");
export default aerobicDB;
