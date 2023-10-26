import express, { json } from "express";
import txdata from "../models/txactModel.js";
import coachList from "../models/staffModel.js";
import tennisDB from '../models/tennisModel.js';
import badmintonDB from "../models/badmintonModel.js";
import tabletennisDB from "../models/tabletennisModel.js";
import yogaDB from "../models/yogaModel.js";
import aerobicDB from "../models/aerobicModel.js";
import staffScheduleModel from "../models/staffScheduleModel.js";
import { ObjectId } from "mongodb";


const createTxactivity = async(data)=>{
  try {
    return await txdata.create(data);
  } catch (error) {
    console.log(error);
  }
}
const updateTennisBooking = async (data,isbooked,booker)=>{
  try {
    await tennisDB.updateOne(
      {
        "date": data.date, 
        "court.courtNumber": data.location, 
        "court.slots.startTime": data.time 
      }, 
      { 
        $set: { "court.$[i].slots.$[j].isBooked": isbooked ,"court.$[i].slots.$[j].Booker":booker}
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
const updateBadmintonBooking = async(data,isbooked,booker)=>{
  try {
    await badmintonDB.updateOne(
      {
        date: data.date, 
        "court.courtNumber": data.location, 
        "court.slots.startTime": data.time 
      }, 
      { 
        $set: { "court.$[i].slots.$[j].isBooked": isbooked ,"court.$[i].slots.$[j].Booker":booker}
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
const updateTabletennisBooking = async (data,isbooked,booker)=>{
  try {
    await tabletennisDB.updateOne(
      {
        date: data.date, 
        "court.courtNumber": data.location, 
        "court.slots.startTime": data.time 
      }, 
      { 
        $set: { "court.$[i].slots.$[j].isBooked": isbooked ,"court.$[i].slots.$[j].Booker":booker}
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
const updateYogaBooking = async (data,isbooked,booker)=>{
  try {
    await yogaDB.updateOne(
      {
        date: data.date, 
        "court.courtNumber": data.location, 
        "court.slots.startTime": data.time 
      }, 
      { 
        $set: { "court.$[i].slots.$[j].isBooked": isbooked ,"court.$[i].slots.$[j].Booker":booker}
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
const updateAerobicBooking = async (data,isbooked,booker)=>{
  try {
    await aerobicDB.updateOne(
      {
        date: data.date, 
        "court.courtNumber": data.location, 
        "court.slots.startTime": data.time 
      }, 
      { 
        $set: { "court.$[i].slots.$[j].isBooked": isbooked ,"court.$[i].slots.$[j].Booker":booker}
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

const updateCourtSport = (sport,data,isupdate)=>{
  try {
    let isbooked = null;
    let booker = "";
    if(isupdate === true){
      //update to booking
      isbooked = true;
      booker = data.information.user_id;
    }else{
      // update to reset init value booking
      isbooked = false;
      booker = "";
    }
    switch(sport){
      case "tennis":
        updateTennisBooking(data,isbooked,booker);
        break;
      case "badminton":
        updateBadmintonBooking(data,isbooked,booker);
        break;
      case "tabletennis":
        updateTabletennisBooking(data,isbooked,booker);
        break;
      case "yoga":
        updateYogaBooking(data,isbooked,booker);
        break;
      case "aerobic":
        updateAerobicBooking(data,isbooked,booker);
        break;
    }
  } catch (error) {
    console.log(error)
  }
}
const updateCoach = async (data,isBooking)=>{
  try {
    console.log(data,isBooking);

    await staffScheduleModel.updateOne(
      {
        "date": data.date, 
        "staff.id": data.coachId, 
        "staff.slots.startTime": data.time
      },
      {
        "$set": { "staff.$[i].slots.$[j].isBooked": isBooking }
      },
      {
        arrayFilters:[{"i.id":data.coachId},{"j.startTime":data.time}]
      }
    ).then(result => console.log(result))
    .catch(err => console.error(err));
  } catch (error) {
      console.log(error)
  }
}
const txsummit = async (req,res,next)=>{
  try {
      const data = req.body
      const sport = req.params.sport;
      // console.log(data,sport);
      // 1.create data at TX
      const tx = createTxactivity(data);
      // 2.update court booking
      console.log(data.information.user_id,data.information.fname,data.location,data.time,data.date,true)
      updateCourtSport(sport,data,true);
      //3.update coach booking
      updateCoach(data,true);
      return res.status(200).json(tx);
  } catch (error) {
    next(error);
  }
}

const getTx = async(tx_id)=>{
  try {
    const data = await txdata.findById(tx_id);
    // console.log("find");
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
}

const findTx = async(req,res)=>{
  try {
    const _tx_id = req.params.tx_id;
    console.log("show" + _tx_id);
    const data = await getTx(_tx_id);
    console.log("return");
    console.log(data);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
}

const editTx = async(req,res)=>{
  try {
        const data = req.body;
        console.log(req.url);
        // console.log(data);//new
        //1.1.update old court sport
        const _tx_id = data.tx_id;
        const sport = data.type;
        console.log(_tx_id);
        const old_data = await getTx(_tx_id);
        console.log(old_data);
        updateCourtSport(sport,old_data,false)//data (old)befor edit
        //1.2.update old Coach
        updateCoach(old_data,false);
        //..........................
        //
        //2.1.updateTx New
        updateCourtSport(sport,data,true);
        //2.2 update new coach
        updateCoach(data,true);
        //2.3 update new Tx_activity
        const targetDocumentId = {"_id":data.tx_id};
        const update = {
            "type":data.type,
            "location":data.location,
            "date":data.date,
            "time":data.time,
            "iscoach":data.iscoach,
            "coachName":data.coachName,
            "coachId":data.coachId,
            "activity":data.activity,
            "information": {
              "user_id": data.information.user_id,
              "fname": data.information.fname,
              "lname": data.information.lname,
              "phone": data.information.phone,
              "desc": data.information.desc
            }
        };
        const doc = await txdata.findOneAndUpdate(targetDocumentId,update,{ new: true });
        console.log("new edit");
        console.log(doc);
        const message = {
          "success":true,
          "message":"edit successfully",
          "data":{}
        }
        return res.status(200).json(message)
  } catch (error) {
    const message = {
      "success":false,
      "message":error.message,
      "data":{}
    }
    return res.status(500).json(message);
  }
}

const deleteTx = async(req,res)=>{
  try {
    const _tx_id = req.params.tx_id;
    console.log("delete:Tx: " + _tx_id);
    //0.get old data to use
    const old_data = await getTx(_tx_id);
    const sport = old_data.type;
    console.log("delete sport:" + sport);
    //1.reset court//2.reset coach
    updateCourtSport(sport,old_data,false)//data (old)befor edit
    updateCoach(old_data,false);
    //3.delete Tx_activity
    await txdata.findByIdAndDelete(_tx_id).then(
      (document)=>{
        if(document){
          console.log('Document Deleted:', document);
          const message = {
            "success":true,
            "message":"delete successfully",
            "data":{}
          }
          return res.status(200).json(message)
        }else{
          console.log('Document Not Found');
          const message = {
            "success":false,
            "message":"Document Not Found",
            "data":{}
          }
          return res.status(200).json(message)
        }   
      }
    )
  } catch (error) {

    const message = {
      "success":false,
      "message":error.message,
      "data":{}
    }
    return res.status(500).json(message);
  }
}

export default {txsummit,editTx,findTx,deleteTx}

