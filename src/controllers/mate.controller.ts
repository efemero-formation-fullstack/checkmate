import { Mate } from "../entities/index.ts";
import mate_service from "../services/mate.service.ts";

const mate_controller = {
  all_mates: async (req, resp) => {
    const mates: Mate[] = await mate_service.get_mates();
    resp.status(200).json(mates);
  },
  get_mate: async (req, resp) => {
    resp.status(501).send();
  },
  save_mate: async (req, resp) => {
    const mates = mate_service.get_mates();
    resp.status(501).send();
  },
};

export default mate_controller;
