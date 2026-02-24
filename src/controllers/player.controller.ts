import console from "node:console";
import { Player, PlayerRole } from "../entities/index.ts";
import player_service from "../services/player.service.ts";
import { genpw } from "../utils/genpw.ts";

const player_controller = {
  create_player: async (req, resp) => {
    let player_data = req.data;
    player_data.password = genpw();
    player_data.role = PlayerRole.PLAYER;
    const player = await Player.save(player_data);
    resp.status(201).send();
  },
  all_players: async (req, resp) => {
    const players: Player[] = await player_service.get_players();
    resp.status(200).json(players);
  },
  get_player: async (req, resp) => {
    resp.status(501).send();
  },
  update_player: async (req, resp) => {
    resp.status(501).send();
  },
  delete_player: async (req, resp) => {
    resp.status(501).send();
  },
};

export default player_controller;
