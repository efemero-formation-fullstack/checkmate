import { Router } from "express";
import tournament_controller from "../controllers/tournament.controller.ts";
import { PlayerRole } from "../entities/index.ts";
import { connected_with_role } from "../middlewares/auth.middleware.ts";
import { bodyValidator } from "../middlewares/validator.middleware.ts";
import {
  create_tournament_validator,
  update_tournament_validator,
} from "../validators/tournament.validator.ts";

const tournament_router = Router();

tournament_router.post(
  "/",
  connected_with_role([PlayerRole.ADMIN]),
  bodyValidator(create_tournament_validator),
  tournament_controller.create_tournament,
);

tournament_router.put(
  "/",
  connected_with_role([PlayerRole.ADMIN]),
  bodyValidator(create_tournament_validator),
  tournament_controller.create_tournament,
);

tournament_router.get("/", tournament_controller.all_tournaments);

tournament_router.get("/:id", tournament_controller.get_tournament);

tournament_router.post(
  "/:id",
  connected_with_role([PlayerRole.ADMIN]),
  bodyValidator(update_tournament_validator),
  tournament_controller.update_tournament,
);

tournament_router.post(
  "/:id/",
  connected_with_role([PlayerRole.ADMIN]),
  bodyValidator(update_tournament_validator),
  tournament_controller.update_tournament,
);

tournament_router.delete(
  "/:id",
  connected_with_role([PlayerRole.ADMIN]),
  tournament_controller.delete_tournament,
);

export default tournament_router;
