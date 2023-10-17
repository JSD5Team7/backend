import express, { json } from "express";
import userDB from "../models/userModel.js"
import txdata from "../models/txactModel.js";

const Router = express.Router();

Router.get("/history/:user_id",async (req,res)=>{
    try {
      const user_id = req.params.user_id;
      const data = await txdata.find({"information.user_id":user_id});
    //   console.log(data);
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
});

export default Router;