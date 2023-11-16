import fs from 'fs'
import tennisDB from '../models/tennisModel.js';
import badmintonDB from "../models/badmintonModel.js";
import tabletennisDB from "../models/tabletennisModel.js";
import yogaDB from "../models/yogaModel.js";
import aerobicDB from "../models/aerobicModel.js";
import staffScheduleModel from "../models/staffScheduleModel.js";
import { json } from 'express';

export const getDateToDay = ()=>{
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1; // Months are 0-indexed (0 for January, 1 for February, etc.)
    let day = now.getDate();
    return `${year}-${month}-${day}`
}

export const getDateTomorrow = ()=>{
    // Get today's date
    const today = new Date();
    // Get tomorrow's date by adding one day
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    // Format the date as YYYY-MM-DD
    const formattedDate = `${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(2, '0')}-${String(tomorrow.getDate()).padStart(2, '0')}`;
    return formattedDate;

}

const ReadAndInsert = (filename,date)=>{
    try{
        const data = fs.readFileSync(`./initdata/${filename}`, 'utf8');
        const jsonData = JSON.parse(data);
        //first object
        jsonData[0]["date"] = date;
        switch(filename.split(".")[0]){
            case"aerobic":
                return aerobicDB.create(jsonData);
                break;
            case"badminton":
                return badmintonDB.create(jsonData);
                break;
            case"staff":
                return staffScheduleModel.create(jsonData);
                break;
            case"tabletennis":
                return tabletennisDB.create(jsonData);
                break;
            case"tennis":
                return tennisDB.create(jsonData);
                break;
            case"yoga":
                return yogaDB.create(jsonData);
                break;
        }
        // console.log(jsonData);
    }catch(error){
        console.log(error.message)
    }
}

export const InsertNewSchedule = async(date)=>{
    const folderPath = './initdata';
try {
    //check date data befor insert new init data
    const getdata = await staffScheduleModel.find({"date":date});
    console.log(getdata.length);
    if(getdata.length > 0){
        return "already exit date data";
    }else{
        const files = fs.readdirSync(folderPath);
        //read file name
        files.forEach(file => {
            console.log(file);
            ReadAndInsert(file,date);
        });
        return "complete new date";
    }
} catch (err) {
    console.error('Error reading the directory', err);
}
}
