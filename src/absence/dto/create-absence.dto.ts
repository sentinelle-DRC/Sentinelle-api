import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import mongoose from 'mongoose';

export class CreateAbsenceDto {
  @ApiProperty({
    type: String,
    description: 'justification pour une absence',
  })
  justification: string;
  @ApiProperty({
    type: mongoose.Schema.Types.ObjectId,
    description: 'lid du student concerné',
  })
  @IsNotEmpty()
  student: mongoose.Schema.Types.ObjectId;
}
