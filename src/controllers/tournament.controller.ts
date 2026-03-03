import { buildMapper } from "dto-mapper";
import createError from "http-errors";
import { In } from "typeorm";
import {
  CreateTournamentDTO,
  GetTournamentDTO,
  UpdateTournamentDTO,
} from "../dtos/tournament.dto.ts";
import { Category, Tournament } from "../entities/index.ts";
import tournament_service from "../services/tournament.service.ts";

const create_mapper = buildMapper(CreateTournamentDTO);
const get_mapper = buildMapper(GetTournamentDTO);
const update_mapper = buildMapper(UpdateTournamentDTO);

const tournament_controller = {
  create_tournament: async (req, resp) => {
    const create_dto = create_mapper.deserialize(req.data);
    const categories: Category[] = await Category.findBy({
      name: In(create_dto.categories),
    });
    create_dto.categories = categories;
    let tournament: Tournament;
    try {
      tournament = await Tournament.save(create_dto, {
        relations: { categories: true },
      });
    } catch (e) {
      if (e.code && e.code == 23505) {
        throw createError(
          400,
          `tournament '${create_dto.name}' already exists`,
        );
      }
      throw e;
    }
    await tournament_service.send_new_tournament_emails(tournament);
    const get_dto = get_mapper.serialize(tournament);
    resp.status(201).json(get_dto);
  },

  register: async (req, resp) => {
    console.log(req);
    await tournament_service.register(req.params.id, req.user.id);
    resp.status(200).end();
  },

  all_tournaments: async (req, resp) => {
    const tournaments: Tournament[] =
      await tournament_service.get_tournaments();
    const dtos = [];
    for (const tournament of tournaments) {
      dtos.push(get_mapper.serialize(tournament));
    }
    resp.status(200).json(dtos);
  },

  get_tournament: async (req, resp) => {
    const tournament = await tournament_service.get_tournament(req.params.id);
    if (!tournament) {
      throw createError(404);
    }
    const dto = get_mapper.serialize(tournament);
    resp.status(200).json(dto);
  },

  update_tournament: async (req, resp) => {
    let tournament = await tournament_service.get_tournament(req.params.id);
    const update_dto = update_mapper.deserialize(req.data);
    Object.entries(update_dto).forEach(([k, v]) => {
      if (v) {
        tournament[k] = v;
      }
    });
    tournament = await tournament.save();
    const get_dto = get_mapper.serialize(tournament);
    resp.status(200).json(get_dto);
  },

  delete_tournament: async (req, resp) => {
    Tournament.delete(req.params.id);
    resp.status(200).end();
  },
};

export default tournament_controller;
