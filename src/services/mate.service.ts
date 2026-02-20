import { Mate } from "../entities/index.ts";

const mate_service = {
  get_mates: async function (): Promise<Mate[]> {
    const mates = await mate.find({ take: 100 });
    return mates;
  },

  get_mate: async function (id: number) {
    const mate = await mate.findOneBy({ id: id });
    return mate;
  },

  save_mate: async function (id: number) {
    const mate = await mate.findOneBy({ id: id });
    return mate;
  },
};

export default mate_service;
