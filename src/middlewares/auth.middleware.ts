import { PlayerRole } from "../entities/index.ts";
import { decodeToken } from "../utils/jwt.ts";

export async function authorization_token(req, resp, next) {
  const bearerToken = req.headers["authorization"];

  if (bearerToken) {
    const [bearer, token] = bearerToken.split(" ");

    if (bearer.toLowerCase() !== "bearer") {
      resp.status(403).end();
      return;
    }

    try {
      const decoded = await decodeToken(token);
      req.user = {
        id: decoded.id,
        role: decoded.role,
      };
    } catch (err) {
      resp.status(401).end();
      return;
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
      resp.status(403).end();
      return;
    }
    if (!req.user) {
      // not connected
      resp.status(401).end();
      return;
    }
    // connected, but not the good role
    if (roles.length > 0 && !roles.includes(req.user.role)) {
      resp.status(403).end();
      return;
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
    // not connected
    if (!req.user) {
      resp.status(401).end();
      return;
    }
    // connected, but not self -> check the role
    if (req.user.id != req.params.id && !roles.includes(req.user.role)) {
      resp.status(403).end();
      return;
    }

    next();
  };
}
