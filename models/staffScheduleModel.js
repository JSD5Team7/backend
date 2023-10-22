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
            }
        ]
    }
);

const staffScheduleModel = mongoose.model("staff_schedule",coachSchSchema,"staff_schedule");
export default staffScheduleModel;