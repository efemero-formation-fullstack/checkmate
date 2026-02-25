import { Router } from "express";
import player_controller from "../controllers/player.controller.ts";
import { bodyValidator } from "../middlewares/validator.middleware.ts";
import {
  create_player_validator,
  update_player_validator,
} from "../validators/player.validator.ts";

const player_router = Router();

player_router.post(
  "/",
  bodyValidator(create_player_validator),
  player_controller.create_player,
);
player_router.put(
  "/",
  bodyValidator(create_player_validator),
  player_controller.create_player,
);
player_router.get("/", player_controller.all_players);
player_router.get("/:id", player_controller.get_player);
player_router.post(
  "/:id",
  bodyValidator(update_player_validator),
  player_controller.update_player,
);
player_router.delete("/:id", player_controller.delete_player);

export default player_router;
