import { dto, include, scope } from "dto-mapper";
import { Category, PlayerRole, TournamentStatus } from "../entities/index.ts";

@dto()
export class CreateTournamentDTO {
  @include()
  name: string;
  @include()
  location: string;
  @include()
  min_players: number;
  @include()
  max_players: number;
  @include()
  min_elo: number;
  @include()
  max_elo: number;
  @include()
  categories: Category[];
  @include()
  women_only: boolean;
  @include()
  end_registration_date: Date;
}

@dto()
export class PlayerDTO {
  @include()
  nickname: string;
  @include()
  elo: number;
}

@dto()
export class CategoryDTO {
  @include()
  name: string;
  @include()
  min_age: number;
  @include()
  max_age: number;
}

@dto()
export class GetTournamentDTO {
  @include()
  id: number;
  @include()
  name: string;
  @include()
  location: string;
  @include()
  min_players: number;
  @include()
  max_players: number;
  @include()
  min_elo: number;
  @include()
  max_elo: number;
  @include()
  players: PlayerDTO[];
  @include()
  categories: CategoryDTO[];
  @include()
  status: TournamentStatus;
  @include()
  current_round: number;
  @include()
  women_only: boolean;
  @include()
  end_registration_date: Date;
  @include()
  @scope(PlayerRole.ADMIN)
  created_at: Date;
  @include()
  @scope(PlayerRole.ADMIN)
  updated_at: Date;
}

@dto()
export class UpdateTournamentDTO {
  @include()
  nickname: string;
  @include()
  email: string;
  @include()
  elo: number;
  @include()
  birth_date: Date;
}
