import createError from "http-errors";
import { PlayerRole } from "../entities/index.ts";
import { decodeToken } from "../utils/jwt.ts";

export async function authorization_token(req, resp, next) {
  const bearerToken = req.headers["authorization"];

  if (bearerToken) {
    const [bearer, token] = bearerToken.split(" ");

    if (bearer.toLowerCase() !== "bearer") {
      next(createError(403, "not a 'Bearer' token"));
    }

    try {
      const decoded = await decodeToken(token);
      req.user = {
        id: decoded.id,
        role: decoded.role,
      };
    } catch (err) {
      if (!err.statusCode) next(createError(401, "invalid token"));
      next(err);
    }
  }

  next();
}

// Authorization only to roles.
// If no role is defined -> forbidden for all
export function connected_with_role(roles: PlayerRole[] = []) {
  return (req, resp, next) => {
    // no role defined, forbidden for all
    if (!roles.length) {
      throw createError(403, "Nobody can access this endpoint.");
    }
    if (!req.user) {
      // not connected
      throw createError(401);
    }
    // connected, but not the good role
    if (roles.length > 0 && !roles.includes(req.user.role)) {
      throw createError(403, `You are not ${roles.join(" or ")}.`);
    }

    next();
  };
}

// Authorization only to self and roles.
// Self is valid if the user connected
// has the same id than the path parameter :id
// If no role is defined -> forbidden for all except self
export function self_or_roles(roles: PlayerRole[] = []) {
  return (req, resp, next) => {
    // no role defined, forbidden for all
    if (!roles.length) {
      throw createError(403, "Nobody can access this endpoint.");
    }
    // not connected
    if (!req.user) {
      throw createError(401);
    }
    // connected, but not self -> check the role
    if (req.user.id != req.params.id && !roles.includes(req.user.role)) {
      throw createError(
        403,
        `You are not the player ${req.params.id} or ${roles.join(" or ")}.`,
      );
    }

    next();
  };
}
