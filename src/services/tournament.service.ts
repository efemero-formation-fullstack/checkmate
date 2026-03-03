import { Between, In, LessThanOrEqual, MoreThanOrEqual } from "typeorm";
import { Gender, Player, Tournament } from "../entities/index.ts";
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
    tournament = await Tournament.findOne({
      where: { id: tournament.id },
      relations: { categories: true },
    });
    let query = Player.createQueryBuilder();
    if (tournament.min_elo) {
      if (tournament.max_elo) {
        query = query.where({
          elo: Between(tournament.min_elo, tournament.max_elo),
        });
      } else {
        query = query.where({
          elo: MoreThanOrEqual(tournament.min_elo),
        });
      }
    } else if (tournament.max_elo) {
      query = query.where({
        elo: LessThanOrEqual(tournament.max_elo),
      });
    }
    if (tournament.women_only) {
      query = query.andWhere({ gender: In([Gender.FEMALE, Gender.OTHER]) });
    }
    if (tournament.categories.length) {
      const where_cat = [];
      for (const category of tournament.categories) {
        const min_date = new Date(tournament.end_registration_date);
        min_date.setFullYear(min_date.getFullYear() - category.max_age);
        const max_date = new Date(tournament.end_registration_date);
        max_date.setFullYear(max_date.getFullYear() - category.min_age);
        where_cat.push({ birth_date: Between(min_date, max_date) });
      }
      query = query.andWhere(where_cat);
    }
    const players = await query.getMany();
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
