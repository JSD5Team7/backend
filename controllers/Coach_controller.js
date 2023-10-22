import express, { json } from "express";
import coachList from "../models/staffModel.js";

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
        const data = await coachList.find({$and:[{type:_type},{slots_today:{$elemMatch:{startTime:_starttime,isBooked:false}}} ]});
        console.log(data);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}
const coachWhoOther = async(req,res)=>{
    try {
        const _type = req.params.type;
        const _starttime = req.params.stime;
        const _whoid = req.params.whoid;
        const data = await coachList.find( { $or:[{id:_whoid},{$and:[{type:_type},{slots_today:{$elemMatch:{startTime:_starttime,isBooked:false}}}]}]   });
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
