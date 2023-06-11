import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

export class CreateScheduleDto {
  @ApiProperty({
    type: String,
    description: 'Jours de la semaine',
  })
  @IsNotEmpty()
  @IsString()
  day: string;

  @ApiProperty({
    type: String,
    description: 'heure de debut hh:mm',
  })
  @IsNotEmpty()
  @IsString()
  startHour: string;

  @ApiProperty({
    type: String,
    description: 'heure de fin hh:mm',
  })
  @IsNotEmpty()
  @IsString()
  endHour: string;

  @ApiProperty({
    type: String,
    description: " l'id du cours",
  })
  @IsNotEmpty()
  @IsString()
  cours: mongoose.Schema.Types.ObjectId;

  @ApiProperty({
    type: String,
    description: " l'id du cours",
  })
  @IsNotEmpty()
  @IsString()
  class: mongoose.Schema.Types.ObjectId;
}
