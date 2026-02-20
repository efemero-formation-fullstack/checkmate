import { Yolo } from "../entities/index.ts";

const yolo_service = {
  get_yolos: async function (): Promise<Yolo[]> {
    const yolos = await Yolo.find({ take: 100 });
    return yolos;
  },

  get_yolo: async function (id: number) {
    const yolo = await Yolo.findOneBy({ id: id });
    return yolo;
  },

  save_yolo: async function (id: number) {
    const yolo = await Yolo.findOneBy({ id: id });
    return yolo;
  },
};

export default yolo_service;
