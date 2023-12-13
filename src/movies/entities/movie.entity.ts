import { ApiHideProperty } from '@nestjs/swagger';
import { IsDateString, IsString } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Movie {
  @ApiHideProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Column({ unique: true })
  title: string;

  @IsString()
  @Column({ length: 255 })
  genre: string;

  @IsDateString()
  @Column({ type: 'date' })
  releaseDate: Date;

  @IsString()
  @Column({ length: 255 })
  country: string;
}
