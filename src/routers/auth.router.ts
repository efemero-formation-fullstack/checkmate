import { Router } from "express";
import auth_controller from "../controllers/auth.controller.ts";
import { bodyValidator } from "../middlewares/validator.middleware.ts";
import { login_validator } from "../validators/auth.validator.ts";

const auth_router = Router();

auth_router.post(
  "/login",
  bodyValidator(login_validator),
  auth_controller.login,
);

export default auth_router;
