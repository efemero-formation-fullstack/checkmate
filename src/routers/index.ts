import { Router } from "express";
import yolo_router from "./yolo.router.ts";

const router = Router();

router.use("/yolo", yolo_router);

export default router;
