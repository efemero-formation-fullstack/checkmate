import { Player } from "../entities/index.ts";

const player_service = {
  get_players: async function (): Promise<Player[]> {
    const players = await Player.find();
    return players;
  },

  get_player: async function (id: number) {
    const player = await Player.findOneBy({ id: id });
    return player;
  },
};

export default player_service;
