import express, { json } from "express";
import tabletennisDB from "../models/tabletennisModel.js";

const Router = express.Router();

Router.get("/:date",async (req,res)=>{
    try {
        const date = req.params.date;
        console.log(date);
        const data = await tabletennisDB.find({date:date});
        console.log(data.toString());
        let _court = [];
        if(data.length > 0){
          _court = data[0].court;
        }else{
          _court = [];
        }
        res.status(200).json(_court);
        return;
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(500).json({message: error.message});
    }
  });


  Router.get("/:court/:date",async (req,res)=>{
    try {
        const _court = req.params.court;
        const date = req.params.date; //date form frontEnd 
        // console.log(_court,date);
        if(date){
          // console.log(_court);
          // thank god and holy thing,for it working.
          const data = await tabletennisDB.find({date:date},{court:{$elemMatch:{courtNumber:_court}}});
          // console.log(data);
          if(data.length > 0){
            const time = data[0].court[0].slots;
            // console.log(time);
            return res.status(200).json(time);
          }else{
            return res.status(200).json([]);
          }
        }else{
          return console.log("date is false");
        }
        // const times = await tennis_reserve.find();
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  });


export default Router;