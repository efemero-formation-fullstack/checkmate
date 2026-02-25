import { dto, include, scope } from "dto-mapper";
import { Gender, PlayerRole } from "../entities/index.ts";

@dto()
export class CreatePlayerDTO {
  @include()
  nickname: string;
  @include()
  email: string;
  @include()
  elo: number;
  @include()
  birth_date: Date;
  @include()
  gender: Gender;
  @include()
  role: PlayerRole;
}

@dto()
export class GetPlayerDTO {
  @include()
  id: number;
  @include()
  nickname: string;
  @include()
  email: string;
  @include()
  elo: number;
  @include()
  birth_date: Date;
  @include()
  gender: Gender;
  @include()
  @scope("admin")
  role: PlayerRole;
}

@dto()
export class UpdatePlayerDTO {
  @include()
  nickname: string;
  @include()
  email: string;
  @include()
  elo: number;
  @include()
  birth_date: Date;
  @include()
  gender: Gender;
  @include()
  @scope("admin")
  role: PlayerRole;
}
