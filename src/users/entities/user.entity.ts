import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRole } from '../roles';
import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @ApiHideProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500, unique: true })
  username: string;

  @Exclude({ toPlainOnly: true })
  @Column({ length: 500, select: false })
  password: string;

  @ApiHideProperty()
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (!this.password) return;
    this.password = await bcrypt.hash(this.password, 10);
  }
}
