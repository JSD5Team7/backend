import express, { json } from "express";
import txdata from "../models/txactModel.js";
import coachList from "../models/staffModel.js";
import tennisDB from '../models/tennisModel.js';
import activityController from '../controllers/Txactivity_controller.js';
import { ObjectId } from "mongodb";


const Router = express.Router();

Router.get("/:tx_id",activityController.findTx);

Router.post("/:sport",activityController.txsummit);

Router.put("/edit", activityController.editTx);


  export default Router;
