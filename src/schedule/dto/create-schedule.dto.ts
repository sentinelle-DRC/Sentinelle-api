import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import mongoose from 'mongoose';

export class CreateScheduleDto {
  @ApiProperty({
    type: String,
    description: 'the day of the week as monday for example',
  })
  @IsNotEmpty()
  @IsString()
  day: string;
  @ApiProperty({
    type: Number,
    description: 'hour for biggininig course',
  })
  @IsNotEmpty()
  @IsNumber()
  startHour: number;
  @ApiProperty({
    type: Number,
    description: 'hour for stopping course',
  })
  @IsNotEmpty()
  @IsNumber()
  endHour: number;
  @ApiProperty({
    type: mongoose.Schema.Types.ObjectId,
    description: 'lid de la classe concernee',
  })
  @IsNotEmpty()
  class: mongoose.Schema.Types.ObjectId;
  @ApiProperty({
    type: mongoose.Schema.Types.ObjectId,
    description: 'lid du cours  concernee',
  })
  @IsNotEmpty()
  course: mongoose.Schema.Types.ObjectId;
}
