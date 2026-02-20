import { Yolo } from "../entities/index.ts";
import yolo_service from "../services/yolo.service.ts";

const yolo_controller = {
  all_yolos: async (req, resp) => {
    const yolos: Yolo[] = await yolo_service.get_yolos();
    resp.status(200).json(yolos);
  },
  get_yolo: async (req, resp) => {
    resp.status(501).send();
  },
  save_yolo: async (req, resp) => {
    const yolos = yolo_service.get_yolos();
    resp.status(501).send();
  },
};

export default yolo_controller;
