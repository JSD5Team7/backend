import express, { json } from "express";
import txdata from "../models/txactModel.js";
import coachList from "../models/staffModel.js";
import tennisDB from '../models/tennisModel.js';
import activityController from '../controllers/Txactivity_controller.js';
import { ObjectId } from "mongodb";


const Router = express.Router();

Router.get("/:tx_id", async (req,res)=>{
  try {
    const tx_id = req.params.tx_id;
    console.log("back " + tx_id);
    const data = await txdata.findById(tx_id);
    console.log(data);
    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({message: error.message});
  }
});

Router.post("/:sport",activityController.txsummit);

Router.post("/edit", async(req,res)=>{
    try {
      
      
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  });


  export default Router;
