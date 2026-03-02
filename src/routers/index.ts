import { Router } from "express";
import { authorization_token } from "../middlewares/auth.middleware.ts";
import auth_router from "./auth.router.ts";
import player_router from "./player.router.ts";
import tournament_router from "./tournament.router.ts";

const router = Router();

router.use(authorization_token);
router.use("/player", player_router);
router.use("/tournament", tournament_router);
router.use("/auth", auth_router);
router.use("/", (req, resp) => {
  if (req.path == "/") resp.status(200).json({ documentation: "soon™" });
  resp.status(404).send();
});

export default router;
