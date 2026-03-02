import { Max, Min } from "class-validator";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export enum PlayerRole {
  ADMIN = "admin",
  PLAYER = "player",
}

export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}

export enum TournamentStatus {
  PENDING = "pending",
  ACTIVE = "active",
  FINISHED = "finished",
}

@Entity({ name: "players" })
export class Player extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nickname: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: "int", default: 1200 })
  elo: number;

  @Column({ type: "date" })
  birth_date: Date;

  @Column({ type: "enum", enum: Gender })
  gender: Gender;

  @Column({ type: "enum", enum: PlayerRole })
  role: PlayerRole;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

@Entity({ name: "categories" })
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ type: "int" })
  min_age: number;

  @Column({ type: "int" })
  max_age: number;
}

@Entity({ name: "tournaments" })
export class Tournament extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  location: string;

  @Column({ type: "int" })
  @Min(2)
  @Max(32)
  min_players: number;

  @Column({ type: "int" })
  @Min(2)
  @Max(32)
  max_players: number;

  @Column({ type: "int", nullable: true })
  @Min(0)
  @Max(3000)
  min_elo: number;

  @Column({ type: "int", nullable: true })
  @Min(0)
  @Max(3000)
  max_elo: number;

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];

  @Column({
    type: "enum",
    enum: TournamentStatus,
    default: TournamentStatus.PENDING,
  })
  status: TournamentStatus;

  @Column({ type: "int", default: 0 })
  current_round: number;

  women_only: boolean;

  @Column({ type: "date" })
  end_registration_date: Date;

  @Column({ type: "enum", enum: Gender })
  gender: Gender;

  @Column({ type: "enum", enum: PlayerRole })
  role: PlayerRole;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
