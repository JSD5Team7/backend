import mongoose from "mongoose";

const yogaSchema = mongoose.Schema(
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

const yogaDB = mongoose.model("reserve_yoga",yogaSchema,"reserve_yoga");
export default yogaDB;