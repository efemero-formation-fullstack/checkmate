import { hash } from "@bronti/argon2";
import { buildMapper } from "dto-mapper";
import console from "node:console";
import {
  CreatePlayerDTO,
  GetPlayerDTO,
  UpdatePlayerDTO,
} from "../dtos/player.dto.ts";
import { Player } from "../entities/index.ts";
import player_service from "../services/player.service.ts";
import { genpw } from "../utils/auth.ts";

const create_mapper = buildMapper(CreatePlayerDTO);
const get_mapper = buildMapper(GetPlayerDTO);
const update_mapper = buildMapper(UpdatePlayerDTO);

const player_controller = {
  create_player: async (req, resp) => {
    const create_dto = create_mapper.deserialize(req.data);
    const password = genpw();
    console.log(password);
    create_dto.password = hash(password);
    const player = await Player.save(create_dto);
    const get_dto = get_mapper.serialize(player);
    resp.status(201).json(get_dto);
  },
  all_players: async (req, resp) => {
    const players: Player[] = await player_service.get_players();
    const dtos = [];
    for (const player of players) {
      console.log(player.birth_date);
      dtos.push(get_mapper.serialize(player));
    }
    resp.status(200).json(dtos);
  },
  get_player: async (req, resp) => {
    const player = await player_service.get_player(req.params.id);
    if (!player) {
      resp.status(404).send();
    }
    const dto = get_mapper.serialize(player);
    resp.status(200).json(dto);
  },
  update_player: async (req, resp) => {
    let player = await player_service.get_player(req.params.id);
    const update_dto = update_mapper.deserialize(req.data);
    Object.entries(update_dto).forEach(([k, v]) => {
      if (v) {
        player[k] = v;
      }
    });
    player = await player.save();
    const get_dto = get_mapper.serialize(player);
    resp.status(200).json(get_dto);
  },
  delete_player: async (req, resp) => {
    Player.delete(req.params.id);
    resp.status(200).send();
  },
};

export default player_controller;
