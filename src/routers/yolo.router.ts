import { Router } from "express";
import yolo_controller from "../controllers/yolo.controller.ts";

const yolo_router = Router();

yolo_router.get("/", yolo_controller.all_yolos);
yolo_router.get("/:id", yolo_controller.get_yolo);
yolo_router.post("/", yolo_controller.save_yolo);

export default yolo_router;
