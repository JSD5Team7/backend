import mongoose from "mongoose";


const coachSchema = mongoose.Schema(
    {
        "id":{
            type:Number,
            require:true
        },
        "name":{
            type:String
        },
        "type":{
            type:String
        },
        "image":{
            type:String
        },
        "des":{
            type:String
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

const coachList = mongoose.model("staff",coachSchema,"staff");
export default coachList;