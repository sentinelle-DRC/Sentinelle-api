import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import mongoose from 'mongoose';

export class CreateNotificationDto {
  @ApiProperty({
    type: String,
    description: '',
  })
  @IsString()
  title: string;
  @ApiProperty({
    type: String,
    description: '',
  })
  @ApiProperty({
    type: Date,
    description: '',
  })
  @IsString()
  date: Date;
  @ApiProperty({
    type: String,
    description: '',
  })
  @IsString()
  type: string;
  @ApiProperty({
    type: mongoose.Schema.Types.ObjectId,
    description: 'lid du student concerné',
  })
  @IsNotEmpty()
  student: mongoose.Schema.Types.ObjectId;
}
