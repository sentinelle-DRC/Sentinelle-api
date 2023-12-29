import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import mongoose from 'mongoose';

export class CreateRessourceDto {
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
  @IsString()
  detail: string;
  @ApiProperty({
    type: String,
    description: '',
  })
  @IsString()
  type: string;
  @ApiProperty({
    type: mongoose.Schema.Types.ObjectId,
    description: 'field',
  })
  @IsNotEmpty()
  field: mongoose.Schema.Types.ObjectId;
}
