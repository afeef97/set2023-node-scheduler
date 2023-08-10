import { Router } from "express";
import * as userControllers from "../controllers/auth/authControllers";
import isAuthenticated from "../middleware/isAuthenticated";

const apiRoutes = Router();

apiRoutes.post("/registerUser", userControllers.registerUser);
apiRoutes.post("/loginUser", userControllers.loginUser);
apiRoutes.get("/logoutUser", isAuthenticated, userControllers.logoutUser);

export default apiRoutes;
