import createError from "http-errors";
import { Between, In, LessThanOrEqual, MoreThanOrEqual } from "typeorm";
import {
  Gender,
  Player,
  Tournament,
  TournamentStatus,
} from "../entities/index.ts";
import { send_template } from "./mailer.service.ts";

const tournament_service = {
  get_tournaments: async function (): Promise<Tournament[]> {
    const tournaments = await Tournament.find({
      relations: { categories: true, players: true },
    });
    return tournaments;
  },

  get_tournament: async function (id: number) {
    const tournament = await Tournament.findOne({
      where: {
        id: id,
      },
      relations: {
        categories: true,
        players: true,
      },
    });
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

  register: async function (tournament_id, player_id) {
    const tournament = await Tournament.findOne({
      where: { id: tournament_id },
      relations: { categories: true, players: true },
    });
    if (tournament.status != TournamentStatus.PENDING) {
      throw createError(403, `tournament has already started`);
    }
    if (tournament.end_registration_date < new Date()) {
      throw createError(403, `registration date has passed`);
    }
    if (tournament.players.map((p) => p.id).includes(player_id)) {
      throw createError(403, `user already registered this tournament`);
    }
    if (tournament.players.length >= tournament.max_players) {
      throw createError(
        403,
        `max number of players reached for this tournament`,
      );
    }
    const player = await Player.findOneBy({ id: player_id });
    if (tournament.women_only && player.gender == Gender.MALE) {
      throw createError(403, `women only tournament`);
    }
    if (tournament.min_elo && player.elo < tournament.min_elo) {
      throw createError(
        403,
        `minimum ELO for this tournament: ${tournament.min_elo}`,
      );
    }
    if (tournament.max_elo && player.elo > tournament.max_elo) {
      throw createError(
        403,
        `maximum ELO for this tournament: ${tournament.max_elo}`,
      );
    }
    const birth_date = new Date(player.birth_date);
    for (const category of tournament.categories) {
      const min_date = new Date(tournament.end_registration_date);
      min_date.setFullYear(min_date.getFullYear() - category.max_age);
      const max_date = new Date(tournament.end_registration_date);
      max_date.setFullYear(max_date.getFullYear() - category.min_age);
      if (birth_date <= max_date && birth_date >= min_date) {
        tournament.players.push(player);
        await tournament.save({});
        return;
      }
    }
    throw createError(
      403,
      `you must be in category ${tournament.categories.map((c) => c.name).join(" or ")} at ${tournament.end_registration_date}`,
    );
  },
};

export default tournament_service;
