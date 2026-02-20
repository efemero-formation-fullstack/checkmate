import { Router } from "express";
import mate_router from "./mate.router.ts";

const router = Router();

router.use("/mate", mate_router);

export default router;
