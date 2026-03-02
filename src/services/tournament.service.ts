import { Player, Tournament } from "../entities/index.ts";
import { send_template } from "./mailer.service.ts";

const tournament_service = {
  get_tournaments: async function (): Promise<Tournament[]> {
    const tournaments = await Tournament.find({ take: 100 });
    return tournaments;
  },

  get_tournament: async function (id: number) {
    const tournament = await Tournament.findOneBy({ id: id });
    return tournament;
  },

  send_new_tournament_emails: async function (tournament: Tournament) {
    const players: Player[] = await Player.find({ take: 5 });
    for (const player of players) {
      send_template(
        player.email,
        `Un nouveau tournoi vient d’être annoncé`,
        "new_tournament_email",
        { player, tournament },
      );
    }
  },
};

export default tournament_service;
