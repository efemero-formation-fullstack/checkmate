import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum PlayerRole {
  ADMIN = "admin",
  PLAYER = "player",
}

export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
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

  @Column()
  birth_date: Date;

  @Column({ type: "enum", enum: Gender })
  gender: Gender;

  @Column({ type: "enum", enum: PlayerRole })
  role: PlayerRole;
}
