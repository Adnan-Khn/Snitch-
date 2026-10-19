import { Router } from "express"
import { loginValidator, registerValidator } from "../validators/auth.validator.js"
import { loginController, meController, refreshController, registerController } from "../controllers/auth.controller.js"
import { authenticate } from "../middlewares/auth.middleware.js"


const routes = Router()
routes.post("/register",registerValidator,registerController)
routes.post("/login",loginValidator,loginController)
routes.post("/refresh",refreshController)
routes.get("/me",authenticate,meController)
export default routes