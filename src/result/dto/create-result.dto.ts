import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

export class CreateResultDto {
  @ApiProperty({
    type: Number,
    description: 'le maximum pour ce travail',
  })
  @IsNotEmpty()
  max: number;
  @ApiProperty({
    type: Number,
    description: 'la cote obtenue pour ce travail',
  })
  @IsNotEmpty()
  cote: number;
  @ApiProperty({
    type: mongoose.Schema.Types.ObjectId,
    description: 'lid du student concerné',
  })
  @IsNotEmpty()
  student: mongoose.Schema.Types.ObjectId;
  @ApiProperty({
    type: mongoose.Schema.Types.ObjectId,
    description: 'lid du travail concerné',
  })
  @IsNotEmpty()
  work: mongoose.Schema.Types.ObjectId;
}
