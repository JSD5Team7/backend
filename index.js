import express, { json } from "express";
import mongoose from 'mongoose';
import helmet from "helmet";
import morgan from "morgan";
import cors from 'cors';
import cron from 'node-cron';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();
const dbURI = process.env.DATABASE;

import tennisRoute from "./routes/Tennis.js"
import coachRoute from "./routes/Coach.js"
import txActRoute from "./routes/TxActivity.js"
import badmintonRoute from "./routes/Badminton.js"
import yogaRoute from "./routes/yoga.js"
import tabletennisRoute from "./routes/tabletennis.js"
import aerobicRoute from "./routes/Aerobic.js"
import userRoute from "./routes/User.js"

import UsersRoute from './routes/Users.js'

import {getDateToDay,getDateTomorrow,InsertNewSchedule} from './controllers/startSchedule.js'

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
app.use("/tennisCourt",tennisRoute);
app.use("/coachList",coachRoute);
app.use("/activity",txActRoute);
app.use("/badmintonCourt",badmintonRoute);
app.use("/yogaCourt",yogaRoute);
app.use("/tabletennisCourt",tabletennisRoute);
app.use("/aerobicCourt",aerobicRoute);
app.use("/user",userRoute);

cron.schedule('0 1 * * *', () => {
  console.log('Running a task at midnight schedule');
  const datetodate = getDateToDay();
  const datetoTomo = getDateTomorrow();
  InsertNewSchedule(datetodate);
  InsertNewSchedule(datetoTomo);
});

app.use("/users", UsersRoute)

app.get("/",async (req,res)=>{
    res.status(200).json("Hi i am back end,Nodejs and express,what do you want?");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
    
  });

mongoose.connect(dbURI)
  .then(() => console.log('Connected!')).catch((error)=>{
    console.log(error);
  });