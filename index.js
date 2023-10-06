import express, { json } from "express";
import mongoose from 'mongoose';
import helmet from "helmet";
import morgan from "morgan";
import cors from 'cors';
import tennis_reserve from './models/tennisModel.js';
import coachList from "./models/staffModel.js";
const app = express();
const port = 3000;
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static("public"));
app.use(helmet());
app.use(morgan("dev"));



app.get("/",async (req,res)=>{
    res.status(200).json("Hi i am back end,Nodejs ,what do you want");
});
app.get("/tennisCourt",async (req,res)=>{
  try {
      const data = await tennis_reserve.find({});
      // console.log("getCourt:",data.toString());
      res.status(200).json(data);
      return;
  } catch (error) {
      res.status(500).json({message: error.message});
  }
});
app.get("/tennisCourt/:court/:day",async (req,res)=>{
  try {
      const court = req.params.court;
      const day = req.params.day;
      let field = "";
      // console.log(court,day);
      if(day == "today"){
        field = "slots_today";
        const data = await tennis_reserve.find({courtNumber:parseInt(court)},field);
        const time = data[0].slots_today;
        // console.log(time);
        res.status(200).json(time);
        return;
      }else{
        field = "slots_tomr";
        const data = await tennis_reserve.find({courtNumber:parseInt(court)},field);
        const time = data[0].slots_tomr;
        // console.log(time);
        res.status(200).json(time);
        return;
      }
      // const times = await tennis_reserve.find();
  } catch (error) {
      res.status(500).json({message: error.message});
      return;
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




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });

  mongoose.connect('mongodb+srv://suthanachot:clKXKIbLfUWd7Wnv@cluster0.spk7r49.mongodb.net/sportclubDB?retryWrites=true&w=majority')
  .then(() => console.log('Connected!')).catch((error)=>{
    console.log(error);
  });
