import express from "express";
import getRoot from "../controllers/root/getRoot";
import postRoot from "../controllers/root/postRoot";
import { getUserMessages } from "../controllers/scheduler/messageControllers";
import isAuthenticated from "../middleware/isAuthenticated";

const root = express.Router();

root.get("/", getRoot);
root.post("/", postRoot);

root.get("/userMessages", isAuthenticated, getUserMessages);

export default root;
