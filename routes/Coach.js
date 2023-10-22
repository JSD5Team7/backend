import express, { json } from "express";
import Coach_controller from "../controllers/Coach_controller.js";

const Router = express.Router();

//prefix: coachList
Router.get("/all",Coach_controller.coachAll);
Router.get("/:type",Coach_controller.coachType);
Router.get("/coachAva/:type/:date/:stime",Coach_controller.coachAvaTime);
Router.get("/:type/:stime/:whoid",Coach_controller.coachWhoOther);

export default Router;
