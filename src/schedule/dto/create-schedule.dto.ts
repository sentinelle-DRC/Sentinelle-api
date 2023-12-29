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
  public day: string;
  @ApiProperty({
    type: Number,
    description: 'hour for biggininig course',
  })
  @IsNotEmpty()
  @IsNumber()
  public startHour: number;
  @ApiProperty({
    type: Number,
    description: 'hour for stopping course',
  })
  @IsNotEmpty()
  @IsNumber()
  public endHour: number;
  @ApiProperty({
    type: mongoose.Schema.Types.ObjectId,
    description: 'lid de la classe concernee',
  })
  @IsNotEmpty()
  public class: mongoose.Schema.Types.ObjectId;
  @ApiProperty({
    type: mongoose.Schema.Types.ObjectId,
    description: 'lid du cours  concernee',
  })
  @IsNotEmpty()
  public course: mongoose.Schema.Types.ObjectId;
}
