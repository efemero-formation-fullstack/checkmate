import { Router } from "express";
import mate_controller from "../controllers/mate.controller.ts";

const mate_router = Router();

mate_router.get("/", mate_controller.all_mates);
mate_router.get("/:id", mate_controller.get_mate);
mate_router.post("/", mate_controller.save_mate);

export default mate_router;
