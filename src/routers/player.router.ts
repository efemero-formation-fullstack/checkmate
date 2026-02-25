import { Router } from "express";
import player_controller from "../controllers/player.controller.ts";
import { PlayerRole } from "../entities/index.ts";
import {
  connected_with_role,
  self_or_roles,
} from "../middlewares/auth.middleware.ts";
import { bodyValidator } from "../middlewares/validator.middleware.ts";
import {
  create_player_validator,
  update_player_validator,
} from "../validators/player.validator.ts";

const player_router = Router();

player_router.post(
  "/",
  connected_with_role([PlayerRole.ADMIN]),
  bodyValidator(create_player_validator),
  player_controller.create_player,
);
player_router.put(
  "/",
  connected_with_role([PlayerRole.ADMIN]),
  bodyValidator(create_player_validator),
  player_controller.create_player,
);
player_router.get(
  "/",
  connected_with_role([PlayerRole.ADMIN]),
  player_controller.all_players,
);
player_router.get(
  "/:id",
  self_or_roles([PlayerRole.ADMIN]),
  player_controller.get_player,
);
player_router.post(
  "/:id",
  self_or_roles([PlayerRole.ADMIN]),
  bodyValidator(update_player_validator),
  player_controller.update_player,
);
player_router.delete(
  "/:id",
  connected_with_role([PlayerRole.ADMIN]),
  player_controller.delete_player,
);

export default player_router;
