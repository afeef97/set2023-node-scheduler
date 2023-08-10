import express from "express";
import getRoot from "../controllers/root/getRoot";
import postRoot from "../controllers/root/postRoot";
import { sendAnnualMessage } from "../controllers/scheduler/message";

const root = express.Router();

root.get("/", getRoot);
root.post("/", postRoot);

// root.get("/messages", sendAnnualMessage);

export default root;
