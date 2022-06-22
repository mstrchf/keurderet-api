import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  BaseEntity,
  OneToMany,
} from "typeorm";

import { Notification } from "./Notification";
import { Request } from "./Request";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @Column()
  bloodGroup: string;

  @Column()
  activeDonor: boolean;

  @Column()
  address: string;

  @Column()
  location: string;

  @Column()
  phone: number;

  @OneToMany(() => Notification, (notifications) => notifications.creator)
  notifications: Notification[];

  @OneToMany(() => Request, (requests) => requests.creator)
  requests: Request[];

  @Column()
  verified: boolean;

  @Column()
  code: number;

  @Column()
  register_complete: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
