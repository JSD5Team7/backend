import express, { json } from "express";
import txdata from "../models/txactModel.js";
import coachList from "../models/staffModel.js";
import tennisDB from '../models/tennisModel.js';
import badmintonDB from "../models/badmintonModel.js";
import tabletennisDB from "../models/tabletennisModel.js";
import yogaDB from "../models/yogaModel.js";
import aerobicDB from "../models/aerobicModel.js";


const createTxactivity = async(data)=>{
  try {
    return await txdata.create(data);
  } catch (error) {
    console.log(error);
  }
}
const updateTennisBooking = async (data)=>{
  try {
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
    return;
  } catch (error) {
    console.log(error);
  }
}
const updateBadmintonBooking = async(data)=>{
  try {
    await badmintonDB.updateOne(
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
    return;
  } catch (error) {
    console.log(error);
  }
}
const updateTabletennisBooking = async (data)=>{
  try {
    await tabletennisDB.updateOne(
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
    return;
  } catch (error) {
    console.log(error);
  }
}
const updateYogaBooking = async (data)=>{
  try {
    await yogaDB.updateOne(
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
    return;
  } catch (error) {
    console.log(error);
  }
}
const updateAerobicBooking = async (data)=>{
  try {
    await aerobicDB.updateOne(
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
    return;
  } catch (error) {
    console.log(error);
  }
}

const txsummit = async (req,res,next)=>{
  try {
      const data = req.body
      const sport = req.params.sport;
      console.log(data,sport);
      // 1.create data at TX
      const tx = createTxactivity(data);
      // 2.update court booking
      console.log(data.information.user_id,data.information.fname,data.location,data.time,data.date,true)
      switch(sport){
        case "tennis":
          updateTennisBooking(data);
          break;
        case "badminton":
          updateBadmintonBooking(data);
          break;
        case "tabletennis":
          updateTabletennisBooking(data);
          break;
        case "yoga":
          updateYogaBooking(data);
          break;
        case "aerobic":
          updateAerobicBooking(data);
          break;
      }
      //3.update coach booking
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
    next(error);
  }
}

export default {txsummit}

