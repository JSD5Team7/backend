import express, { json } from "express";
import mongoose from 'mongoose';
import helmet from "helmet";
import morgan from "morgan";
import cors from 'cors';
import tennisCourt from './models/tennisModel.js';
import coachList from "./models/staffModel.js";
import txdata from "./models/txactModel.js";
const app = express();
const port = 3000;
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(json());
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static("public"));
app.use(helmet());
app.use(morgan("dev"));

app.get("/friend", async (req,res)=>{

})

app.get("/",async (req,res)=>{
    res.status(200).json("Hi i am back end,Nodejs ,what do you want");
});

app.get("/tennisCourt",async (req,res)=>{
  try {
      const today = new Date(Date.now());
      const today_form = today.toISOString().slice(0, 10); //2023-10-09
      // console.log(today_form);
      const data = await tennisCourt.find({date:today_form});
      console.log(data.toString());
      const _court = data[0].court;
      res.status(200).json(_court);
      return;
  } catch (error) {
      res.status(500).json({message: error.message});
  }
});
app.get("/tennisCourt/:court/:date",async (req,res)=>{
  try {
      const _court = req.params.court;
      const date = req.params.date;
      // console.log(_court,date);
      if(date){
        // console.log(_court);
        // thank god and holy thing,for it working.
        const data = await tennisCourt.find({date:date},{court:{$elemMatch:{courtNumber:_court}}});
        console.log(data);
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
app.get("/coachList/:type",async (req,res)=>{
    try {
      const _type = req.params.type;
      const data = await coachList.find({type:_type});
      console.log(data.toString());
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
});
app.get("/coachList/:type/:stime",async (req,res)=>{
    try {
      const _type = req.params.type;
      const _starttime = req.params.stime;
      const data = await coachList.find({$and:[{type:_type},{slots_today:{$elemMatch:{startTime:_starttime,isBooked:false}}}]});
      console.log(data.toString());
      return res.status(200).json(data);

    } catch (error) {
      return res.status(500).json({message: error.message});
    }
});
app.post("/activity", async(req,res)=>{
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
    // update court status
    // courtBooking(data.location,data.time,data.date,true);
    console.log(data.location,data.time,data.date,true)
    await tennisCourt.updateOne(
      {
        date: data.date, 
        "court.courtNumber": data.location, 
        "court.slots.startTime": data.time 
      }, 
      { 
        $set: { "court.$[i].slots.$[j].isBooked": true }
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
    return res.status(200).json(tx);

  } catch (error) {
    return res.status(500).json({message: error.message});
  }
})

function courtBooking(_court,_time,_date,_booking){
  try {
    console.log(_court,_time,_date);
    const courtUpdate = async (_court,_time,_status)=>{
      await tennisCourt.findOneAndUpdate({date:_date,'court.courtNumber':_court,'slots.startTime':_time},{'slots.isBooked':_booking});
    }
    courtUpdate(_court,_time,_date);
    return true;
  } catch (error) {
    console.log(error.message)
    return false;
  }
    

}




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });

  mongoose.connect('mongodb+srv://suthanachot:clKXKIbLfUWd7Wnv@cluster0.spk7r49.mongodb.net/sportclubDB?retryWrites=true&w=majority')
  .then(() => console.log('Connected!')).catch((error)=>{
    console.log(error);
  });
