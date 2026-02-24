import { Router } from "express";
import player_router from "./player.router.ts";

const router = Router();

router.use("/player", player_router);

export default router;
