import express, { json } from "express";
import txdata from "../models/txactModel.js";
import coachList from "../models/staffModel.js";
import tennisDB from '../models/tennisModel.js';


const Router = express.Router();

Router.post("/", async(req,res)=>{
    try {
      const data = req.body
      console.log(data);
      /*process of booking 
        1. create data at TX
        2. update isbooking court
        3. update isbooking coach
      */
      // create data at TX
      const tx = await txdata.create(data);
      // update court booking
      console.log(data.information.user_id,data.information.fname,data.location,data.time,data.date,true)
      await tennisDB.updateOne(
        {
          date: data.date, 
          "court.courtNumber": data.location, 
          "court.slots.startTime": data.time 
        }, 
        { 
          $set: { "court.$[i].slots.$[j].isBooked": true ,"court.$[i].slots.$[j].Booker":data.information.user_id}
        },
        {
          arrayFilters: [ { "i.courtNumber": data.location }, { "j.startTime": data.time } ],
          new: true 
        },
        (err, doc) => {
          if (err) {
            console.error('Error:', err);
          } else {
            console.log('Updated Document:', doc);
          }
        }
      );
  
      //update coach booking
      if(data.day == "btn_tow"){
        //to tomorow
        await coachList.updateOne(
          {
            id:data.coachId,
            "slots_tomr.startTime":data.time
          },
          {
            $set:{ "slots_tomr.$[i].isBooked":true }
          },
          {
            arrayFilters:[{"i.startTime":data.time}],
            new: true
          },
          (err, doc) => {
            if (err) {
              console.error('Error:', err);
            } else {
              console.log('Updated Document:', doc);
            }
          }
        );
      }else{
        //today 
        await coachList.updateOne(
          {
            id:data.coachId,
            "slots_today.startTime":data.time
          },
          {
            $set:{ "slots_today.$[i].isBooked":true }
          },
          {
            arrayFilters:[{"i.startTime":data.time}],
            new: true
          },
          (err, doc) => {
            if (err) {
              console.error('Error:', err);
            } else {
              console.log('Updated Document:', doc);
            }
          }
        );
      }
      return res.status(200).json(tx);
  
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  });


  export default Router;
