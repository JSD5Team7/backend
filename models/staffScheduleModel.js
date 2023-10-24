import mongoose from "mongoose";

const coachSchSchema = mongoose.Schema(
    {
        "date":{
            type:String
        },
        "staff":[
            {
                id:{
                    type:Number
                },
                slots:[{
                    startTime: String,
                    endTime: String,
                    isBooked: Boolean
                }],
            }
        ]
    }
);

const staffScheduleModel = mongoose.model("staff_schedule",coachSchSchema,"staff_schedule");
export default staffScheduleModel;