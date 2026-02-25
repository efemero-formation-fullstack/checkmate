import { Router } from "express";
import auth_router from "./auth.router.ts";
import player_router from "./player.router.ts";

const router = Router();

router.use("/player", player_router);
router.use("/auth", auth_router);

export default router;
