import express, { json } from "express";
import coachList from "../models/staffModel.js";
import staffScheduleModel from "../models/staffScheduleModel.js";

const coachAll = async(req,res)=>{
    try {
        const data = await coachList.find({});
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
    }
}
const coachType = async(req,res)=>{
    try {
        const _type = req.params.type;
        const data = await coachList.find({type:_type});
    } catch (error) {
        console.log(error);
    }
}
const coachAvaTime = async(req,res)=>{
    try {
        const _type = req.params.type;
        const _starttime = req.params.stime;
        const _date = req.params.date;
        console.log(_type,_starttime,_date)
        const data = await staffScheduleModel.aggregate([
            { $match: { date: _date } },
            { $unwind: "$staff" },
            { $match: { "staff.type": _type} },
            { $unwind: "$staff.slots" },
            { $match: { 
                "staff.slots.startTime": _starttime, 
                "staff.slots.isBooked": false 
            }},
            { $replaceRoot: { newRoot: "$staff" } }
        ])
            .then(
                console.log("finding")
            )
            .catch(err => console.error(err));
        console.log(data);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}
const coachWhoOther = async(req,res)=>{
    try {
        const _date = req.params.date;
        const _type = req.params.type;
        const _starttime = req.params.stime;
        const _whoid = req.params.whoid;
        console.log(_date,_type,_starttime,_whoid);
        const data = await staffScheduleModel.aggregate([
            { $match: { date: _date } },
            { $unwind: "$staff" },
            { $match: { "staff.type": _type} },
            { $unwind: "$staff.slots" },
            { $match: { 
                "staff.slots.startTime": _starttime, 
                "staff.slots.isBooked": false 
            }},
            { $replaceRoot: { newRoot: "$staff" }}
        ]);
        console.log(data);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}

export default {coachType,
                coachAll,
                coachAvaTime,
                coachWhoOther
            }
