import createError from "http-errors";
import { login } from "../utils/auth.ts";
import { decodeToken, generateToken } from "../utils/jwt.ts";

const auth_controller = {
  login: async (req, resp) => {
    const player = await login(req.data.login, req.data.password);
    if (!player) {
      throw createError(401, "login failed");
    }
    const token = await generateToken(player);
    const decoded = await decodeToken(token);
    const result = {
      access_token: token,
      token_type: "Bearer",
      expires_in: decoded.exp - decoded.iat,
    };
    resp.status(200).json(result);
  },
};

export default auth_controller;
