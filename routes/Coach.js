import express, { json } from "express";
import coachList from "../models/staffModel.js";

const Router = express.Router();

//prefix: coachList
Router.get("/:type",async (req,res)=>{
    try {
      const _type = req.params.type;
      const data = await coachList.find({type:_type});
      // console.log(data.toString());
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
});
Router.get("/:type/:stime",async (req,res)=>{
    try {
      const _type = req.params.type;
      const _starttime = req.params.stime;
      const data = await coachList.find({$and:[{type:_type},{slots_today:{$elemMatch:{startTime:_starttime,isBooked:false}}}]});
      // console.log(data.toString());
      return res.status(200).json(data);

    } catch (error) {
      return res.status(500).json({message: error.message});
    }
});

export default Router;
